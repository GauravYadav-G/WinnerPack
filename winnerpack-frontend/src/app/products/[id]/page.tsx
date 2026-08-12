import type { Metadata } from "next";
import Client from "./ProductDetailClient";
import { initialProducts } from "@/lib/fallback-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  let found = initialProducts.find((p) => p.id === id);
  if (!found) {
    const parentWithSub = initialProducts.find((p) =>
      p.subCategories?.some((s: any) => s.id === id || s.slug === id)
    );
    if (parentWithSub && parentWithSub.subCategories) {
      found = parentWithSub.subCategories.find((s: any) => s.id === id || s.slug === id) as any;
    }
  }

  const title = found?.title || id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const description = found?.blurb || `Explore high-performance ${title} manufactured by WinnerPack with ISO-certified quality and global delivery.`;

  return {
    title: `${title} | WinnerPack`,
    description,
  };
}

export default function Page(props: { params: Promise<{ id: string }> }) {
  return <Client {...props} />;
}
