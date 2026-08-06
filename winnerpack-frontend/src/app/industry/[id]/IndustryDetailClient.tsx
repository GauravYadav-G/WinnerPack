"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, CheckCircle2, Download, MessageSquare, Factory, Zap } from "lucide-react";
import { industryVerticals } from "@/data";
import { initialProducts } from "@/lib/fallback-data";
import { Container, Eyebrow } from "@/components/ui/primitives";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import OptimizedImage from '@/components/OptimizedImage';

export default function IndustryDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const industry = industryVerticals.find((ind) => ind.id === id) || industryVerticals[0];

  // Fetch linked recommended products from single structured product source
  const recommendedProducts = initialProducts.filter((p) =>
    industry.recommendedProductIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* ── HEADER & OUTCOME BANNER ── */}
        <section className="relative overflow-hidden bg-[var(--color-ink)] py-14 sm:py-20 lg:py-24 text-white">
          {/* Ambient Glass Glows */}
          <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-amber)]/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

          <Container className="relative z-10">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-white/50">
                <li><Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link></li>
                <li><ChevronRight className="h-3 w-3 text-white/30" /></li>
                <li><Link href="/#industries" className="hover:text-[var(--color-amber)] transition-colors">Industries</Link></li>
                <li><ChevronRight className="h-3 w-3 text-white/30" /></li>
                <li className="text-white/80 font-semibold">{industry.name}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Outcome Headline */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber)]">
                  <Factory className="h-3.5 w-3.5" />
                  <span>{industry.name} Solutions</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                  {industry.heroHeadline}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
                  {industry.tagline}. Designed specifically to meet high-speed conveyor performance, zero transit damage, and line cost optimization.
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Link
                    href={`/contact?industry=${industry.id}`}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-amber)] via-amber-500 to-orange-600 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[var(--color-amber)]/25 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Custom Industry Spec Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="https://wa.me/918595072187"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-emerald-500/40"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp Engineer</span>
                  </a>
                </div>
              </div>

              {/* Right Column: In-Context Application Photo */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3] bg-slate-950">
                  <OptimizedImage
  src={industry.image}
  alt={industry.name}
  className="h-full w-full object-cover"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber)] block">
                      In-Use Deployment
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5 block">
                      {industry.name} Industrial Plant Packaging Line
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ── PACKAGING CHALLENGE & BUYER OUTCOMES ── */}
        <section className="py-16 sm:py-20 bg-white border-b border-[var(--color-line)]">
          <Container>
            <div className="max-w-4xl mx-auto space-y-10">
              
              {/* Packaging Challenge Statement */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-mist)] border border-[var(--color-line)] space-y-3 shadow-xs">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                  <Zap className="h-4 w-4" />
                  <span>The Industry Packaging Challenge</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-ink)] leading-tight">
                  Why Standard Stock Materials Fail in {industry.name}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--color-mute)]">
                  {industry.packagingChallenge}
                </p>
              </div>

              {/* 3 Buyer Outcome Cards */}
              <div>
                <h3 className="font-display text-2xl font-extrabold text-[var(--color-ink)] mb-6 text-center">
                  Targeted Outcomes & Line Performance Benefits
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {industry.buyerOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-[var(--color-line)] hover:border-[var(--color-amber)]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)]">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-base font-bold text-[var(--color-ink)]">{outcome.title}</h4>
                        <p className="text-xs text-[var(--color-mute)] mt-1.5 leading-relaxed">{outcome.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ── RECOMMENDED WINNER PACK PRODUCTS GRID ── */}
        <section className="py-16 sm:py-24 bg-[var(--color-bone)] border-b border-[var(--color-line)]">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <Eyebrow>Recommended Material Solutions</Eyebrow>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-ink)]">
                Winner Pack Products Specified for {industry.name}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-mute)]">
                These materials are pre-tested and formulated to match the line speeds and transit stresses of this vertical.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 p-5"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--color-bone)] mb-4">
                      <OptimizedImage
  src={prod.image}
  alt={prod.title}
  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)] block">
                      {prod.tag}
                    </span>
                    
                    <h4 className="font-display text-base font-bold text-[var(--color-ink)] mt-1 group-hover:text-[var(--color-amber-dark)] transition-colors">
                      {prod.title}
                    </h4>

                    <p className="text-xs text-[var(--color-mute)] mt-2 line-clamp-2 leading-relaxed">
                      {prod.blurb}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--color-line)] flex items-center justify-between">
                    <Link
                      href={`/products/${prod.id}`}
                      className="text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-amber-dark)] transition-colors flex items-center gap-1"
                    >
                      <span>View Application & Specs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Catalogue Download Callout */}
            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[var(--color-ink)] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display text-xl font-bold">Download Technical Spec Sheet & Material Guide</h4>
                <p className="text-xs text-slate-300">Get complete gauge tolerances, tensile strength tables, and core size options for {industry.name}.</p>
              </div>

              <a
                href="/contact"
                className="px-6 py-3 rounded-full bg-[var(--color-amber)] hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Request Spec Sheet Guide</span>
              </a>
            </div>

          </Container>
        </section>

        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
