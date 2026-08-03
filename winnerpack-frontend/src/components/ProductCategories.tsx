"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productCategories } from "../data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCategories() {
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 5-second automatic rotation loop across product categories
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveCatIndex((prevIndex) => (prevIndex + 1) % productCategories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Category showcase data mapping for the 4 bento grid slots - matched 100% to category products
  const categoryShowcase = [
    // 0: Film Products
    {
      slot1: "/images/desktop/portfolio/gallery_pof_ldpe_shrink.png",
      slot2: "/images/desktop/portfolio/showcase_stretch_pallet_wrapping.png",
      slot3: "/images/desktop/portfolio/showcase_heavy_duty_ldpe_bags.png",
      slot4: "/images/desktop/about/blown_film_tower.png",
      label: "Film Products Showcase"
    },
    // 1: Labels & Stickers
    {
      slot1: "/images/products/printed-labels/image.png",
      slot2: "/images/products/barcode-labels/image.png",
      slot3: "/images/products/product-labels/image.png",
      slot4: "/images/products/thermal-labels/image.png",
      label: "Labels & Stickers Showcase"
    },
    // 2: Tapes Division
    {
      slot1: "/images/products/bopp-tapes/image.png",
      slot2: "/images/products/printed-bopp-tapes/image.png",
      slot3: "/images/products/coloured-bopp-tapes/image.png",
      slot4: "/images/products/silicon-tapes/image.png",
      label: "Tapes Division Showcase"
    },
    // 3: PP & PET Strapping
    {
      slot1: "/images/products/pp-strap/image.png",
      slot2: "/images/products/pet-strap/image.png",
      slot3: "/images/products/printed-pp-strap/image.png",
      slot4: "/images/products/colored-pp-strap/image.png",
      label: "PP & PET Strapping Showcase"
    }
  ];

  const currentShowcase = categoryShowcase[activeCatIndex] || categoryShowcase[0];

  return (
    <section id="products" className="relative overflow-hidden bg-white py-10 sm:py-16 md:py-24 border-b border-[var(--color-line)]">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" aria-hidden />

      {/* Single Max-W-7XL Container so Top Cards & Bento Grid align perfectly on Left & Right */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Centered Executive Header */}
        <div className="text-center mb-6 sm:mb-12 flex flex-col items-center">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
            Industrial Range & Showcase
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight text-balance">
            Product Gallery
          </h2>
          <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
        </div>

        {/* 4 TOP-LEVEL B2B CATEGORIES CARDS (2x2 GRID ON MOBILE, 4 COLUMNS ON DESKTOP) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-10 md:mb-12">
          {productCategories.map((cat, i) => {
            const isActive = activeCatIndex === i;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                onMouseEnter={() => {
                  setActiveCatIndex(i);
                  setIsPaused(true);
                }}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => setActiveCatIndex(i)}
                className={`group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer select-none ${isActive
                    ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/40 shadow-md sm:shadow-xl bg-[var(--color-mist)] -translate-y-1 sm:-translate-y-1.5"
                    : "border-[var(--color-line)] hover:border-[var(--color-amber)]/40 bg-white hover:shadow-lg hover:-translate-y-1"
                  }`}
              >
                <Link href={`/product-category/${cat.id}`} className="block h-full w-full">
                  <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[var(--color-bone)]">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    <div
                      className={`absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-white/95 backdrop-blur-md text-[var(--color-ink)] text-[10px] sm:text-xs font-bold shadow-lg flex items-center gap-1 sm:gap-1.5 whitespace-nowrap border border-white/40 ${isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 sm:translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        }`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--color-amber-dark)]" />
                    </div>
                  </div>

                  <div
                    className={`py-2.5 sm:py-4 px-2 sm:px-5 text-center border-t border-[var(--color-line)] min-h-[44px] sm:min-h-[64px] flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-[var(--color-amber-soft)]" : "bg-white group-hover:bg-[var(--color-mist)]"
                      }`}
                  >
                    <h3
                      className={`font-display text-xs sm:text-base font-bold tracking-tight transition-colors duration-300 leading-tight ${isActive ? "text-[var(--color-amber-dark)] font-extrabold" : "text-[var(--color-ink)] group-hover:text-[var(--color-amber-dark)]"
                        }`}
                    >
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── BENTO GRID SHOWCASE (COMPACT MOBILE HEIGHTS, FULL DESKTOP SIZE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-stretch">

          {/* SLOT 1: Tall Left Poster Card (Spans 5 Columns on Desktop) */}
          <div className="lg:col-span-5 relative h-[220px] sm:h-[380px] lg:h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-white shadow-md sm:shadow-xl group">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${activeCatIndex}-slot1`}
                src={currentShowcase.slot1}
                alt={currentShowcase.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: 3 Cards Grid (Spans 7 Columns on Desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4 sm:gap-6 md:gap-8">

            {/* SLOT 2: Top Wide Banner Card */}
            <div className="relative h-[160px] sm:h-[240px] lg:h-[304px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-white shadow-md sm:shadow-xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeCatIndex}-slot2`}
                  src={currentShowcase.slot2}
                  alt={currentShowcase.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* BOTTOM ROW: 2 Cards (2 Columns on Mobile & Desktop) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">

              {/* SLOT 3: Bottom Left Card */}
              <div className="relative h-[140px] sm:h-[220px] lg:h-[304px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-white shadow-md sm:shadow-xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeCatIndex}-slot3`}
                    src={currentShowcase.slot3}
                    alt={currentShowcase.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* SLOT 4: Bottom Right Card */}
              <div className="relative h-[140px] sm:h-[220px] lg:h-[304px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-white shadow-md sm:shadow-xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeCatIndex}-slot4`}
                    src={currentShowcase.slot4}
                    alt={currentShowcase.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

        {/* Center Button to View All Products Catalog */}
        <div className="mt-8 sm:mt-14 flex justify-center">
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-amber)] px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-lg sm:shadow-xl shadow-[var(--color-amber)]/25 transition-all duration-300 hover:bg-[var(--color-amber-dark)] hover:shadow-2xl hover:scale-105"
            data-hover
          >
            <span className="relative z-10">View All Products Catalog</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
