"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';
import { motion, AnimatePresence } from "framer-motion";

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  crumbs?: Crumb[];
  theme?: "dark" | "light";
  align?: "left" | "center";
  bgImage?: string;
  bgImages?: string[];
}

const DEFAULT_MANUFACTURING_IMAGES = [
  "/images/desktop/portfolio/action_extrusion_tower_blue.jpg",
  "/images/desktop/about/plant_blown_film_line.jpg",
  "/images/desktop/portfolio/product_app_blown_film.png",
  "/images/desktop/portfolio/product_app_film_slitting.png",
  "/images/desktop/about/plant_film_slitting_machine.jpg",
  "/images/desktop/portfolio/action_factory_plant_overview.jpg",
];

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  theme = "dark",
  align = "center",
  bgImage,
  bgImages,
}: PageHeaderProps) {
  const isLight = theme === "light";
  const isCenter = align === "center";

  const imagesList = bgImages && bgImages.length > 0
    ? bgImages
    : (bgImage ? [bgImage, ...DEFAULT_MANUFACTURING_IMAGES] : DEFAULT_MANUFACTURING_IMAGES);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (imagesList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % imagesList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [imagesList.length]);

  return (
    <section className={`relative overflow-hidden pb-12 pt-10 md:pb-16 md:pt-12 lg:pb-20 ${
      isLight ? "bg-[var(--color-bone)] border-b border-[var(--color-line)]" : "bg-[var(--color-blue-deep)]"
    }`}>
      {/* Background Manufacturing Image Showcase for Header Theme */}
      {!isLight && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={imagesList[currentImgIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <OptimizedImage
                src={imagesList[currentImgIndex]}
                alt="WinnerPack Industrial Plant Background"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/65 via-[var(--color-blue-deep)]/45 to-[var(--color-ink)]/65 pointer-events-none" />
        </div>
      )}

      {isLight ? (
        <>
          <div className="absolute inset-0 bg-grid-fine opacity-20" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-blue)]/5 blur-[130px]"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--color-amber)]/10 blur-[100px]"
            aria-hidden
          />
        </>
      )}
      <div className={`mx-auto max-w-7xl px-5 md:px-8 relative z-10 ${
        isCenter ? "flex flex-col items-center text-center" : ""
      }`}>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className={`flex flex-wrap items-center gap-1.5 font-mono text-xs ${
              isCenter ? "justify-center" : ""
            } ${
              isLight ? "text-[var(--color-mute)]" : "text-white/80 drop-shadow-sm"
            }`}>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className={`h-3 w-3 ${isLight ? "text-slate-400/60" : "text-white/40"}`} />}
                  {c.to ? (
                    <Link href={c.to} className={`transition-colors hover:text-[var(--color-amber-dark)] ${
                      isLight ? "text-[var(--color-ink)]" : "hover:text-[var(--color-amber)] text-white/90"
                    }`}>
                      {c.label}
                    </Link>
                  ) : (
                    <span className={isLight ? "text-[var(--color-ink)] font-semibold" : "text-white font-semibold"}>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <span className={`inline-block rounded-full px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold uppercase tracking-wider drop-shadow-sm ${
          isLight
            ? "bg-[var(--color-blue-soft)] text-[var(--color-blue)] border border-[var(--color-blue-3)]/10"
            : "bg-[var(--color-amber)]/25 text-[var(--color-amber)] border border-[var(--color-amber)]/30 backdrop-blur-md"
        }`}>
          {eyebrow}
        </span>
        <h1 className={`mt-3 md:mt-5 text-balance font-display text-3xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-4xl drop-shadow-lg ${
          isCenter ? "text-center mx-auto" : ""
        } ${
          isLight ? "text-[var(--color-ink)]" : "text-white"
        }`}>
          {title}
        </h1>
        <p className={`mt-3 md:mt-6 max-w-2xl text-xs md:text-lg leading-relaxed drop-shadow-md ${
          isCenter ? "text-center mx-auto" : ""
        } ${
          isLight ? "text-[var(--color-mute)]" : "text-white/90 font-medium"
        }`}>
          {intro}
        </p>
      </div>
    </section>
  );
}
