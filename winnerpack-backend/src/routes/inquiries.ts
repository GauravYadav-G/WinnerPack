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

// Classic Table Structured Email HTML Generator
function generateCleanEmailHtml(
  inquiry: any,
  matchedProduct: any = null
) {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const leadId = `WP-${Math.floor(100000 + Math.random() * 900000)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WinnerPack - Website Inquiry</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, p, a { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Document Table -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 22px 30px; background-color: #0f172a; color: #ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <div style="font-size: 16px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                      Winner Pack Technologies
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
                      Website Lead Notification
                    </div>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-size: 11px; color: #e2e8f0; background-color: rgba(255,255,255,0.12); padding: 4px 10px; border-radius: 4px; font-weight: 600;">
                      Ref #${leadId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Table Content Section -->
          <tr>
            <td style="padding: 30px;">
              
              <div style="font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                Inquiry Details
              </div>

              <!-- Main Structured Data Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; width: 100%; border: 1px solid #e2e8f0; font-size: 13px;">
                
                <!-- Row 1: Name -->
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    Customer Name
                  </td>
                  <td style="padding: 12px 16px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${inquiry.name || "N/A"}
                  </td>
                </tr>

                <!-- Row 2: Company -->
                <tr style="background-color: #ffffff;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    Company / Organization
                  </td>
                  <td style="padding: 12px 16px; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${inquiry.company || "Individual Buyer"}
                  </td>
                </tr>

                <!-- Row 3: Email -->
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    Email Address
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${inquiry.email}" style="color: #0284c7; text-decoration: underline; font-weight: 600;">
                      ${inquiry.email || "N/A"}
                    </a>
                  </td>
                </tr>

                <!-- Row 4: Phone -->
                <tr style="background-color: #ffffff;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    Phone Number
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
                    <a href="tel:${inquiry.phone}" style="color: #0f172a; text-decoration: none; font-weight: 600;">
                      ${inquiry.phone || "N/A"}
                    </a>
                  </td>
                </tr>

                <!-- Row 5: Product -->
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    Product / SKU
                  </td>
                  <td style="padding: 12px 16px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${inquiry.skuProfile || (matchedProduct ? matchedProduct.title : "General Inquiry")}
                  </td>
                </tr>

                <!-- Row 6: Quantity / Volume -->
                <tr style="background-color: #ffffff;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    Required Volume
                  </td>
                  <td style="padding: 12px 16px; color: #334155; border-bottom: 1px solid #e2e8f0;">
                    ${inquiry.lineSpeed || "Not Specified"}
                  </td>
                </tr>

                <!-- Row 7: Message -->
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; vertical-align: top; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    Message / Requirement
                  </td>
                  <td style="padding: 12px 16px; color: #334155; line-height: 1.6; border-bottom: 1px solid #e2e8f0;">
                    ${inquiry.message || "No additional message provided."}
                  </td>
                </tr>

                <!-- Row 8: Timestamp -->
                <tr style="background-color: #ffffff;">
                  <td style="padding: 12px 16px; font-weight: 700; color: #475569; border-right: 1px solid #e2e8f0;">
                    Submission Date & Time
                  </td>
                  <td style="padding: 12px 16px; color: #64748b;">
                    ${timestamp} IST
                  </td>
                </tr>

              </table>

              <!-- Action Bar -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px;">
                <tr>
                  <td>
                    <a href="mailto:${inquiry.email}?subject=Regarding%20your%20inquiry%20with%20WinnerPack%20Technologies" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 10px 20px; border-radius: 4px;">
                      Reply to ${inquiry.name || "Customer"} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="color: #64748b;">
                    Winner Pack Technologies Pvt. Ltd. &bull; <a href="https://winnerpack.in" style="color: #64748b; text-decoration: none;">www.winnerpack.in</a>
                  </td>
                  <td align="right" style="color: #94a3b8;">
                    info@winnerpack.in
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
