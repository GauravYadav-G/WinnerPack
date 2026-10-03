import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Category, Product } from "../models";
import { initialProducts } from "../fallback-data";
import { requireAuth } from "../middleware/auth";
import { isValidSession } from "../session";

const router = Router();

// These legacy records were intentionally retired from the public catalogue.
// Keep the denylist at the API boundary so stale database rows cannot reappear.
const RETIRED_PRODUCT_IDS = new Set([
  "ldpe-films-pouches",
  "coloured-films-pouches",
  "compostable-films-pouches",
]);

function isAdminRequest(req: Request): boolean {
  return isValidSession(req.cookies?.admin_session);
}

function isPublicProduct(product: any): boolean {
  return !RETIRED_PRODUCT_IDS.has(product.id) && (!product.status || product.status === "published");
}

type ProductFaq = { question: string; answer: string };

function extractFallbackFaqs(longDesc?: string): ProductFaq[] {
  if (!longDesc) return [];
  const heading = /^(#{1,6})\s+.*(?:frequently asked questions|faq).*$/im.exec(longDesc);
  if (!heading) return [];
  const section = longDesc.slice((heading.index ?? 0) + heading[0].length);
  return Array.from(section.matchAll(/^#{3,6}\s+([^\n]+)\n+([\s\S]*?)(?=^#{3,6}\s+|(?![\s\S]))/gm))
    .map((entry) => ({ question: entry[1].trim(), answer: entry[2].trim() }))
    .filter((faq) => faq.question && faq.answer);
}

const fallbackFaqsById = new Map<string, ProductFaq[]>();
initialProducts.forEach((product: any) => {
  const productFaqs = Array.isArray(product.faqs) && product.faqs.length > 0
    ? product.faqs
    : extractFallbackFaqs(product.longDesc);
  if (productFaqs.length > 0) fallbackFaqsById.set(product.id, productFaqs);
  (product.subCategories || []).forEach((variant: any) => {
    const variantFaqs = Array.isArray(variant.faqs) && variant.faqs.length > 0
      ? variant.faqs
      : extractFallbackFaqs(variant.longDesc);
    if (variantFaqs.length > 0) fallbackFaqsById.set(variant.id || variant.slug, variantFaqs);
  });
});

function sanitizeProduct(value: any) {
  const product = typeof value?.toObject === "function" ? value.toObject() : { ...value };
  delete product.applicationSlots;
  delete product.thicknessLengthMatrix;
  delete product.options;
  return product;
}

function withStaticFallbackFaqs(value: any) {
  const product = typeof value?.toObject === "function" ? value.toObject() : { ...value };
  if ((!Array.isArray(product.faqs) || product.faqs.length === 0) && fallbackFaqsById.has(product.id)) {
    product.faqs = fallbackFaqsById.get(product.id);
  }
  return sanitizeProduct(product);
}

function nestedProductView(parentValue: any, subProduct: any, requestedId: string) {
  const parent = typeof parentValue?.toObject === "function" ? parentValue.toObject() : parentValue;
  const sub = typeof subProduct?.toObject === "function" ? subProduct.toObject() : subProduct;
  return sanitizeProduct({
    ...sub,
    id: sub.id || sub.slug || requestedId,
    title: sub.title,
    category: parent.category,
    subCategoryId: parent.id,
    tag: sub.subtitle || parent.tag,
    blurb: sub.blurb || parent.blurb,
    longDesc: sub.longDesc || sub.blurb || "",
    image: sub.image || parent.image,
    gallery: Array.isArray(sub.gallery) && sub.gallery.length > 0
      ? sub.gallery
      : [sub.image || parent.image].filter(Boolean),
    specs: sub.specs || {},
    applications: sub.applications || [],
    features: sub.features || [],
    faqs: sub.faqs || [],
    status: parent.status || "published",
    isNestedVariant: true,
    parentProductId: parent.id,
  });
}

// GET /api/products — the database is authoritative whenever it is reachable.
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    try {
      await connectDB();
      const query = isAdminRequest(req)
        ? { id: { $nin: Array.from(RETIRED_PRODUCT_IDS) } }
        : { id: { $nin: Array.from(RETIRED_PRODUCT_IDS) }, status: "published" };
      const dbProducts = await Product.find(query).sort({ sortOrder: 1, createdAt: 1 });
      res.json(dbProducts.map(sanitizeProduct));
    } catch (dbErr) {
      console.warn("DB connection failed in products GET, falling back to static contents:", dbErr);
      const fallbackProducts = initialProducts.filter((product) =>
        !RETIRED_PRODUCT_IDS.has(product.id) && (isAdminRequest(req) || isPublicProduct(product))
      );
      res.json(fallbackProducts.map(withStaticFallbackFaqs));
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products — protected; creates new product
router.post("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const {
      applicationSlots: _removedApplicationSlots,
      thicknessLengthMatrix: _removedMatrix,
      options: _removedOptions,
      ...body
    } = req.body;

    if (typeof body.title !== "string" || !body.title.trim()) {
      res.status(400).json({ error: "Product title is required" });
      return;
    }

    if (!body.id) {
      body.id = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const newProduct = await Product.create(body);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(error?.code === 11000 ? 409 : 500).json({
      error: error?.code === 11000 ? "A product with this slug already exists" : error.message,
    });
  }
});

// GET /api/products/:id — a missing DB record stays missing; fallback is only for DB outages.
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    const id = String(req.params.id);

    if (RETIRED_PRODUCT_IDS.has(id)) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    try {
      await connectDB();
      const product = await Product.findOne({ id });
      if (product && (isAdminRequest(req) || isPublicProduct(product))) {
        res.json(sanitizeProduct(product));
        return;
      }

      if (product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const parentProduct = await Product.findOne({
        $or: [{ "subCategories.id": id }, { "subCategories.slug": id }],
      });
      if (parentProduct && (isAdminRequest(req) || isPublicProduct(parentProduct))) {
        const parent = parentProduct.toObject() as any;
        const subProduct = (parent.subCategories || []).find(
          (sub: any) => sub.id === id || sub.slug === id
        );
        if (subProduct) {
          res.json(nestedProductView(parent, subProduct, String(id)));
          return;
        }
      }
      res.status(404).json({ error: "Product not found" });
      return;
    } catch (dbErr) {
      console.warn("DB connection failed in product GET; using emergency static fallback:", dbErr);
    }

    // Emergency fallback only when the database connection fails.
    let fallbackProduct = initialProducts.find((p) => p.id === id);
    if (!fallbackProduct || (!isAdminRequest(req) && !isPublicProduct(fallbackProduct))) {
      const parentWithSub = initialProducts.find((p) =>
        p.subCategories?.some((s: any) => s.id === id || s.slug === id)
      );
      if (parentWithSub && parentWithSub.subCategories) {
        const sub = (parentWithSub.subCategories as any[]).find((s: any) => s.id === id || s.slug === id) as any;
        if (sub) {
          fallbackProduct = {
            id: sub.id || id,
            title: sub.title,
            category: parentWithSub.category,
            tag: sub.subtitle || parentWithSub.tag,
            blurb: sub.blurb || parentWithSub.blurb,
            longDesc: sub.longDesc || sub.blurb || parentWithSub.longDesc,
            image: sub.image || parentWithSub.image,
            gallery: [sub.image || parentWithSub.image, ...((parentWithSub as any).gallery || [])],
            specs: sub.specs || (parentWithSub as any).specs,
            applications: sub.applications || (parentWithSub as any).applications,
          } as any;
        }
      }
    }

    if (!fallbackProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(withStaticFallbackFaqs(fallbackProduct));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:id — protected; update by id field
router.put("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      applicationSlots: _removedApplicationSlots,
      thicknessLengthMatrix: _removedMatrix,
      options: _removedOptions,
      ...body
    } = req.body;
    await connectDB();
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { $set: body, $unset: { applicationSlots: 1, thicknessLengthMatrix: 1, options: 1 } },
      { new: true }
    );
    if (updatedProduct) {
      res.json(updatedProduct);
      return;
    }

    const parentProduct = await Product.findOne({
      $or: [{ "subCategories.id": id }, { "subCategories.slug": id }],
    });
    if (!parentProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const variants = (parentProduct as any).subCategories as any[];
    const subProduct = variants.find((sub: any) => sub.id === id || sub.slug === id);
    if (!subProduct) {
      res.status(404).json({ error: "Nested product not found" });
      return;
    }
    const editableFields = ["title", "blurb", "longDesc", "image", "gallery", "specs", "applications", "features", "faqs"];
    editableFields.forEach((field) => {
      if (body[field] !== undefined) subProduct[field] = body[field];
    });
    if (body.id) subProduct.id = body.id;
    if (body.tag !== undefined) subProduct.subtitle = body.tag;
    await parentProduct.save();
    res.json(nestedProductView(parentProduct, subProduct, body.id || id));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/products/:id — protected; hard-delete by id field
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await connectDB();
    const deletedProduct = await Product.findOneAndDelete({ id });
    if (deletedProduct) {
      await Product.updateMany(
        { $or: [{ "subCategories.id": id }, { "subCategories.slug": id }] },
        { $pull: { subCategories: { $or: [{ id }, { slug: id }] } } }
      );
    } else {
      const parentProduct = await Product.findOne({
        $or: [{ "subCategories.id": id }, { "subCategories.slug": id }],
      });
      if (!parentProduct) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      (parentProduct as any).subCategories = ((parentProduct as any).subCategories || []).filter(
        (sub: any) => sub.id !== id && sub.slug !== id
      );
      await parentProduct.save();
    }
    await Category.updateMany(
      {},
      { $pull: { "subcategories.$[].items": { slug: id } } }
    );
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
