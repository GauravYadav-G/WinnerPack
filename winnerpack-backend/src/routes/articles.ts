import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Article } from "../models";
import { initialArticles } from "../fallback-data";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/articles — public; auto-seeds if empty; falls back to initialArticles on DB failure
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const reseed = req.query.reseed === "true";

    try {
      await connectDB();

      if (reseed) {
        await Article.deleteMany({});
      }

      let articles = await Article.find({}).sort({ createdAt: -1 });

      if (articles.length === 0) {
        await Article.insertMany(initialArticles);
        articles = await Article.find({}).sort({ createdAt: -1 });
      }

      res.json(articles);
    } catch (dbErr) {
      console.warn("DB connection failed in articles GET, using fallback mock data:", dbErr);
      res.json(initialArticles);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/articles — protected; creates new article
router.post("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const body = { ...req.body };

    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const newArticle = await Article.create(body);
    res.status(201).json(newArticle);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/articles — protected; updates by _id in body
router.put("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const { _id, ...updateData } = req.body;

    if (!_id) {
      res.status(400).json({ error: "Missing article ID" });
      return;
    }

    const updated = await Article.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updated) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/articles?id=<id> — protected; deletes by query param
router.delete("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id as string | undefined;

    if (!id) {
      res.status(400).json({ error: "Missing article ID" });
      return;
    }

    await connectDB();
    const deleted = await Article.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
