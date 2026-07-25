import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Product } from "../models";
import { initialProducts } from "../fallback-data";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/products — public; auto-seeds if empty; falls back to initialProducts on DB failure
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const reseed = req.query.reseed === "true";

    try {
      await connectDB();

      if (reseed) {
        await Product.deleteMany({});
      }

      let dbProducts = await Product.find({}).sort({ createdAt: -1 });

      if (dbProducts.length === 0) {
        await Product.insertMany(initialProducts);
        dbProducts = await Product.find({}).sort({ createdAt: -1 });
      }

      res.json(dbProducts);
    } catch (dbErr) {
      console.warn("DB connection failed in products GET, falling back to static contents:", dbErr);
      res.json(initialProducts);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products — protected; creates new product
router.post("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const body = { ...req.body };

    if (!body.id) {
      body.id = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const newProduct = await Product.create(body);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id — public; looks up by id field; falls back to initialProducts
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    try {
      await connectDB();
      const product = await Product.findOne({ id });
      if (product) {
        res.json(product);
        return;
      }
    } catch (dbErr) {
      console.warn("DB connection failed in product GET, falling back to static contents:", dbErr);
    }

    // Fallback if DB is disconnected/fails or product not found in DB
    const fallbackProduct = initialProducts.find((p) => p.id === id);
    if (!fallbackProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(fallbackProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:id — protected; update by id field
router.put("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await connectDB();
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(updatedProduct);
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
    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
