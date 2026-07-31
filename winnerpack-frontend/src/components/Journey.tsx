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
    question: "Do you constantly keep chasing your suppliers for deliveries?",
    solution: "We assign a dedicated Single POC for you available 24×7",
  },
  {
    icon: Boxes,
    question: "Do you often experience delays in material delivery when you need it the most?",
    solution: "We maintain surplus annual stock to offer shorter lead times",
  },
  {
    icon: ShieldCheck,
    question: "Have you lost your valuable customers due to quality issues?",
    solution: "We conduct stringent Quality Checks across our offerings",
  },
  {
    icon: TrendingUp,
    question: "Have you ever faced shrinking margins due to rising costs?",
    solution: "We offer Innovative Products which increase your Margins",
  },
  {
    icon: Truck,
    question: "Facing cashflow issues & unpredictable deliveries?",
    solution: "We offer On-time Delivery ensuring steady cash flows",
  },
  {
    icon: Tag,
    question: "Do you think the product prices shoot up without logic?",
    solution: "We assure transparent & fair pricing 365 days a year",
  },
  {
    icon: RefreshCw,
    question: "Are you offering same old products for years now?",
    solution: "We keep refreshing our catalogues as per the market trends",
  },
  {
    icon: Ruler,
    question: "Dimensions different from committed specifications?",
    solution: "We guarantee consistent product dimensions all across",
  },
];

export default function Journey() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-[var(--color-bone)] py-16 sm:py-24 border-t border-b border-[var(--color-line)]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-4xl">
          <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--color-blue)] mb-3">
            YOUR PROBLEMS FINALLY HAVE A SOLUTION NOW!
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[var(--color-ink)] text-balance">
            Your problems finally have a solution now!
          </h2>
          
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
            We eliminate supply chain bottlenecks, quality mismatches, and cost inflation with dedicated support, surplus stock, and guaranteed product specs.
          </p>
        </div>

        {/* 4x2 Cards Grid matching requested component */}
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
                className="group flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-xl"
              >
                <div>
                  {/* Circular Blue Icon Badge */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b4d9c] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-7 w-7" />
                  </div>

                  {/* Problem Question (Above Line) */}
                  <div className="mt-5 text-xs sm:text-sm font-semibold text-slate-500 leading-snug min-h-[44px]">
                    {item.question}
                  </div>

                  {/* Horizontal Divider Line */}
                  <div className="my-3 h-px w-full bg-slate-200/90 transition-colors group-hover:bg-[var(--color-blue)]/30" />

                  {/* Solution Answer (Below Line) */}
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)] leading-snug mt-2">
                    {item.solution}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Button matching requested text */}
        <div className="mt-12 md:mt-16 flex justify-center border-t border-[var(--color-line)] pt-8">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-[var(--color-blue-deep)] hover:shadow-xl hover:scale-105"
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