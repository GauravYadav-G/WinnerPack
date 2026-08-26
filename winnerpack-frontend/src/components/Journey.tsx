import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  UserCheck,
  Boxes,
  ShieldCheck,
  TrendingUp,
  Truck,
  Tag,
  RefreshCw,
  Ruler
} from "lucide-react";
import { apiFetch } from "@/lib/api";

const iconComponents: any[] = [UserCheck, Boxes, ShieldCheck, TrendingUp, Truck, Tag, RefreshCw, Ruler];

const defaultSolutionsData = [
  {
    slot: "01",
    question: "Supply Chain Communication",
    solution: "Dedicated Key Account Manager",
    challenge: "Dedicated key account manager coordinates all plant orders, schedule changes, and technical dispatches directly with your facility."
  },
  {
    slot: "02",
    question: "Zero Downtime Guarantee",
    solution: "Local Plant Buffer Stock",
    challenge: "Strategic safety buffer stock stored locally at our manufacturing plant for guaranteed immediate same-day dispatch."
  },
  {
    slot: "03",
    question: "Quality Verification",
    solution: "Batch-Level QC Verification",
    challenge: "Rigorous batch-level elongation, tensile yield, and adhesion peel testing conducted prior to every dispatch."
  },
  {
    slot: "04",
    question: "Material Cost Optimization",
    solution: "High-Yield Gauge Optimization",
    challenge: "Engineered film gauges and high-yield down-gauged formats that significantly lower overall packaging material cost per pallet."
  },
  {
    slot: "05",
    question: "Fleet & Transit Precision",
    solution: "Scheduled Transit & Dispatches",
    challenge: "Reliable time-slotted dispatch schedules engineered to support uninterrupted 24/7 factory floor operations."
  },
  {
    slot: "06",
    question: "Financial Transparency",
    solution: "Transparent Contract Pricing",
    challenge: "Predictable contract index pricing with zero hidden surcharges, surprise billing adjustments, or sudden spikes."
  },
  {
    slot: "07",
    question: "Circular Packaging",
    solution: "Eco-Friendly Material Options",
    challenge: "Recyclable PCR and optimized ultra-thin stretch formulations for measurable industrial carbon footprint reduction."
  },
  {
    slot: "08",
    question: "Dimensional Uniformity",
    solution: "Micro-Tolerance Production",
    challenge: "Sub-micron gauge accuracy, pristine edge cuts, and consistent core dimensions maintained across every single production run."
  },
];

export default function Journey() {
  const [solutionsList, setSolutionsList] = useState<any[]>(defaultSolutionsData);

  useEffect(() => {
    async function loadSolutionsData() {
      try {
        const res = await apiFetch("/api/content?key=homepage");
        if (res.ok) {
          const result = await res.json();
          const content = result?.data || result;
          if (Array.isArray(content?.solutionsData) && content.solutionsData.length > 0) {
            setSolutionsList(content.solutionsData);
          }
        }
      } catch (err) {
        console.warn("Could not load solutions from DB, using defaults:", err);
      }
    }
    loadSolutionsData();
  }, []);

  return (
    <section id="solutions" className="relative overflow-hidden bg-[var(--color-bone)]/50 py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[var(--color-line)]">
      {/* Ambient Lighting & Backdrop Atmosphere */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute -right-20 top-1/4 h-[350px] sm:h-[500px] w-[350px] sm:w-[500px] rounded-full bg-[var(--color-amber)]/10 blur-[100px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute -left-20 bottom-1/4 h-[350px] sm:h-[500px] w-[350px] sm:w-[500px] rounded-full bg-[var(--color-blue)]/10 blur-[100px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] sm:h-[400px] w-[90%] sm:w-[700px] rounded-full bg-amber-500/5 blur-[90px] sm:blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Section Header */}
        <div className="mb-10 sm:mb-14 md:mb-16 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2.5">
            ENGINEERED SOLUTIONS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-[1.15] tracking-tight text-[var(--color-ink)] text-balance">
            Industrial Packaging Challenges, Engineered Solutions
          </h2>
          <div className="mt-3.5 sm:mt-4 h-1 sm:h-1.5 w-14 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal max-w-2xl text-balance">
            Consistent material supply, verifiable testing standards, and spec-accurate industrial packaging.
          </p>
        </div>

        {/* Modern Bento / Capability Grid — 2 in a row on mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {solutionsList.map((item, index) => {
            const IconComponent = iconComponents[index % iconComponents.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/95 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-white hover:border-[var(--color-amber)]/60 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Ambient Soft Glow on Card Hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 sm:h-36 w-32 sm:w-36 rounded-full bg-[var(--color-amber)]/15 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                <div>
                  {/* Top Bar: Squircle Dual-Tone Icon & Serial Counter */}
                  <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                    <div className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 backdrop-blur-md text-[var(--color-amber-dark)] border border-amber-500/25 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[var(--color-amber)] group-hover:to-[var(--color-amber-2)] group-hover:text-white group-hover:shadow-md group-hover:shadow-amber-500/25">
                      <IconComponent className="h-4.5 w-4.5 sm:h-5 sm:w-5 md:h-5.5 md:w-5.5 stroke-[2.2]" />
                    </div>

                    <span className="font-mono text-[10px] sm:text-xs font-bold text-slate-300 tracking-wider transition-colors duration-300 group-hover:text-[var(--color-amber-dark)]">
                      /{item.slot || `0${index + 1}`}
                    </span>
                  </div>

                  {/* Heading 1: Category / Context Eyebrow */}
                  {item.question && (
                    <span className="block text-[8.5px] sm:text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)] mb-1 sm:mb-1.5 opacity-90 leading-tight">
                      {item.question}
                    </span>
                  )}

                  {/* Heading 2: Primary Solution Title */}
                  <h3 className="font-display text-xs sm:text-sm md:text-base font-bold text-[var(--color-ink)] leading-snug tracking-tight mb-2 sm:mb-2.5 transition-colors duration-300 group-hover:text-[var(--color-blue-deep)]">
                    {item.solution}
                  </h3>

                  {/* Operational Value Description (Properly Fills & Balances the Card) */}
                  {item.challenge && (
                    <p className="text-[10px] sm:text-xs md:text-[13px] text-slate-500 leading-relaxed font-normal">
                      {item.challenge}
                    </p>
                  )}
                </div>

                {/* Subtle Integrated Bottom Accent Indicator */}
                <div className="mt-4 sm:mt-5 pt-1">
                  <div className="h-0.5 w-5 sm:w-8 bg-slate-100 rounded-full transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[var(--color-amber)] group-hover:to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
