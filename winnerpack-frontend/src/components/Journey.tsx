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
    appImage: "/images/desktop/journey/journey_trading_2018.png",
  },
  {
    icon: Boxes,
    question: "Experiencing line downtime due to film & strap stockouts?",
    solution: "Surplus buffer stock maintained at our Ghaziabad plant for rapid dispatch.",
    appImage: "/images/desktop/journey/journey_incorporation_2020.png",
  },
  {
    icon: ShieldCheck,
    question: "Facing customer complaints from strap snap or tape failure?",
    solution: "Strict batch-level elongation, tensile & micron adhesive testing.",
    appImage: "/images/desktop/journey/journey_manufacturing_2022.png",
  },
  {
    icon: TrendingUp,
    question: "Struggling with shrinking margins from rising material costs?",
    solution: "High-yield stretch films & optimized gauges that reduce cost-per-pack.",
    appImage: "/images/desktop/journey/journey_portfolio_2024.png",
  },
  {
    icon: Truck,
    question: "Irregular dispatch schedules hurting your plant cash flows?",
    solution: "Guaranteed scheduled dispatches ensuring steady supply chain velocity.",
    appImage: "/images/desktop/industries/ecommerce_logistics_industry.png",
  },
  {
    icon: Tag,
    question: "Unpredictable price hikes with zero market justification?",
    solution: "Transparent contract pricing with zero hidden surcharges year-round.",
    appImage: "/images/gallery/office_life.png",
  },
  {
    icon: RefreshCw,
    question: "Using outdated packaging materials that increase waste?",
    solution: "Next-gen PCR eco-films & ultra-thin high-retention stretch technology.",
    appImage: "/images/desktop/industries/food_fmcg_industry.png",
  },
  {
    icon: Ruler,
    question: "Inconsistent roll widths, core sizes, or gauge tolerances?",
    solution: "Guaranteed 100% accurate gauge, width, and length specifications.",
    appImage: "/images/desktop/industries/automobile_industry.png",
  },
];

export default function Journey() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-white py-20 sm:py-28 border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-amber-soft)] border border-[var(--color-amber)]/20 text-[var(--color-amber-dark)] text-xs font-bold uppercase tracking-widest mb-4">
            APPLICATION SOLUTIONS
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] text-balance">
            Industrial Packaging Challenges, Engineered Solutions
          </h2>
          
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
            We eliminate supply chain bottlenecks, quality mismatches, and cost inflation through guaranteed buffer inventory, dedicated technical support, and precision-extruded specifications.
          </p>
        </div>

        {/* 4x2 Executive Solutions Cards Grid with Industrial Application Media Headers */}
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
                className="group flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-white overflow-hidden shadow-xs transition-all duration-500 hover:border-[var(--color-amber)]/40 hover:shadow-2xl"
              >
                {/* Application Reference Image Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.appImage}
                    alt={item.solution}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Icon Badge Over Image */}
                  <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 backdrop-blur-md text-[var(--color-amber-dark)] shadow-md transition-all duration-300 group-hover:bg-[var(--color-amber)] group-hover:text-white">
                    <IconComponent className="h-5 w-5 stroke-[2]" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Problem Question (Above Line) */}
                    <div className="text-xs font-semibold text-[var(--color-mute)] uppercase tracking-wider leading-relaxed min-h-[38px]">
                      {item.question}
                    </div>

                    {/* Horizontal Divider Line */}
                    <div className="my-3.5 h-px w-full bg-[var(--color-line)] transition-colors group-hover:bg-[var(--color-amber)]/40" />

                    {/* Solution Answer (Below Line) */}
                    <h3 className="font-display text-sm sm:text-base font-bold text-[var(--color-ink)] leading-snug">
                      {item.solution}
                    </h3>
                  </div>

                  {/* Subtle bottom line accent */}
                  <div className="mt-5 h-0.5 w-0 bg-[var(--color-amber)] transition-all duration-500 group-hover:w-12 rounded-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}