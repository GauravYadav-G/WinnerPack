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
