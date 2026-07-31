"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, Award } from "lucide-react";

interface ClientBrand {
  name: string;
  renderLogo: () => React.ReactNode;
}

const clientBrands: ClientBrand[] = [
  // Row 1
  {
    name: "Adani",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#0060a8]">
          adani<span className="text-[#a51c30] text-xl font-normal">™</span>
        </span>
      </div>
    ),
  },
  {
    name: "Amway",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl tracking-tight text-[#002f6c] italic font-serif">
          Amway
        </span>
      </div>
    ),
  },
  {
    name: "Bisleri",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl tracking-tight text-[#009b84] font-serif">
          Bisleri<span className="text-xs font-sans align-top text-[#006837]">®</span>
        </span>
      </div>
    ),
  },
  {
    name: "Britannia",
    renderLogo: () => (
      <div className="border-2 border-[#d32f2f] px-3 py-1 rounded bg-white/80 text-center shadow-xs">
        <span className="font-black text-lg sm:text-xl text-[#d32f2f] uppercase tracking-wider block leading-none">
          BRITANNIA
        </span>
        <span className="text-[7px] text-[#006837] font-semibold block leading-tight">Eat Healthy, Think Better</span>
      </div>
    ),
  },
  {
    name: "Coca-Cola",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-2xl sm:text-3xl text-[#e41e2b] italic font-serif tracking-tighter">
          Coca-Cola
        </span>
      </div>
    ),
  },
  {
    name: "Colgate-Palmolive",
    renderLogo: () => (
      <div className="flex items-center gap-1">
        <span className="font-black text-sm sm:text-base text-[#004b87] uppercase tracking-tighter">COLGATE-PALMOLIVE</span>
      </div>
    ),
  },
  {
    name: "Dabur",
    renderLogo: () => (
      <div className="flex items-center gap-1.5 text-[#00703c]">
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L4 12h5v10h6V12h5L12 2z" />
        </svg>
        <span className="font-bold text-2xl sm:text-3xl italic">Dabur</span>
      </div>
    ),
  },
  {
    name: "Del Monte",
    renderLogo: () => (
      <div className="bg-[#005a36] border-2 border-[#d32f2f] px-3 py-1 rounded-full text-center shadow-xs">
        <span className="font-black text-xs sm:text-sm text-[#ffcb05] uppercase tracking-tight block">Del Monte</span>
        <span className="text-[6px] text-white font-bold block uppercase tracking-widest">Quality</span>
      </div>
    ),
  },

  // Row 2
  {
    name: "Dr. Reddy's",
    renderLogo: () => (
      <div className="flex items-center gap-1 text-[#3f2b96]">
        <span className="font-extrabold text-xl sm:text-2xl">Dr.Reddy's</span>
        <div className="w-3 h-3 rounded-full bg-[#e30045]" />
      </div>
    ),
  },
  {
    name: "Emami",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#e3000f] tracking-tight">
          emami
        </span>
      </div>
    ),
  },
  {
    name: "Godrej",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#00529b] tracking-tighter font-serif italic">
          Godrej
        </span>
      </div>
    ),
  },
  {
    name: "Haldiram's",
    renderLogo: () => (
      <div className="bg-[#e31e24] text-white px-3 py-1 rounded-md text-center shadow-xs">
        <span className="font-bold text-sm sm:text-base tracking-wide italic">Haldiram's</span>
      </div>
    ),
  },
  {
    name: "Hindustan Unilever",
    renderLogo: () => (
      <div className="flex items-center gap-1 text-[#1428a0]">
        <span className="font-black text-lg sm:text-xl font-serif">HUL</span>
      </div>
    ),
  },
  {
    name: "ITC Limited",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#003366] tracking-widest">
          ITC
        </span>
      </div>
    ),
  },
  {
    name: "Jindal Steel",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-lg sm:text-xl text-[#005a9c] uppercase tracking-wider">
          JINDAL
        </span>
      </div>
    ),
  },
  {
    name: "L'Oréal",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-widest uppercase">
          L'ORÉAL
        </span>
      </div>
    ),
  },

  // Row 3
  {
    name: "Lupin",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-xl sm:text-2xl text-[#0072ce] tracking-wide uppercase">
          LUPIN
        </span>
      </div>
    ),
  },
  {
    name: "Mother Dairy",
    renderLogo: () => (
      <div className="bg-[#007b43] text-white px-3 py-1 rounded text-center">
        <span className="font-black text-xs sm:text-sm uppercase tracking-tight">MOTHER DAIRY</span>
      </div>
    ),
  },
  {
    name: "Nestlé",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-extrabold text-2xl sm:text-3xl text-[#7b512c] font-serif">
          Nestlé
        </span>
      </div>
    ),
  },
  {
    name: "P&G",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#00205b] font-serif italic">
          P&G
        </span>
      </div>
    ),
  },
  {
    name: "Patanjali",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-xl sm:text-2xl text-[#006837] tracking-tight">
          PATANJALI
        </span>
      </div>
    ),
  },
  {
    name: "PepsiCo",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#002d62]">
          pepsi
        </span>
      </div>
    ),
  },
  {
    name: "PIDILITE",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-xl sm:text-2xl text-[#003882] tracking-wider uppercase">
          PIDILITE
        </span>
      </div>
    ),
  },
  {
    name: "Radico Khaitan",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-lg sm:text-xl text-[#8b1538] font-serif">
          RADICO
        </span>
      </div>
    ),
  },

  // Row 4
  {
    name: "Pfizer",
    renderLogo: () => (
      <div className="font-black text-2xl sm:text-3xl text-[#0093d0] font-serif italic">
        Pfizer
      </div>
    ),
  },
  {
    name: "Reckitt Benckiser",
    renderLogo: () => (
      <div className="flex items-center gap-1 text-[#002f6c]">
        <span className="font-black text-sm sm:text-base">Reckitt Benckiser</span>
      </div>
    ),
  },
  {
    name: "Samsung",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-xl sm:text-2xl text-[#1428a0] tracking-widest uppercase">
          SAMSUNG
        </span>
      </div>
    ),
  },
  {
    name: "SC Johnson",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-lg sm:text-xl text-[#d32f2f]">
          sc<span className="font-black text-slate-900">johnson</span>
        </span>
      </div>
    ),
  },
  {
    name: "Unilever",
    renderLogo: () => (
      <div className="flex flex-col items-center text-[#1f365d]">
        <span className="font-black text-2xl sm:text-3xl font-serif">Unilever</span>
      </div>
    ),
  },
  {
    name: "Wipro",
    renderLogo: () => (
      <div className="flex items-center gap-1.5 text-[#333]">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-blue-600" />
        <span className="font-bold text-xl sm:text-2xl">wipro</span>
      </div>
    ),
  },
  {
    name: "Diageo",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-xl sm:text-2xl text-[#9b2743] uppercase tracking-widest">
          DIAGEO
        </span>
      </div>
    ),
  },
  {
    name: "Wrigley",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-xl sm:text-2xl text-[#0080a4] uppercase tracking-wider">
          WRIGLEY
        </span>
      </div>
    ),
  },
];

