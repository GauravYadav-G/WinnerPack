"use client";
import { useState, useEffect } from "react";
import { fetchContent } from "@/lib/content-cache";

import { Tag, Layers, Disc3, Shield, Leaf, Globe2, Plus } from "lucide-react";

const iconMap: Record<string, any> = {
  Tag,
  Layers,
  Disc3,
  Shield,
  Leaf,
  Globe2
};

const defaultUsps = [
  {
    title: "Zero catalog forcing",
    text: "We specify to the exact width, gauge, and formulation your line speed needs — not the nearest match we have in stock.",
    icon: "Tag"
  },
  {
    title: "Guaranteed tracking",
    text: "Our strap rolls are extruded to maintain straightness, eliminating feed jams in automated high-speed strapping machines.",
    icon: "Layers"
  },
  {
    title: "High-cling formulation",
    text: "WPT stretch films use premium linear low-density polyethylene for maximum load-holding force with minimal wrap layers.",
    icon: "Disc3"
  },
  {
    title: "In-house quality check",
    text: "Every batch of BOPP tape and shrink rolls goes through rigorous elongation, tensile strength, and adhesive testing.",
    icon: "Shield"
  },
  {
    title: "Eco-friendly options",
    text: "FSC certified recyclable paper mailers and biodegradable films to help your plant meet compliance and ESG mandates.",
    icon: "Leaf"
  },
  {
    title: "Direct from Ghaziabad",
    text: "No distributor markups. We manufacture, warehouse, and dispatch directly to save your operations 12-18% annually.",
    icon: "Globe2"
  }
];

export default function WhyChooseUs() {
  const [uspsList, setUspsList] = useState<any[]>(defaultUsps);

  useEffect(() => {
    fetchContent("homepage")
      .then((data) => {
        if (data.usps && data.usps.length > 0) {
          setUspsList(data.usps);
        }
      })
      .catch((err) => console.error("Failed to load usps content:", err));
  }, []);

  return (
    <section id="why" className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-[var(--color-line)]">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-amber-soft)] border border-[var(--color-amber)]/20 text-[var(--color-amber-dark)] text-xs font-bold uppercase tracking-widest mb-4">
            PROVEN VALUE PROPOSITION
          </div>
          <h2 className="font-display text-2xl font-extrabold leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
            Six reasons procurement teams renew our contract every year.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 shadow-xl" data-reveal>
          {uspsList.map((u, i) => {
            const IconComponent = iconMap[u.icon] || Tag;
            return (
              <div
                key={u.title}
                className="group relative overflow-hidden bg-white p-5 sm:p-7 md:p-9 lg:p-10 transition-all duration-500 hover:bg-[var(--color-ink-2)]"
                data-hover
              >
                {/* Background reveal on hover */}
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

                <h3 className="font-display text-sm sm:text-base md:text-xl lg:text-2xl font-bold leading-tight text-[var(--color-ink)] transition-colors group-hover:text-white">
                  {u.title}
                </h3>
                <p className="mt-2 md:mt-3 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed text-[var(--color-mute)] transition-colors group-hover:text-white/80 line-clamp-4">
                  {u.text}
                </p>

                <div className="mt-4 md:mt-7 flex items-center gap-1.5 md:gap-2 font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-[var(--color-amber)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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
