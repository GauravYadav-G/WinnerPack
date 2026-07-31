"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const certificationsList = [
  {
    id: "fsc",
    name: "FSC® C198096",
    tagline: "Sustainable Forestry",
    renderLogo: () => (
      <div className="bg-[#004d25] text-white px-4 py-2.5 rounded-xl flex flex-col items-center justify-center w-24 h-24 text-center shadow-xs">
        <svg className="w-7 h-7 mb-0.5 text-white fill-current" viewBox="0 0 24 24">
          <path d="M12 2L6 10h4v6H6l-2 3h16l-2-3h-4v-6h4L12 2z" />
        </svg>
        <span className="font-extrabold text-xs tracking-wider leading-none mb-0.5">FSC</span>
        <span className="text-[8px] opacity-90 leading-tight">www.fsc.org</span>
        <span className="text-[7px] opacity-75 leading-tight">C198096</span>
      </div>
    ),
  },
  {
    id: "iso-22000",
    name: "ISO 22000:2018",
    tagline: "Food Safety Management",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] bg-blue-50/30">
        <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/70 flex flex-col items-center justify-center p-1">
          <span className="font-black text-lg leading-none">ISO</span>
          <span className="text-[9px] font-extrabold tracking-tighter">22000:2018</span>
          <span className="text-[6px] uppercase tracking-widest font-bold mt-0.5">SAFETY</span>
        </div>
      </div>
    ),
  },
  {
    id: "brcgs",
    name: "BRCGS Packaging",
    tagline: "Global Packaging Materials",
    renderLogo: () => (
      <div className="bg-[#002f6c] text-white p-2.5 rounded-xl flex flex-col items-center justify-center w-24 h-24 text-center shadow-xs">
        <span className="font-black text-base tracking-tight leading-none mb-0.5 text-[#ffc72c]">BRCGS</span>
        <span className="text-[8px] font-bold leading-tight">Packaging</span>
        <span className="text-[7px] uppercase tracking-widest text-[#ffc72c] font-bold mt-1">CERTIFIED</span>
      </div>
    ),
  },
  {
    id: "sedex",
    name: "Sedex® Approved",
    tagline: "Ethical Supply Chain",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-xl border-2 border-[#009b84] bg-[#009b84]/5 p-2 flex flex-col items-center justify-center text-center text-[#009b84]">
        <span className="font-black text-xl tracking-tighter leading-none">Sedex<span className="text-xs font-normal">®</span></span>
        <span className="text-[8px] uppercase tracking-widest font-extrabold mt-1 text-[#006837]">APPROVED</span>
      </div>
    ),
  },
  {
    id: "fda",
    name: "FDA Compliance",
    tagline: "Food & Pharma Grade",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-xl bg-[#003366] text-white p-2.5 flex flex-col items-center justify-center text-center shadow-xs">
        <span className="font-black text-2xl tracking-tighter leading-none mb-0.5 text-[#66c2ff]">FDA</span>
        <span className="text-[7px] uppercase tracking-widest font-extrabold text-white/90">APPROVED</span>
      </div>
    ),
  },
  {
    id: "din",
    name: "DIN Geprüft",
    tagline: "German Quality Standard",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-full border-2 border-slate-800 p-1 flex flex-col items-center justify-center text-center text-slate-800 bg-slate-50">
        <span className="font-black text-xl tracking-tighter leading-none">DIN</span>
        <span className="text-[8px] uppercase tracking-wider font-bold mt-0.5">Geprüft</span>
      </div>
    ),
  },
  {
    id: "brc",
    name: "BRC Packaging",
    tagline: "High Hygiene Standard",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-xl bg-[#a51c30] text-white p-2.5 flex flex-col items-center justify-center text-center shadow-xs">
        <span className="font-black text-lg leading-none mb-0.5">BRC</span>
        <span className="text-[7px] uppercase font-bold tracking-tight">PACKAGING</span>
        <span className="text-[6px] uppercase tracking-widest text-[#ffc72c] font-bold mt-1">CERTIFIED</span>
      </div>
    ),
  },
  {
    id: "reach",
    name: "AENOR REACH",
    tagline: "Chemical Safety Standard",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-xl border-2 border-[#0060a8] bg-[#0060a8]/5 p-2 flex flex-col items-center justify-center text-center text-[#0060a8]">
        <span className="font-black text-xs uppercase tracking-wider leading-none">AENOR</span>
        <span className="font-bold text-xs mt-0.5">REACH</span>
        <span className="text-[7px] text-[var(--color-amber)] my-0.5">★ ★ ★</span>
        <span className="text-[6px] uppercase tracking-widest font-bold text-slate-700">COMPLIANT</span>
      </div>
    ),
  },
  {
    id: "iso-14001",
    name: "ISO 14001:2015",
    tagline: "Environmental Management",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-full border-2 border-[#007a3d] p-1 flex flex-col items-center justify-center text-center text-[#007a3d] bg-emerald-50/30">
        <div className="w-full h-full rounded-full border border-dashed border-[#007a3d]/70 flex flex-col items-center justify-center p-1">
          <span className="font-black text-lg leading-none">ISO</span>
          <span className="text-[9px] font-extrabold tracking-tighter">14001:2015</span>
          <span className="text-[6px] uppercase tracking-widest font-bold mt-0.5">ECO SYSTEM</span>
        </div>
      </div>
    ),
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    tagline: "Quality Management System",
    renderLogo: () => (
      <div className="w-24 h-24 rounded-full border-2 border-[#003882] p-1 flex flex-col items-center justify-center text-center text-[#003882] bg-blue-50/30">
        <div className="w-full h-full rounded-full border border-dashed border-[#003882]/70 flex flex-col items-center justify-center p-1">
          <span className="font-black text-lg leading-none">ISO</span>
          <span className="text-[9px] font-extrabold tracking-tighter">9001:2015</span>
          <span className="text-[6px] uppercase tracking-widest font-bold mt-0.5">QUALITY</span>
        </div>
      </div>
    ),
  },
];

