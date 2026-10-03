const headingText = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const plainHeadingText = (value: string) => headingText(value).toLowerCase();

const isStructuredHeading = (heading: string) => {
  const text = plainHeadingText(heading);
  return (
    /frequently asked questions|^faqs?(?:\s|$|\()/.test(text) ||
    /(?:technical|product) specifications/.test(text) ||
    /specifications.*technical/.test(text)
  );
};

function stripMarkdownSections(content: string) {
  const lines = content.split("\n");
  const output: string[] = [];
  let skippedHeadingLevel: number | null = null;

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const level = heading[1].length;
      if (skippedHeadingLevel !== null && level <= skippedHeadingLevel) skippedHeadingLevel = null;
      if (isStructuredHeading(heading[2])) {
        skippedHeadingLevel = level;
        continue;
      }
    }
    if (skippedHeadingLevel === null) output.push(line);
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function stripHtmlSections(content: string) {
  const headings = Array.from(content.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi));
  const ranges: Array<[number, number]> = [];

  headings.forEach((heading, index) => {
    if (!isStructuredHeading(heading[2])) return;
    const level = Number(heading[1]);
    const start = heading.index ?? 0;
    const next = headings.slice(index + 1).find((candidate) => Number(candidate[1]) <= level);
    ranges.push([start, next?.index ?? content.length]);
  });

  return ranges
    .sort((a, b) => b[0] - a[0])
    .reduce((result, [start, end]) => result.slice(0, start) + result.slice(end), content)
    .replace(/(?:<p>\s*(?:<br\s*\/?>)?\s*<\/p>\s*){2,}/gi, "<p></p>")
    .trim();
}

/** Keep Overview content separate from the structured Specs and FAQ sections. */
export function stripStructuredProductSections(content?: string) {
  if (!content) return "";
  return /<h[1-6]\b/i.test(content) ? stripHtmlSections(content) : stripMarkdownSections(content);
}

/** Migrate legacy FAQs embedded in longDesc into the structured FAQ editor. */
export function extractProductFaqsFromContent(content?: string) {
  if (!content) return [];
  if (/<h[1-6]\b/i.test(content)) {
    const faqHeading = /<h([1-6])\b[^>]*>[^<]*(?:frequently asked questions|faq)[^<]*<\/h\1>/i.exec(content);
    if (!faqHeading) return [];
    const section = content.slice((faqHeading.index ?? 0) + faqHeading[0].length);
    const entries = Array.from(section.matchAll(/<h[3-6]\b[^>]*>([\s\S]*?)<\/h[3-6]>\s*([\s\S]*?)(?=<h[3-6]\b|$)/gi));
    return entries.map((entry) => ({
      question: headingText(entry[1]),
      answer: entry[2].trim(),
    })).filter((faq) => faq.question && faq.answer);
  }

  const faqHeading = /^(#{1,6})\s+.*(?:frequently asked questions|faq).*$/im.exec(content);
  if (!faqHeading) return [];
  const section = content.slice((faqHeading.index ?? 0) + faqHeading[0].length);
  return Array.from(section.matchAll(/^#{3,6}\s+([^\n]+)\n+([\s\S]*?)(?=^#{3,6}\s+|(?![\s\S]))/gm))
    .map((entry) => ({ question: entry[1].trim(), answer: entry[2].trim() }))
    .filter((faq) => faq.question && faq.answer);
}
