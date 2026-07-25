import { Request, Response, NextFunction } from "express";

/**
 * Middleware that rejects requests without a valid admin_session cookie.
 * Cookie-based auth — same logic as Next.js isAuthorized() but as Express middleware.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const session = req.cookies?.admin_session;
  if (session !== "true") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
