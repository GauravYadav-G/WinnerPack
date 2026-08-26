"use client";

import { motion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";

interface CertificationItem {
  id: string;
  name: string;
  authority: string;
  imageSrc: string;
}

const certificationsList: CertificationItem[] = [
  {
    id: "gst",
    name: "GST Registered",
    authority: "Govt. of India",
    imageSrc: "/certifications/gst_nation_tax_market.png",
  },
  {
    id: "msme",
    name: "MSME Certified",
    authority: "Ministry of MSME",
    imageSrc: "/certifications/msme_official.svg",
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    authority: "Quality Management",
    imageSrc: "/certifications/iso_official.svg",
  },
  {
    id: "rohs",
    name: "RoHS Compliant",
    authority: "Hazardous Substance Free",
    imageSrc: "/certifications/rohs_official.svg",
  },
  {
    id: "cte",
    name: "CTE (Pollution NOC)",
    authority: "Consent to Establish",
    imageSrc: "/certifications/cpcb_official.svg",
  },
  {
    id: "cto",
    name: "CTO (UP Pollution)",
    authority: "UPPCB Consent to Operate",
    imageSrc: "/certifications/uppcb_cto.png",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden bg-[var(--color-bone)]/60 py-12 sm:py-16 lg:py-24 border-t border-b border-[var(--color-line)]"
    >
      {/* Background Lighting & Blueprint Atmosphere (Desktop GPU Optimized) */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="hidden sm:block absolute -left-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[var(--color-amber)]/10 blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[var(--color-blue)]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
            GOVERNMENT & QUALITY COMPLIANCE
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-snug sm:leading-[1.15]">
            Certified Standards You Can Trust
          </h2>
          <div className="mt-3.5 sm:mt-4 h-1 sm:h-1.5 w-14 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal max-w-2xl text-balance">
            Our manufacturing operations, quality management, and environmental protocols operate under strict national and international statutory certifications.
          </p>
        </div>

        {/* Modern 6-Column Architectural Certification Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {certificationsList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white sm:bg-white/85 sm:backdrop-blur-xl border border-slate-200/80 sm:border-white/95 shadow-[0_2px_12px_rgb(0,0,0,0.03)] sm:shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 sm:p-5 text-center transition-all duration-300 hover:bg-white hover:border-[var(--color-amber)]/50 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 cursor-pointer transform-gpu"
            >
              {/* Logo Presentation Area */}
              <div className="flex items-center justify-center h-20 sm:h-24 w-full my-auto px-2 py-2">
                <OptimizedImage
                  src={item.imageSrc}
                  alt={item.name}
                  className="max-h-14 sm:max-h-18 max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-108 drop-shadow-xs"
                />
              </div>

              {/* Title & Authority Subtitle */}
              <div className="mt-3 pt-2.5 border-t border-[var(--color-line)]/60">
                <h3 className="font-display text-xs sm:text-[13px] font-bold text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-blue-deep)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[var(--color-mute)] font-medium mt-0.5 truncate">
                  {item.authority}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
