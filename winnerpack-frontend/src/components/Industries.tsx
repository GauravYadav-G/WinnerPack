"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Industry {
  name: string;
  image: string;
}

const defaultIndustriesList: Industry[] = [
  { name: "Food & FMCG", image: "/images/desktop/industries/food_fmcg_industry.png" },
  { name: "Pharma & Healthcare", image: "/images/desktop/industries/pharma_industry.png" },
  { name: "E-Commerce & Logistics", image: "/images/desktop/industries/ecommerce_logistics_industry.png" },
  { name: "Automobile & Engineering", image: "/images/desktop/industries/automobile_industry.png" },
  { name: "Electronics & Electricals", image: "/images/desktop/industries/electronics_industry.png" },
  { name: "Stationery & Corporate", image: "/images/desktop/industries/stationery_industry.png" },
];

export default function Industries() {
  const [industriesList, setIndustriesList] = useState<Industry[]>(defaultIndustriesList);

  useEffect(() => {
    async function loadIndustriesData() {
      try {
        const res = await apiFetch("/api/content?key=industries");
        if (res.ok) {
          const result = await res.json();
          const content = result?.data ?? result;
          if (Array.isArray(content?.industries) && content.industries.length > 0) {
            setIndustriesList(content.industries);
          }
        }
      } catch (err) {
        console.warn("Could not load industries from DB, using defaults:", err);
      }
    }
    loadIndustriesData();
  }, []);

  return (
    <section id="industries" className="relative overflow-hidden bg-[var(--color-bone)] py-16 md:py-24 border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Section Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-2">
            Target Applications
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-[var(--color-ink)] text-balance">
            Industries We Serve
          </h2>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] mx-auto" />
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6" data-reveal>
          {industriesList.map((ind) => (
            <div
              key={ind.name}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-line)] hover:border-[var(--color-amber)]/40 bg-slate-950 aspect-[16/11] md:aspect-[4/5] shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer select-none"
              data-hover
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${ind.image}')` }}
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

              {/* Text Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 text-center z-10">
                <h3 className="font-display text-xs sm:text-sm md:text-base font-extrabold tracking-tight text-white drop-shadow-md group-hover:text-[var(--color-amber)] transition-colors duration-300">
                  {ind.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
