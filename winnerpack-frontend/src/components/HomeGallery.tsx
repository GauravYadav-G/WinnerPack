"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GallerySlotItem {
  image: string;
  title: string;
  category: string;
}

const slot1Items: GallerySlotItem[] = [
  {
    image: "/images/desktop/journey/solution_pallet_wrapping.png",
    title: "High-Cling LLDPE Stretch Wrap",
    category: "FILM PRODUCTS",
  },
  {
    image: "/images/desktop/journey/solution_scheduled_dispatch.png",
    title: "Logistics Dispatch Operations",
    category: "DISPATCH KITS",
  },
  {
    image: "/images/desktop/journey/solution_buffer_stock.png",
    title: "Buffer Inventory Management",
    category: "PLANT CAPACITY",
  },
];

const slot2Items: GallerySlotItem[] = [
  {
    image: "/images/desktop/portfolio/quality_featured.png",
    title: "High-Speed Automated Strapping Lines",
    category: "PP & PET STRAP",
  },
  {
    image: "/images/products/printed-bopp-tapes/image.png",
    title: "Custom Brand Logo Printed BOPP Tapes",
    category: "SECURITY TAPES",
  },
  {
    image: "/images/gallery/office_life.png",
    title: "Extrusion Plant Infrastructure",
    category: "MANUFACTURING PLANT",
  },
];

const slot3Items: GallerySlotItem[] = [
  {
    image: "/images/desktop/portfolio/sustainability_featured.png",
    title: "5-Layer POF Shrink Film Bundling",
    category: "SHRINK WRAP",
  },
  {
    image: "/images/desktop/journey/solution_pcr_eco_film.png",
    title: "PCR Recyclable Eco Packaging",
    category: "SUSTAINABILITY",
  },
  {
    image: "/images/desktop/journey/solution_precision_gauge.png",
    title: "Laser Gauge Caliper Testing",
    category: "QUALITY ASSURANCE",
  },
];

const slot4Items: GallerySlotItem[] = [
  {
    image: "/images/desktop/journey/solution_quality_testing.png",
    title: "In-House Batch Tensile Lab",
    category: "LAB QUALIFICATION",
  },
  {
    image: "/images/products/printed-bopp-tapes/image.png",
    title: "High-Tack Acrylic Emulsion Sealing",
    category: "BOPP TAPES",
  },
  {
    image: "/images/desktop/journey/solution_dispatch_manager.png",
    title: "Dedicated Dispatch Support Desk",
    category: "TECHNICAL SUPPORT",
  },
];

export default function HomeGallery() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [index4, setIndex4] = useState(0);

  // Staggered 2.5s image rotation loop across all 4 slots
  useEffect(() => {
    const t1 = setInterval(() => setIndex1((prev) => (prev + 1) % slot1Items.length), 2500);
    const t2 = setInterval(() => setIndex2((prev) => (prev + 1) % slot2Items.length), 2500);
    const t3 = setInterval(() => setIndex3((prev) => (prev + 1) % slot3Items.length), 2500);
    const t4 = setInterval(() => setIndex4((prev) => (prev + 1) % slot4Items.length), 2500);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
      clearInterval(t4);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--color-bone)] py-16 sm:py-24 border-t border-b border-[var(--color-line)]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1536px] px-4 md:px-10">
        
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-2">
            Facility & Product Gallery
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
            Inside WinnerPack Infrastructure
          </h2>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
        </div>

        {/* ── SPACIOUS BENTO GRID GALLERY (Uncompressed Proportions) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          {/* SLOT 1: Tall Left Poster Card (Spans 5 Columns) */}
          <div className="lg:col-span-5 relative h-[480px] sm:h-[580px] lg:h-[680px] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={slot1Items[index1].image}
                src={slot1Items[index1].image}
                alt={slot1Items[index1].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Dark Gradient Shade & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10">
              <span className="inline-block px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-3 shadow-md">
                {slot1Items[index1].category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                {slot1Items[index1].title}
              </h3>
            </div>
          </div>

          {/* RIGHT COLUMN: 3 Cards Grid (Spans 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 md:gap-8">
            
            {/* SLOT 2: Top Wide Banner Card */}
            <div className="relative h-[260px] sm:h-[320px] lg:h-[330px] w-full rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slot2Items[index2].image}
                  src={slot2Items[index2].image}
                  alt={slot2Items[index2].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-2 shadow-md">
                  {slot2Items[index2].category}
                </span>
                <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
                  {slot2Items[index2].title}
                </h3>
              </div>
            </div>

            {/* BOTTOM ROW: 2 Generous Square Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              
              {/* SLOT 3: Bottom Left Card */}
              <div className="relative h-[240px] sm:h-[280px] lg:h-[318px] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slot3Items[index3].image}
                    src={slot3Items[index3].image}
                    alt={slot3Items[index3].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-1.5 shadow-md">
                    {slot3Items[index3].category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-tight">
                    {slot3Items[index3].title}
                  </h3>
                </div>
              </div>

              {/* SLOT 4: Bottom Right Card */}
              <div className="relative h-[240px] sm:h-[280px] lg:h-[318px] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slot4Items[index4].image}
                    src={slot4Items[index4].image}
                    alt={slot4Items[index4].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-300 mb-1.5 shadow-md">
                    {slot4Items[index4].category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-tight">
                    {slot4Items[index4].title}
                  </h3>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
