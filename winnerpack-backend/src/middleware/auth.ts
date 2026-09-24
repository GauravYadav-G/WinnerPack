import { Request, Response, NextFunction } from "express";

import { isValidSession } from "../session";

/**
 * Middleware that rejects requests without a valid admin_session cookie.
 * Cookie-based auth — same logic as Next.js isAuthorized() but as Express middleware.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const session = req.cookies?.admin_session;
  if (!isValidSession(session)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
