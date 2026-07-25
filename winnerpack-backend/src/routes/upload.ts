import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Multer storage: save to public/uploads/ in the backend project root
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), "public", "uploads"));
  },
  filename: (_req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const filename = `${Date.now()}-${sanitizedFilename}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// POST /api/upload — protected; saves file and returns its public URL
router.post(
  "/",
  requireAuth,
  upload.single("file"),
  (req: Request, res: Response): void => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      res.json({
        success: true,
        url: `/uploads/${req.file.filename}`,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
