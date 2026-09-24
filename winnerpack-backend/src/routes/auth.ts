import { Router, Request, Response } from "express";

import { createSession, isValidSession, SESSION_MAX_AGE } from "../session";

const router = Router();

// POST /api/admin/auth — login (sets admin_session cookie)
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      res.status(503).json({ error: "Admin login is not configured" });
      return;
    }

    if (typeof password === "string" && password === adminPassword) {
      res.cookie("admin_session", createSession(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // Changed from "strict" to "none" to work cross-origin (Vercel → Railway)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE, // 1 day in ms (Express uses ms, not seconds)
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
  if (isValidSession(session)) {
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
