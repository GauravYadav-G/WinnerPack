"use client";

import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section 
      id="certifications" 
      className="relative overflow-hidden bg-[var(--color-bone)] py-20 sm:py-28 md:py-32 border-b border-[var(--color-line)]"
    >
      {/* Background Atmosphere */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Header Section */}
        <div className="mb-14 md:mb-20 max-w-4xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] text-balance mb-6">
            Engineered & Certified for Global Compliance
          </h2>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-mute)] font-normal">
            Our industrial packaging solutions undergo rigorous international testing and compliance protocols. From sustainable forestry to food-grade safety and ISO quality management, we deliver certified reliability across every shipment.
          </p>
        </div>

        {/* 10 High-End Accreditations Vector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-10 md:gap-12 items-center justify-items-center">
          
          {/* 1. FSC Logo */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="bg-[#004d25] text-white p-3 rounded-2xl flex flex-col items-center justify-center w-28 h-28 text-center shadow-md transition-shadow group-hover:shadow-xl">
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
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative w-26 h-26 rounded-full border-2 border-[#1e539d] p-1 flex flex-col items-center justify-center text-center text-[#1e539d] transition-colors group-hover:bg-blue-50/50">
              <div className="w-full h-full rounded-full border border-dashed border-[#1e539d]/70 flex flex-col items-center justify-center p-1">
                <span className="font-black text-xl leading-none">ISO</span>
                <span className="text-[10px] font-bold tracking-tighter">22000:2018</span>
                <span className="text-[7px] uppercase tracking-widest font-semibold mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 3. BRCGS Packaging Materials */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="bg-[#002f6c] text-white p-3 rounded-2xl flex flex-col items-center justify-center w-28 h-28 text-center shadow-md transition-shadow group-hover:shadow-xl">
              <span className="font-black text-lg tracking-tight leading-none mb-0.5 text-[#ffc72c]">BRCGS</span>
              <span className="text-[9px] font-semibold leading-tight">Packaging Materials</span>
              <span className="text-[8px] uppercase tracking-widest text-[#ffc72c] font-bold mt-1">CERTIFICATED</span>
            </div>
          </motion.div>

          {/* 4. Sedex APPROVED */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative w-28 h-28 rounded-2xl border-2 border-[#009b84] bg-[#009b84]/5 p-2 flex flex-col items-center justify-center text-center text-[#009b84]">
              <span className="font-black text-2xl tracking-tighter leading-none">Sedex<span className="text-xs font-normal">®</span></span>
              <span className="text-[9px] uppercase tracking-widest font-bold mt-1 text-[#006837]">APPROVED</span>
            </div>
          </motion.div>

          {/* 5. FDA APPROVED */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-28 h-28 rounded-2xl bg-[#003366] text-white p-3 flex flex-col items-center justify-center text-center shadow-md">
              <span className="font-black text-3xl tracking-tighter leading-none mb-1 text-[#66c2ff]">FDA</span>
              <span className="text-[8px] uppercase tracking-widest font-bold text-white/90">APPROVED</span>
            </div>
          </motion.div>

          {/* 6. DIN Geprüft */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-26 h-26 rounded-full border-2 border-slate-800 p-1 flex flex-col items-center justify-center text-center text-slate-800">
              <span className="font-black text-2xl tracking-tighter leading-none">DIN</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold">Geprüft</span>
            </div>
          </motion.div>

          {/* 7. BRC PACKAGING */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-28 h-28 rounded-2xl bg-[#a51c30] text-white p-3 flex flex-col items-center justify-center text-center shadow-md">
              <span className="font-black text-xl leading-none mb-0.5">BRC</span>
              <span className="text-[8px] uppercase font-bold tracking-tight">PACKAGING</span>
              <span className="text-[7px] uppercase tracking-widest text-[#ffc72c] font-semibold mt-1">CERTIFICATED</span>
            </div>
          </motion.div>

          {/* 8. AENOR REACH */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-28 h-28 rounded-2xl border-2 border-[#0060a8] bg-[#0060a8]/5 p-2 flex flex-col items-center justify-center text-center text-[#0060a8]">
              <span className="font-black text-sm uppercase tracking-wider leading-none">AENOR</span>
              <span className="font-bold text-xs mt-0.5">REACH</span>
              <span className="text-[8px] text-[var(--color-amber)] my-0.5">★ ★ ★</span>
              <span className="text-[7px] uppercase tracking-widest font-bold text-slate-700">COMPLIANCE</span>
            </div>
          </motion.div>

          {/* 9. ISO 14001:2015 */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-26 h-26 rounded-full border-2 border-[#007a3d] p-1 flex flex-col items-center justify-center text-center text-[#007a3d]">
              <div className="w-full h-full rounded-full border border-dashed border-[#007a3d]/70 flex flex-col items-center justify-center p-1">
                <span className="font-black text-xl leading-none">ISO</span>
                <span className="text-[10px] font-bold tracking-tighter">14001:2015</span>
                <span className="text-[7px] uppercase tracking-widest font-semibold mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

          {/* 10. ISO 9001:2015 */}
          <motion.div 
            whileHover={{ scale: 1.12, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-26 h-26 rounded-full border-2 border-[#003882] p-1 flex flex-col items-center justify-center text-center text-[#003882]">
              <div className="w-full h-full rounded-full border border-dashed border-[#003882]/70 flex flex-col items-center justify-center p-1">
                <span className="font-black text-xl leading-none">ISO</span>
                <span className="text-[10px] font-bold tracking-tighter">9001:2015</span>
                <span className="text-[7px] uppercase tracking-widest font-semibold mt-0.5">COMPANY</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
