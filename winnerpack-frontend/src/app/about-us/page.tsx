import { AboutUsContent } from "@/components/pages/AboutUsContent";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Winner Pack Technologies",
  description: "Learn about Winner Pack Technologies, our manufacturing infrastructure, quality processes, and industrial packaging capabilities.",
  path: "/about-us",
  image: "/images/desktop/about/about_factory_floor_v2.webp",
});

export default function AboutUsPage() {
  return <AboutUsContent />;
}
