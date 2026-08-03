import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Organization & Plant Gallery | Winner Pack Technologies",
  description: "Explore Winner Pack Technologies' manufacturing infrastructure, quality testing labs, warehouse operations, and product portfolio.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
