import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { requireAuth } from "../middleware/auth";

const router = Router();

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

// Hold the file briefly in memory so only the optimized asset reaches disk.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    cb(null, ACCEPTED_IMAGE_TYPES.has(file.mimetype));
  },
});

// POST /api/upload — protected; saves file and returns its public URL
router.post(
  "/",
  requireAuth,
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "Upload a JPEG, PNG, WebP, or AVIF image up to 10 MB." });
        return;
      }

      const baseName = path
        .basename(req.file.originalname, path.extname(req.file.originalname))
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || "image";
      const filename = `${Date.now()}-${baseName}.webp`;

      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await sharp(req.file.buffer, { limitInputPixels: 40_000_000 })
        .rotate()
        .resize({ width: 2400, withoutEnlargement: true })
        .webp({ quality: 82, smartSubsample: true })
        .toFile(path.join(UPLOAD_DIR, filename));

      const host = req.get("host");
      if (!host) {
        throw new Error("Could not determine the upload host.");
      }

      res.json({
        success: true,
        url: `${req.protocol}://${host}/uploads/${filename}`,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Return Multer errors (including size-limit failures) as safe client messages.
router.use((error: unknown, _req: Request, res: Response, _next: () => void) => {
  if (error instanceof multer.MulterError) {
    res.status(400).json({ error: "Image upload failed. Maximum size is 10 MB." });
    return;
  }
  res.status(400).json({ error: "Upload a JPEG, PNG, WebP, or AVIF image." });
});

export default router;
