import type { Metadata } from "next";
import Client from "./BlogPostClient";
import { initialArticles } from "@/lib/fallback-data";
import { serializeJsonLd } from "@/lib/seo";

async function loadArticle(slug: string): Promise<{ article: any | null; unavailable: boolean }> {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  if (!API_BASE) return { article: null, unavailable: true };

  try {
    const response = await fetch(`${API_BASE}/api/articles/${slug}`, {
      next: { revalidate: 60 },
    });
    if (response.ok) return { article: await response.json(), unavailable: false };
    if (response.status === 404) return { article: null, unavailable: false };
    return { article: null, unavailable: true };
  } catch {
    return { article: null, unavailable: true };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const lookup = await loadArticle(slug);
  let article = lookup.article;
  if (!article && lookup.unavailable) {
    article = initialArticles.find((a: any) => a.slug === slug);
  }

  if (!article) {
    const fallbackTitle = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `${fallbackTitle} | WinnerPack Insights`,
      description: `Read technical packaging insights on ${fallbackTitle} from WinnerPack Technologies.`,
      robots: { index: false, follow: false },
    };
  }

  const title = article.metaTitle || article.title;
  const description =
    article.metaDescription ||
    article.excerpt ||
    `Read ${article.title} - expert industrial packaging insights by WinnerPack Technologies.`;
  const image =
    article.image || "/images/desktop/portfolio/quality_featured.webp";
  const canonicalUrl =
    article.canonicalUrl || `https://winnerpack.in/blog/${slug}`;
  const keywords = article.metaKeywords
    ? article.metaKeywords.split(",").map((k: string) => k.trim())
    : [article.tag, "packaging insights", "industrial packaging", "WinnerPack"];

  return {
    title: `${title} | WinnerPack Insights`,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | WinnerPack`,
      description,
      url: canonicalUrl,
      siteName: "WinnerPack Technologies",
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Winner Pack Team"],
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | WinnerPack`,
      description,
      images: [image],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const lookup = await loadArticle(slug);
  const article = lookup.article || (lookup.unavailable
    ? initialArticles.find((a: any) => a.slug === slug)
    : null);

  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt || (article as any).metaDescription,
        image: article.image || "https://winnerpack.in/images/desktop/portfolio/quality_featured.webp",
        datePublished: article.date,
        author: {
          "@type": "Organization",
          name: "Winner Pack Technologies Pvt. Ltd.",
          url: "https://winnerpack.in",
        },
        publisher: {
          "@type": "Organization",
          name: "Winner Pack Technologies Pvt. Ltd.",
          logo: {
            "@type": "ImageObject",
            url: "https://winnerpack.in/logo.webp",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://winnerpack.in/blog/${slug}`,
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      )}
      <Client />
    </>
  );
}
