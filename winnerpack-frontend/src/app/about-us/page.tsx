"use client";

import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import OptimizedImage from '@/components/OptimizedImage';

/* ─── DIRECTOR DATA ─────────────────────────────────────────────── */
const DIRECTORS_TOP = [
  {
    id: "neeraj-yadav",
    name: "Neeraj Yadav",
    title: "Founder & Managing Director",
    image: "/images/desktop/directors/director_md.png",
  },
  {
    id: "board-cofounder",
    name: "Board of Directors",
    title: "Co-Founder & COO",
    image: "/images/desktop/directors/director_coo.png",
  },
];

const DIRECTORS_BOTTOM = [
  {
    id: "dir-ops",
    name: "Director — Operations",
    title: "Plant & Dispatch Management",
    image: "/images/desktop/directors/director_ops.png",
  },
  {
    id: "dir-quality",
    name: "Director — Quality & R&D",
    title: "Polymer Science & Batch QC",
    image: "/images/desktop/directors/director_quality.png",
  },
  {
    id: "dir-supply",
    name: "Director — Supply Chain",
    title: "Inventory & Logistics SLAs",
    image: "/images/desktop/directors/director_supply.png",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────────── */
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper className="relative">

        {/* ════════════════════════════════════════════════════════
            1. HERO — centred headline + CTA + full-width photo
            ════════════════════════════════════════════════════════ */}
        <section className="relative pt-2 md:pt-4 pb-6 sm:pb-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

            {/* Centred headline */}
            <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-ink)] tracking-tight leading-snug sm:leading-[1.1]">
                Built to hold <br />
                industry together.
              </h1>

              <p className="text-xs sm:text-base text-[var(--color-mute)] leading-relaxed max-w-xl mx-auto">
                We supply and manufacture quality packaging materials including strapping rolls, films, tapes, and protective packaging solutions designed for operational efficiency.
              </p>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[var(--color-ink)] text-white text-xs sm:text-sm font-bold hover:bg-[var(--color-blue-deep)] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                >
                  Talk to our experts
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>

            {/* Full-width office hero banner card */}
            <div className="mt-5 sm:mt-8 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-line)] shadow-xl sm:shadow-2xl aspect-[16/9] sm:aspect-[2.2/1] bg-slate-950 group">
              <OptimizedImage
  src={"/images/desktop/about/about_office_hero.jpg"}
  alt="Winner Pack Technologies Corporate Headquarters & Conference Suite"
  className="h-full w-full object-cover object-[center_50%] transition-transform duration-700 group-hover:scale-105"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            2. MISSION & VISION — two equal columns
            ════════════════════════════════════════════════════════ */}
        <section className="py-8 sm:py-12 md:py-16 border-t border-[var(--color-line)]">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-16">

              <div className="space-y-2 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber-dark)]" />
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-amber-dark)]">Mission</span>
                </div>
                <p className="font-display text-base sm:text-2xl md:text-3xl font-bold text-[var(--color-ink)] leading-snug">
                  To deliver certified, precision-manufactured packaging materials backed by transparent technical specifications and responsive customer support.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-4 md:border-l md:border-[var(--color-line)] md:pl-16">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--color-amber-dark)]" />
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-amber-dark)]">Vision</span>
                </div>
                <p className="font-display text-base sm:text-2xl md:text-3xl font-bold text-[var(--color-ink)] leading-snug">
                  To be a trusted partner in the B2B industrial packaging sector by offering sustainable, high-performance solutions that help businesses build efficient and reliable supply chains.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            3. "LET'S GET TO KNOW EACH OTHER" & BOARD OF DIRECTORS
            (2-Column Grid on Mobile for Maximum Compactness)
            ════════════════════════════════════════════════════════ */}
        <section id="board-of-directors" className="py-8 sm:py-14 md:py-20 border-t border-[var(--color-line)] bg-white">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            
            {/* Top Row: Title Left + Story Paragraph Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 md:gap-16 items-end mb-6 sm:mb-12 md:mb-16">
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-amber-dark)] mb-1.5 sm:mb-2 block">
                  Our Leadership & Story
                </span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-ink)] leading-snug sm:leading-tight tracking-tight">
                  Let&apos;s get to <br className="hidden sm:inline" />know each other
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed">
                <p>
                  Winner Pack Technologies Pvt. Ltd. has been dedicated to driving industrial growth through innovative packaging solutions. We focus on creating value and continuously evolving to help businesses succeed.
                </p>
                <p>
                  We supply and manufacture strapping rolls, shrink and stretch films, tapes, corrugated packaging, courier bags and labels, serving industrial businesses across diverse sectors.
                </p>
              </div>
            </div>

            {/* Directors Card Grid — 2 Columns on Mobile, 2 Columns on Desktop */}

            {/* TOP ROW — 2 portrait cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6 mb-3 sm:mb-6">
              {DIRECTORS_TOP.map((d) => (
                <div
                  key={d.id}
                  className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 shadow-xl sm:shadow-2xl aspect-[3/4] sm:aspect-[4/3] group cursor-pointer border border-[var(--color-line)]"
                >
                  {/* Untinted natural image */}
                  <OptimizedImage
  src={d.image}
  alt={d.name}
  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
