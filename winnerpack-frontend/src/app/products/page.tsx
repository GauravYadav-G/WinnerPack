import { createPageMetadata } from "@/lib/seo";
import Client from "./ProductsClient";

export const metadata = createPageMetadata({
  title: "Industrial Packaging Products | WinnerPack Technologies",
  description: "Browse WinnerPack films, labels, stickers, tapes, and PP and PET strapping products for industrial packaging applications.",
  path: "/products",
  image: "/images/categories/film-products-v2.webp",
});

export default function Page() {
  return <Client />;
}
