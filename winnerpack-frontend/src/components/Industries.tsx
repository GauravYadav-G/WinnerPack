"use client";

import { defaultIndustries } from '@/lib/site-defaults';
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface Industry {
  name: string;
  image: string;
}

const defaultIndustriesList = defaultIndustries;

/** Convert local static image paths to their .webp equivalent */
function toWebP(src: string): string {
  if (!src || src.startsWith("http://") || src.startsWith("https://")) return src;
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

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
    <section
      id="industries"
      className="relative w-full overflow-hidden bg-[#f8f7f4] bg-cover bg-center bg-no-repeat bg-fixed py-16 md:py-12 border-b border-[#e5dfd2]"
      style={{ backgroundImage: "url('/images/backgrounds/industries-background.webp')" }}
    >
      {/* White veil keeps the heading and industry cards readable over the fixed image. */}
      <div className="pointer-events-none absolute inset-0 bg-white/50" aria-hidden="true" />

      {/* Background Atmosphere */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#fe8220]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6 md:px-8">

        {/* Centered Section Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs font-bold tracking-widest text-[#d4630a] font-mono mb-2">
            Target Applications
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-[#0d072c] text-balance">
            Industries We Serve
          </h2>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#fe8220] to-[#ffa048] mx-auto" />
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 md:grid-cols-3 lg:grid-cols-6" data-reveal>
          {industriesList.map((ind) => (
            <div
              key={ind.name}
              className="group relative overflow-hidden rounded-2xl border border-[#e5dfd2] hover:border-[#fe8220]/40 bg-slate-950 aspect-[4/5] sm:aspect-[4/5] md:aspect-[5/6] shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer select-none"
              data-hover
            >
              {/* Industry Image — uses picture for WebP with PNG fallback */}
              <picture className="absolute inset-0 h-full w-full">
                <source srcSet={toWebP(ind.image)} type="image/webp" />
                <img
                  src={ind.image}
                  alt={`${ind.name} packaging solutions`}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={360}
                  height={450}
                />
              </picture>

              {/* Dark Overlay Gradient — focused at the bottom for readability while keeping the subject uncropped & vivid */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 via-40% to-transparent transition-opacity duration-500 group-hover:opacity-90" />

              {/* Text Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 md:p-4 text-center z-10">
                <h3 className="font-display text-xs sm:text-sm md:text-base font-extrabold tracking-tight text-white drop-shadow-md group-hover:text-[#fe8220] transition-colors duration-300">
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
