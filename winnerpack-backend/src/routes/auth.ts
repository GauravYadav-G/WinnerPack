import { Router, Request, Response } from "express";

const router = Router();

// POST /api/admin/auth — login (sets admin_session cookie)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      res.cookie("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // Changed from "strict" to "none" to work cross-origin (Vercel → Railway)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 1000, // 1 day in ms (Express uses ms, not seconds)
      });
      res.json({ success: true });
      return;
    }

    res.status(401).json({ error: "Invalid password" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/admin/auth — check session validity
router.get("/", (req: Request, res: Response): void => {
  const session = req.cookies?.admin_session;
  if (session === "true") {
    res.json({ authenticated: true });
    return;
  }
  res.status(401).json({ authenticated: false });
});

// DELETE /api/admin/auth — logout (clear cookie)
router.delete("/", (_req: Request, res: Response): void => {
  res.clearCookie("admin_session", { path: "/" });
  res.json({ success: true });
});

export default router;
