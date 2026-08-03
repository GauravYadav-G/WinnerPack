"use client";

import { Globe, ShieldCheck, Award } from "lucide-react";

interface ClientBrand {
  name: string;
  renderLogo: () => React.ReactNode;
}

const row1Brands: ClientBrand[] = [
  {
    name: "Lava",
    renderLogo: () => (
      <img src="/Brand_logo/lava.png" alt="Lava" className="max-h-8 sm:max-h-16 max-w-[110px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs" />
    ),
  },
  {
    name: "Vivo",
    renderLogo: () => (
      <img src="/Brand_logo/vivo.png" alt="Vivo" className="max-h-8 sm:max-h-16 max-w-[110px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs" />
    ),
  },
  {
    name: "Noise",
    renderLogo: () => (
      <img src="/Brand_logo/noise.png" alt="Noise" className="max-h-8 sm:max-h-16 max-w-[110px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs" />
    ),
  },
  {
    name: "Fire-Boltt",
    renderLogo: () => (
      <img src="/Brand_logo/firebolt.png" alt="Fire-Boltt" className="max-h-8 sm:max-h-16 max-w-[110px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs" />
    ),
  },
];

const row2Brands: ClientBrand[] = [
  {
    name: "Milton",
    renderLogo: () => (
      <img src="/Brand_logo/milton.png" alt="Milton" className="max-h-8 sm:max-h-16 max-w-[110px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs" />
    ),
  },
  {
    name: "Ai+",
    renderLogo: () => (
      <img src="/Brand_logo/aiplus.png" alt="Ai+" className="max-h-8 sm:max-h-16 max-w-[110px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs" />
    ),
  },
  {
    name: "Bosch",
    renderLogo: () => (
      <img src="/Brand_logo/bosch.svg" alt="Bosch" className="max-h-8 sm:max-h-16 max-w-[110px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs" />
    ),
  },
];

export default function ClientLogoStrip() {
  return (
    <section id="clients" className="relative overflow-hidden bg-[var(--color-bone)] py-10 sm:py-16 lg:py-24 border-t border-b border-[var(--color-line)]">
      {/* Subtle Light Theme Background Accents */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[900px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Executive Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-12 md:mb-16">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
            Trusted Partners
          </span>
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-snug sm:leading-[1.15]">
            Brands from all over the world love us!
          </h2>
          <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal">
            From renowned brands across the globe, our client portfolio showcases the trust and satisfaction of industry leaders, reflecting our commitment to excellence and customer satisfaction.
          </p>

          {/* Quick Proof Metrics Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3.5 sm:pt-6 mt-4 sm:mt-6 border-t border-[var(--color-line)] w-full">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber)]" />
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-ink)]">Global Brands</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber)]" />
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-ink)]">100% Quality QC</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber)]" />
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-ink)]">ISO Certified</span>
            </div>
          </div>
        </div>

        {/* Brand Logos Container */}
        <div className="space-y-3.5 sm:space-y-8">
          {/* Row 1: 4 Main Brands (Lava, Vivo, Noise, Fire-Boltt) — 2 Columns on Mobile, 4 Columns on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 items-center justify-items-center">
            {row1Brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center w-full h-18 sm:h-28 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-xs border border-[var(--color-line)]/60 rounded-xl shadow-2xs hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer select-none"
              >
                {brand.renderLogo()}
              </div>
            ))}
          </div>

          {/* Row 2: 3 Brands (Milton, Ai+, Bosch) — 2 Columns on Mobile (Matching Row 1), 3 Columns on Desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 max-w-4xl mx-auto gap-3 sm:gap-6 items-center justify-items-center">
            {row2Brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center w-full h-18 sm:h-28 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/70 backdrop-blur-xs border border-[var(--color-line)]/60 rounded-xl shadow-2xs hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer select-none"
              >
                {brand.renderLogo()}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