export default function ClientLogoStrip() {
  return (
    <section id="clients" className="relative overflow-hidden bg-slate-950 py-20 sm:py-28 text-white border-t border-b border-white/10">
      {/* Background accents matching awwwards.com high-end dark design */}
      <div className="absolute inset-0 bg-stripes opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[900px] rounded-full bg-[var(--color-blue)]/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Awwwards.com Editorial Split Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-20 pb-10 border-b border-white/10">
          
          {/* Left Column: Eyebrow + Big Bold Title */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-amber)] text-xs font-semibold uppercase tracking-widest mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber)] animate-pulse" />
              OUR CLIENT PORTFOLIO
            </div>

            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Brands from all over the world love us!
            </h2>
          </div>

          {/* Right Column: Detailed Narrative Subtitle + Proof Badges */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              From renowned brands across the globe, our client portfolio showcases the trust and satisfaction of brands, reflecting our commitment to excellence and customer satisfaction.
            </p>

            {/* Quick Proof Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[var(--color-amber)]" />
                <span className="text-xs font-semibold text-white/80">32+ Global Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--color-amber)]" />
                <span className="text-xs font-semibold text-white/80">100% Quality QC</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[var(--color-amber)]" />
                <span className="text-xs font-semibold text-white/80">ISO Certified</span>
              </div>
            </div>
          </div>

        </div>

        {/* High-End Interactive Logo Grid (Awwwards / Figma Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-5 items-center justify-items-center">
          {clientBrands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.03 }}
              className="group relative w-full h-24 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-amber)]/50 hover:bg-white/10 transition-all duration-500 backdrop-blur-xs flex items-center justify-center p-3 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Subtle card glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-amber)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Logo Render Container */}
              <div className="relative z-10 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {brand.renderLogo()}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
