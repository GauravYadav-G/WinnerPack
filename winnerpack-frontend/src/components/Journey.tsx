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
    question: "Constantly chasing suppliers for urgent plant deliveries?",
    solution: "Dedicated 24×7 Key Account Manager for seamless dispatch coordination.",
    appImage: "/images/desktop/journey/solution_dispatch_manager.png",
  },
  {
    icon: Boxes,
    question: "Experiencing line downtime due to film & strap stockouts?",
    solution: "Surplus buffer stock maintained at our Ghaziabad plant for rapid dispatch.",
    appImage: "/images/desktop/journey/solution_buffer_stock.png",
  },
  {
    icon: ShieldCheck,
    question: "Facing customer complaints from strap snap or tape failure?",
    solution: "Strict batch-level elongation, tensile & micron adhesive testing.",
    appImage: "/images/desktop/journey/solution_quality_testing.png",
  },
  {
    icon: TrendingUp,
    question: "Struggling with shrinking margins from rising material costs?",
    solution: "High-yield stretch films & optimized gauges that reduce cost-per-pack.",
    appImage: "/images/desktop/journey/solution_pallet_wrapping.png",
  },
  {
    icon: Truck,
    question: "Irregular dispatch schedules hurting your plant cash flows?",
    solution: "Guaranteed scheduled dispatches ensuring steady supply chain velocity.",
    appImage: "/images/desktop/journey/solution_scheduled_dispatch.png",
  },
  {
    icon: Tag,
    question: "Unpredictable price hikes with zero market justification?",
    solution: "Transparent contract pricing with zero hidden surcharges year-round.",
    appImage: "/images/desktop/journey/solution_contract_pricing.png",
  },
  {
    icon: RefreshCw,
    question: "Using outdated packaging materials that increase waste?",
    solution: "Next-gen PCR eco-films & ultra-thin high-retention stretch technology.",
    appImage: "/images/desktop/journey/solution_pcr_eco_film.png",
  },
  {
    icon: Ruler,
    question: "Inconsistent roll widths, core sizes, or gauge tolerances?",
    solution: "Guaranteed 100% accurate gauge, width, and length specifications.",
    appImage: "/images/desktop/journey/solution_precision_gauge.png",
  },
];

export default function Journey() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-white py-20 sm:py-28 border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* Centered Section Header */}
        <div className="mb-14 md:mb-20 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-2">
            Engineered Solutions
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] text-balance">
            Industrial Packaging Challenges, Engineered Solutions
          </h2>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-5 text-sm sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
            We eliminate supply chain bottlenecks, quality mismatches, and cost inflation through guaranteed buffer inventory, dedicated technical support, and precision-extruded specifications.
          </p>
        </div>

        {/* IMAGE-FIRST Full-Bleed Cards — Content slides up on hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {solutionsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer h-[320px] sm:h-[360px]"
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={item.appImage}
                  alt={item.solution}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Persistent dark gradient — bottom 60% */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />

                {/* Hover overlay tint — deepens on hover */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/30" />

                {/* Icon Badge — top left, always visible */}
                <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all duration-300 group-hover:bg-[var(--color-amber)] group-hover:border-[var(--color-amber)]">
                  <IconComponent className="h-4 w-4 stroke-[2]" />
                </div>

                {/* Card index — top right */}
                <div className="absolute top-4 right-4 font-mono text-[10px] font-bold text-white/50 tracking-widest">
                  0{index + 1}
                </div>

                {/* Content — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 transition-transform duration-500">

                  {/* Solution Title — always visible */}
                  <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug mb-2">
                    {item.solution}
                  </h3>

                  {/* Problem Question — hidden by default, slides in on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out">
                    <div className="pt-2 border-t border-white/20 text-[11px] text-white/70 uppercase tracking-wider leading-relaxed">
                      {item.question}
                    </div>
                  </div>

                  {/* Orange accent line */}
                  <div className="mt-3 h-0.5 w-0 bg-[var(--color-amber)] transition-all duration-500 group-hover:w-10 rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}