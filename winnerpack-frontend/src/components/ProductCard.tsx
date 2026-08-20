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
import OptimizedImage from '@/components/OptimizedImage';

interface ProductCardProps {
  product: any;
  index?: number;
}

export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  // Film Products subcategories & items
  "packaging-films": "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.jpg",
  "pof-shrink-film": "/images/products/cross-linked-pof/cross-linked-pof.jpg",
  "cross-linked-pof": "/images/products/cross-linked-pof/cross-linked-pof.jpg",
  "non-cross-linked-pof-film": "/images/products/non-cross-linked-pof-film/non-cross-linked-pof-film.jpg",
  "lamination-pe-film": "/images/products/adhesive-lamination-film/adhesive-lamination-film.jpg",
  "pharma-grade-poly": "/images/products/pharma-grade-poly/pharma-grade-poly.jpg",
  "agricultural-films": "/images/products/plastic-mulching-film/plastic-mulching-film.jpg",
  "biodegradable-films": "/images/products/biodegradable-shrink-film/biodegradable-shrink-film.jpg",
  "flexible-laminated-rolls": "/images/products/plain-standup-pouches/plain-standup-pouches.jpg",
  "flexible-laminates": "/images/products/plain-standup-pouches/plain-standup-pouches.jpg",
  "printed-pe-films": "/images/products/milk-packaging-film/milk-packaging-film.jpg",
  "ldpe-bags": "/images/products/ldpe-bags/pe-garbage-bags.jpg",
  "bopp-films": "/images/products/bopp-films-pouches/bopp-rolls.jpg",
  "pvc-shrink-films": "/images/products/pvc-shrink-rolls-pouches/pvc-shrink-rolls.jpg",
  "stretch-film": "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.jpg",

  // Labels & Stickers
  "plain-labels": "/images/products/plain-labels/plain-labels.jpg",
  "plain-chromo-labels": "/images/products/plain-labels/plain-chromo-labels.jpg",
  "plain-thermal-transfer-labels": "/images/products/plain-thermal-transfer-labels/plain-thermal-transfer-labels.jpg",
  "printed-labels": "/images/products/printed-labels/flexo-digital-printed-labels.jpg",
  "flexo-digital-printed-labels": "/images/products/printed-labels/flexo-digital-printed-labels.jpg",
  "wide-format-printed-labels": "/images/products/wide-format-printed-labels/wide-format-printed-labels.jpg",
  "barcode-labels": "/images/products/thermal-transfer-barcode-labels/thermal-transfer-barcode-labels.jpg",
  "thermal-transfer-barcode-labels": "/images/products/thermal-transfer-barcode-labels/thermal-transfer-barcode-labels.jpg",
  "gs1-data-matrix-barcode-labels": "/images/products/gs1-data-matrix-barcode-labels/gs1-data-matrix-barcode-labels.jpg",
  "product-labels": "/images/products/clear-metallic-product-labels/clear-metallic-product-labels.jpg",
  "clear-metallic-product-labels": "/images/products/clear-metallic-product-labels/clear-metallic-product-labels.jpg",
  "jar-bottle-product-labels": "/images/products/jar-bottle-product-labels/jar-bottle-product-labels.jpg",
  "self-adhesive-labels": "/images/products/paper-self-adhesive-labels/paper-self-adhesive-labels.jpg",
  "paper-self-adhesive-labels": "/images/products/paper-self-adhesive-labels/paper-self-adhesive-labels.jpg",
  "film-self-adhesive-labels": "/images/products/film-self-adhesive-labels/film-self-adhesive-labels.jpg",
  "thermal-labels": "/images/products/direct-thermal-labels/direct-thermal-labels.jpg",
  "direct-thermal-labels": "/images/products/direct-thermal-labels/direct-thermal-labels.jpg",
  "thermal-transfer-paper-labels": "/images/products/thermal-transfer-paper-labels/thermal-transfer-paper-labels.jpg",
  "hologram-stickers": "/images/products/hologram-stickers/hologram-stickers.jpg",
  "2d-3d-holograms": "/images/products/2d-3d-holograms/2d-3d-holograms.jpg",
  "dot-matrix-holograms": "/images/products/dot-matrix-holograms/dot-matrix-holograms.jpg",
  "flip-flop-holograms": "/images/products/flip-flop-holograms/flip-flop-holograms.jpg",
  "kinetic-holograms": "/images/products/kinetic-holograms/kinetic-holograms.jpg",
  "e-beam-holograms": "/images/products/e-beam-holograms/e-beam-holograms.jpg",
  "security-void-stickers": "/images/products/security-void-stickers/security-void-stickers.jpg",
  "tamper-evident-stickers": "/images/products/tamper-evident-stickers/tamper-evident-stickers.jpg",
  "thermal-transfer-ribbons": "/images/products/thermal-transfer-ribbons/thermal-transfer-ribbons.jpg",
  "wax-ribbons": "/images/products/wax-ribbons/wax-ribbons.jpg",
  "wax-resin-ribbons": "/images/products/wax-resin-ribbons/wax-resin-ribbons.jpg",
  "resin-ribbons": "/images/products/resin-ribbons/resin-ribbons.jpg",

  // Tapes
  "bopp-tapes": "/images/products/bopp-tapes/image.png",
  "printed-tapes": "/images/products/printed-bopp-tapes/image.png",
  "colored-tapes": "/images/products/coloured-bopp-tapes/image.png",
  "masking-tapes": "/images/products/silicon-tapes/image.png",

  // Strap
  "pp-strap-main": "/images/products/pp-strap/image.png",
  "printed-pp-strap": "/images/products/printed-pp-strap/image.png",
  "colored-pp-strap": "/images/products/colored-pp-strap/image.png",
  "pet-strap": "/images/products/pet-strap/image.png",
};

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

  const cardImage = PRODUCT_IMAGE_MAP[slug] || PRODUCT_IMAGE_MAP[product.category] || (product.image && !product.image.includes('/stretch-film/image.png') ? product.image : null) || "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.jpg";

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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-[20px] border border-slate-200/80 bg-white transition-all duration-300 hover:border-[var(--color-blue-3)]/50 hover:shadow-xl"
    >
      <Link
        href={`/products/${slug}`}
        className="relative block overflow-hidden"
        aria-label={`${name} — view details`}
      >
        <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <OptimizedImage
            src={cardImage}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {!reduce && !touch && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: highlight }}
            />
          )}

          <span className="absolute bottom-2 left-2.5 sm:bottom-3 sm:left-4 font-mono text-[9px] sm:text-xs font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-md bg-slate-950/60 backdrop-blur-xs shadow-xs">
            {categoryName}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-3 sm:p-6 min-h-[120px] sm:min-h-[220px]">
        <div>
          <Link href={`/products/${slug}`} className="block">
            <h3 className="font-display text-sm sm:text-xl font-extrabold text-slate-900 group-hover:text-[var(--color-blue)] transition-colors tracking-tight leading-snug line-clamp-1 sm:line-clamp-none">
              {name}
            </h3>
          </Link>
          {blurb && (
            <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm text-slate-600 leading-relaxed font-sans font-normal line-clamp-2 sm:line-clamp-none">
              {blurb}
            </p>
          )}

          {product.specs && (
            <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2 hidden sm:block">
              {Object.entries(product.specs).slice(0, 4).map(([lbl, val]: any) => (
                <div key={lbl} className="flex items-start justify-between gap-2.5 text-xs">
                  <span className="font-semibold text-slate-900 shrink-0">{lbl}:</span>
                  <span className="font-medium text-slate-600 text-right leading-tight">{String(val)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 pt-2.5 sm:mt-5 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/products/${slug}`}
            className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-bold text-[var(--color-blue)] hover:text-[var(--color-blue-2)] transition-colors"
          >
            <span>View</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
          <Link
            href={`/contact?sku=${slug}&title=${encodeURIComponent(name)}`}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-blue-soft)] px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-bold text-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-white transition-all shadow-2xs"
          >
            Quote
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
