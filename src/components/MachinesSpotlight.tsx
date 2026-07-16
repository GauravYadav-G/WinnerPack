"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { machinesSpotlight } from "../data";

export default function MachinesSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Disable scroll parallax on mobile to prevent performance lag
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const imgY = useTransform(scrollYProgress, [0, 1], [isMobile ? 0 : 80, isMobile ? 0 : -80]);

  return (
    <section ref={ref} id="machines" className="relative overflow-hidden bg-white py-10 md:py-16">
      {/* Floating background dots */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-3 w-3 rounded-full bg-[var(--color-blue)]/40 blur-sm" />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-2 w-2 rounded-full bg-[var(--color-amber)]/50 blur-sm" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 grid items-end gap-4 md:gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
              Get the machine that fits your line,{" "}
              <span className="italic font-light text-[var(--color-blue)]" style={{ fontFamily: "Fraunces, serif" }}>
                not just the priciest one.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <p className="text-xs md:text-base leading-relaxed text-[var(--color-mute)] md:text-lg">
              We supply and service shrink wrapper machines, stretch wrapper machines,
              taping machines and strapping machines — along with spares — so your
              packaging line gets what actually fits it.
            </p>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16" data-reveal>
          {/* Visual */}
          <div className="relative lg:col-span-7">
            <motion.div style={{ y: imgY }} className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)]">
                <div className="relative aspect-[5/4] w-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/desktop/machines/machine-line.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-5">
            <ul className="grid grid-cols-2 gap-2 md:gap-2.5">
              {machinesSpotlight.map((m) => (
                <li
                  key={m}
                  className="group flex items-start gap-2 rounded-md p-2 text-xs md:text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-blue-soft)]"
                  data-hover
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0 text-[var(--color-blue)] transition-transform group-hover:scale-110" />
                  <span className="font-medium">{m}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-blue)] px-5 py-3 md:px-6 md:py-3.5 text-xs md:text-sm font-semibold text-white shadow-lg shadow-[var(--color-blue)]/30 transition hover:bg-[var(--color-blue-deep)]"
                data-hover
              >
                <span className="relative z-10">Ask about machines &amp; spares</span>
                <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-5 py-3 md:px-6 md:py-3.5 text-xs md:text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]"
                data-hover
              >
                Request a quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}