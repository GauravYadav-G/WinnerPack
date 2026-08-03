"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Factory, PackageCheck } from "lucide-react";
import Link from "next/link";

interface ApplicationItem {
  id: string;
  title: string;
  category: string;
  materialUsed: string;
  industry: string;
  specs: string[];
  image: string;
  link: string;
}

const applicationsData: ApplicationItem[] = [
  {
    id: "pallet-wrapping",
    title: "Heavy Pallet Load Retention & Unitization",
    category: "Tertiary Packaging",
    materialUsed: "Machine & Manual Stretch Film",
    industry: "Logistics, FMCG & Industrial Warehousing",
    specs: ["Up to 300% Pre-Stretch Yield", "5-Layer LLDPE Co-Extrusion", "Zero Pallet Shift in Transit"],
    image: "/images/desktop/journey/solution_pallet_wrapping.png",
    link: "/product/machine-stretch-film",
  },
  {
    id: "automated-strapping",
    title: "High-Speed Conveyor Line Strapping",
    category: "Secondary Packaging",
    materialUsed: "PET & PP Strapping Rolls",
    industry: "Automobile, Metal Coils & Brick Plants",
    specs: ["High Joint-Weld Efficiency", "Embossed Jam-Free Surface", "High Breaking Strength"],
    image: "/images/products/pp-strap/image.png",
    link: "/product/pp-strap",
  },
  {
    id: "shrink-bundling",
    title: "360° Multi-Pack Heat Shrink Bundling",
    category: "Product Bundling",
    materialUsed: "POF & PVC Shrink Rolls",
    industry: "Pharma, Cosmetics & Beverage Bottling",
    specs: ["High Optical Clarity", "Uniform Shrinkage Force", "Puncture & Moisture Barrier"],
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    link: "/product/pof-shrink-rolls",
  },
  {
    id: "carton-sealing",
    title: "High-Tack Carton Sealing & Fulfillment",
    category: "Sealing & Shipping",
    materialUsed: "BOPP Packaging Tapes & Poly Bags",
    industry: "E-Commerce Fulfillment & Express Logistics",
    specs: ["High-Initial Tack Acrylic", "Wide Temperature Tolerance", "Tamper-Evident Sealing"],
    image: "/images/products/bopp-tapes/image.png",
    link: "/product/bopp-tapes",
  },
];

export default function ProductApplications() {
  return (
    <section id="applications" className="relative overflow-hidden bg-[var(--color-ink)] py-16 sm:py-24 lg:py-28 text-white border-b border-white/10">
      {/* Ambient Glass Atmosphere Lights */}
      <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[var(--color-amber)]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1536px] px-5 md:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber)]">
              <Factory className="h-3.5 w-3.5" />
              <span>Real-World B2B Applications</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Engineered for High-Speed Packaging Lines & Severe Transit
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full" />
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Explore how Winner Pack materials integrate directly into automated conveyors, friction-weld strapping machines, and high-speed stretch wrappers to eliminate transit damage and lower total cost-per-pack.
            </p>
          </div>
        </div>

        {/* 4 Application Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {applicationsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-white/[0.04] border border-white/12 backdrop-blur-xl overflow-hidden hover:border-[var(--color-amber)]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--color-amber)]/10 flex flex-col justify-between"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090520] via-black/40 to-transparent" />

                {/* Category Badge Top Left */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <PackageCheck className="h-3.5 w-3.5 text-[var(--color-amber)]" />
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-[var(--color-amber)] font-semibold uppercase tracking-wider">
                    {item.industry}
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[var(--color-amber)] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <div className="text-xs text-slate-300 font-medium">
                    <span className="text-slate-400">Material Applied:</span>{" "}
                    <strong className="text-white font-bold">{item.materialUsed}</strong>
                  </div>
                </div>

                {/* Technical Performance Specs List */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-[var(--color-amber)] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Link Action */}
                <div className="pt-2">
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[var(--color-amber)] transition-colors"
                  >
                    <span>View Product Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
