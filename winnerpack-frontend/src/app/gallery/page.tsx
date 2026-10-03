import { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Organization & Plant Gallery | Winner Pack Technologies",
  description: "Explore Winner Pack Technologies' manufacturing infrastructure, quality testing labs, warehouse operations, and product portfolio.",
  path: "/gallery",
  image: "/images/desktop/portfolio/quality_featured.webp",
});

export default function GalleryPage() {
  return <GalleryClient />;
}
