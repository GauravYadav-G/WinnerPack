import { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Product & Plant Gallery | Winner Pack Technologies",
  description: "Explore our industrial packaging materials gallery including high-tensile strapping rolls, LLDPE stretch films, BOPP tapes, and plant manufacturing operations in Ghaziabad.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
