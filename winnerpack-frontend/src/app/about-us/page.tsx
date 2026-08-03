"use client";

import { ArrowRight, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";

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
            (Fixed navbar top padding gap)
            ════════════════════════════════════════════════════════ */}
        <section className="relative pt-2 md:pt-4 pb-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 md:px-8">

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[var(--color-mute)] uppercase tracking-widest mb-4">
              <Link href="/" className="hover:text-[var(--color-ink)] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[var(--color-amber-dark)]">About Us</span>
            </div>

            {/* Centred headline */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-ink)] tracking-tight leading-[1.1]">
                Built to hold <br />
                industry together.
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-mute)] leading-relaxed max-w-xl mx-auto">
                Since 2018 we have supplied and manufactured the packaging materials that keep Indian industry moving — strapping rolls, films, tapes, and protective packaging solutions.
              </p>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-ink)] text-white text-sm font-bold hover:bg-[var(--color-blue-deep)] transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                >
                  Talk to our experts
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Full-width 3:1 panoramic factory banner card */}
            <div className="mt-6 md:mt-8 relative overflow-hidden rounded-3xl border border-[var(--color-line)] shadow-2xl aspect-[21/9] sm:aspect-[2.6/1] bg-slate-950 group">
              <img
                src="/images/desktop/about/hero_banner_panoramic_3to1.png"
                alt="WinnerPack 5-Layer Blown Film Co-Extrusion Line"
                className="h-full w-full object-cover object-[center_45%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            2. MISSION & VISION — two equal columns
            ════════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 border-t border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-amber-dark)]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-amber-dark)]">Mission</span>
                </div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-ink)] leading-snug">
                  To deliver certified, high-cling, and precision-manufactured packaging materials backed by transparent technical specs and 1-business-day response SLAs.
                </p>
              </div>

              <div className="space-y-4 md:border-l md:border-[var(--color-line)] md:pl-16">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-amber-dark)]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-amber-dark)]">Vision</span>
                </div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-ink)] leading-snug">
                  To lead the B2B industrial packaging sector by pioneering eco-friendly, high-tensile solutions that empower zero-breakage supply chains across India and beyond.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            3. "LET'S GET TO KNOW EACH OTHER" & BOARD OF DIRECTORS
            (Merged into one unified section; color tints removed from photos)
            ════════════════════════════════════════════════════════ */}
        <section id="board-of-directors" className="py-14 md:py-20 border-t border-[var(--color-line)] bg-white">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            
            {/* Top Row: Title Left + Story Paragraph Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-end mb-12 md:mb-16">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-amber-dark)] mb-2 block">
                  Our Leadership & Story
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-ink)] leading-tight tracking-tight">
                  Let&apos;s get to <br />know each other
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed">
                <p>
                  Since 2018, Winner Pack Technologies Pvt. Ltd., founded in Ghaziabad, UP, has been dedicated to driving industrial growth through innovative packaging solutions. We focus on creating value and continuously evolving to help businesses succeed.
                </p>
                <p>
                  Registered under GSTIN 09AACCW6640F1Z8 and CIN U51909UP2020PTC129759, we supply and manufacture strapping, shrink and stretch films, tapes, corrugated packaging, courier bags and labels across India — and we still answer the phone ourselves.
                </p>
              </div>
            </div>

            {/* Directors Card Grid (Untinted natural photos) */}

            {/* TOP ROW — 2 large portrait cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {DIRECTORS_TOP.map((d) => (
                <div
                  key={d.id}
                  className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl aspect-[4/3] group cursor-pointer border border-[var(--color-line)]"
                >
                  {/* Untinted natural image */}
                  <img
                    src={d.image}
                    alt={d.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Clean bottom gradient for contrast */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Name / title strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between z-10">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-extrabold text-white leading-tight">
                        {d.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-mono text-white/80 uppercase tracking-wider mt-0.5">
                        {d.title}
                      </p>
                    </div>

                    {/* Round "in" badge */}
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
                      <span className="font-bold text-slate-800 text-xs leading-none">in</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM ROW — 3 smaller cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {DIRECTORS_BOTTOM.map((d) => (
                <div
                  key={d.id}
                  className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl aspect-[3/4] sm:aspect-[4/5] group cursor-pointer border border-[var(--color-line)]"
                >
                  {/* Untinted natural image */}
                  <img
                    src={d.image}
                    alt={d.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Clean bottom gradient for contrast */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between z-10">
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-extrabold text-white leading-tight">
                        {d.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-mono text-white/75 uppercase tracking-wider mt-0.5">
                        {d.title}
                      </p>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
                      <span className="font-bold text-slate-800 text-[10px] leading-none">in</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            4. TURNING AMBITIONS INTO RELIABLE OUTCOMES
            photo left + metrics right
            ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20 border-t border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

              <div className="space-y-6">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-ink)] leading-tight tracking-tight">
                  Turning ambitions into reliable outcomes
                </h2>

                <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-xl aspect-[4/3] bg-slate-950 group">
                  <img
                    src="/images/desktop/about/film_slitting_machine.png"
                    alt="Automated High-Speed Film Slitting & Converting Machinery"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-sm sm:text-base text-[var(--color-mute)] leading-relaxed">
                  Partnering with visionary businesses to transform ideas into impactful success stories — driving process, co-extrusion innovation, and creating better outcomes in a competitive market.
                </p>

                <div className="border-t border-[var(--color-line)] pt-6 space-y-6">
                  <div>
                    <div className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--color-amber-dark)]">20+</div>
                    <p className="text-xs sm:text-sm text-[var(--color-mute)] mt-1.5 leading-relaxed">
                      Specialized product lines — films, tapes, strapping rolls, protective packaging and labels.
                    </p>
                  </div>

                  <div className="border-t border-[var(--color-line)] pt-6">
                    <div className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--color-ink)]">150+</div>
                    <p className="text-xs sm:text-sm text-[var(--color-mute)] mt-1.5 leading-relaxed">
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
        <section className="py-12 md:py-16 border-t border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[var(--color-blue-deep)] p-10 sm:p-14 md:p-20 text-center shadow-2xl">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--color-amber)]/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--color-amber)]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-amber)] border border-white/15">
                    <Award className="h-6 w-6" />
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  Get a reliable partner that provides solutions to your packaging challenges
                </h2>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--color-ink)] text-sm font-bold hover:bg-[var(--color-amber)] hover:text-white transition-all duration-300 shadow-lg"
                >
                  Talk to our engineers
                  <ArrowRight className="h-4 w-4" />
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