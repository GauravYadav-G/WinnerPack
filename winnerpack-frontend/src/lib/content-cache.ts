/**
 * Shared client-side cache for /api/content fetches.
 *
 * Multiple components on the same page call /api/content?key=homepage on
 * mount. Without deduplication, 5+ parallel requests all hit the server at
 * the same time — costing the MongoDB cold-connection penalty on the very
 * first page load.
 *
 * This module keeps a single in-flight promise per cache key, so concurrent
 * callers share one request. The resolved value is also memoised for the
 * lifetime of the browser session (a soft in-memory cache), so subsequent
 * navigation to the same page is instant.
 */

import { apiFetch } from "@/lib/api";
import { fallbackData } from "@/lib/fallback-data";


// In-flight request deduplication: key → Promise
const inFlight = new Map<string, Promise<any>>();

// Soft in-memory result cache: key → resolved data
const resultCache = new Map<string, any>();

export async function fetchContent(key = "homepage"): Promise<any> {
  // 1. Return memoised result immediately if we have it
  if (resultCache.has(key)) {
    return resultCache.get(key);
  }

  // 2. Return existing in-flight promise to deduplicate parallel callers
  if (inFlight.has(key)) {
    return inFlight.get(key)!;
  }

  // 3. Start a new fetch, register it so others can share it
  const promise = apiFetch(`/api/content?key=${key}`)
    .then((res) => {
      if (!res.ok) throw new Error(`content fetch failed: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      resultCache.set(key, data);   // memoise for future renders
      inFlight.delete(key);         // clean up in-flight entry
      return data;
    })
    .catch((err) => {
      console.warn("Failed to fetch content from API, using client fallback:", err);
      inFlight.delete(key);         // allow retry on error
      if (key === "homepage") {
        return fallbackData;
      }
      throw err;
    });

  inFlight.set(key, promise);
  return promise;
}

/** Call this to invalidate the cache (e.g. after an admin POST). */
export function invalidateContent(key = "homepage") {
  resultCache.delete(key);
  inFlight.delete(key);
}
