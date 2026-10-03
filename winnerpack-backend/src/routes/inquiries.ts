import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Inquiry, Product } from "../models";
import { requireAuth } from "../middleware/auth";
import { createRateLimit } from "../middleware/rate-limit";

const router = Router();
const inquiryRateLimit = createRateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many inquiries. Please try again later.",
});

const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  skuProfile: 160,
  lineSpeed: 120,
  message: 5_000,
} as const;

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

// POST /api/inquiries — public; creates new inquiry (contact form)
router.post("/", inquiryRateLimit, async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiryData = {
      name: cleanString(req.body?.name, LIMITS.name),
      email: cleanString(req.body?.email, LIMITS.email).toLowerCase(),
      phone: cleanString(req.body?.phone, LIMITS.phone),
      company: cleanString(req.body?.company, LIMITS.company) || "N/A",
      skuProfile: cleanString(req.body?.skuProfile, LIMITS.skuProfile) || "General Inquiry",
      lineSpeed: cleanString(req.body?.lineSpeed, LIMITS.lineSpeed) || "Not Specified",
      message: cleanString(req.body?.message, LIMITS.message) || "N/A",
    };

    if (
      inquiryData.name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryData.email) ||
      !/^[+\d][\d\s().-]{6,39}$/.test(inquiryData.phone)
    ) {
      res.status(400).json({ error: "Enter a valid name, email address and phone number." });
      return;
    }

    await connectDB();
    const newInquiry = await Inquiry.create(inquiryData);

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
    const allowedStatuses = new Set(["Pending", "Contacted", "Quoted", "Completed", "Spam"]);
    if (req.body.status !== undefined && !allowedStatuses.has(req.body.status)) {
      res.status(400).json({ error: "Invalid inquiry status" });
      return;
    }
    await connectDB();
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }
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
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/inquiries/:id — protected; hard-delete inquiry
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    await connectDB();
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
