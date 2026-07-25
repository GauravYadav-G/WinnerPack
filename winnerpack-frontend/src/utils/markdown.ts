import { marked } from "marked";

/**
 * Helper to check if string is HTML or Markdown, converting markdown to HTML while preserving HTML.
 */
export function markdownToHtml(md: string): string {
  if (!md) return "";
  if (md.trim().startsWith("<")) return md;
  try {
    return marked.parse(md) as string;
  } catch (e) {
    return md;
  }
}
