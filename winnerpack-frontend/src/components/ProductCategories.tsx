"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productCategories } from "../data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slot1Images: string[] = [
  "/images/desktop/portfolio/gallery_pof_ldpe_shrink.png",
  "/images/desktop/portfolio/showcase_stretch_pallet_wrapping.png",
  "/images/desktop/about/blown_film_tower.png",
];

const slot2Images: string[] = [
  "/images/desktop/portfolio/gallery_bopp_tapes.png",
  "/images/desktop/portfolio/showcase_printed_custom_tapes.png",
  "/images/desktop/about/film_slitting_machine.png",
];

const slot3Images: string[] = [
  "/images/desktop/portfolio/gallery_pp_strapping.png",
  "/images/desktop/portfolio/showcase_heavy_duty_ldpe_bags.png",
  "/images/desktop/about/about_hero_factory_new.png",
];

const slot4Images: string[] = [
  "/images/desktop/portfolio/gallery_labels_stickers.png",
  "/images/desktop/about/about_hero_panoramic_sharp.png",
  "/images/desktop/about/hero_banner_panoramic_3to1.png",
];

export default function ProductCategories() {
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [index4, setIndex4] = useState(0);

  // Relaxed 6.0s image rotation loop for comfortable viewing
  useEffect(() => {
    const t1 = setInterval(() => setIndex1((prev) => (prev + 1) % slot1Images.length), 6000);
    const t2 = setInterval(() => setIndex2((prev) => (prev + 1) % slot2Images.length), 6000);
    const t3 = setInterval(() => setIndex3((prev) => (prev + 1) % slot3Images.length), 6000);
    const t4 = setInterval(() => setIndex4((prev) => (prev + 1) % slot4Images.length), 6000);

    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
      clearInterval(t4);
    };
  }, []);

  return (
    <section id="products" className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-[var(--color-line)]">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" aria-hidden />

      {/* Single Max-W-7XL Container so Top Cards & Bento Grid align perfectly on Left & Right */}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Centered Executive Header */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-2">
            Industrial Range & Showcase
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight text-balance">
            Product Gallery
          </h2>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
        </div>

        {/* 4 TOP-LEVEL B2B CATEGORIES CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
          {productCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] hover:border-[var(--color-amber)]/40 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer select-none"
            >
              <Link href={`/product-category/${cat.id}`} className="block h-full w-full">
                <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bone)]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-[var(--color-ink)] text-xs font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap border border-white/40">
                    <span>Explore Range</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--color-amber)]" />
                  </div>
                </div>

                <div className="py-4 px-5 text-center border-t border-[var(--color-line)] bg-white group-hover:bg-[var(--color-mist)] flex items-center justify-center min-h-[64px] transition-colors duration-300">
                  <h3 className="font-display text-sm sm:text-base font-bold tracking-tight text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-amber-dark)] leading-tight">
                    {cat.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── PURE IMAGE AUTO-ROTATING BENTO GRID SHOWCASE (No Text / Badges) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          {/* SLOT 1: Tall Left Poster Card (Spans 5 Columns) */}
          <div className="lg:col-span-5 relative h-[480px] sm:h-[580px] lg:h-[640px] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={slot1Images[index1]}
                src={slot1Images[index1]}
                alt="WinnerPack Infrastructure"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: 3 Cards Grid (Spans 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 md:gap-8">
            
            {/* SLOT 2: Top Wide Banner Card */}
            <div className="relative h-[250px] sm:h-[300px] lg:h-[304px] w-full rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slot2Images[index2]}
                  src={slot2Images[index2]}
                  alt="WinnerPack Packaging Material"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* BOTTOM ROW: 2 Generous Square Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              
              {/* SLOT 3: Bottom Left Card */}
              <div className="relative h-[230px] sm:h-[270px] lg:h-[304px] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slot3Images[index3]}
                    src={slot3Images[index3]}
                    alt="WinnerPack Packaging Material"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* SLOT 4: Bottom Right Card */}
              <div className="relative h-[230px] sm:h-[270px] lg:h-[304px] rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-950 shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slot4Images[index4]}
                    src={slot4Images[index4]}
                    alt="WinnerPack Packaging Material"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

        {/* Center Button to View All Products Catalog */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-amber)] px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-xl shadow-[var(--color-amber)]/25 transition-all duration-300 hover:bg-[var(--color-amber-dark)] hover:shadow-2xl hover:scale-105"
            data-hover
          >
            <span className="relative z-10">View All Products Catalog</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
