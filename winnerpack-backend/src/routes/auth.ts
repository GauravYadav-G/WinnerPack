import { Router, Request, Response } from "express";

import { createSession, isValidSession, SESSION_MAX_AGE } from "../session";
import { createRateLimit } from "../middleware/rate-limit";

const router = Router();
const loginRateLimit = createRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many sign-in attempts. Please try again later.",
});

function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
    path: "/",
  };
}

// POST /api/admin/auth — login (sets admin_session cookie)
router.post("/", loginRateLimit, async (req: Request, res: Response): Promise<void> => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      res.status(503).json({ error: "Admin login is not configured" });
      return;
    }

    if (typeof password === "string" && password === adminPassword) {
      res.cookie("admin_session", createSession(), {
        ...sessionCookieOptions(),
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
  // Cookie deletion must use the same path / SameSite / Secure attributes as
  // creation, otherwise cross-origin production sessions can survive logout.
  res.clearCookie("admin_session", sessionCookieOptions());
  res.json({ success: true });
});

export default router;
