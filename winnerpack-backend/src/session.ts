import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_MAX_AGE = 24 * 60 * 60 * 1000;

function sign(value: string): string {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD or SESSION_SECRET must be configured");
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSession(now = Date.now()): string {
  const expires = String(now + SESSION_MAX_AGE);
  return `${expires}.${sign(expires)}`;
}

export function isValidSession(token: unknown, now = Date.now()): boolean {
  if (typeof token !== "string") return false;
  const match = /^(\d+)\.([a-f0-9]{64})$/.exec(token);
  if (!match || Number(match[1]) <= now) return false;
  try {
    return timingSafeEqual(Buffer.from(match[2], "hex"), Buffer.from(sign(match[1]), "hex"));
  } catch {
    return false;
  }
}
