"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, PackageCheck, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import { productCategories } from "@/data";
import { initialProducts } from "@/lib/fallback-data";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import OptimizedImage from "@/components/OptimizedImage";

const catalogHighlights = [
  { icon: Factory, title: "Direct from the manufacturer", text: "Consistent quality, practical lead times, and technical support from one team." },
  { icon: Ruler, title: "Built to your specification", text: "Choose the right gauge, width, adhesive, print, colour, and core size." },
  { icon: PackageCheck, title: "Ready for your line", text: "Packaging materials engineered for reliable conversion, sealing, and dispatch." },
];

const featuredIds = ["pof-shrink-film", "printed-labels", "bopp-tapes", "pet-strap", "stretch-film", "flexible-laminated-rolls"];
const featuredProducts = featuredIds
  .map((id) => initialProducts.find((product) => product.id === id))
  .filter(Boolean);

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

        <section className="border-b border-[var(--color-line)] bg-[var(--color-bone)] py-7 sm:py-10">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {catalogHighlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-4 shadow-sm sm:px-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)]"><Icon className="h-5 w-5" /></span>
                <div><h2 className="text-sm font-extrabold text-[var(--color-ink)]">{title}</h2><p className="mt-1 text-xs leading-relaxed text-[var(--color-mute)]">{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20" aria-labelledby="category-heading">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-amber)]/5 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-2xl"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-amber-dark)]">Browse by material</p><h2 id="category-heading" className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">Find the right packaging line.</h2><p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)] sm:text-base">Start with a category, then compare formats and technical specifications built for your application.</p></div>
              <Link href="/contact" className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--color-line)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-amber)] hover:text-[var(--color-amber-dark)] sm:self-auto">Need help choosing? <ArrowRight className="h-4 w-4" /></Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div key={category.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.05 }}>
                    <Link href={`/product-category/${category.id}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--color-amber)]/60 hover:shadow-lift">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bone)]">
                        <OptimizedImage src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-transparent to-transparent" />
                        <span className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-[var(--color-amber-dark)] shadow-md"><Icon className="h-5 w-5" /></span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-amber-dark)]">{category.items.length} product formats</p>
                        <h3 className="mt-2 font-display text-xl font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-blue)]">{category.title}</h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--color-mute)]">{category.blurb}</p>
                        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line)] pt-3 text-xs font-bold text-[var(--color-ink)]"><span>Explore range</span><ArrowRight className="h-4 w-4 text-[var(--color-amber-dark)] transition-transform group-hover:translate-x-1" /></div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--color-line)] bg-[var(--color-mist)] py-12 sm:py-16 lg:py-20" aria-labelledby="featured-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-amber-dark)]">Popular solutions</p><h2 id="featured-heading" className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">Featured product range</h2></div><p className="max-w-md text-sm leading-relaxed text-[var(--color-mute)]">A quick starting point for common packaging, sealing, identification, and load-stability needs.</p></div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product: any) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-[var(--color-blue-deep)] px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10"><div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center"><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-amber)]">Custom requirement?</p><h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Get a material recommendation from our team.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">Share your product, packaging line, and dispatch goal. We’ll help you identify the practical material and specification.</p><ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/90">{["Technical input", "Custom specifications", "Sample availability"].map((item) => <li key={item} className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-amber)]" />{item}</li>)}</ul></div><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-amber)] px-5 py-3.5 text-sm font-extrabold text-[var(--color-ink)] transition hover:bg-[var(--color-amber-2)]">Request a quote <ArrowRight className="h-4 w-4" /></Link></div></div></div></section>
        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
