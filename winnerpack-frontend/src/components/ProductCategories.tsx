"use client";

import { motion } from "framer-motion";
import { productCategories } from "../data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCategories() {
  return (
    <section id="products" className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-[var(--color-line)]">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Centered Executive Header */}
        <div className="text-center mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-amber-soft)] border border-[var(--color-amber)]/20 text-[var(--color-amber-dark)] text-xs font-bold uppercase tracking-widest mb-3">
            CATALOG SHOWCASE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight text-balance">
            Product Gallery
          </h2>
          <div className="mt-4 h-1 w-16 bg-[var(--color-amber)] rounded-full" />
        </div>

        {/* 3 CATEGORY CARDS — Square Shape Aspect Ratio with Products Listed Inside */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {productCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Links directly to the separate category page */}
              <Link href={`/product-category/${cat.id}`} className="block h-full w-full">
                {/* Square Shape Aspect Ratio for Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bone)]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Floating Action Pill on Hover */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[var(--color-ink)] text-xs font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <span>Explore Range</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--color-blue)]" />
                  </div>
                </div>

                {/* Product/Category Title at Bottom */}
                <div className="py-4 px-5 text-center border-t border-[var(--color-line)] bg-white flex items-center justify-center min-h-[64px]">
                  <h3 className="font-display text-sm sm:text-base font-bold tracking-tight text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-blue)] leading-tight">
                    {cat.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Center Button to View All Products */}
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


