import type { Metadata, Viewport } from "next";
import { Inter, Sora, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../index.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display-sora",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-space",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Winner Pack Technologies Pvt. Ltd. — Engineered Packaging, Built in India",
  description: "Winner Pack Technologies Pvt. Ltd. — Industrial packaging materials & solutions. Quality-manufactured films, tapes, strapping rolls, and protective packaging.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sora.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/webp" href="/logo.webp" />
        {/* Preload the LCP hero image so the browser fetches it immediately */}
        <link
          rel="preload"
          as="image"
          href="/images/desktop/hero-slider/slide-1.webp"
          fetchPriority="high"
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}

