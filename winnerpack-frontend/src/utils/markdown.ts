import { marked } from "marked";

const ALLOWED_TAGS = new Set([
  "a", "blockquote", "br", "code", "del", "div", "em", "h1", "h2", "h3",
  "h4", "h5", "h6", "hr", "img", "li", "ol", "p", "pre", "span", "strong",
  "table", "tbody", "td", "th", "thead", "tr", "u", "ul",
]);
const DROP_WITH_CONTENT = new Set(["embed", "form", "iframe", "link", "math", "meta", "object", "script", "style", "svg"]);
const GLOBAL_ATTRIBUTES = new Set(["aria-label", "role"]);
const TAG_ATTRIBUTES: Record<string, Set<string>> = {
  a: new Set(["href", "rel", "target", "title"]),
  img: new Set(["alt", "height", "loading", "src", "title", "width"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan", "scope"]),
};

function isSafeUrl(value: string, image = false): boolean {
  const normalized = value.trim().replace(/[\u0000-\u001F\u007F\s]+/g, "").toLowerCase();
  if (normalized.startsWith("/") || normalized.startsWith("#")) return true;
  if (/^https?:/.test(normalized)) return true;
  return !image && (/^mailto:/.test(normalized) || /^tel:/.test(normalized));
}

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  if (typeof DOMParser === "undefined") {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const document = new DOMParser().parseFromString(html, "text/html");
  for (const element of Array.from(document.body.querySelectorAll("*"))) {
    const tag = element.tagName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) {
      if (DROP_WITH_CONTENT.has(tag)) element.remove();
      else element.replaceWith(...Array.from(element.childNodes));
      continue;
    }

    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      const allowed = GLOBAL_ATTRIBUTES.has(name) || TAG_ATTRIBUTES[tag]?.has(name);
      if (!allowed || name.startsWith("on") || name === "style" || name === "srcdoc") {
        element.removeAttribute(attribute.name);
      }
    }

    if (tag === "a") {
      const href = element.getAttribute("href");
      if (href && !isSafeUrl(href)) element.removeAttribute("href");
      if (element.getAttribute("target") === "_blank") {
        element.setAttribute("rel", "noopener noreferrer");
      }
    }
    if (tag === "img") {
      const src = element.getAttribute("src");
      if (!src || !isSafeUrl(src, true)) element.remove();
      else element.setAttribute("loading", "lazy");
    }
  }

  return document.body.innerHTML;
}

export function renderSafeMarkdown(md: string): string {
  if (!md) return "";
  try {
    return sanitizeHtml(marked.parse(md) as string);
  } catch {
    return sanitizeHtml(md);
  }
}

/**
 * Helper to check if string is HTML or Markdown, converting markdown to HTML while preserving HTML.
 */
export function markdownToHtml(md: string): string {
  return renderSafeMarkdown(md);
}
