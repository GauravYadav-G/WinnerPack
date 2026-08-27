import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

// Modern Duotone & Multi-Layered Vector SVGs for Packaging Solutions
function CustomDimensionsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Background isometric faces */}
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 12L3 7l9-5 9 5-9 5z" fill="currentColor" fillOpacity="0.08" />
      {/* Crisp Wireframe & Depth */}
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12v10M12 12L3 7M12 12l9-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dimension arrow markers */}
      <path d="M7 4.5l10 5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="7" cy="4.5" r="1" fill="currentColor" />
      <circle cx="17" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function LoadContainmentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Outer shield duotone fill */}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Inner reinforced core & checkmark */}
      <path d="M12 6.5v11" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1.5 2" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 12l1 1 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BulkProductionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Factory base & skyline fill */}
      <path d="M2 20h20V8l-6 3V7l-6 3V4L2 8v12z" fill="currentColor" fillOpacity="0.12" />
      <path d="M2 20h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2 20V8l8-4v6l6-3v4l6-3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Industrial Extrusion Windows */}
      <rect x="5" y="12" width="2.5" height="3" rx="0.5" fill="currentColor" />
      <rect x="11" y="13" width="2.5" height="3" rx="0.5" fill="currentColor" />
      <rect x="17" y="11" width="2.5" height="3" rx="0.5" fill="currentColor" />
      <circle cx="18" cy="5" r="1" fill="currentColor" />
    </svg>
  );
}

function CostEfficiencyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Price tag body with soft tint */}
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" fill="currentColor" fillOpacity="0.12" />
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="7" r="1.75" fill="currentColor" />
      {/* Factory savings trend arrow */}
      <path d="M9 15l4-4 3 3 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FastDispatchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Logistics Cargo Van Body */}
      <path d="M1 4h14v12H1z" fill="currentColor" fillOpacity="0.12" />
      <path d="M15 8h4.5l3.5 4v4h-8V8z" fill="currentColor" fillOpacity="0.2" />
      <path d="M1 4h14v12H1V4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8h4.5l3.5 4v4h-8V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Wheels with inner hubs */}
      <circle cx="6" cy="18" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="18" cy="18" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
      {/* Speed lines */}
      <path d="M3 8h5M2 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CustomPrintingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Roll & flexo printing cartridge */}
      <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 11V3h10v8" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" />
      {/* Printed barcode/tape band */}
      <path d="M9 15h6M9 18h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function EcoPackagingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Continuous Möbius Loop / Leaf with duotone fills */}
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="currentColor" fillOpacity="0.08" />
      {/* 3 Recycling Chevron Arrows */}
      <path d="M12 4l2 2-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6a7 7 0 0 1 7-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 12l-2 2-2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 17a7 7 0 0 1-2-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 18l-2-2 2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 12a7 7 0 0 1 2 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Eco Leaf Center */}
      <path d="M12 8c2.5 0 4 1.5 4 4s-1.5 4-4 4-4-1.5-4-4 1.5-4 4-4z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 14l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function TechnicalSupportIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      {/* Clipboard / Technical QA report */}
      <rect x="4" y="4" width="16" height="17" rx="2.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spec verification checks & measurements */}
      <path d="M8 9h8M8 13h5M8 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Certified emblem badge */}
      <circle cx="16.5" cy="15.5" r="2.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 15.5l.8.8 1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const modernIcons = [
  CustomDimensionsIcon,
  LoadContainmentIcon,
  BulkProductionIcon,
  CostEfficiencyIcon,
  FastDispatchIcon,
  CustomPrintingIcon,
  EcoPackagingIcon,
  TechnicalSupportIcon
];

const defaultSolutionsData = [
  {
    slot: "01",
    question: "Custom Dimensions",
    solution: "Tailored Sizes & Gauges",
    challenge: "Custom widths, thicknesses, and roll lengths manufactured to match your exact manual or automated wrapping machinery."
  },
  {
    slot: "02",
    question: "Reliable Strength",
    solution: "Tear & Puncture Resistance",
    challenge: "Engineered multi-layer films that deliver high load containment and secure pallets during warehouse storage and transit."
  },
  {
    slot: "03",
    question: "High Volume Output",
    solution: "Bulk Manufacturing Capacity",
    challenge: "Modern high-speed extrusion lines equipped to consistently fulfill large-scale recurring factory and distributor orders."
  },
  {
    slot: "04",
    question: "Direct Manufacturer",
    solution: "Factory-Direct Competitive Pricing",
    challenge: "Transparent pricing directly from the manufacturing unit, helping you reduce overall packaging costs per unit."
  },
  {
    slot: "05",
    question: "On-Time Dispatch",
    solution: "Reliable Delivery & Ready Stock",
    challenge: "Maintained safety stock and planned dispatch schedules to ensure your packaging materials arrive without factory downtime."
  },
  {
    slot: "06",
    question: "Brand Visibility",
    solution: "Custom Printing & Branded Tapes",
    challenge: "Custom logo printing, colored tapes, and barcode labels to elevate product presentation and protect against tampering."
  },
  {
    slot: "07",
    question: "Sustainable Solutions",
    solution: "100% Recyclable Materials",
    challenge: "Environmentally conscious polyethylene formulations and down-gauged films that minimize overall plastic usage."
  },
  {
    slot: "08",
    question: "Expert Guidance",
    solution: "Packaging Consultation & Samples",
    challenge: "Dedicated packaging assistance and trial samples to help you choose the right film, strap, or tape grade for your goods."
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
      {/* Ambient Lighting & Backdrop Atmosphere (Desktop GPU Optimized) */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="hidden sm:block absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-amber)]/10 blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute -left-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-blue)]/10 blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Section Header */}
        <div className="mb-10 sm:mb-14 md:mb-16 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2.5">
            PACKAGING SOLUTIONS & CAPABILITIES
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-[1.15] tracking-tight text-[var(--color-ink)] text-balance">
            Reliable Packaging Solutions Built for Your Business
          </h2>
          <div className="mt-3.5 sm:mt-4 h-1 sm:h-1.5 w-14 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal max-w-2xl text-balance">
            From high-performance stretch films to custom printed tapes, we deliver dependable materials made for real factory and warehouse operations.
          </p>
        </div>

        {/* Modern Bento / Capability Grid — 2 in a row on mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {solutionsList.map((item, index) => {
            const IconComponent = modernIcons[index % modernIcons.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl bg-white sm:bg-white/85 sm:backdrop-blur-2xl border border-slate-200/80 sm:border-white/95 shadow-[0_2px_12px_rgb(0,0,0,0.03)] sm:shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-white hover:border-[var(--color-amber)]/60 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 cursor-pointer transform-gpu"
              >
                {/* Ambient Soft Glow on Card Hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 sm:h-36 w-32 sm:w-36 rounded-full bg-[var(--color-amber)]/15 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

                <div>
                  {/* Top Bar: Squircle Dual-Tone Icon & Serial Counter */}
                  <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                    <div className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-500/5 sm:backdrop-blur-md text-[var(--color-amber-dark)] border border-amber-500/20 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[var(--color-amber)] group-hover:to-[var(--color-amber-2)] group-hover:text-white group-hover:shadow-md group-hover:shadow-amber-500/25">
                      <IconComponent className="h-4.5 w-4.5 sm:h-5 sm:w-5 md:h-5.5 md:w-5.5" />
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
