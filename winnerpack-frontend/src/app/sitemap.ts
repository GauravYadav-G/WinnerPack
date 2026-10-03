import type { MetadataRoute } from "next";
import { industryVerticals, productCategories } from "@/data";
import { initialArticles, initialProducts } from "@/lib/fallback-data";
import { absoluteUrl } from "@/lib/seo";

const RETIRED_PRODUCT_IDS = new Set([
  "ldpe-films-pouches",
  "coloured-films-pouches",
  "compostable-films-pouches",
]);

export const revalidate = 3600;

type ApiRecord = {
  id?: string;
  slug?: string;
  status?: string;
  updatedAt?: string;
  publishedAt?: string;
  subCategories?: Array<{ id?: string; slug?: string }>;
};

async function loadCollection(path: string): Promise<ApiRecord[] | null> {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  if (!apiBase) return null;

  try {
    const response = await fetch(`${apiBase}${path}`, {
      next: { revalidate },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const value = await response.json();
    return Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

function validDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [databaseProducts, databaseArticles] = await Promise.all([
    loadCollection("/api/products"),
    loadCollection("/api/articles"),
  ]);

  const products: ApiRecord[] = databaseProducts ?? initialProducts;
  const articles: ApiRecord[] = databaseArticles ?? initialArticles;
  const productPaths = new Map<string, ApiRecord>();

  for (const product of products) {
    if (product.status && product.status !== "published") continue;
    if (product.id && RETIRED_PRODUCT_IDS.has(product.id)) continue;
    if (product.id) productPaths.set(product.id, product);
    for (const nested of product.subCategories ?? []) {
      const id = nested.slug || nested.id;
      if (id) productPaths.set(id, product);
    }
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/products"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about-us"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/gallery"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
  ];

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((category) => ({
    url: absoluteUrl(`/product-category/${category.id}`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industryVerticals.map((industry) => ({
    url: absoluteUrl(`/industry/${industry.id}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = Array.from(productPaths, ([id, product]) => ({
    url: absoluteUrl(`/products/${id}`),
    lastModified: validDate(product.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((article) => (!article.status || article.status === "published") && article.slug)
    .map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: validDate(article.updatedAt || article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticPages, ...categoryPages, ...industryPages, ...productPages, ...articlePages];
}
