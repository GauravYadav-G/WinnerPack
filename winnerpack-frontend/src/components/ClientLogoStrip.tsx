"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Globe, ShieldCheck, Award } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

interface BrandItem {
  name: string;
  logo: string;
  category?: string;
  website?: string;
}

const DEFAULT_BRANDS: BrandItem[] = [
  { name: "Lava", logo: "/Brand_logo/lava.png" },
  { name: "Vivo", logo: "/Brand_logo/vivo.png" },
  { name: "Noise", logo: "/Brand_logo/noise.png" },
  { name: "Fire-Boltt", logo: "/Brand_logo/firebolt.png" },
  { name: "Milton", logo: "/Brand_logo/milton.png" },
  { name: "Ai+", logo: "/Brand_logo/aiplus.png" },
  { name: "Bosch", logo: "/Brand_logo/bosch.svg" },
  { name: "Anmol", logo: "/Brand_logo/anmol.png" },
  { name: "CI Automotive", logo: "/Brand_logo/ci-automotive.png" },
  { name: "Bhagwati Products", logo: "/Brand_logo/bhagwati-products.png" },
];

export default function ClientLogoStrip() {
  const [partnerHeader, setPartnerHeader] = useState({
    tag: "TRUSTED PARTNERS",
    title: "Brands from all over the world love us!",
    description: "From renowned brands across the globe, our client portfolio showcases the trust and satisfaction of industry leaders, reflecting our commitment to excellence and customer satisfaction.",
    badge1: "Global Brands",
    badge2: "100% Quality QC",
    badge3: "ISO Certified",
  });

  const [brands, setBrands] = useState<BrandItem[]>(DEFAULT_BRANDS);

  useEffect(() => {
    async function loadPartners() {
      try {
        const res = await apiFetch("/api/content?key=partners_materials_certs");
        if (res.ok) {
          const doc = await res.json();
          if (doc.partnerHeader) {
            setPartnerHeader(doc.partnerHeader);
          }
          if (Array.isArray(doc.partners) && doc.partners.length > 0) {
            setBrands(doc.partners);
          }
        }
      } catch (err) {
        // Backend offline — fall back gracefully to default brands without error overlay
      }
    }
    loadPartners();
  }, []);

  return (
    <section id="clients" className="relative overflow-hidden bg-[var(--color-bone)] py-10 sm:py-16 lg:py-24 border-t border-b border-[var(--color-line)]">
      {/* Background Accents */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[900px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Executive Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-12 md:mb-16">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
            {partnerHeader.tag}
          </span>
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-snug sm:leading-[1.15]">
            {partnerHeader.title}
          </h2>
          <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal">
            {partnerHeader.description}
          </p>

          {/* Quick Proof Metrics Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3.5 sm:pt-6 mt-4 sm:mt-6 border-t border-[var(--color-line)] w-full">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber)]" />
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-ink)]">{partnerHeader.badge1}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber)]" />
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-ink)]">{partnerHeader.badge2}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber)]" />
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-ink)]">{partnerHeader.badge3}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Brand Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 items-center justify-items-center">
          {brands.map((brand, idx) => (
            <div
              key={brand.name + idx}
              className="flex items-center justify-center w-full h-20 sm:h-28 px-4 py-3 bg-white/70 backdrop-blur-xs border border-[var(--color-line)]/60 rounded-xl shadow-2xs hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer select-none"
            >
              <OptimizedImage
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 sm:max-h-18 max-w-[130px] sm:max-w-[200px] w-auto h-auto object-contain drop-shadow-xs"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
