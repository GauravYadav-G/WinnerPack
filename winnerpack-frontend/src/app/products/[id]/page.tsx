import type { Metadata } from "next";
import Client from "./ProductDetailClient";
import { initialProducts } from "@/lib/fallback-data";
import { createPageMetadata } from "@/lib/seo";

type SeoProduct = {
  id?: string;
  title?: string;
  blurb?: string;
  image?: string;
  status?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
};

function findFallbackProduct(id: string): SeoProduct | null {
  const direct = initialProducts.find((product) => product.id === id);
  if (direct) return direct;

  for (const parent of initialProducts) {
    const nested = parent.subCategories?.find((item: any) => item.id === id || item.slug === id);
    if (nested) return nested;
  }
  return null;
}

async function loadProduct(id: string): Promise<{ product: SeoProduct | null; unavailable: boolean }> {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  if (!apiBase) return { product: null, unavailable: true };

  try {
    const response = await fetch(`${apiBase}/api/products/${encodeURIComponent(id)}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) return { product: await response.json(), unavailable: false };
    if (response.status === 404) return { product: null, unavailable: false };
    return { product: null, unavailable: true };
  } catch {
    return { product: null, unavailable: true };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lookup = await loadProduct(id);
  const product = lookup.product || (lookup.unavailable ? findFallbackProduct(id) : null);

  if (!product) {
    return {
      title: "Product Not Found | WinnerPack",
      robots: { index: false, follow: false },
    };
  }

  const title = product.seo?.metaTitle || `${product.title} | WinnerPack`;
  const description = product.seo?.metaDescription || product.blurb || "WinnerPack industrial packaging product information.";
  return {
    ...createPageMetadata({
      title,
      description,
      path: `/products/${id}`,
      image: product.image,
    }),
    keywords: product.seo?.keywords,
    robots: product.status && product.status !== "published"
      ? { index: false, follow: false }
      : undefined,
  };
}

export default function Page(props: { params: Promise<{ id: string }> }) {
  return <Client {...props} />;
}
