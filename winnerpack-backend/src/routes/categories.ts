import { Router, Request, Response } from "express";
import { Category, Product } from "../models";
import { connectDB } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

async function withExistingProductsOnly(categories: any[]) {
  const products = await Product.find({}, { id: 1, "subCategories.id": 1 }).lean();
  const productIds = new Set<string>();
  products.forEach((product: any) => {
    if (product.id) productIds.add(product.id);
    (product.subCategories || []).forEach((variant: any) => {
      if (variant.id) productIds.add(variant.id);
    });
  });
  return categories.map((category: any) => ({
    ...category,
    subcategories: (category.subcategories || [])
      .map((subcategory: any) => ({
        ...subcategory,
        items: (subcategory.items || []).filter((item: any) => productIds.has(item.slug)),
      }))
      .filter((subcategory: any) => productIds.has(subcategory.id) || subcategory.items.length > 0),
  }));
}

// Fallback initial categories if collection is empty
export const defaultCategories = [
  {
    id: "film-products",
    title: "Film Products",
    catSlug: "film-products",
    tag: "Shrink Films · Stretch Wrap · Barrier Pouches",
    blurb: "High-cling POF shrink wrap, collation LDPE, and machine-grade stretch films designed to secure loads and protect products.",
    image: "/images/categories/film-products-v2.webp",
    gradient: "from-sky-400/20 to-blue-500/10",
    sortOrder: 1,
    subcategories: [
      {
        id: "packaging-films",
        title: "Packaging Films",
        slug: "packaging-films",
        image: "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.webp",
        blurb: "Multi-purpose polyethylene packaging and collation shrink films.",
        items: [
          { name: "LDPE Shrink Film", slug: "ldpe-shrink-film" },
          { name: "PE Liners And Garbage Bags", slug: "pe-liners-garbage-bags" },
          { name: "Plastic Stretch Film", slug: "plastic-stretch-film" },
          { name: "Collation Shrink Film", slug: "collation-shrink-film" },
        ],
      },
      {
        id: "pof-shrink-film",
        title: "POF Shrink Film",
        slug: "pof-shrink-film",
        image: "/images/products/cross-linked-pof/cross-linked-pof.webp",
        blurb: "High-clarity polyolefin films engineered for retail multi-packs.",
        items: [
          { name: "Cross-Linked POF Film", slug: "cross-linked-pof" },
          { name: "Non-Cross-Linked POF Film", slug: "non-cross-linked-pof-film" },
        ],
      },
      {
        id: "lamination-pe-film",
        title: "Lamination PE Film",
        slug: "lamination-pe-film",
        image: "/images/products/adhesive-lamination-film/adhesive-lamination-film.webp",
        blurb: "Specialized sealant layers for flexible packaging converters.",
        items: [
          { name: "Adhesive Lamination Film", slug: "adhesive-lamination-film" },
          { name: "Pharma Grade Poly", slug: "pharma-grade-poly" },
        ],
      },
      {
        id: "agricultural-films",
        title: "Agricultural Films",
        slug: "agricultural-films",
        image: "/images/products/plastic-mulching-film/plastic-mulching-film.webp",
        blurb: "UV-stabilized mulching and low tunnel films for crop protection.",
        items: [
          { name: "Plastic Mulching Film", slug: "plastic-mulching-film" },
          { name: "Low Tunnel Film", slug: "low-tunnel-film" },
          { name: "Mulch Film", slug: "mulch-film" },
        ],
      },
      {
        id: "biodegradable-films",
        title: "Biodegradable Films",
        slug: "biodegradable-films",
        image: "/images/products/biodegradable-shrink-film/biodegradable-shrink-film.webp",
        blurb: "Eco-friendly compostable films meeting international bio standards.",
        items: [
          { name: "Bio Degradable Mulch Film", slug: "bio-degradable-mulch-film" },
          { name: "Biodegradable Shrink Film", slug: "biodegradable-shrink-film" },
          { name: "Biodegradable Shopping Bag", slug: "biodegradable-shopping-bag" },
        ],
      },
      {
        id: "flexible-laminate-rolls",
        title: "Flexible Laminate Rolls & Pouches",
        slug: "flexible-laminates",
        image: "/images/products/plain-standup-pouches/plain-standup-pouches.webp",
        blurb: "Barrier laminates and preformed pouches for food & pharmaceuticals.",
        items: [
          { name: "Agro Chemical Laminates", slug: "agro-chemical-laminates" },
          { name: "Plain Standup Pouches", slug: "plain-standup-pouches" },
          { name: "Lidding Foils And Laminates", slug: "lidding-foils-laminates" },
          { name: "Wrap Around Labels", slug: "wrap-around-labels" },
          { name: "Laminated Pouch India", slug: "laminated-pouch-india" },
          { name: "Polyester Laminated Roll", slug: "polyester-laminated-roll" },
          { name: "Multi Coloured Laminated Roll", slug: "multi-coloured-laminated-roll" },
          { name: "Food Packaging Laminates In Pouch And Roll Form", slug: "food-packaging-laminates" },
        ],
      },
      {
        id: "printed-pe-films",
        title: "Printed PE Films",
        slug: "printed-pe-films",
        image: "/images/products/milk-packaging-film/milk-packaging-film.webp",
        blurb: "High-speed flexo printed polyethylene rolls for liquid and dairy.",
        items: [
          { name: "Milk Pouch & Milk Packaging Film", slug: "milk-packaging-film" },
          { name: "Ghee Vanaspati Packaging Film", slug: "ghee-packaging-film" },
          { name: "SMP Packaging Film", slug: "smp-packaging-film" },
          { name: "Water Packaging Film", slug: "water-packaging-film" },
        ],
      },
      {
        id: "ldpe-bags",
        title: "LDPE Bags",
        slug: "ldpe-bags",
        image: "/images/products/ldpe-bags/pe-garbage-bags.webp",
        blurb: "Heavy duty garbage, courier, and soft loop handle bags.",
        items: [
          { name: "Antistatic Poly Bags", slug: "antistatic-poly-bags" },
          { name: "Biohazard Bags", slug: "biohazard-bags" },
          { name: "Black Refuse Sacks", slug: "black-refuse-sacks" },
          { name: "Clear Polythene Packing Bags", slug: "clear-polythene-packing-bags" },
          { name: "Ice Bags", slug: "ice-bags" },
          { name: "Plastic Dcut Bags", slug: "plastic-dcut-bags" },
          { name: "Polythene Clothing Packing Bags", slug: "polythene-clothing-packing-bags" },
          { name: "Grip Seal Bags", slug: "grip-seal-bags" },
          { name: "Poly Mailer Bags", slug: "poly-mailer-bags" },
          { name: "Plastic Bags with Hanger Hook", slug: "plastic-bags-hanger-hook" },
          { name: "Soft Loop Handle Bags", slug: "soft-loop-handle-bags" },
          { name: "Plastic Drawstring Bags", slug: "plastic-drawstring-bags" },
        ],
      },
      {
        id: "bopp-films",
        title: "BOPP Films",
        slug: "bopp-films",
        image: "/images/products/bopp-films-pouches/bopp-rolls.webp",
        blurb: "Biaxially oriented polypropylene films with exceptional gloss.",
        items: [
          { name: "BOPP Rolls", slug: "bopp-film-rolls" },
          { name: "BOPP Pouches", slug: "bopp-display-pouches" },
        ],
      },
      {
        id: "pvc-shrink-films",
        title: "PVC Shrink Films",
        slug: "pvc-shrink-films",
        image: "/images/products/pvc-shrink-rolls-pouches/pvc-shrink-rolls.webp",
        blurb: "Rigid shrink film rolls, pre-cut sleeves, and cap sealing bands.",
        items: [
          { name: "PVC Heat Shrink Rolls", slug: "pvc-heat-shrink-rolls" },
          { name: "PVC Shrink Pouches", slug: "pvc-shrink-pouches-sleeves" },
        ],
      },
    ],
    items: [
      "LDPE Films & Pouches",
      "POF Films & Pouches",
      "Coloured Films & Pouches",
      "BOPP Films & Pouches",
      "PVC Shrink Rolls & Pouches",
      "Stretch Film",
      "Lamination Films & Pouches",
      "Compostable Films & Pouches",
    ],
    seo: {
      metaTitle: "Industrial Packaging Films Manufacturer | WinnerPack Technologies",
      metaDescription: "Manufacturer of premium POF shrink film, LDPE shrink wrap, stretch films, and barrier laminates for industrial packaging.",
      keywords: ["shrink film", "stretch film", "packaging film", "POF film", "LDPE wrap"],
    },
  },
  {
    id: "label-sticker-products",
    title: "Labels & Stickers",
    catSlug: "label-sticker-products",
    tag: "Thermal Labels · Product Stickers · Barcodes · Ribbons · Holograms",
    blurb: "High-density thermal transfer barcode labels, printed product labels, and self-adhesive labels for retail and shipping.",
    image: "/images/categories/labels-stickers-v2.webp",
    gradient: "from-amber-400/20 to-orange-500/10",
    sortOrder: 2,
    subcategories: [
      { id: "plain-labels", title: "Plain Labels", slug: "plain-labels", image: "/images/products/plain-labels/plain-labels.webp", blurb: "Blank die-cut roll labels for direct thermal and thermal transfer printers.", items: [] },
      { id: "printed-labels", title: "Printed Labels", slug: "printed-labels", image: "/images/products/printed-labels/flexo-digital-printed-labels.webp", blurb: "Vibrant UV flexo and digital printed prime labels.", items: [] },
      { id: "barcode-labels", title: "Barcode Labels", slug: "barcode-labels", image: "/images/products/thermal-transfer-barcode-labels/thermal-transfer-barcode-labels.webp", blurb: "High-contrast GS1 compliant barcode tracking labels.", items: [] },
      { id: "product-labels", title: "Product Labels", slug: "product-labels", image: "/images/products/clear-metallic-product-labels/clear-metallic-product-labels.webp", blurb: "Clear, metallic, and specialty labels for bottles and containers.", items: [] },
      { id: "self-adhesive-labels", title: "Self Adhesive Labels", slug: "self-adhesive-labels", image: "/images/products/paper-self-adhesive-labels/paper-self-adhesive-labels.webp", blurb: "Pressure-sensitive permanent and removable sticker rolls.", items: [] },
      { id: "thermal-labels", title: "Thermal Labels", slug: "thermal-labels", image: "/images/products/direct-thermal-labels/direct-thermal-labels.webp", blurb: "Direct thermal paper labels for weigh-scale and courier dispatch.", items: [] },
      { id: "hologram-stickers", title: "Hologram Stickers", slug: "hologram-stickers", image: "/images/products/hologram-stickers/hologram-stickers.webp", blurb: "2D/3D custom security holograms to eliminate counterfeit risk.", items: [] },
      { id: "security-void-stickers", title: "Security Void Stickers", slug: "security-void-stickers", image: "/images/products/security-void-stickers/security-void-stickers.webp", blurb: "Tamper-evident VOID release labels for warranty and logistics.", items: [] },
      { id: "tamper-evident-stickers", title: "Tamper-Evident Stickers", slug: "tamper-evident-stickers", image: "/images/products/tamper-evident-stickers/tamper-evident-stickers.webp", blurb: "Destructible and ultra-adhesion security closure labels.", items: [] },
      { id: "thermal-transfer-ribbons", title: "Thermal Transfer Ribbons", slug: "thermal-transfer-ribbons", image: "/images/products/thermal-transfer-ribbons/thermal-transfer-ribbons.webp", blurb: "Premium Wax, Wax-Resin, and pure Resin barcode ribbons.", items: [] },
    ],
    items: [
      "Plain Labels",
      "Printed Labels",
      "Barcode Labels",
      "Product Labels",
      "Self Adhesive Labels",
      "Thermal Labels",
      "Hologram Stickers",
      "Security Void Stickers",
      "Tamper-Evident Stickers",
      "Thermal Transfer Ribbons",
    ],
    seo: {
      metaTitle: "Barcode Labels & Security Stickers Manufacturer | WinnerPack",
      metaDescription: "Manufacturer of custom printed product labels, plain barcode rolls, thermal transfer ribbons, and tamper-evident security stickers.",
      keywords: ["barcode labels", "thermal labels", "security stickers", "holograms", "ribbons"],
    },
  },
  {
    id: "tapes",
    title: "Tapes",
    catSlug: "tapes",
    tag: "BOPP Tapes · Custom Printed · Silicon Sealing",
    blurb: "High-tack BOPP sealing tapes, custom printed brand tapes, and specialty silicon tapes for secure industrial box closure.",
    image: "/images/categories/tapes-v2.webp",
    gradient: "from-emerald-400/20 to-teal-500/10",
    sortOrder: 3,
    subcategories: [
      { id: "bopp-tapes", title: "BOPP Tapes", slug: "bopp-tapes", image: "/images/products/bopp-tapes/bopp-tapes.webp", blurb: "Standard brown and transparent carton packing tapes.", items: [] },
      { id: "printed-bopp-tapes", title: "Printed BOPP Tapes", slug: "printed-bopp-tapes", image: "/images/products/printed-bopp-tapes/preprinted-warning-security-tapes.webp", blurb: "Custom logo printed and tamper-warning sealing tapes.", items: [] },
      { id: "coloured-bopp-tapes", title: "Coloured BOPP Tapes", slug: "coloured-bopp-tapes", image: "/images/products/coloured-bopp-tapes/secondary-security-colored-tapes.webp", blurb: "Color-coded identification tapes for inventory management.", items: [] },
      { id: "silicon-tapes", title: "Silicon Tapes", slug: "silicon-tapes", image: "/images/products/silicon-tapes/silicone-bag-sealing-tapes.webp", blurb: "High temperature and self-fusing silicone sealing tapes.", items: [] },
    ],
    items: [
      "BOPP Tapes",
      "Printed BOPP Tapes",
      "Coloured BOPP Tapes",
      "Silicon Tapes",
    ],
    seo: {
      metaTitle: "Industrial BOPP Tapes & Custom Printed Tapes | WinnerPack",
      metaDescription: "Factory direct BOPP packaging tape rolls, custom company branded tapes, colored carton sealing tape, and specialty silicon tapes.",
      keywords: ["BOPP tape", "printed tape", "colored tape", "box sealing tape"],
    },
  },
  {
    id: "others",
    title: "Others",
    catSlug: "pp-strap",
    tag: "Virgin PP Strap · PET Strapping · Custom Printed Strap",
    blurb: "High-tensile virgin polypropylene and PET strapping rolls engineered for heavy pallet unitization and zero feed jams.",
    image: "/images/categories/pp-pet-strapping-v2.webp",
    gradient: "from-violet-400/20 to-purple-500/10",
    sortOrder: 4,
    subcategories: [
      { id: "pp-strap-main", title: "PP Strap", slug: "pp-strap", image: "/images/products/pp-strap/image.webp", blurb: "Virgin polypropylene strapping for semi and fully automatic machines.", items: [] },
      { id: "printed-pp-strap", title: "Printed PP Strap", slug: "printed-pp-strap", image: "/images/products/printed-pp-strap/image.webp", blurb: "Company branded and security printed strapping rolls.", items: [] },
      { id: "colored-pp-strap", title: "Colored PP Strap", slug: "colored-pp-strap", image: "/images/products/colored-pp-strap/image.webp", blurb: "Vibrant yellow, blue, green, and red strapping rolls.", items: [] },
      { id: "pet-strap", title: "PET Strap", slug: "pet-strap", image: "/images/products/pet-strap/image.webp", blurb: "Heavy duty polyester strap replacing steel band for pallet containment.", items: [] },
    ],
    items: [
      "PP Strap",
      "Printed PP Strap",
      "Colored PP Strap",
      "PET Strap",
    ],
    seo: {
      metaTitle: "High Tensile PP & PET Strapping Rolls | WinnerPack",
      metaDescription: "Manufacturer of high tensile virgin PP strap rolls, heavy duty PET strapping, and custom printed strapping bands for automated bundling lines.",
      keywords: ["PP strap", "PET strap", "strapping roll", "pallet strapping", "polypropylene strap"],
    },
  },
];

