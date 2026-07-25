"use client";

import { motion } from "framer-motion";
import { productCategories } from "../data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCategories() {
  return (
    <section id="products" className="relative overflow-hidden bg-white py-12 md:py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Centered Heading with Underline Underneath */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-blue)] font-bold">
            Explore Range
          </span>
          <h2 className="font-display mt-2 text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
            Product Gallery
          </h2>
          <div className="mt-3 h-0.5 w-14 bg-[var(--color-amber)]" />
        </div>

        {/* 3 CATEGORY CARDS — Compact & Reduced Sizing on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto" data-reveal>
          {productCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.99] sm:active:scale-100"
            >
              {/* Links directly to the separate category page */}
              <Link href={`/product-category/${cat.id}`} className="block h-full w-full">
                {/* Square Shape Aspect Ratio for Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bone)]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Product/Category Title at Bottom */}
                <div className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center border-t border-[var(--color-line)] bg-white flex items-center justify-center min-h-[44px] sm:min-h-[56px]">
                  <h3 className="font-display text-xs sm:text-sm font-semibold tracking-tight text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-blue)] leading-tight line-clamp-2">
                    {cat.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Center Button to View All Products */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-blue)] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[var(--color-blue)]/30 transition hover:bg-[var(--color-blue-deep)]"
            data-hover
          >
            <span className="relative z-10">View All Products</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

      </div>
    </section>
  );
}

