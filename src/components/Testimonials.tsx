"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { testimonials } from "../data";


export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Mobile-only list state to cycle items for layout swapping animation
  const [list, setList] = useState(testimonials);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Periodically cycle testimonials on mobile to animate them swapping positions
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setList((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last); // Move bottom card to top, pushing others down
        return next;
      });
    }, 4000); // Cycle every 4 seconds
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--color-ink)] py-10 text-white md:py-16">
      {/* Parallax background image */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -top-[15%] -bottom-[15%] opacity-15"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/desktop/testimonials/truck-loading.jpg')" }}
        />
      </motion.div>

      <div className="bg-noise absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
      <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-[var(--color-blue)]/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-32 h-96 w-96 rounded-full bg-[var(--color-blue-deep)]/40 blur-3xl pointer-events-none" />

      {/* Desktop version only */}
      <div className="hidden md:block relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:text-5xl text-balance">
              What our partners say after a year{" "}
              <span className="italic font-light text-[var(--color-blue-3)]" style={{ fontFamily: "Fraunces, serif" }}>
                of dispatches.
              </span>
            </h2>
          </div>
          <div className="hidden md:block md:col-span-5 md:pl-8">
            <p className="text-base leading-relaxed text-white/65 md:text-lg">
              We measure ourselves on renewal rate, not revenue. <span className="font-display text-2xl font-bold text-white">94%</span> of our
              active accounts have been with us for more than 3 years.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-3" data-reveal>
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 25, rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              className={`group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-[var(--color-blue-2)]/50 hover:bg-[var(--color-blue-deep)]/30 ${i === 1 ? "lg:translate-y-4" : ""}`}
              data-hover
            >
              <motion.div
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="mb-6 h-7 w-7"
              >
                <Quote className="h-7 w-7 text-[var(--color-blue-3)]" />
              </motion.div>

              <blockquote className="font-display flex-1 text-base leading-snug text-white/95 sm:text-lg md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-blue-deep)] font-display text-sm font-bold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-display text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/55">{t.role}</div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.1 + j * 0.05 }}
                    >
                      <Star className="h-3 w-3 fill-[var(--color-amber)] text-[var(--color-amber)]" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Mobile view only - High-density all-in-one view with swap positions layout animation */}
      <div className="block md:hidden relative mx-auto px-5">
        <div className="mb-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-blue-3)] font-bold">
            Partner Feedback
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-1 leading-tight">
            What our partners say
          </h2>
          <p className="mt-1.5 text-xs text-white/60">
            94% of our active accounts have been with us for more than 3 years.
          </p>
        </div>

        {/* Compact stack of all 3 reviews, visible at once with company names hidden */}
        <div className="flex flex-col gap-3">
          {list.map((t, i) => (
            <motion.div
              layout
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 15,
                opacity: { duration: 0.45, delay: i * 0.15 }
              }}
            >
              <div
                className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm shadow-md animate-float-y"
                style={{
                  "--float-duration": `${4.5 + i * 0.8}s`,
                  "--float-delay": `${i * 0.5}s`,
                } as React.CSSProperties}
              >
                {/* Top row: Avatar + Name/Role + Stars */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-blue)] to-[var(--color-blue-deep)] font-display text-[10px] font-bold text-white shadow">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-xs font-semibold text-white truncate">
                        {t.name}
                      </div>
                      {/* Hide company name: only display role */}
                      <div className="text-[9px] text-white/50 truncate">
                        {t.role.split(",")[0]}
                      </div>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex shrink-0 gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-2.5 w-2.5 fill-[var(--color-amber)] text-[var(--color-amber)]" />
                    ))}
                  </div>
                </div>

                {/* Quote text directly underneath */}
                <blockquote className="text-xs leading-relaxed text-white/80 pl-0.5 font-normal">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
