import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Inquiry, Product } from "../models";
import { requireAuth } from "../middleware/auth";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

const router = Router();

// Path to frontend public directory
const PUBLIC_DIR = path.resolve(__dirname, "../../..", "winnerpack-frontend/public");

// Helper to create transport (Real SMTP or Ethereal Test Account)
async function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Ethereal Email — Free auto test account for zero-config local testing
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

// Clean Email HTML Generator using CID attachments
function generateCleanEmailHtml(
  inquiry: any,
  matchedProduct: any = null,
  hasLogoAttachment: boolean = false,
  hasProductAttachment: boolean = false
) {
  const logoSrc = hasLogoAttachment ? "cid:winnerpack-logo" : "http://localhost:3000/logo.png";
  const productImgSrc = hasProductAttachment
    ? "cid:product-preview"
    : matchedProduct?.image
    ? matchedProduct.image.startsWith("http")
      ? matchedProduct.image
      : `http://localhost:3000${matchedProduct.image.startsWith("/") ? "" : "/"}${matchedProduct.image}`
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - WinnerPack</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
    .card { max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .logo-container { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; margin-bottom: 20px; }
    .logo-img { max-height: 48px; width: auto; display: inline-block; }
    .brand-fallback { font-size: 22px; font-weight: bold; color: #120a3b; }
    .brand-highlight { color: #fe8220; }
    .heading { font-size: 18px; font-weight: bold; color: #0f172a; margin-bottom: 16px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .label { font-weight: bold; color: #475569; width: 130px; }
    .value { color: #0f172a; }
    .product-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 20px 0; text-align: center; }
    .product-tag { font-size: 11px; font-weight: bold; color: #fe8220; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
    .product-img { max-height: 160px; max-width: 100%; object-fit: contain; border-radius: 8px; margin-bottom: 10px; background-color: #ffffff; padding: 8px; border: 1px solid #e2e8f0; }
    .product-title { font-size: 15px; font-weight: bold; color: #0f172a; }
    .product-price { font-size: 13px; font-weight: bold; color: #475569; margin-top: 4px; }
    .message-box { background-color: #fff8f3; border-left: 4px solid #fe8220; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 14px; color: #334155; margin-bottom: 24px; line-height: 1.5; }
    .btn-container { text-align: center; margin-top: 24px; }
    .reply-btn { display: inline-block; background-color: #fe8220; color: #ffffff; text-decoration: none; font-weight: bold; padding: 12px 28px; border-radius: 8px; font-size: 14px; }
    .footer { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <!-- Brand Logo Header -->
    <div class="logo-container">
      <img src="${logoSrc}" alt="WinnerPack" class="logo-img" />
    </div>

    <!-- Inquiry Heading -->
    <div class="heading">New Customer Inquiry</div>

    <!-- Lead Info Table -->
    <table class="info-table">
      <tr>
        <td class="label">Name:</td>
        <td class="value"><strong>${inquiry.name || "N/A"}</strong></td>
      </tr>
      <tr>
        <td class="label">Company:</td>
        <td class="value"><strong>${inquiry.company || "N/A"}</strong></td>
      </tr>
      <tr>
        <td class="label">Email:</td>
        <td class="value"><a href="mailto:${inquiry.email}" style="color: #fe8220; text-decoration: none;">${inquiry.email}</a></td>
      </tr>
      <tr>
        <td class="label">Phone:</td>
        <td class="value"><a href="tel:${inquiry.phone}" style="color: #0f172a; text-decoration: none;">${inquiry.phone}</a></td>
      </tr>
      ${inquiry.skuProfile ? `
      <tr>
        <td class="label">SKU / Product:</td>
        <td class="value">${inquiry.skuProfile}</td>
      </tr>
      ` : ""}
      ${inquiry.lineSpeed ? `
      <tr>
        <td class="label">Line Speed:</td>
        <td class="value">${inquiry.lineSpeed}</td>
      </tr>
      ` : ""}
    </table>

    <!-- Product Image & Details Preview (If matched) -->
    ${matchedProduct ? `
    <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/products/${matchedProduct.id}" target="_blank" style="text-decoration: none; color: inherit; display: block;">
      <div class="product-box" style="border: 1px solid #cbd5e1; hover:border-[#fe8220]; transition: all 0.2s ease;">
        <div class="product-tag">Requested Product Preview (Click to View Live) →</div>
        ${productImgSrc ? `<img src="${productImgSrc}" alt="${matchedProduct.title}" class="product-img" />` : ""}
        <div class="product-title" style="color: #2563eb; text-decoration: underline;">${matchedProduct.title}</div>
      </div>
    </a>
    ` : ""}

    <!-- Customer Message Box -->
    ${inquiry.message ? `
    <div class="message-box">
      <strong style="color: #c2410c;">Customer Note:</strong><br/>
      "${inquiry.message}"
    </div>
    ` : ""}

    <!-- Action Reply Button -->
    <div class="btn-container">
      <a href="mailto:${inquiry.email}" class="reply-btn">Reply to Customer →</a>
    </div>

    <div class="footer">
      WinnerPack Industrial Packaging Lead System
    </div>
  </div>
</body>
</html>
  `;
}

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
          { title: new RegExp(newInquiry.skuProfile, "i") },
        ],
      });
    }

    // Build CID inline attachments array
    const attachments: any[] = [];
    let hasLogoAttachment = false;
    let hasProductAttachment = false;

    // 1. Attach Logo
    const logoPath = path.join(PUBLIC_DIR, "logo.png");
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "logo.png",
        path: logoPath,
        cid: "winnerpack-logo",
      });
      hasLogoAttachment = true;
    }

    // 2. Attach Product Preview Image
    if (matchedProduct && matchedProduct.image) {
      const relImagePath = matchedProduct.image.startsWith("/")
        ? matchedProduct.image.slice(1)
        : matchedProduct.image;
      const productPath = path.join(PUBLIC_DIR, relImagePath);

      if (fs.existsSync(productPath)) {
        attachments.push({
          filename: "product-preview.png",
          path: productPath,
          cid: "product-preview",
        });
        hasProductAttachment = true;
      }
    }

    // Send clean HTML email notification
    getTransporter()
      .then(async (transporter) => {
        const htmlBody = generateCleanEmailHtml(
          newInquiry,
          matchedProduct,
          hasLogoAttachment,
          hasProductAttachment
        );

        const info = await transporter.sendMail({
          from: '"WinnerPack Inquiry" <no-reply@winnerpack.in>',
          to: process.env.SMTP_TO || "info@winnerpack.in",
          subject: `📩 New Lead: ${newInquiry.name} (${newInquiry.company})`,
          html: htmlBody,
          attachments: attachments,
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log("\n==================================================");
          console.log("📧 CID EMBEDDED TEST EMAIL PREVIEW LINK:");
          console.log(previewUrl);
          console.log("==================================================\n");
        } else {
          console.log(`✅ Email sent to ${process.env.SMTP_TO || "info@winnerpack.in"}`);
        }
      })
      .catch((emailErr) => {
        console.warn("⚠️ Email notification failed (inquiry saved to DB):", emailErr.message);
      });

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
