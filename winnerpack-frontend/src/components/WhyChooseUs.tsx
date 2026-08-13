"use client";
import { useState, useEffect } from "react";
import { fetchContent } from "@/lib/content-cache";
import { fallbackData } from "@/lib/fallback-data";

import { Tag, Layers, Disc3, Shield, Leaf, Globe2, Plus } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

const iconMap: Record<string, any> = {
  Tag,
  Layers,
  Disc3,
  Shield,
  Leaf,
  Globe2
};

const defaultUsps = fallbackData.usps;

export default function WhyChooseUs() {
  const [uspsList, setUspsList] = useState<any[]>(defaultUsps);

  useEffect(() => {
    fetchContent("homepage")
      .then((data) => {
        if (data.usps && data.usps.length > 0) {
          // Merge bgImages from defaultUsps into fetched data
          const merged = data.usps.map((u: any, i: number) => ({
            ...u,
            bgImage: defaultUsps[i]?.bgImage || "",
          }));
          setUspsList(merged);
        }
      })
      .catch(() => {
        // Backend offline — fall back gracefully to default usps content
      });
  }, []);

  return (
    <section id="why" className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-[var(--color-line)]">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 md:mb-16 text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-2">
            Why WinnerPack
          </span>
          <h2 className="font-display text-2xl font-extrabold leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
            Six reasons procurement teams renew our contract every year
          </h2>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 shadow-xl" data-reveal>
          {uspsList.map((u, i) => {
            const IconComponent = iconMap[u.icon] || Tag;
            return (
              <div
                key={u.title}
                className="group relative overflow-hidden bg-white p-5 sm:p-7 md:p-9 lg:p-10 transition-all duration-500 hover:bg-[var(--color-ink-2)] min-h-[220px]"
                data-hover
              >
                {/* Hover-Reveal Contextual Background Image */}
                {u.bgImage && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    aria-hidden
                  >
                    <OptimizedImage
  src={u.bgImage}
  alt=""
  className="h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
/>
                    {/* Layered dark overlay so text stays readable */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ink-2)]/90 via-[var(--color-ink-2)]/80 to-black/75" />
                  </div>
                )}

                {/* Shimmer sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <Plus className="absolute right-4 top-4 md:right-7 md:top-7 h-4 w-4 md:h-5 md:w-5 text-[var(--color-line-2)] transition-all duration-500 group-hover:rotate-45 group-hover:text-[var(--color-amber)]" />

                <div className="relative mb-4 md:mb-7 flex items-center gap-3 md:gap-4">
                  <div className="font-mono text-[10px] md:text-xs font-bold text-[var(--color-line-2)] transition-colors group-hover:text-[var(--color-amber)]">
                    0{i + 1}
                  </div>
                  <div className="h-px flex-1 bg-[var(--color-line-2)] transition-colors group-hover:bg-white/20" />
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)] transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:bg-[var(--color-amber)] group-hover:text-white shadow-xs">
                    <IconComponent className="h-4.5 w-4.5 md:h-5 sm:w-5" strokeWidth={2} />
                  </div>
                </div>

                <h3 className="relative font-display text-sm sm:text-base md:text-xl lg:text-2xl font-bold leading-tight text-[var(--color-ink)] transition-colors group-hover:text-white">
                  {u.title}
                </h3>
                <p className="relative mt-2 md:mt-3 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed text-[var(--color-mute)] transition-colors group-hover:text-white/80 line-clamp-4">
                  {u.text}
                </p>

                <div className="relative mt-4 md:mt-7 flex items-center gap-1.5 md:gap-2 font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--color-amber)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Verified Spec
                  <span className="h-px w-4 md:w-6 bg-[var(--color-amber)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
