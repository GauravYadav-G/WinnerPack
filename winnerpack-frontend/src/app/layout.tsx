import type { Metadata, Viewport } from "next";
import { serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";
import "../index.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Winner Pack Technologies Pvt. Ltd. — Engineered Packaging, Built in India",
  description: "Winner Pack Technologies Pvt. Ltd. — Industrial packaging materials & solutions. Quality-manufactured films, tapes, strapping rolls, and protective packaging.",
  applicationName: SITE_NAME,
  authors: [{ name: "Winner Pack Technologies Pvt. Ltd.", url: SITE_URL }],
  creator: "Winner Pack Technologies Pvt. Ltd.",
  publisher: "Winner Pack Technologies Pvt. Ltd.",
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/logo.webp", type: "image/webp" }] },
  openGraph: {
    title: "Winner Pack Technologies Pvt. Ltd. — Engineered Packaging, Built in India",
    description: "Industrial packaging materials and solutions, including films, tapes, strapping rolls, labels, and protective packaging.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/images/desktop/portfolio/quality_featured.webp",
      alt: "Winner Pack Technologies industrial packaging",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Winner Pack Technologies Pvt. Ltd.",
    description: "Industrial packaging materials and solutions manufactured in India.",
    images: ["/images/desktop/portfolio/quality_featured.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Winner Pack Technologies Pvt. Ltd.",
  alternateName: "WinnerPack",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  email: "info@winnerpack.in",
  telephone: "+91-85950-72187",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 8, B.S.T. Industrial Park, Village Dasna",
    addressLocality: "Ghaziabad",
    addressRegion: "Uttar Pradesh",
    postalCode: "201015",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/winnerpacktechnologies/",
    "https://www.instagram.com/winnerpacktechnologiespvtltd/",
    "https://www.facebook.com/winnerpackindia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
