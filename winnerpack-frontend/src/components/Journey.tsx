"use client";

import { motion } from "framer-motion";
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

const solutionsData = [
  {
    icon: UserCheck,
    question: "Need a responsive point of contact for plant supply coordination?",
    solution: "Dedicated Key Account Manager for seamless order and dispatch coordination.",
    appImage: "/images/desktop/journey/solution_dispatch_manager.png",
  },
  {
    icon: Boxes,
    question: "Concerned about production line stoppages due to packaging stockouts?",
    solution: "Buffer stock maintained at our plant for quick and reliable dispatch.",
    appImage: "/images/desktop/journey/solution_buffer_stock.png",
  },
  {
    icon: ShieldCheck,
    question: "Facing quality issues with strapping or tape performance in the field?",
    solution: "Rigorous batch-level elongation, tensile and adhesive testing on every dispatch.",
    appImage: "/images/desktop/journey/solution_quality_testing.png",
  },
  {
    icon: TrendingUp,
    question: "Looking to improve cost efficiency in packaging material consumption?",
    solution: "Optimized film gauges and high-yield formats that reduce cost per pack.",
    appImage: "/images/desktop/journey/solution_pallet_wrapping.png",
  },
  {
    icon: Truck,
    question: "Facing inconsistent delivery schedules from your current supplier?",
    solution: "Reliable scheduled dispatches to support steady supply chain continuity.",
    appImage: "/images/desktop/journey/solution_scheduled_dispatch.png",
  },
  {
    icon: Tag,
    question: "Dealing with unexpected price changes and unclear billing from suppliers?",
    solution: "Transparent contract pricing with no hidden surcharges or surprise escalations.",
    appImage: "/images/desktop/journey/solution_contract_pricing.png",
  },
  {
    icon: RefreshCw,
    question: "Looking for sustainable packaging alternatives to reduce material waste?",
    solution: "Eco-friendly film options and optimized stretch technology for reduced material use.",
    appImage: "/images/desktop/journey/solution_pcr_eco_film.png",
  },
  {
    icon: Ruler,
    question: "Struggling with roll width, core size, or gauge inconsistencies?",
    solution: "Precise gauge, width, and length specifications maintained across every production batch.",
    appImage: "/images/desktop/journey/solution_precision_gauge.png",
    impact: "PRECISION",
    spec: "Spec Accurate",
    challenge: "Consistent specifications across every batch."
  },
];

export default function Journey() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-white py-10 sm:py-20 lg:py-28 border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Section Header */}
        <div className="mb-6 sm:mb-14 md:mb-20 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
            Engineered Solutions
          </span>
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-[1.1] tracking-tight text-[var(--color-ink)] text-balance">
            Industrial Packaging Challenges, Engineered Solutions
          </h2>
          <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
            We support seamless supply chain operations through consistent material supply, quality verification, and spec-accurate product manufacturing.
          </p>
        </div>

        {/* IMAGE-FIRST Full-Bleed Cards — 2x2 Grid on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {solutionsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md cursor-pointer h-[210px] sm:h-[360px]"
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={item.appImage}
                  alt={item.solution}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Persistent dark gradient — bottom 60% */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />

                {/* Hover overlay tint — deepens on hover */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/30" />

                {/* Icon Badge — top left, always visible */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all duration-300 group-hover:bg-[var(--color-amber)] group-hover:border-[var(--color-amber)]">
                  <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2]" />
                </div>

                {/* Card index — top right */}
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 font-mono text-[9px] sm:text-[10px] font-bold text-white/60 tracking-widest">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-0 transition-transform duration-500">

                  {/* Solution Title — always visible */}
                  <h3 className="font-display text-xs sm:text-lg font-bold text-white leading-snug mb-1 sm:mb-2">
                    {item.solution}
                  </h3>

                  {/* Impact pill & Material Spec */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-3">
                    <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-[var(--color-amber)]/20 border border-[var(--color-amber)]/30 text-[9px] sm:text-xs font-mono font-bold text-[var(--color-amber)]">
                      {item.impact}
                    </span>
                    <span className="text-[9px] sm:text-xs font-mono text-white/60 truncate max-w-full">
                      {item.spec}
                    </span>
                  </div>

                  {/* Challenge details */}
                  <p className="hidden sm:block text-xs text-white/75 leading-relaxed line-clamp-2">
                    {item.challenge}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}