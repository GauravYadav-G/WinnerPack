import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Article } from "../models";
import { initialArticles } from "../fallback-data";
import { requireAuth } from "../middleware/auth";
import { isValidSession } from "../session";

const router = Router();

// GET /api/articles — the database is authoritative whenever it is reachable.
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    try {
      await connectDB();

      const articles = await Article.find(
        isValidSession(req.cookies?.admin_session) ? {} : { status: "published" }
      ).sort({ createdAt: -1 });
      res.json(articles);
    } catch (dbErr) {
      console.warn("DB connection failed in articles GET, using fallback mock data:", dbErr);
      res.json(initialArticles.filter((article: any) =>
        isValidSession(req.cookies?.admin_session) || !article.status || article.status === "published"
      ));
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/articles/:slug — fallback is used only when the database is unavailable.
router.get("/:slug", async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    try {
      await connectDB();
      const article = await Article.findOne({
        $or: [{ slug }, ...(slug.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: slug }] : [])],
      });

      if (article && (isValidSession(req.cookies?.admin_session) || !article.status || article.status === "published")) {
        res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
        res.json(article);
        return;
      }

      if (article) {
        res.status(404).json({ error: "Article not found" });
        return;
      }

      res.status(404).json({ error: "Article not found" });
      return;
    } catch (dbErr) {
      console.warn("DB connection failed in article GET by slug, using static fallback:", dbErr);
    }

    const fallback = initialArticles.find((a) => a.slug === slug);
    if (fallback && (isValidSession(req.cookies?.admin_session) || !(fallback as any).status || (fallback as any).status === "published")) {
      res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      res.json(fallback);
      return;
    }

    res.status(404).json({ error: "Article not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/articles — protected; creates new article
router.post("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const body = { ...req.body };

    if (typeof body.title !== "string" || !body.title.trim()) {
      res.status(400).json({ error: "Article title is required" });
      return;
    }

    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const newArticle = await Article.create(body);
    res.status(201).json(newArticle);
  } catch (error: any) {
    res.status(error?.code === 11000 ? 409 : 500).json({
      error: error?.code === 11000 ? "An article with this slug already exists" : error.message,
    });
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

    const updated = await Article.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    if (!updated) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    res.json(updated);
  } catch (error: any) {
    res.status(error?.code === 11000 ? 409 : 500).json({
      error: error?.code === 11000 ? "An article with this slug already exists" : error.message,
    });
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
