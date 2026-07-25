/**
 * On-demand revalidation helper for client-side admin components.
 */
export async function triggerRevalidate(path: string): Promise<boolean> {
  try {
    const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
    if (!secret) {
      console.warn("NEXT_PUBLIC_REVALIDATE_SECRET is not configured; skipping on-demand revalidation.");
      return false;
    }

    const res = await fetch(`/api/revalidate?path=${encodeURIComponent(path)}&secret=${encodeURIComponent(secret)}`);
    if (!res.ok) {
      const errData = await res.json();
      console.error(`Revalidation request failed for path ${path}:`, errData.error);
      return false;
    }

    const data = await res.json();
    console.log(`Successfully triggered on-demand revalidation for: ${path}`, data);
    return true;
  } catch (err) {
    console.error(`Network error triggering revalidation for path ${path}:`, err);
    return false;
  }
}
