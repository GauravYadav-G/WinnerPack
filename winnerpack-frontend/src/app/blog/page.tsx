import type { Metadata } from "next";
import Client from "./BlogClient";

export const metadata: Metadata = {
  title: "Packaging Insights & Technical Articles | WinnerPack",
  description:
    "Expert engineering guides, procurement frameworks, and technical insights on industrial shrink films, BOPP tapes, strapping rolls, and secondary packaging solutions.",
  keywords: [
    "industrial packaging blog",
    "POF shrink film guides",
    "PP vs PET strapping",
    "packaging procurement India",
    "WinnerPack articles",
    "packaging line speed optimization",
    "load containment standards",
  ],
  alternates: {
    canonical: "https://winnerpack.in/blog",
  },
  openGraph: {
    title: "Packaging Insights & Technical Articles | WinnerPack",
    description:
      "Expert engineering guides, procurement frameworks, and technical insights on industrial packaging materials.",
    url: "https://winnerpack.in/blog",
    siteName: "WinnerPack Technologies",
    images: [
      {
        url: "/images/desktop/portfolio/quality_featured.webp",
        alt: "WinnerPack Packaging Insights",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Insights & Technical Articles | WinnerPack",
    description:
      "Expert engineering guides, procurement frameworks, and technical insights on industrial packaging.",
    images: ["/images/desktop/portfolio/quality_featured.webp"],
  },
};

export default function Page() {
  return <Client />;
}
