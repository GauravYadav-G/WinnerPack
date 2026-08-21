"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productCategories } from "../data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

export default function ProductCategories() {
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Independent shuffle indexes for each of the 4 cards
  const [slot1Idx, setSlot1Idx] = useState(0);
  const [slot2Idx, setSlot2Idx] = useState(0);
  const [slot3Idx, setSlot3Idx] = useState(0);
  const [slot4Idx, setSlot4Idx] = useState(0);

  // Category showcase data mapping with comprehensive real photo assets per slot for dynamic shuffling
  const categoryShowcase = [
    // 0: Film Products
    {
      label: "Film Products Showcase",
      link: "/product-category/film-products",
      slot1: [
        "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.jpg",
        "/images/products/pvc-shrink-rolls-pouches/pvc-shrink-rolls.jpg",
        "/images/products/pharma-grade-poly/pharma-grade-poly-rolls.jpg",
        "/images/products/cross-linked-pof/cross-linked-pof-rolls.jpg",
        "/images/products/stretch-film/machine-stretch-film.jpg",
        "/images/products/stretch-film/pre-stretch-film.jpg"
      ],
      slot2: [
        "/images/products/cross-linked-pof/cross-linked-pof.jpg",
        "/images/products/non-cross-linked-pof-film/non-cross-linked-pof-rolls.jpg",
        "/images/products/adhesive-lamination-film/adhesive-lamination-film-rolls.jpg",
        "/images/products/non-cross-linked-pof-film/non-cross-linked-pof-film.jpg",
        "/images/products/stretch-film/silage-stretch-film.jpg",
        "/images/products/stretch-film/vci-stretch-film.jpg"
      ],
      slot3: [
        "/images/products/plastic-mulching-film/plastic-mulching-film.jpg",
        "/images/products/cross-linked-pof/cross-linked-pof-rolls.jpg",
        "/images/products/pvc-shrink-rolls-pouches/pvc-shrink-pouches.jpg",
        "/images/products/stretch-film/biodegradable-stretch-wrap.jpg",
        "/images/products/stretch-film/coreless-stretch-film.jpg",
        "/images/products/ldpe-shrink-film/image.png"
      ],
      slot4: [
        "/images/products/milk-packaging-film/milk-packaging-film.jpg",
        "/images/products/water-packaging-film/water-packaging-film.jpg",
        "/images/products/smp-packaging-film/smp-packaging-film.jpg",
        "/images/products/pharma-grade-poly/pharma-grade-poly.png",
        "/images/products/soft-loop-handle-bags/soft-loop-handle-bags.jpg",
        "/images/products/stretch-film/recycled-stretch-wrap.jpg"
      ]
    },
    // 1: Labels & Stickers
    {
      label: "Labels & Stickers Showcase",
      link: "/product-category/label-sticker-products",
      slot1: [
        "/images/products/printed-labels/flexo-digital-printed-labels.jpg",
        "/images/products/plain-labels/plain-labels.jpg",
        "/images/products/plain-labels/plain-chromo-labels.jpg",
        "/images/products/paper-self-adhesive-labels/paper-self-adhesive-labels.jpg",
        "/images/products/wide-format-printed-labels/wide-format-printed-labels.jpg",
        "/images/products/plain-thermal-transfer-labels/plain-thermal-transfer-labels.jpg"
      ],
      slot2: [
        "/images/products/thermal-transfer-ribbons/thermal-transfer-ribbons.jpg",
        "/images/products/wax-resin-ribbons/wax-resin-ribbons.jpg",
        "/images/products/resin-ribbons/resin-ribbons.jpg",
        "/images/products/wax-ribbons/wax-ribbons.jpg",
        "/images/products/wrap-around-labels/wrap-around-labels.jpg"
      ],
      slot3: [
        "/images/products/clear-metallic-product-labels/clear-metallic-product-labels.jpg",
        "/images/products/thermal-transfer-barcode-labels/thermal-transfer-barcode-labels.jpg",
        "/images/products/jar-bottle-product-labels/jar-bottle-product-labels.jpg",
        "/images/products/gs1-data-matrix-barcode-labels/gs1-data-matrix-barcode-labels.jpg",
        "/images/products/film-self-adhesive-labels/film-self-adhesive-labels.jpg"
      ],
      slot4: [
        "/images/products/hologram-stickers/hologram-stickers.jpg",
        "/images/products/2d-3d-holograms/2d-3d-holograms.jpg",
        "/images/products/direct-thermal-labels/direct-thermal-labels.jpg",
        "/images/products/tamper-evident-stickers/tamper-evident-stickers.jpg",
        "/images/products/security-void-stickers/security-void-stickers.jpg",
        "/images/products/thermal-transfer-paper-labels/thermal-transfer-paper-labels.jpg"
      ]
    },
    // 2: Tapes Division
    {
      label: "Tapes Division Showcase",
      link: "/product-category/tape-products",
      slot1: [
        "/images/products/bopp-tapes/bopp-tapes.jpg",
        "/images/products/bopp-tapes/manual-dispenser-bopp-tapes.jpg",
        "/images/products/bopp-tapes/automated-machine-roll-bopp-tapes.jpg"
      ],
      slot2: [
        "/images/products/printed-bopp-tapes/preprinted-warning-security-tapes.jpg"
      ],
      slot3: [
        "/images/products/coloured-bopp-tapes/secondary-security-colored-tapes.jpg"
      ],
      slot4: [
        "/images/products/silicon-tapes/silicone-bag-sealing-tapes.jpg"
      ]
    },
    // 3: PP & PET Strapping
    {
      label: "PP & PET Strapping Showcase",
      link: "/product-category/strapping-products",
      slot1: [
        "/images/products/pp-strap/applications/app-1.png",
        "/images/products/pp-strap/applications/app-2.png",
        "/images/products/pp-strap/applications/app-3.png",
        "/images/products/pp-strap/applications/app-4.png",
        "/images/products/pp-strap/image.png"
      ],
      slot2: [
        "/images/products/pet-strap/applications/app-1.png",
        "/images/products/pet-strap/applications/app-2.png",
        "/images/products/pet-strap/applications/app-3.png",
        "/images/products/pet-strap/applications/app-4.png",
        "/images/products/pet-strap/image.png"
      ],
      slot3: [
        "/images/products/printed-pp-strap/applications/app-1.png",
        "/images/products/printed-pp-strap/applications/app-2.png",
        "/images/products/printed-pp-strap/applications/app-3.png",
        "/images/products/printed-pp-strap/applications/app-4.png",
        "/images/products/printed-pp-strap/image.png"
      ],
      slot4: [
        "/images/products/colored-pp-strap/applications/app-1.png",
        "/images/products/colored-pp-strap/applications/app-2.png",
        "/images/products/colored-pp-strap/applications/app-3.png",
        "/images/products/colored-pp-strap/applications/app-4.png",
        "/images/products/colored-pp-strap/image.png"
      ]
    }
  ];

  const currentShowcase = categoryShowcase[activeCatIndex] || categoryShowcase[0];

  // Randomize initial starting images on every page reload
  useEffect(() => {
    setSlot1Idx(Math.floor(Math.random() * 20));
    setSlot2Idx(Math.floor(Math.random() * 20));
    setSlot3Idx(Math.floor(Math.random() * 20));
    setSlot4Idx(Math.floor(Math.random() * 20));
  }, []);

  // 7-second automatic rotation loop across product categories
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveCatIndex((prevIndex) => (prevIndex + 1) % productCategories.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Periodic image shuffling within cards of the active category (staggered for organic feeling)
  useEffect(() => {
    if (isPaused) return;

    const shuffleInterval1 = setInterval(() => {
      setSlot1Idx((prev) => (prev + 1) % (currentShowcase.slot1.length || 1));
    }, 3800);

    const shuffleInterval2 = setInterval(() => {
      setSlot2Idx((prev) => (prev + 1) % (currentShowcase.slot2.length || 1));
    }, 4400);

    const shuffleInterval3 = setInterval(() => {
      setSlot3Idx((prev) => (prev + 1) % (currentShowcase.slot3.length || 1));
    }, 4100);

    const shuffleInterval4 = setInterval(() => {
      setSlot4Idx((prev) => (prev + 1) % (currentShowcase.slot4.length || 1));
    }, 4700);

    return () => {
      clearInterval(shuffleInterval1);
      clearInterval(shuffleInterval2);
      clearInterval(shuffleInterval3);
      clearInterval(shuffleInterval4);
    };
  }, [activeCatIndex, currentShowcase, isPaused]);

  // Safe image getters
  const img1 = currentShowcase.slot1[slot1Idx % currentShowcase.slot1.length] || currentShowcase.slot1[0];
  const img2 = currentShowcase.slot2[slot2Idx % currentShowcase.slot2.length] || currentShowcase.slot2[0];
  const img3 = currentShowcase.slot3[slot3Idx % currentShowcase.slot3.length] || currentShowcase.slot3[0];
  const img4 = currentShowcase.slot4[slot4Idx % currentShowcase.slot4.length] || currentShowcase.slot4[0];

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
                    <OptimizedImage
                      src={cat.image}
                      alt={cat.title}
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

        {/* ── 4-CARD BALANCED SHOWCASE GRID (Natural 16:10 Photo Proportions with Shuffling) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">

          {/* CARD 1 */}
          <Link
            href={currentShowcase.link}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-100 shadow-md sm:shadow-lg group block transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-amber-dark)]/50"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCatIndex}-slot1-${img1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center bg-slate-900/5"
              >
                <OptimizedImage
                  src={img1}
                  alt={currentShowcase.label}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </Link>

          {/* CARD 2 */}
          <Link
            href={currentShowcase.link}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-100 shadow-md sm:shadow-lg group block transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-amber-dark)]/50"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCatIndex}-slot2-${img2}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center bg-slate-900/5"
              >
                <OptimizedImage
                  src={img2}
                  alt={currentShowcase.label}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </Link>

          {/* CARD 3 */}
          <Link
            href={currentShowcase.link}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-100 shadow-md sm:shadow-lg group block transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-amber-dark)]/50"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCatIndex}-slot3-${img3}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center bg-slate-900/5"
              >
                <OptimizedImage
                  src={img3}
                  alt={currentShowcase.label}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </Link>

          {/* CARD 4 */}
          <Link
            href={currentShowcase.link}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-line)] bg-slate-100 shadow-md sm:shadow-lg group block transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-amber-dark)]/50"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCatIndex}-slot4-${img4}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center bg-slate-900/5"
              >
                <OptimizedImage
                  src={img4}
                  alt={currentShowcase.label}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </Link>

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

