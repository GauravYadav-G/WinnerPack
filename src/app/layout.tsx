import type { Metadata } from "next";
import { Inter, Sora, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../index.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display-sora",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-space",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Winner Pack Technologies Pvt. Ltd. — Engineered Packaging, Built in India",
  description: "Winner Pack Technologies Pvt. Ltd. — Industrial packaging materials & machinery. Manufactured in Ghaziabad, dispatched to 1,200+ pin codes.",
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
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