export default function Certifications() {
  return (
    <section 
      id="certifications" 
      className="relative overflow-hidden bg-[var(--color-bone)] py-20 sm:py-28 md:py-32 border-b border-[var(--color-line)]"
    >
      {/* Background Atmosphere Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-20 max-w-4xl">


          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] text-balance mb-6">
            Engineered & Certified for Global Compliance
          </h2>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-mute)] font-normal">
            Our industrial packaging solutions undergo rigorous international testing and compliance protocols. From sustainable forestry to food-grade safety and ISO quality management, we deliver certified reliability across every shipment.
          </p>
        </div>

        {/* Mobile: horizontal snap-scroll | Desktop: grid */}
        {/* Mobile strip */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:hidden scrollbar-none">
          {certificationsList.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[62vw] max-w-[220px] snap-start flex flex-col items-center justify-between rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 shadow-sm p-4 min-h-[180px]"
            >
              <div className="flex-1 flex items-center justify-center my-2">{item.renderLogo()}</div>
              <div className="w-full text-center pt-3 border-t border-[var(--color-line)]/40">
                <h3 className="font-display text-xs font-bold text-[var(--color-ink)] leading-tight">{item.name}</h3>
                <div className="flex items-center justify-center gap-1 mt-1 text-[9px] text-[var(--color-mute)] font-medium">
                  <CheckCircle className="h-3 w-3 text-[var(--color-amber)]" />
                  <span>{item.tagline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {certificationsList.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group flex flex-col items-center justify-between rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xs p-5 transition-all duration-500 hover:bg-white/80 hover:shadow-xl hover:border-[var(--color-amber)]/30 hover:-translate-y-1.5 min-h-[200px] cursor-pointer"
            >
              {/* Emblem Container */}
              <div className="flex-1 flex items-center justify-center my-2 group-hover:scale-108 transition-transform duration-500">
                {item.renderLogo()}
              </div>

              {/* Title & Status */}
              <div className="w-full text-center pt-3 border-t border-[var(--color-line)]/40">
                <h3 className="font-display text-xs sm:text-sm font-bold text-[var(--color-ink)] leading-tight group-hover:text-[var(--color-amber-dark)] transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-[var(--color-mute)] font-medium">
                  <CheckCircle className="h-3 w-3 text-[var(--color-amber)] opacity-90" />
                  <span>{item.tagline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
