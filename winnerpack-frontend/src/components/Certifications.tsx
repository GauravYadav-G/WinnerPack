"use client";

import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section 
      id="certifications" 
      className="relative overflow-hidden bg-[var(--color-bone)] py-20 sm:py-28 md:py-36 border-t border-b border-[var(--color-line)]"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-stripes opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Header Section with Original Bespoke Copy */}
        <div className="mb-12 md:mb-20">
          <div className="pt-6 border-t border-[var(--color-line)] w-full mb-4">
            <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--color-blue)]">
              GLOBAL ACCREDITATIONS & QUALITY ASSURANCE
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] text-balance mb-6">
            Engineered & Certified for Global Compliance
          </h2>

          <p className="max-w-4xl text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-mute)] font-normal">
            Our industrial packaging solutions undergo rigorous international testing and compliance protocols. From sustainable forestry to food-grade safety and ISO quality management, we deliver certified reliability across every shipment.
          </p>
        </div>

        {/* Seamless Certifications Grid (No background boxes, larger icons blending into section background) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 md:gap-12 items-center justify-items-center">
          
          {/* 1. FSC Logo */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="bg-[#004d25] text-white p-3 rounded-xl flex flex-col items-center justify-center w-28 h-28 text-center shadow-md transition-shadow group-hover:shadow-xl">
              <svg className="w-8 h-8 mb-1 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L6 10h4v6H6l-2 3h16l-2-3h-4v-6h4L12 2z" />
              </svg>
              <span className="font-extrabold text-sm tracking-wider leading-none mb-0.5">FSC</span>
              <span className="text-[9px] opacity-90 leading-tight">www.fsc.org</span>
              <span className="text-[8px] opacity-75 leading-tight">FSC® C198096</span>
            </div>
          </motion.div>

          {/* 2. ISO 22000:2018 */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative w-26 h-26 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] transition-colors group-hover:bg-white/40">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/70 flex flex-col items-center justify-center p-1">
                <span className="text-[7px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-sm font-black leading-tight my-0.5">ISO</span>
                <span className="text-[8px] font-extrabold leading-none">22000:2018</span>
                <span className="text-[6px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 3. BRCGS Packaging Materials */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-2xl font-black text-[#0066b2] tracking-tighter">BRC</span>
                <span className="text-2xl font-black text-[#00a8b5] tracking-tighter">GS</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-800 leading-tight">Packaging Materials</span>
              <span className="mt-1.5 text-[8px] font-bold bg-[#0066b2] text-white px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                CERTIFICATED
              </span>
            </div>
          </motion.div>

          {/* 4. Sedex */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full bg-[#e30045] flex items-center justify-center text-white font-extrabold text-base tracking-tight shadow-md transition-shadow group-hover:shadow-xl">
              Sedex<span className="text-[9px] align-super">®</span>
            </div>
          </motion.div>

          {/* 5. FDA Approved */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative w-26 h-26 rounded-full border-2 border-[#104085] p-1 flex flex-col items-center justify-center text-center text-[#104085] transition-colors group-hover:bg-white/40">
              <div className="w-full h-full rounded-full border border-[#104085] flex flex-col items-center justify-center">
                <span className="text-[6px] font-bold tracking-widest uppercase">APPROVED</span>
                <span className="text-sm font-black tracking-tight leading-none my-0.5">FDA</span>
                <span className="text-[6px] font-bold tracking-widest uppercase">APPROVED</span>
              </div>
            </div>
          </motion.div>

          {/* 6. DIN Geprüft */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[#0066b2]">
              <div className="w-14 h-14 rounded-full border-2 border-[#0066b2] flex items-center justify-center relative">
                <span className="font-black text-sm tracking-tighter">DIN</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[#ce2127] rounded-full" />
              </div>
              <span className="text-sm font-bold text-[#0066b2]">Geprüft</span>
            </div>
          </motion.div>

          {/* 7. BRC Packaging Certificated */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="bg-[#008ac9] text-white p-2.5 rounded-xl flex flex-col items-center justify-center text-center w-26 h-26 shadow-md transition-shadow group-hover:shadow-xl">
              <svg className="w-5 h-5 mb-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-black leading-tight">BRC</span>
              <span className="text-[7px] font-semibold uppercase tracking-tight">PACKAGING</span>
              <span className="text-[6px] opacity-85 uppercase">CERTIFICATED</span>
            </div>
          </motion.div>

          {/* 8. AENOR */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black tracking-widest text-[var(--color-ink)] font-serif">AENOR</span>
              <div className="w-10 h-0.5 bg-[var(--color-blue)] mt-1 rounded-full" />
            </div>
          </motion.div>

          {/* 9. REACH Compliance */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="bg-[#0b2368] text-white p-2.5 rounded-xl flex flex-col items-center justify-center text-center w-26 h-26 relative shadow-md transition-shadow group-hover:shadow-xl">
              <span className="text-[7px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">REACH</span>
              <div className="w-9 h-9 rounded-full border border-amber-400/60 flex items-center justify-center text-amber-300 text-[10px]">
                ★ ★ ★
              </div>
              <span className="text-[6px] font-semibold uppercase tracking-widest mt-0.5">COMPLIANCE</span>
            </div>
          </motion.div>

          {/* 10. ISO 14001:2015 */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative w-26 h-26 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] transition-colors group-hover:bg-white/40">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/70 flex flex-col items-center justify-center p-1">
                <span className="text-[7px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-sm font-black leading-tight my-0.5">ISO</span>
                <span className="text-[8px] font-extrabold leading-none">14001:2015</span>
                <span className="text-[6px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 11. ISO 9001:2015 */}
          <motion.div 
            whileHover={{ scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative w-26 h-26 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] transition-colors group-hover:bg-white/40">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/70 flex flex-col items-center justify-center p-1">
                <span className="text-[7px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-sm font-black leading-tight my-0.5">ISO</span>
                <span className="text-[8px] font-extrabold leading-none">9001:2015</span>
                <span className="text-[6px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
