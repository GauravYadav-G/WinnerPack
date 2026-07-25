import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Content } from "../models";
import { fallbackData } from "../fallback-data";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/content?key= — public; falls back to fallbackData; preserves Cache-Control header
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const key = (req.query.key as string) || "homepage";

    try {
      await connectDB();
      const contentDoc = await Content.findOne({ key });
      if (contentDoc) {
        res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
        res.json(contentDoc.data);
        return;
      }
    } catch (dbErr) {
      console.warn("DB connection failed, falling back to static contents:", dbErr);
    }

    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.json(fallbackData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/content — protected; upserts content by key
router.post("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { key, data } = req.body;

    if (!key || !data) {
      res.status(400).json({ error: "Missing key or data" });
      return;
    }

    await connectDB();
    const updated = await Content.findOneAndUpdate(
      { key },
      { data },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated!.data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
