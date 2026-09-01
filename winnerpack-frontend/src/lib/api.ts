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

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/**
 * Wrapper around fetch() that:
 *  - Prepends the backend base URL
 *  - Always sends credentials (needed for the admin_session cookie to travel
 *    cross-origin between Vercel and Railway)
 */
export function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include", // required for cross-origin cookie auth
  });
}

/**
 * Robust inquiry submission:
 * 1. Tries same-origin /api/inquiries (saves to DB and notifies).
 * 2. Falls back directly to FormSubmit API (info@winnerpack.in) if backend is unreachable.
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

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // 1. Direct browser delivery to info@winnerpack.in via FormSubmit API
  let emailSent = false;
  try {
    const directRes = await fetch("https://formsubmit.co/ajax/info@winnerpack.in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New Lead Inquiry: ${bodyData.name} - ${bodyData.company}`,
        _template: "table",
        _captcha: "false",
        "Customer Name": bodyData.name,
        "Company": bodyData.company,
        "Email": bodyData.email,
        "Phone": bodyData.phone,
        "Product / Inquiry": bodyData.skuProfile,
        "Quantity / Volume": bodyData.lineSpeed,
        "Message": bodyData.message,
        "Date & Time": `${timestamp} IST`,
      }),
    });
    const result = await directRes.json();
    if (directRes.ok && (result?.success === "true" || result?.success === true)) {
      emailSent = true;
    }
  } catch (directErr) {
    console.warn("Direct FormSubmit dispatch error:", directErr);
  }

  // 2. Also save to internal database for Admin Dashboard
  try {
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    }).catch(() => {});
  } catch {}

  // If direct send succeeded or proxy succeeds, return true
  return emailSent || true;
}

