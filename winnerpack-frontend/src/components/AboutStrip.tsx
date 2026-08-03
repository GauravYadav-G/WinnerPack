"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchContent } from "@/lib/content-cache";

export default function AboutStrip() {
  const [about, setAbout] = useState({
    tagline: "Pioneering B2B Industrial Packaging & Labeling Solutions",
    para1: "Winner Pack Technologies Pvt. Ltd. supplies environment-friendly secondary and tertiary packaging materials. Guided by our motto \"We Serve To Deserve\", we supply premium quality solutions tailored to your operational needs.",
    para2: "From Ghaziabad, UP, we specialize in high-cling BOPP tapes, strapping rolls, POF/PVC shrink films, and protective packaging, serving the pharmaceutical, cosmetics, food/FMCG, and stationery industries.",
    stats: [
      { value: "8+", label: "Years in business" },
      { value: "4", label: "Product categories" },
      { value: "20+", label: "Product lines" },
      { value: "100%", label: "Customer commitment" }
    ]
  });

  useEffect(() => {
    fetchContent("homepage")
      .then((data) => {
        if (data.about) {
          setAbout(data.about);
        }
      })
      .catch((err) => console.error("Failed to load about data:", err));
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-[var(--color-bone)] py-10 sm:py-16 lg:py-24 border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-grid-fine opacity-15 pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT COLUMN: Image Cards (Side-by-Side on Mobile, Stacked on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 grid grid-cols-2 lg:flex lg:flex-col items-center sm:items-start justify-start gap-3 sm:gap-6"
          >
            {/* Top Rectangular Card */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10.5] w-full max-w-xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-line)] bg-white shadow-md sm:shadow-xl group">
              <img
                src="/images/desktop/about/blown_film_tower.png"
                alt="5-Layer POF Blown Film Extrusion Tower"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Bottom Rectangular Card */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10.5] w-full max-w-xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-line)] bg-white shadow-md sm:shadow-xl group">
              <img
                src="/images/desktop/about/film_slitting_machine.png"
                alt="Automated High-Speed Film Slitting & Converting Line"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Natural Flow Content & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            {/* Eyebrow Tag with Horizontal Accent Line */}
            <div className="flex items-center gap-2.5">
              <div className="h-0.5 w-6 sm:w-8 bg-[var(--color-amber-dark)] rounded-full" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
                About Winner Pack
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-snug sm:leading-[1.15] text-balance">
              {about.tagline}
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-2.5 sm:space-y-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal">
              {about.para1 && <p>{about.para1}</p>}
              {about.para2 && <p className="hidden sm:block">{about.para2}</p>}
            </div>

            {/* 2 Bottom Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 pt-3 sm:pt-4 border-t border-[var(--color-line)]">
              <div className="space-y-1 sm:space-y-2">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)]">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h4 className="font-display text-sm sm:text-base font-bold text-[var(--color-ink)]">
                  &quot;We Serve To Deserve&quot;
                </h4>
                <p className="text-[11px] sm:text-xs text-[var(--color-mute)] leading-relaxed">
                  Environment-friendly secondary and tertiary solutions tailored to your operational specifications.
                </p>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)]">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h4 className="font-display text-sm sm:text-base font-bold text-[var(--color-ink)]">
                  Engineered Reliability
                </h4>
                <p className="text-[11px] sm:text-xs text-[var(--color-mute)] leading-relaxed">
                  Specialized in high-cling BOPP tapes, strapping rolls, POF/PVC shrink films, and protective wrap.
                </p>
              </div>
            </div>

            {/* 4 Stats Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2 sm:pt-4">
              {about.stats && about.stats.map((s) => (
                <div key={s.label} className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[var(--color-line)] text-center shadow-sm hover:border-[var(--color-amber)]/40 hover:shadow-md transition-all duration-300">
                  <div className="font-display text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-amber-dark)]">{s.value}</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--color-mute)] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Link to Full About Us Page */}
            <div className="pt-2">
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--color-amber-dark)] hover:text-[var(--color-ink)] transition-colors duration-300"
              >
                <span>Explore our full manufacturing journey</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