/>

                  {/* Clean bottom gradient for contrast */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Name / title strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 flex items-end justify-between z-10">
                    <div>
                      <h3 className="font-display text-xs sm:text-xl font-extrabold text-white leading-tight">
                        {d.name}
                      </h3>
                      <p className="text-[9px] sm:text-xs font-mono text-white/80 uppercase tracking-wider mt-0.5">
                        {d.title}
                      </p>
                    </div>

                    {/* Round "in" badge */}
                    <div className="h-6 w-6 sm:h-10 sm:w-10 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
                      <span className="font-bold text-slate-800 text-[9px] sm:text-xs leading-none">in</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM ROW — 3 cards (2-column on mobile, 3-column on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
              {DIRECTORS_BOTTOM.map((d) => (
                <div
                  key={d.id}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-900 shadow-lg sm:shadow-xl aspect-[3/4] sm:aspect-[4/5] group cursor-pointer border border-[var(--color-line)]"
                >
                  {/* Untinted natural image */}
                  <OptimizedImage
  src={d.image}
  alt={d.name}
  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
/>

                  {/* Clean bottom gradient for contrast */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 flex items-end justify-between z-10">
                    <div>
                      <h3 className="font-display text-[11px] sm:text-base font-extrabold text-white leading-tight">
                        {d.name}
                      </h3>
                      <p className="text-[8px] sm:text-[11px] font-mono text-white/75 uppercase tracking-wider mt-0.5">
                        {d.title}
                      </p>
                    </div>

                    <div className="h-5 w-5 sm:h-8 sm:w-8 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
                      <span className="font-bold text-slate-800 text-[8px] sm:text-[10px] leading-none">in</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            4. TURNING AMBITIONS INTO RELIABLE OUTCOMES
            ════════════════════════════════════════════════════════ */}
        <section className="py-8 sm:py-14 md:py-20 border-t border-[var(--color-line)]">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-16 items-center">

              <div className="space-y-4 sm:space-y-6">
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-ink)] leading-snug sm:leading-tight tracking-tight">
                  Turning ambitions into reliable outcomes
                </h2>

                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--color-line)] shadow-lg sm:shadow-xl aspect-[16/9] sm:aspect-[4/3] bg-slate-950 group">
                  <OptimizedImage
  src={"/images/desktop/about/film_slitting_machine.png"}
  alt="Automated High-Speed Film Slitting & Converting Machinery"
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
/>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-8">
                <p className="text-xs sm:text-base text-[var(--color-mute)] leading-relaxed">
                  Partnering with businesses to deliver packaging solutions that enhance operational efficiency, support co-extrusion innovation, and create better outcomes in a competitive market.
                </p>

                {/* 2-Column Metrics Grid on Mobile */}
                <div className="border-t border-[var(--color-line)] pt-4 sm:pt-6 grid grid-cols-2 gap-4 sm:block sm:space-y-6">
                  <div>
                    <div className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--color-amber-dark)]">20+</div>
                    <p className="text-[11px] sm:text-sm text-[var(--color-mute)] mt-1 leading-relaxed">
                      Specialized product lines — films, tapes, strapping rolls, protective packaging and labels.
                    </p>
                  </div>

                  <div className="sm:border-t sm:border-[var(--color-line)] sm:pt-6">
                    <div className="font-display text-3xl sm:text-5xl font-extrabold text-[var(--color-ink)]">150+</div>
                    <p className="text-[11px] sm:text-sm text-[var(--color-mute)] mt-1 leading-relaxed">
                      Industrial client accounts we have served, shaped, optimized, and launched since 2018.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            5. CTA BANNER — dark rounded card
            ════════════════════════════════════════════════════════ */}
        <section className="py-8 sm:py-12 md:py-16 border-t border-[var(--color-line)]">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--color-blue-deep)] p-6 sm:p-14 md:p-20 text-center shadow-xl sm:shadow-2xl">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--color-amber)]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--color-amber)]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4 sm:space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center">
                  <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white/10 text-[var(--color-amber)] border border-white/15">
                    <Award className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                  </div>
                </div>

                <h2 className="font-display text-lg sm:text-3xl md:text-4xl font-extrabold text-white leading-snug sm:leading-tight tracking-tight">
                  Get a reliable partner that provides solutions to your packaging challenges
                </h2>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-[var(--color-ink)] text-xs sm:text-sm font-bold hover:bg-[var(--color-amber)] hover:text-white transition-all duration-300 shadow-lg"
                >
                  Talk to our engineers
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </PageWrapper>

      <Footer />
    </div>
  );
}