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
  Ruler, 
  ArrowUpRight 
} from "lucide-react";

const solutionsData = [
  {
    icon: UserCheck,
    question: "Constantly chasing suppliers for urgent plant deliveries?",
    solution: "Dedicated 24×7 Key Account Manager for seamless dispatch coordination.",
  },
  {
    icon: Boxes,
    question: "Experiencing line downtime due to film & strap stockouts?",
    solution: "Surplus buffer stock maintained at our Ghaziabad plant for rapid dispatch.",
  },
  {
    icon: ShieldCheck,
    question: "Facing customer complaints from strap snap or tape failure?",
    solution: "Strict batch-level elongation, tensile & micron adhesive testing.",
  },
  {
    icon: TrendingUp,
    question: "Struggling with shrinking margins from rising material costs?",
    solution: "High-yield stretch films & optimized gauges that reduce cost-per-pack.",
  },
  {
    icon: Truck,
    question: "Irregular dispatch schedules hurting your plant cash flows?",
    solution: "Guaranteed scheduled dispatches ensuring steady supply chain velocity.",
  },
  {
    icon: Tag,
    question: "Unpredictable price hikes with zero market justification?",
    solution: "Transparent contract pricing with zero hidden surcharges year-round.",
  },
  {
    icon: RefreshCw,
    question: "Using outdated packaging materials that increase waste?",
    solution: "Next-gen PCR eco-films & ultra-thin high-retention stretch technology.",
  },
  {
    icon: Ruler,
    question: "Inconsistent roll widths, core sizes, or gauge tolerances?",
    solution: "Guaranteed 100% accurate gauge, width, and length specifications.",
  },
];

export default function Journey() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-[var(--color-bone)] py-20 sm:py-28 border-t border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] text-balance">
            Industrial Packaging Challenges, Engineered Solutions
          </h2>
          
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
            We eliminate supply chain bottlenecks, quality mismatches, and cost inflation through guaranteed buffer inventory, dedicated technical support, and precision-extruded specifications.
          </p>
        </div>

        {/* 4x2 Executive Solutions Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {solutionsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:p-7 shadow-xs transition-all duration-500 hover:border-[var(--color-blue)]/40 hover:shadow-2xl"
              >
                <div>
                  {/* Light-Themed SVG Icon Badge */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-blue-soft)] border border-[var(--color-blue)]/15 text-[var(--color-blue)] transition-all duration-300 group-hover:border-[var(--color-blue)]/30 group-hover:scale-110">
                    <IconComponent className="h-6 w-6 stroke-[1.75]" />
                  </div>

                  {/* Problem Question (Above Line) */}
                  <div className="mt-5 text-xs font-semibold text-[var(--color-mute)] uppercase tracking-wider leading-relaxed min-h-[40px]">
                    {item.question}
                  </div>

                  {/* Horizontal Divider Line */}
                  <div className="my-4 h-px w-full bg-[var(--color-line)] transition-colors group-hover:bg-[var(--color-blue)]/30" />

                  {/* Solution Answer (Below Line) */}
                  <h3 className="font-display text-sm sm:text-base font-bold text-[var(--color-ink)] leading-snug">
                    {item.solution}
                  </h3>
                </div>

                {/* Subtle bottom line accent */}
                <div className="mt-6 h-0.5 w-0 bg-[var(--color-amber)] transition-all duration-500 group-hover:w-12 rounded-full" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 md:mt-20 flex justify-center border-t border-[var(--color-line)] pt-10">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-ink)] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[var(--color-blue-deep)] hover:shadow-2xl hover:scale-105"
            data-hover
          >
            Start your journey
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[var(--color-amber)]" />
          </a>
        </div>

      </div>
    </section>
  );
}