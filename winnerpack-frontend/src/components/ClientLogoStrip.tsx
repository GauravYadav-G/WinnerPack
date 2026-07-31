"use client";

import { motion } from "framer-motion";

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
        <span className="font-black text-2xl sm:text-3xl text-[#0072ce] tracking-tight">
          emami<span className="text-[#f37021] text-lg font-bold">*</span>
        </span>
      </div>
    ),
  },
  {
    name: "Ferrero Rocher",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-sm sm:text-base text-[#8b5a2b] font-serif tracking-widest uppercase">
          FERRERO ROCHER
        </span>
      </div>
    ),
  },
  {
    name: "Godrej",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#e30045] italic font-serif">
          Godrej
        </span>
      </div>
    ),
  },
  {
    name: "GSK",
    renderLogo: () => (
      <div className="flex items-center gap-1.5 text-[#f36f21]">
        <div className="w-7 h-7 rounded-full bg-[#f36f21] text-white flex items-center justify-center text-[10px] font-black">gsk</div>
        <span className="text-[8px] font-bold text-slate-600 uppercase">GlaxoSmithKline</span>
      </div>
    ),
  },
  {
    name: "Heinz",
    renderLogo: () => (
      <div className="bg-[#e31837] text-white px-4 py-1 rounded font-black text-base sm:text-lg tracking-wider font-serif uppercase text-center shadow-xs">
        HEINZ
      </div>
    ),
  },
  {
    name: "Hershey's",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-base sm:text-lg text-[#3c1053] tracking-widest uppercase">
          HERSHEY'S
        </span>
      </div>
    ),
  },
  {
    name: "ITC Limited",
    renderLogo: () => (
      <div className="flex flex-col items-center text-[#003366]">
        <span className="font-black text-2xl sm:text-3xl tracking-tighter">ITC</span>
        <span className="text-[7px] font-bold uppercase tracking-widest">ITC Limited</span>
      </div>
    ),
  },

  // Row 3
  {
    name: "Frito-Lay",
    renderLogo: () => (
      <div className="bg-[#e31837] text-[#ffcb05] px-3.5 py-1 rounded-full font-black text-xs sm:text-sm tracking-tight text-center border border-[#ffcb05] shadow-xs">
        Frito Lay
      </div>
    ),
  },
  {
    name: "Mondelēz",
    renderLogo: () => (
      <div className="flex flex-col text-[#4b286d]">
        <span className="font-black text-xl sm:text-2xl tracking-tight leading-none">Mondelēz</span>
        <span className="text-[6px] font-semibold tracking-widest uppercase opacity-75">International</span>
      </div>
    ),
  },
  {
    name: "Nestlé",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#185a9d] font-serif">
          Nestlé
        </span>
      </div>
    ),
  },
  {
    name: "P&G",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#00205b] italic font-serif">
          P&G
        </span>
      </div>
    ),
  },
  {
    name: "Patanjali",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-bold text-lg sm:text-xl text-[#006837] tracking-tight">
          PATANJALI
        </span>
      </div>
    ),
  },
  {
    name: "PepsiCo",
    renderLogo: () => (
      <div className="flex items-center gap-1.5 text-[#0055a5]">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#e31837] via-white to-[#0055a5] border border-slate-300" />
        <span className="font-black text-base sm:text-lg uppercase tracking-wider">PEPSICO</span>
      </div>
    ),
  },
  {
    name: "Tata",
    renderLogo: () => (
      <div className="flex flex-col items-center text-[#00529b]">
        <span className="font-black text-2xl sm:text-3xl tracking-widest uppercase">TATA</span>
      </div>
    ),
  },
  {
    name: "Tropicana",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-2xl sm:text-3xl text-[#008752]">
          Tropicana
        </span>
      </div>
    ),
  },

  // Row 4
  {
    name: "Pfizer",
    renderLogo: () => (
      <div className="bg-[#0093d0] text-white px-3.5 py-1 rounded-full font-black text-base sm:text-lg italic text-center shadow-xs">
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
    <section id="clients" className="relative overflow-hidden bg-[var(--color-bone)] py-16 sm:py-24 border-t border-b border-[var(--color-line)]">
      {/* Background accents matching website theme */}
      <div className="absolute inset-0 bg-stripes opacity-30 pointer-events-none" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-[800px] rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Header Section matching screenshot layout */}
        <div className="mb-12 md:mb-16">
          {/* Eyebrow with top line matching the screenshot */}
          <div className="pt-6 border-t border-[var(--color-line)] w-full mb-4">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[var(--color-blue)] uppercase">
              OUR CLIENT PORTFOLIO
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink)] leading-[1.15] text-balance mb-4">
            Brands from all over the world love us!
          </h2>

          <p className="max-w-4xl text-sm sm:text-base md:text-lg text-[var(--color-mute)] leading-relaxed font-normal">
            From renowned brands across the globe, our client portfolio showcases the trust and satisfaction of brands, reflecting our commitment to excellence and customer satisfaction.
          </p>
        </div>

        {/* Seamless 8-Column Brand Logos Grid (NO background boxes, logos blend directly into section background) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 sm:gap-10 items-center justify-items-center">
          {clientBrands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (idx % 8) * 0.03 }}
              whileHover={{ scale: 1.15 }}
              className="flex items-center justify-center w-full h-16 sm:h-20 transition-transform cursor-pointer"
            >
              {brand.renderLogo()}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
