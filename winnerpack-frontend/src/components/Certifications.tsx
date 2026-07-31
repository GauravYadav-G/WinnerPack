"use client";

import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-[var(--color-bone)] py-10 md:py-16 border-t border-b border-[var(--color-line)]">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-stripes opacity-40 pointer-events-none" />
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Header Section matching Website UI */}
        <div className="mb-8 md:mb-12 border-t border-[var(--color-line)] pt-6">
          <div className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--color-blue)] mb-2">
            OUR CERTIFICATIONS
          </div>

          <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance mb-4">
            Our Commitment to Quality Standards
          </h2>

          <p className="max-w-4xl text-xs sm:text-sm md:text-base leading-relaxed text-[var(--color-mute)]">
            Our certifications are the testament to our unwavering dedication to quality and compliance. From ISO standards to industry-specific accreditations, we ensure that every product meets the highest benchmarks of excellence.
          </p>
        </div>

        {/* Certifications Grid with WinnerPack Card Styling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 items-stretch">
          
          {/* 1. FSC */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="bg-[#004d25] text-white p-2.5 rounded-lg flex flex-col items-center justify-center w-full h-full text-center transition-transform group-hover:scale-105">
              <svg className="w-6 h-6 mb-1 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L6 10h4v6H6l-2 3h16l-2-3h-4v-6h4L12 2z" />
              </svg>
              <span className="font-extrabold text-xs tracking-wider leading-none mb-0.5">FSC</span>
              <span className="text-[8px] opacity-90 leading-tight">www.fsc.org</span>
              <span className="text-[7px] opacity-75 leading-tight">FSC® C198096</span>
              <span className="text-[6px] opacity-70 leading-tight mt-0.5">The mark of responsible forestry</span>
            </div>
          </motion.div>

          {/* 2. ISO 22000:2018 */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="relative w-18 h-18 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/60 flex flex-col items-center justify-center p-1">
                <span className="text-[6px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-xs font-black leading-tight my-0.5">ISO</span>
                <span className="text-[7px] font-bold leading-none">22000:2018</span>
                <span className="text-[5px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 3. BRCGS Packaging Materials */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="flex flex-col items-center justify-center text-center transition-transform group-hover:scale-105">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-lg font-black text-[#0066b2] tracking-tighter">BRC</span>
                <span className="text-lg font-black text-[#00a8b5] tracking-tighter">GS</span>
              </div>
              <span className="text-[9px] font-medium text-slate-700 leading-tight">Packaging Materials</span>
              <span className="mt-1 text-[7px] font-bold bg-[#0066b2] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                CERTIFICATED
              </span>
            </div>
          </motion.div>

          {/* 4. Sedex */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="w-16 h-16 rounded-full bg-[#e30045] flex items-center justify-center text-white font-extrabold text-sm tracking-tight shadow-inner transition-transform group-hover:scale-105">
              Sedex<span className="text-[8px] align-super">®</span>
            </div>
          </motion.div>

          {/* 5. FDA Approved */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="relative w-18 h-18 rounded-full border-2 border-[#104085] p-1 flex flex-col items-center justify-center text-center text-[#104085] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full border border-[#104085] flex flex-col items-center justify-center">
                <span className="text-[5px] font-bold tracking-widest uppercase">APPROVED</span>
                <span className="text-xs font-black tracking-tight leading-none my-0.5">FDA</span>
                <span className="text-[5px] font-bold tracking-widest uppercase">APPROVED</span>
              </div>
            </div>
          </motion.div>

          {/* 6. DIN Geprüft */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="flex items-center gap-1.5 text-[#0066b2] transition-transform group-hover:scale-105">
              <div className="w-10 h-10 rounded-full border-2 border-[#0066b2] flex items-center justify-center relative">
                <span className="font-black text-[11px] tracking-tighter">DIN</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[var(--color-blue-deep)] rounded-full" />
              </div>
              <span className="text-xs font-bold text-[#0066b2]">Geprüft</span>
            </div>
          </motion.div>

          {/* 7. BRC Packaging Certificated */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="bg-[#008ac9] text-white p-2 rounded-lg flex flex-col items-center justify-center text-center w-18 h-18 transition-transform group-hover:scale-105">
              <svg className="w-4 h-4 mb-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[11px] font-black leading-tight">BRC</span>
              <span className="text-[6px] font-semibold uppercase tracking-tight">PACKAGING</span>
              <span className="text-[5px] opacity-80 uppercase">CERTIFICATED</span>
            </div>
          </motion.div>

          {/* 8. AENOR */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="flex flex-col items-center justify-center text-center transition-transform group-hover:scale-105">
              <span className="text-lg font-black tracking-wider text-[var(--color-ink)] font-serif">AENOR</span>
            </div>
          </motion.div>

          {/* 9. REACH Compliance */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="bg-[#0b2368] text-white p-2 rounded-lg flex flex-col items-center justify-center text-center w-18 h-18 relative transition-transform group-hover:scale-105">
              <span className="text-[6px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">REACH</span>
              <div className="w-7 h-7 rounded-full border border-amber-400/50 flex items-center justify-center text-amber-300 text-[8px]">
                ★ ★ ★
              </div>
              <span className="text-[5px] font-semibold uppercase tracking-widest mt-0.5">COMPLIANCE</span>
            </div>
          </motion.div>

          {/* 10. ISO 14001:2015 */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="relative w-18 h-18 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/60 flex flex-col items-center justify-center p-1">
                <span className="text-[6px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-xs font-black leading-tight my-0.5">ISO</span>
                <span className="text-[7px] font-bold leading-none">14001:2015</span>
                <span className="text-[5px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 11. ISO 9001:2015 */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lg min-h-[120px]"
          >
            <div className="relative w-18 h-18 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/60 flex flex-col items-center justify-center p-1">
                <span className="text-[6px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-xs font-black leading-tight my-0.5">ISO</span>
                <span className="text-[7px] font-bold leading-none">9001:2015</span>
                <span className="text-[5px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
