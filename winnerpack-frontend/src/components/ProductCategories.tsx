"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productCategories } from "../data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';
import { productHierarchy } from "@/components/Navbar";
import { apiFetch } from "@/lib/api";

export default function ProductCategories({ previewData }: { previewData?: any } = {}) {
  const navbarCategories = productCategories.filter((category) =>
    productHierarchy.some((navCategory) => navCategory.id === category.id)
  );
  const [header, setHeader] = useState({
    eyebrow: previewData?.eyebrow ?? previewData?.categoriesHeader?.tag ?? "Industrial Range & Showcase",
    title: previewData?.title ?? previewData?.categoriesHeader?.title ?? "Product Gallery",
    description: previewData?.description ?? previewData?.categoriesHeader?.description ?? "",
  });

  useEffect(() => {
    if (previewData) {
      setHeader({
        eyebrow: previewData.eyebrow ?? previewData.categoriesHeader?.tag ?? "",
        title: previewData.title ?? previewData.categoriesHeader?.title ?? "",
        description: previewData.description ?? previewData.categoriesHeader?.description ?? "",
      });
      return;
    }
    apiFetch('/api/content?key=homepage', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((content) => {
        if (!content?.categoriesHeader) return;
        setHeader({
          eyebrow: content.categoriesHeader.tag ?? "Industrial Range & Showcase",
          title: content.categoriesHeader.title ?? "Product Gallery",
          description: content.categoriesHeader.description ?? "",
        });
      })
      .catch(() => {});
  }, [previewData]);

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
        "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.webp",
        "/images/products/pvc-shrink-rolls-pouches/pvc-shrink-rolls.webp",
        "/images/products/pharma-grade-poly/pharma-grade-poly-rolls.webp",
        "/images/products/cross-linked-pof/cross-linked-pof-rolls.webp",
        "/images/products/plastic-mulching-film/plastic-mulching-film.webp",
        "/images/products/milk-packaging-film/milk-packaging-film.webp"
      ],
      slot2: [
        "/images/products/cross-linked-pof/cross-linked-pof.webp",
        "/images/products/non-cross-linked-pof-film/non-cross-linked-pof-rolls.webp",
        "/images/products/adhesive-lamination-film/adhesive-lamination-film-rolls.webp",
        "/images/products/non-cross-linked-pof-film/non-cross-linked-pof-film.webp",
        "/images/products/low-tunnel-film/low-tunnel-film.webp",
        "/images/products/mulch-film/mulch-film.webp"
      ],
      slot3: [
        "/images/products/plastic-mulching-film/plastic-mulching-film.webp",
        "/images/products/cross-linked-pof/cross-linked-pof-rolls.webp",
        "/images/products/pvc-shrink-rolls-pouches/pvc-shrink-pouches.webp",
        "/images/products/biodegradable-shrink-film/biodegradable-shrink-film.webp",
        "/images/products/low-tunnel-film/low-tunnel-film.webp",
        "/images/products/ldpe-shrink-film/image.webp"
      ],
      slot4: [
        "/images/products/milk-packaging-film/milk-packaging-film.webp",
        "/images/products/water-packaging-film/water-packaging-film.webp",
        "/images/products/smp-packaging-film/smp-packaging-film.webp",
        "/images/products/pharma-grade-poly/pharma-grade-poly.webp",
        "/images/products/soft-loop-handle-bags/soft-loop-handle-bags.webp",
        "/images/products/ice-bags/ice-bags.webp"
      ]
    },
    // 1: Labels & Stickers
    {
      label: "Labels & Stickers Showcase",
      link: "/product-category/label-sticker-products",
      slot1: [
        "/images/products/printed-labels/flexo-digital-printed-labels.webp",
        "/images/products/plain-labels/plain-labels.webp",
        "/images/products/plain-labels/plain-chromo-labels.webp",
        "/images/products/paper-self-adhesive-labels/paper-self-adhesive-labels.webp",
        "/images/products/wide-format-printed-labels/wide-format-printed-labels.webp",
        "/images/products/plain-thermal-transfer-labels/plain-thermal-transfer-labels.webp"
      ],
      slot2: [
        "/images/products/thermal-transfer-ribbons/thermal-transfer-ribbons.webp",
        "/images/products/wax-resin-ribbons/wax-resin-ribbons.webp",
        "/images/products/resin-ribbons/resin-ribbons.webp",
        "/images/products/wax-ribbons/wax-ribbons.webp",
        "/images/products/wrap-around-labels/wrap-around-labels.webp"
      ],
      slot3: [
        "/images/products/clear-metallic-product-labels/clear-metallic-product-labels.webp",
        "/images/products/thermal-transfer-barcode-labels/thermal-transfer-barcode-labels.webp",
        "/images/products/jar-bottle-product-labels/jar-bottle-product-labels.webp",
        "/images/products/gs1-data-matrix-barcode-labels/gs1-data-matrix-barcode-labels.webp",
        "/images/products/film-self-adhesive-labels/film-self-adhesive-labels.webp"
      ],
      slot4: [
        "/images/products/hologram-stickers/hologram-stickers.webp",
        "/images/products/2d-3d-holograms/2d-3d-holograms.webp",
        "/images/products/direct-thermal-labels/direct-thermal-labels.webp",
        "/images/products/tamper-evident-stickers/tamper-evident-stickers.webp",
        "/images/products/security-void-stickers/security-void-stickers.webp",
        "/images/products/thermal-transfer-paper-labels/thermal-transfer-paper-labels.webp"
      ]
    },
    // 2: Tapes Division
    {
      label: "Tapes Division Showcase",
      link: "/product-category/tapes",
      slot1: [
        "/images/products/bopp-tapes/bopp-tapes.webp",
        "/images/products/bopp-tapes/manual-dispenser-bopp-tapes.webp",
        "/images/products/bopp-tapes/automated-machine-roll-bopp-tapes.webp"
      ],
      slot2: [
        "/images/products/printed-bopp-tapes/preprinted-warning-security-tapes.webp"
      ],
      slot3: [
        "/images/products/coloured-bopp-tapes/secondary-security-colored-tapes.webp"
      ],
      slot4: [
        "/images/products/silicon-tapes/silicone-bag-sealing-tapes.webp"
      ]
    },
    // 3: PP & PET Strapping
    {
      label: "PP & PET Strapping Showcase",
      link: "/product-category/pp-strap",
      slot1: [
        "/images/products/pp-strap/applications/app-1.webp",
        "/images/products/pp-strap/applications/app-2.webp",
        "/images/products/pp-strap/applications/app-3.webp",
        "/images/products/pp-strap/applications/app-4.webp",
        "/images/products/pp-strap/image.webp"
      ],
      slot2: [
        "/images/products/pet-strap/applications/app-1.webp",
        "/images/products/pet-strap/applications/app-2.webp",
        "/images/products/pet-strap/applications/app-3.webp",
        "/images/products/pet-strap/applications/app-4.webp",
        "/images/products/pet-strap/image.webp"
      ],
      slot3: [
        "/images/products/printed-pp-strap/applications/app-1.webp",
        "/images/products/printed-pp-strap/applications/app-2.webp",
        "/images/products/printed-pp-strap/applications/app-3.webp",
        "/images/products/printed-pp-strap/applications/app-4.webp",
        "/images/products/printed-pp-strap/image.webp"
      ],
      slot4: [
        "/images/products/colored-pp-strap/applications/app-1.webp",
        "/images/products/colored-pp-strap/applications/app-2.webp",
        "/images/products/colored-pp-strap/applications/app-3.webp",
        "/images/products/colored-pp-strap/applications/app-4.webp",
        "/images/products/colored-pp-strap/image.webp"
      ]
    }
  ];

  const currentShowcase = categoryShowcase[activeCatIndex] || categoryShowcase[0];

  // 7-second automatic rotation loop across product categories
  useEffect(() => {
    if (isPaused) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        interval = setInterval(() => {
          setActiveCatIndex((prevIndex) => (prevIndex + 1) % navbarCategories.length);
        }, 7000);
      }
    }, 20_000);
    return () => {
      window.clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [isPaused]);

  // Periodic image shuffling within cards of the active category (staggered for organic feeling)
  useEffect(() => {
    if (isPaused) return;

    let shuffleInterval1: ReturnType<typeof setInterval> | undefined;
    let shuffleInterval2: ReturnType<typeof setInterval> | undefined;
    let shuffleInterval3: ReturnType<typeof setInterval> | undefined;
    let shuffleInterval4: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      shuffleInterval1 = setInterval(() => setSlot1Idx((prev) => (prev + 1) % (currentShowcase.slot1.length || 1)), 3800);
      shuffleInterval2 = setInterval(() => setSlot2Idx((prev) => (prev + 1) % (currentShowcase.slot2.length || 1)), 4400);
      shuffleInterval3 = setInterval(() => setSlot3Idx((prev) => (prev + 1) % (currentShowcase.slot3.length || 1)), 4100);
      shuffleInterval4 = setInterval(() => setSlot4Idx((prev) => (prev + 1) % (currentShowcase.slot4.length || 1)), 4700);
    }, 20_000);

    return () => {
      window.clearTimeout(start);
      if (shuffleInterval1) clearInterval(shuffleInterval1);
      if (shuffleInterval2) clearInterval(shuffleInterval2);
      if (shuffleInterval3) clearInterval(shuffleInterval3);
      if (shuffleInterval4) clearInterval(shuffleInterval4);
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
          <span className="text-xs font-bold tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
            {header.eyebrow}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight text-balance">
            {header.title}
          </h2>
          {header.description && (
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-[var(--color-mute)] leading-relaxed">
              {header.description}
            </p>
          )}
          <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
        </div>

        {/* 4 TOP-LEVEL B2B CATEGORIES CARDS (2x2 GRID ON MOBILE, 4 COLUMNS ON DESKTOP) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-10 md:mb-12">
          {navbarCategories.map((cat, i) => {
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
                      sizes="(max-width: 1023px) 50vw, 25vw"
                    />

                    <div
                      className={`absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-white/95 backdrop-blur-md text-[var(--color-ink)] text-xs font-bold shadow-lg flex items-center gap-1 sm:gap-1.5 whitespace-nowrap border border-white/40 ${isActive
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
                      className={`font-display text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 leading-tight ${isActive ? "text-[var(--color-amber-dark)] font-extrabold" : "text-[var(--color-ink)] group-hover:text-[var(--color-amber-dark)]"
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
                  sizes="(max-width: 639px) 100vw, 50vw"
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
                  sizes="(max-width: 639px) 100vw, 50vw"
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
                  sizes="(max-width: 639px) 100vw, 50vw"
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
                  sizes="(max-width: 639px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </Link>

        </div>

        {/* Center Button to View All Products Catalog */}
        <div className="mt-8 sm:mt-14 flex justify-center">
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-amber)] px-6 sm:px-8 py-3 sm:py-4 text-sm font-bold text-[var(--color-ink)] shadow-lg sm:shadow-xl shadow-[var(--color-amber)]/25 transition-all duration-300 hover:bg-[var(--color-amber-dark)] hover:text-white hover:shadow-2xl hover:scale-105"
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
