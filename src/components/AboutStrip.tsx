"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { fetchContent } from "@/lib/content-cache";

function StatBox({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = value.match(/[+\-%]$/)?.[0] ?? "";

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayValue(eased * numeric);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/[0.04] border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:border-[var(--color-amber)]/30 hover:bg-white/[0.07] flex flex-col justify-center items-center group/box"
    >
      <span className="font-display text-4xl font-extrabold tracking-tight text-[var(--color-amber)] lg:text-5xl transition-transform duration-300 group-hover/box:scale-105">
        {prefix}
        {isNaN(numeric) ? value : Math.floor(displayValue)}
        {suffix}
      </span>
      <span className="mt-2 text-[10px] font-bold tracking-wider uppercase text-[var(--color-blue-3)] group-hover/box:text-white transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  );
}

export default function AboutStrip() {
  const [about, setAbout] = useState({
    tagline: "Pioneering Industrial Packaging & Labeling Solutions",
    para1: "Winner Pack Technologies Pvt. Ltd. supplies environment-friendly secondary and tertiary packaging materials and machinery. Guided by our motto \"We Serve To Deserve\", we supply premium quality solutions tailored to your operational needs.",
    para2: "From Ghaziabad, UP, we specialize in high-cling BOPP tapes, strapping rolls, POF/PVC shrink films, protective packaging, and industrial machinery, serving the pharmaceutical, cosmetics, food/FMCG, and stationery industries.",
    stats: [
      { value: "8+", label: "Years in business" },
      { value: "6", label: "Product categories" },
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
    <section className="relative overflow-hidden bg-[var(--color-blue-deep)] py-16 lg:py-20 text-white z-10">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" aria-hidden />
      <div className="bg-noise absolute inset-0 opacity-15 pointer-events-none" />
      <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--color-blue)]/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: About content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <span className="relative inline-block pl-8 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-amber)]">
              <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-[var(--color-amber)]" />
              About Winner Pack
            </span>

            <h2 className="font-display mt-6 text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:text-5xl text-balance">
              {about.tagline}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70 md:text-base">
              {about.para1 && <p>{about.para1}</p>}
              {about.para2 && <p>{about.para2}</p>}
            </div>

            <Link
              href="/about-us"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-amber)] hover:text-white transition-colors duration-300"
            >
              Explore our journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right Column: 2x2 Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {about.stats && about.stats.map((s) => (
              <StatBox key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
