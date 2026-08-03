"use client";

import { motion } from "framer-motion";

interface CertificationItem {
  id: string;
  name: string;
  imageSrc: string;
}

const row1Certifications: CertificationItem[] = [
  {
    id: "fsc",
    name: "FSC Certified",
    imageSrc: "/certifications/fsc.svg",
  },
  {
    id: "iso-22000",
    name: "ISO 22000:2018",
    imageSrc: "/certifications/iso-22000.svg",
  },
  {
    id: "brcgs-pkg",
    name: "BRCGS Packaging Materials",
    imageSrc: "/certifications/brcgs-pkg.svg",
  },
  {
    id: "sedex",
    name: "Sedex Member",
    imageSrc: "/certifications/sedex-red.svg",
  },
  {
    id: "fda",
    name: "FDA Approved",
    imageSrc: "/certifications/fda-stamp.svg",
  },
  {
    id: "din",
    name: "DIN Geprüft",
    imageSrc: "/certifications/din-gepruft.svg",
  },
];

const row2Certifications: CertificationItem[] = [
  {
    id: "brc-blue",
    name: "BRC Packaging Certificated",
    imageSrc: "/certifications/brc-blue.svg",
  },
  {
    id: "aenor",
    name: "AENOR Standard",
    imageSrc: "/certifications/aenor.svg",
  },
  {
    id: "reach",
    name: "REACH Compliance",
    imageSrc: "/certifications/reach.svg",
  },
  {
    id: "iso-14001",
    name: "ISO 14001:2015",
    imageSrc: "/certifications/iso-14001.svg",
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    imageSrc: "/certifications/iso-9001.svg",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative overflow-hidden bg-[var(--color-bone)] py-10 sm:py-16 lg:py-24 border-t border-b border-[var(--color-line)]"
    >
      {/* Subtle Light Theme Background Accents matching Trusted Brands section */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[900px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-12 md:mb-16">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
            Quality & Compliance
          </span>
          <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-snug sm:leading-[1.15]">
            Certified Standards You Can Trust
          </h2>
          <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal">
            Our industrial packaging solutions undergo rigorous international testing and compliance protocols. From sustainable forestry to food-grade safety and ISO quality management, we deliver certified reliability.
          </p>
        </div>

        {/* 2-Row Certification Logos Grid with Uniform Cards */}
        <div className="space-y-3.5 sm:space-y-10 md:space-y-14">
          
          {/* Row 1 (6 Badges: 2 Columns on Mobile, 6 Columns on Desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-6 md:gap-8 items-center justify-items-center">
            {row1Certifications.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="w-full flex items-center justify-center"
                title={item.name}
              >
                <div className="flex items-center justify-center w-full h-16 sm:h-24 px-3 py-2 bg-white/70 backdrop-blur-xs border border-[var(--color-line)]/60 rounded-xl shadow-2xs hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer select-none">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="max-h-9 sm:max-h-16 max-w-[100px] sm:max-w-[160px] w-auto h-auto object-contain drop-shadow-xs"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2 (5 Badges: 2 Columns on Mobile, 5 Columns on Desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-6 md:gap-8 items-center justify-items-center max-w-5xl mx-auto">
            {row2Certifications.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 + index * 0.04 }}
                className="w-full flex items-center justify-center"
                title={item.name}
              >
                <div className="flex items-center justify-center w-full h-16 sm:h-24 px-3 py-2 bg-white/70 backdrop-blur-xs border border-[var(--color-line)]/60 rounded-xl shadow-2xs hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer select-none">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="max-h-9 sm:max-h-16 max-w-[100px] sm:max-w-[160px] w-auto h-auto object-contain drop-shadow-xs"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
