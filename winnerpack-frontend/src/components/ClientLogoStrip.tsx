"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
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
    tag: "OUR PARTNERS",
    title: "We work with the best partners",
  });

  const [brands, setBrands] = useState<BrandItem[]>(DEFAULT_BRANDS);

  useEffect(() => {
    async function loadPartners() {
      try {
        const res = await apiFetch("/api/content?key=partners_materials_certs");
        if (res.ok) {
          const doc = await res.json();
          if (doc.partnerHeader) {
            setPartnerHeader((prev) => ({ ...prev, ...doc.partnerHeader }));
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
    <section id="clients" className="relative overflow-hidden bg-[var(--color-bone)] py-12 sm:py-18 lg:py-24 border-t border-b border-[var(--color-line)]">
      {/* Background Accents */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[900px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Minimal Header with large typography */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.16em] text-[var(--color-amber-dark)] mb-2.5 sm:mb-3">
            {partnerHeader.tag || "OUR PARTNERS"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-snug sm:leading-[1.15] text-balance">
            {partnerHeader.title || "We work with the best partners"}
          </h2>
        </div>

        {/* Clean Logo Card Boxes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 items-center">
          {brands.map((brand, idx) => (
            <div
              key={brand.name + idx}
              className="flex items-center justify-center w-full h-20 sm:h-24 md:h-28 px-5 py-3.5 bg-white border border-[var(--color-line)]/90 rounded-2xl shadow-xs hover:shadow-md hover:border-[var(--color-amber)]/40 hover:-translate-y-1 transition-all duration-300 select-none group cursor-pointer"
            >
              <OptimizedImage
                src={brand.logo}
                alt={brand.name}
                className="max-h-9 sm:max-h-12 md:max-h-14 max-w-[125px] sm:max-w-[160px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
