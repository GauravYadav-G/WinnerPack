/**
 * Central API helper.
 *
 * All backend calls go through this module so the base URL is configured
 * in exactly one place.  Set NEXT_PUBLIC_API_URL in your .env.local for
 * local development; on Vercel set it as an environment variable pointing
 * to your Railway backend URL.
 *
 * When NEXT_PUBLIC_API_URL is NOT set the helper falls back to "" (empty
 * string), which keeps relative-URL behaviour intact for local Next.js
 * dev where the proxy is still available.
 */

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

/**
 * Wrapper around fetch() that:
 *  - Prepends the backend base URL
 *  - Always sends credentials (needed for the admin_session cookie to travel
 *    cross-origin between Vercel and Railway)
 */
export function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const signal =
    init.signal ??
    (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
      ? AbortSignal.timeout(1500)
      : undefined);

  return fetch(`${API_BASE}${path}`, {
    ...init,
    signal,
    credentials: "include", // required for cross-origin cookie auth
  });
}

/**
 * Robust inquiry submission:
 * Uses the same-origin proxy, which saves to the backend or falls back to email.
 * Reports success only after the server confirms acceptance.
 */
export async function submitInquiryForm(payload: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  skuProfile?: string;
  lineSpeed?: string;
  message?: string;
}): Promise<boolean> {
  const bodyData = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    company: payload.company || "N/A",
    skuProfile: payload.skuProfile || "General Inquiry",
    lineSpeed: payload.lineSpeed || "Not Specified",
    message: payload.message || "N/A",
  };

  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result?.success !== false && result?.success !== "false" && !result?.error;
  } catch {
    return false;
  }
}