// GET /api/categories — List all category collections
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ sortOrder: 1 }).lean();
    res.json(await withExistingProductsOnly(categories));
  } catch (error: any) {
    // If DB fails, fallback to default static data
    res.json(defaultCategories);
  }
});

// GET /api/categories/:id — Single category by id or slug
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const { id } = req.params;
    const category = await Category.findOne({
      $or: [{ id }, { catSlug: id }],
    }).lean();

    if (category) {
      const [sanitized] = await withExistingProductsOnly([category]);
      res.json(sanitized);
      return;
    }
    res.status(404).json({ error: "Category collection not found" });
  } catch (error: any) {
    const fallback = defaultCategories.find(
      (c) => c.id === req.params.id || c.catSlug === req.params.id
    );
    if (fallback) {
      res.json(fallback);
      return;
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/categories/:id — Update category collection
router.put("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const { id } = req.params;
    const updates = req.body;

    const category = await Category.findOneAndUpdate(
      { $or: [{ id }, { catSlug: id }] },
      { $set: updates },
      { new: true, upsert: true }
    );

    res.json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/categories/:id — Partial update
router.patch("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const { id } = req.params;
    const updates = req.body;

    const category = await Category.findOneAndUpdate(
      { $or: [{ id }, { catSlug: id }] },
      { $set: updates },
      { new: true }
    );

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/categories/reset-defaults — Reset all categories to latest default navbar hierarchy
router.post("/reset-defaults", requireAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    for (const cat of defaultCategories) {
      await Category.findOneAndUpdate(
        { $or: [{ id: cat.id }, { catSlug: cat.catSlug }] },
        { $set: cat },
        { upsert: true, new: true }
      );
    }
    const all = await Category.find({}).sort({ sortOrder: 1 }).lean();
    res.json({ success: true, count: all.length, categories: all });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
