"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { productCategories } from "@/data";
import { PageHeader } from "@/components/ui/PageHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import OptimizedImage from "@/components/OptimizedImage";

export default function ProductsClient() {
  return (
    <div className="min-h-screen bg-white text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        <PageHeader
          eyebrow="Product catalogue"
          title="Packaging that performs from line to delivery."
          intro="Explore films, labels, tapes, and strapping engineered around your product, process, and dispatch requirements."
          crumbs={[{ label: "Home", to: "/" }, { label: "Products" }]}
          align="center"
        />

        <section className="relative overflow-hidden py-8 sm:py-16 lg:py-20" aria-labelledby="category-heading">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-amber)]/5 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-amber-dark)]">Browse by material</p>
                <h2 id="category-heading" className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">Find the right packaging line.</h2>
                <p className="hidden sm:block mt-2 text-xs leading-relaxed text-[var(--color-mute)] sm:text-base">Start with a category, then compare formats and technical specifications built for your application.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 self-stretch sm:self-auto rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-amber)] hover:text-[var(--color-amber-dark)] min-h-[42px]">Need help choosing? <ArrowRight className="h-4 w-4" /></Link>
            </div>

            <div className="mt-6 sm:mt-8 flex sm:grid overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none gap-3.5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 -mx-4 pl-6 pr-4 sm:mx-0 sm:px-0 scroll-pl-6 sm:scroll-pl-0 pb-4 sm:pb-0 touch-pan-x">
              {productCategories.map((category, index) => {
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="w-[78vw] max-w-[280px] sm:w-auto shrink-0 sm:shrink snap-start flex flex-col"
                  >
                    <Link href={`/product-category/${category.id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-amber)]/60 hover:shadow-lg active:scale-[0.99] sm:active:scale-100 shadow-sm">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bone)]">
                        <OptimizedImage src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/75 via-transparent to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                        <div>
                          <p className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-amber-dark)]">{category.items.length} product formats</p>
                          <h3 className="mt-1 font-display text-base sm:text-xl font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-blue)] leading-snug line-clamp-1 sm:line-clamp-none">{category.title}</h3>
                          <p className="hidden sm:block mt-1.5 text-xs leading-relaxed text-[var(--color-mute)]">{category.blurb}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line)] pt-3 text-xs font-bold text-[var(--color-ink)]"><span>Explore range</span><ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber-dark)] transition-transform group-hover:translate-x-1" /></div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>


        <section className="bg-white py-8 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl sm:rounded-3xl bg-[var(--color-blue-deep)] px-5 py-6 sm:px-10 sm:py-10 text-white shadow-xl">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-amber)]">Custom requirement?</p>
                  <h2 className="mt-1.5 font-display text-xl sm:text-3xl font-extrabold">Get a material recommendation from our team.</h2>
                  <p className="mt-2 sm:mt-3 max-w-3xl text-xs sm:text-sm leading-relaxed text-white/75">Share your product, packaging line, and dispatch goal. We’ll help you identify the practical material and specification.</p>
                  <ul className="mt-4 sm:mt-5 flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2 text-xs font-semibold text-white/90">
                    {["Technical input", "Custom specifications", "Sample availability"].map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-amber)]" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-amber)] px-5 py-3.5 text-xs sm:text-sm font-extrabold text-[var(--color-ink)] transition hover:bg-[var(--color-amber-2)] active:scale-95 shadow-md min-h-[44px]">
                  Request a quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
