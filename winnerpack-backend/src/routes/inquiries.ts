import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Inquiry, Product } from "../models";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/inquiries — public; creates new inquiry (contact form)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const newInquiry = await Inquiry.create(req.body);

    // Look up product matching skuProfile if present
    let matchedProduct: any = null;
    if (newInquiry.skuProfile) {
      matchedProduct = await Product.findOne({
        $or: [
          { id: newInquiry.skuProfile },
          { title: new RegExp(newInquiry.skuProfile.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
        ],
      });
    }

    // Forward to Form Submission API (directly delivers lead to inbox)
    const targetEmail = process.env.SMTP_TO || "info@winnerpack.in";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    try {
      fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://winnerpack.in",
          Referer: "https://winnerpack.in",
        },
        body: JSON.stringify({
          _subject: `New Website Lead: ${newInquiry.name} - ${newInquiry.company || "Direct"}`,
          _template: "table",
          _captcha: "false",
          "Customer Name": newInquiry.name,
          "Company": newInquiry.company || "N/A",
          "Email": newInquiry.email,
          "Phone": newInquiry.phone,
          "Product / Inquiry": newInquiry.skuProfile || (matchedProduct ? matchedProduct.title : "General Inquiry"),
          "Quantity / Volume": newInquiry.lineSpeed || "Not Specified",
          "Message": newInquiry.message || "N/A",
          "Date & Time": `${timestamp} IST`,
        }),
      })
        .then((resp) => resp.json())
        .then((result) => {
          console.log(`✅ Form submission API dispatched to ${targetEmail}:`, result?.message || "Success");
        })
        .catch((err) => {
          console.warn("⚠️ Form submission API dispatch notice:", err.message);
        });
    } catch (apiErr: any) {
      console.warn("⚠️ Form submission API error:", apiErr.message);
    }

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

// PUT /api/inquiries — protected; update inquiry by _id in body or params
router.put("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const { _id, id, ...updateData } = req.body;
    const targetId = _id || id;

    if (!targetId) {
      res.status(400).json({ error: "Missing inquiry ID" });
      return;
    }

    const updated = await Inquiry.findByIdAndUpdate(targetId, updateData, { new: true });
    if (!updated) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }

    res.json(updated);
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

// DELETE /api/inquiries — protected; delete by query param or body
router.delete("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = (req.query.id as string) || req.body._id;

    if (!id) {
      res.status(400).json({ error: "Missing inquiry ID" });
      return;
    }

    await connectDB();
    await Inquiry.findByIdAndDelete(id);
    res.json({ success: true });
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
