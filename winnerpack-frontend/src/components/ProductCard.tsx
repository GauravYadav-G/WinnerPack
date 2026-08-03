"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsTouch } from "@/hooks";
import { productCategories } from "../data";

interface ProductCardProps {
  product: any;
  index?: number;
}

export function ProductCard({ product }: ProductCardProps) {
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const ref = useRef<HTMLElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  
  // Spotlight highlight overlay
  const highlight = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(245,165,35,0.18), transparent 45%)`;

  function handleMove(e: React.MouseEvent) {
    if (reduce || touch || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set(-(py - 0.5) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  }

  const name = product.name || product.title;
  const slug = product.id || product.slug;
  const blurb = product.blurb;
  const categoryName =
    product.categoryName ||
    productCategories.find((c) => c.id === product.category)?.title ||
    product.category;

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: reduce ? 0 : srx,
        rotateY: reduce ? 0 : sry,
        transformPerspective: 1000,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-blue)]/20 hover:shadow-lift"
    >
      <Link
        href={`/products/${slug}`}
        className="relative block overflow-hidden"
        aria-label={`${name} — view details`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-blue-deep)]/80 via-[var(--color-blue-deep)]/10 to-transparent" />
          
          {!reduce && !touch && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: highlight }}
            />
          )}


          <span className="absolute bottom-4 left-4 font-mono text-[10px] font-bold uppercase tracking-wider text-white/85">
            {categoryName}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="font-display text-sm sm:text-base md:text-lg font-bold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-blue)] transition-colors duration-300 line-clamp-2 leading-tight">
          {name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs md:text-sm leading-relaxed text-[var(--color-mute)]">
          {blurb}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--color-line)] pt-3">
          <Link
            href={`/products/${slug}`}
            className="link-underline inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[var(--color-blue)]"
          >
            <span>View</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/contact?sku=${slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-[var(--color-blue-soft)] px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs font-semibold text-[var(--color-blue)] transition-colors hover:bg-[var(--color-amber)] hover:text-[var(--color-blue-deep)]"
          >
            Quote
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
