"use client";

import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 max-w-4xl">
          {/* Eyebrow with top line matching the screenshot */}
          <div className="pt-4 border-t border-slate-300 w-full mb-6">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-500 uppercase">
              OUR CERTIFICATIONS
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Our Commitment to Quality Standards
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Our certifications are the testament to our unwavering dedication to quality and compliance. From ISO standards to industry-specific accreditations, we ensure that every product meets the highest benchmarks of excellence.
          </p>
        </div>

        {/* Certifications Grid (Matching original 2-row layout from image) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
          
          {/* 1. FSC Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="bg-[#004d25] text-white p-2.5 rounded flex flex-col items-center justify-center w-full h-full text-center">
              <svg className="w-6 h-6 mb-1 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L6 10h4v6H6l-2 3h16l-2-3h-4v-6h4L12 2z" />
              </svg>
              <span className="font-extrabold text-sm tracking-wider leading-none mb-0.5">FSC</span>
              <span className="text-[8px] opacity-90 leading-tight">www.fsc.org</span>
              <span className="text-[7px] opacity-75 leading-tight">FSC® C198096</span>
              <span className="text-[6px] opacity-70 leading-tight mt-0.5">The mark of responsible forestry</span>
            </div>
          </motion.div>

          {/* 2. ISO 22000:2018 */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="relative w-20 h-20 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d]">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/60 flex flex-col items-center justify-center p-1">
                <span className="text-[7px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-xs font-black leading-tight my-0.5">ISO</span>
                <span className="text-[8px] font-bold leading-none">22000:2018</span>
                <span className="text-[6px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 3. BRCGS Packaging Materials */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xl font-black text-[#0066b2] tracking-tighter">BRC</span>
                <span className="text-xl font-black text-[#00a8b5] tracking-tighter">GS</span>
              </div>
              <span className="text-[9px] font-medium text-slate-700 leading-tight">Packaging Materials</span>
              <span className="mt-1 text-[8px] font-bold bg-[#0066b2] text-white px-2 py-0.5 rounded uppercase tracking-wider">
                CERTIFICATED
              </span>
            </div>
          </motion.div>

          {/* 4. Sedex */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-[#e30045] flex items-center justify-center text-white font-extrabold text-base tracking-tight shadow-inner">
              Sedex<span className="text-[9px] align-super">®</span>
            </div>
          </motion.div>

          {/* 5. FDA Approved */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="relative w-20 h-20 rounded-full border-2 border-[#104085] p-1 flex flex-col items-center justify-center text-center text-[#104085]">
              <div className="w-full h-full rounded-full border border-[#104085] flex flex-col items-center justify-center">
                <span className="text-[6px] font-bold tracking-widest uppercase">APPROVED</span>
                <span className="text-base font-black tracking-tight leading-none my-0.5">FDA</span>
                <span className="text-[6px] font-bold tracking-widest uppercase">APPROVED</span>
              </div>
            </div>
          </motion.div>

          {/* 6. DIN Geprüft */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-1.5 text-[#0066b2]">
              <div className="w-12 h-12 rounded-full border-2 border-[#0066b2] flex items-center justify-center relative">
                <span className="font-black text-xs tracking-tighter">DIN</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#ce2127] rounded-full" />
              </div>
              <span className="text-xs font-bold text-[#0066b2]">Geprüft</span>
            </div>
          </motion.div>

          {/* Row 2 items */}
          {/* 7. BRC Packaging Certificated */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="bg-[#008ac9] text-white p-2 rounded-md flex flex-col items-center justify-center text-center w-20 h-20">
              <svg className="w-5 h-5 mb-0.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-black leading-tight">BRC</span>
              <span className="text-[7px] font-semibold uppercase tracking-tight">PACKAGING</span>
              <span className="text-[6px] opacity-80 uppercase">CERTIFICATED</span>
            </div>
          </motion.div>

          {/* 8. AENOR */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black tracking-wider text-slate-900 font-serif">AENOR</span>
            </div>
          </motion.div>

          {/* 9. REACH Compliance */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="bg-[#0b2368] text-white p-2 rounded-md flex flex-col items-center justify-center text-center w-20 h-20 relative">
              <span className="text-[7px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">REACH</span>
              <div className="w-8 h-8 rounded-full border border-amber-400/50 flex items-center justify-center text-amber-300 text-[10px]">
                ★ ★ ★
              </div>
              <span className="text-[6px] font-semibold uppercase tracking-widest mt-0.5">COMPLIANCE</span>
            </div>
          </motion.div>

          {/* 10. ISO 14001:2015 */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="relative w-20 h-20 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d]">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/60 flex flex-col items-center justify-center p-1">
                <span className="text-[7px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-xs font-black leading-tight my-0.5">ISO</span>
                <span className="text-[8px] font-bold leading-none">14001:2015</span>
                <span className="text-[6px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 11. ISO 9001:2015 */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm border border-slate-200/60 w-full h-28 hover:shadow-md transition-all"
          >
            <div className="relative w-20 h-20 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d]">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/60 flex flex-col items-center justify-center p-1">
                <span className="text-[7px] font-bold uppercase tracking-tighter">CERTIFIED</span>
                <span className="text-xs font-black leading-tight my-0.5">ISO</span>
                <span className="text-[8px] font-bold leading-none">9001:2015</span>
                <span className="text-[6px] font-semibold uppercase mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
