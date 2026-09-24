"use client";

import { defaultPartners } from '@/lib/site-defaults';
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import OptimizedImage from '@/components/OptimizedImage';

interface BrandItem {
  name: string;
  logo: string;
  category?: string;
  website?: string;
}

const DEFAULT_BRANDS = defaultPartners;

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
          <span className="text-xs font-mono font-bold tracking-[0.16em] text-[var(--color-amber-dark)] mb-2.5 sm:mb-3">
            {partnerHeader.tag || "Our Partners"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-snug sm:leading-[1.15] text-balance">
            {partnerHeader.title || "We Work With the Best Partners"}
          </h2>
          <div className="mt-4 sm:mt-5 h-1.5 w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
        </div>

        {/* Clean Logo Card Boxes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 items-center">
          {brands.map((brand, idx) => {
            const isCI =
              brand.logo.toLowerCase().includes("ci-automotive") ||
              brand.name.toLowerCase().includes("automotive");

            return (
              <div
                key={brand.name + idx}
                className="flex items-center justify-center w-full h-20 sm:h-24 md:h-28 px-5 py-3.5 bg-white border border-[var(--color-line)]/90 rounded-2xl shadow-xs hover:shadow-md hover:border-[var(--color-amber)]/40 hover:-translate-y-1 transition-all duration-300 select-none group cursor-pointer"
              >
                <OptimizedImage
                  src={brand.logo}
                  alt={brand.name}
                  className={`w-auto h-auto object-contain transition-transform duration-300 ${isCI
                      ? "max-h-11 sm:max-h-14 md:max-h-15 max-w-[135px] sm:max-w-[170px] scale-110 sm:scale-115 group-hover:scale-120"
                      : "max-h-9 sm:max-h-12 md:max-h-13 max-w-[130px] sm:max-w-[165px] group-hover:scale-105"
                    }`}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
