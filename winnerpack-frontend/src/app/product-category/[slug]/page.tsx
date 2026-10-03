import type { Metadata } from "next";
import { productCategories } from "@/data";
import { createPageMetadata } from "@/lib/seo";
import Client from "./CategoryClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = productCategories.find((item) => item.id === slug);

  if (!category) {
    return { title: "Product Category | WinnerPack", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: `${category.title} | WinnerPack Technologies`,
    description: category.blurb,
    path: `/product-category/${category.id}`,
    image: category.image,
  });
}

export default function Page(props: { params: Promise<{ slug: string }> }) {
  return <Client {...props} />;
}
