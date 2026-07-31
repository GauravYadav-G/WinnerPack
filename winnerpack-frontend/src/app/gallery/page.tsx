import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Organization & Plant Gallery | Winner Pack Technologies",
  description: "Explore Winner Pack Technologies' manufacturing infrastructure, Ghaziabad plant, quality testing labs, warehouse hub, and corporate operations.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
