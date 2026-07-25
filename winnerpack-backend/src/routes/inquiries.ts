import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Inquiry } from "../models";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/inquiries — public; creates new inquiry (contact form)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json(newInquiry);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/inquiries — protected; list all inquiries sorted newest first
router.get("/", requireAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/inquiries/:id — protected; update inquiry (e.g. status change)
router.patch("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/inquiries/:id — protected; hard-delete inquiry
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
