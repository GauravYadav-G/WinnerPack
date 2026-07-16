"use client";
import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { TextReveal } from "./TextReveal";

type Step = {
  no: string;
  title: string;
  text: string;
  metric: string;
  metricLabel: string;
  image: string;
};

const steps: Step[] = [
  {
    no: "01",
    title: "Specify",
    text: "We size the material to your actual load — width, gauge, core and grade — not the nearest catalogue line.",
    metric: "Custom spec",
    metricLabel: "matched to your pallet",
    image: "/images/desktop/process/specify_step.png",
  },
  {
    no: "02",
    title: "Sample",
    text: "Before a full order is placed, we share a cut sample of the exact material so you can check it against your load on the floor.",
    metric: "Pre-order",
    metricLabel: "sample check",
    image: "/images/desktop/process/test_step.png",
  },
  {
    no: "03",
    title: "Supply",
    text: "We source and supply strap rolls, shrink films, tapes, corrugated packaging and courier bags to keep your production line stocked.",
    metric: "Since 2018",
    metricLabel: "in operation",
    image: "/images/desktop/process/produce_step.png",
  },
  {
    no: "04",
    title: "Deliver",
    text: "Orders are dispatched from our Ghaziabad, UP base and delivered on the schedule agreed with your team.",
    metric: "Ghaziabad",
    metricLabel: "dispatch base",
    image: "/images/desktop/process/deliver_step.png",
  },
];

// Render the set twice for a seamless loop. Duplicating in JSX (rather
// than cloning DOM nodes after mount) guarantees the two halves are
// pixel-identical from the very first paint, and removes the timing gap
// between initial render and when clones used to get appended.
const loopedSteps: (Step & { key: string })[] = [
  ...steps.map((s) => ({ ...s, key: s.no })),
  ...steps.map((s) => ({ ...s, key: `${s.no}-dup` })),
];

export function ProcessScroll() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const [inView, setInView] = useState(true);

  // Set marquee speed. The duplicate card set is now rendered directly in
  // JSX (see loopedSteps below) instead of being cloned via DOM manipulation
  // after mount — that removes the mount-timing gap and any width/gap
  // mismatch between the two halves, which was the likely cause of the
  // stutter at the loop seam.
  useEffect(() => {
    if (!scrollerRef.current || reduce) return;
    scrollerRef.current.style.setProperty("--scroll-duration", "28s");
    scrollerRef.current.style.setProperty("--scroll-direction", "normal");
    setReady(true);
  }, [reduce]);

  useEffect(() => {
    if (!mobileScrollerRef.current || reduce) return;
    mobileScrollerRef.current.style.setProperty("--scroll-duration", "18s");
    mobileScrollerRef.current.style.setProperty("--scroll-direction", "normal");
    setMobileReady(true);
  }, [reduce]);

  // Pause marquee when section is off-screen
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === "undefined") return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mobilePlayState = inView ? "running" : "paused";

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-ink)] py-16 md:py-24"
    >
      {/* Atmosphere — desktop only. These layers cost real paint/composite
          time and add nothing functional on a scrolling mobile section. */}
      <div className="bg-noise absolute inset-0 pointer-events-none hidden md:block" />
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none hidden md:block" />
      <div className="absolute left-1/3 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--color-blue)]/10 blur-3xl pointer-events-none hidden md:block" />
      <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none hidden md:block" />

      {/* Header */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 mb-8 md:mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-amber)] hidden md:inline-block mb-2">
            How we work
          </span>
          <TextReveal
            as="h2"
            text="The Winner Pack standard"
            className="font-display text-2xl font-bold text-white sm:text-4xl lg:text-5xl"
          />
        </div>
      </div>

      {/* Desktop View — unchanged behavior, unchanged structure */}
      <div className="hidden md:block slider-mask relative overflow-hidden">
        <div
          ref={scrollerRef}
          className={`flex gap-5 w-max flex-nowrap px-5 ${ready ? "animate-scroll" : ""}`}
        >
          {loopedSteps.map((s, idx) => (
            <article
              key={s.key}
              aria-hidden={idx >= steps.length}
              className="group relative flex h-[58vh] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 sm:w-[42vw] lg:w-[30vw] backdrop-blur-sm transition-colors duration-500 hover:border-[var(--color-blue-2)]/30 hover:bg-white/[0.05]"
            >
              <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 42vw, 80vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-3 left-3 font-mono text-xs font-bold text-[var(--color-amber)]">{s.no}</span>
              </div>
              <div className="relative z-10 mt-4">
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/65 line-clamp-3">{s.text}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-[var(--color-amber)]">{s.metric}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/45">{s.metricLabel}</span>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[var(--color-blue)]/10 via-transparent to-[var(--color-amber)]/5" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Mobile View — mask removed, blur removed, next/image, scroll-pause */}
      <div className="md:hidden relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10 bg-gradient-to-r from-[var(--color-ink)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-[var(--color-ink)] to-transparent" />

        <div
          ref={mobileScrollerRef}
          className={`flex gap-4 w-max flex-nowrap px-5 will-change-transform ${mobileReady ? "animate-scroll" : ""}`}
          style={{ transform: "translateZ(0)", animationPlayState: mobilePlayState }}
        >
          {loopedSteps.map((s, idx) => (
            <div
              key={s.key}
              aria-hidden={idx >= steps.length}
              className="relative flex h-[48vh] w-[75vw] sm:w-[45vw] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-ink-2)] p-5"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 mb-3">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="75vw"
                  quality={60}
                  loading="eager"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-mono text-xs text-[var(--color-amber)]">{s.no}</div>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/65 line-clamp-3">{s.text}</p>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-[var(--color-amber)]">{s.metric}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/45">{s.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}