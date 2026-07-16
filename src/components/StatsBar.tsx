"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "../data";
import { TrendingUp } from "lucide-react";

function Counter({ to, suffix = "" }: { to: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  const numeric = parseFloat(to.replace(/[^0-9.]/g, ""));
  const prefix = to.match(/^[^\d]*/)?.[0] ?? "";

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(eased * numeric);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  const formatted = (() => {
    if (numeric % 1 !== 0) return value.toFixed(1);
    if (numeric >= 1000) return Math.floor(value).toLocaleString();
    return Math.floor(value).toString();
  })();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  // Mobile interactive logo-card style hover states
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState<Record<number, { x: string; y: string }>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePos((prev) => ({
      ...prev,
      [index]: { x: `${x}%`, y: `${y}%` }
    }));

    // 3D tilt + float up
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -6;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.03)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = "";
  };

  return (
    <section ref={ref} className="relative mt-0 md:-mt-16 z-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* ── MOBILE: 2x2 Grid of Floating Glassmorphism Cards ── */}
        <div className="md:hidden relative px-1 py-1">
          {/* Glowing Blue Backdrop (Theme Color, low intensity) */}
          <div className="absolute inset-0 bg-blue-600/5 blur-2xl rounded-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-2 gap-3 relative z-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                ref={(el) => { cardRefs.current[i] = el; }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`stats-glass-card rounded-xl border border-white/70 bg-white/50 backdrop-blur-md p-3.5 shadow-lg shadow-blue-900/5 relative overflow-hidden flex flex-col justify-between transition-transform duration-300 ease-out ${i === 2 ? "col-span-2" : ""}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Custom theme-aligned card-glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePos[i]?.x || "50%"} ${mousePos[i]?.y || "50%"}, rgba(37, 99, 235, 0.08) 0%, transparent 60%)`
                  }}
                />

                <div className="relative z-10 pointer-events-none">
                  <span className="block font-mono text-[8px] font-bold uppercase tracking-wider text-[var(--color-mute)]">
                    {s.sub}
                  </span>
                  <div className="font-display text-2xl font-black tracking-tight text-[var(--color-ink)] mt-1">
                    <Counter
                      to={s.value}
                      suffix={s.value.includes("+") ? "+" : s.value.includes("%") ? "%" : ""}
                    />
                  </div>
                  <span className="block text-[10px] font-bold text-[var(--color-ink)]/90 mt-0.5 leading-tight">
                    {s.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: original elevated card grid ── */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="hidden md:block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-2xl shadow-[var(--color-blue-deep)]/10"
        >
          <div className="grid divide-x divide-[var(--color-line)] md:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.23, 1, 0.32, 1] }}
                className="group relative overflow-hidden px-6 py-8"
                data-hover
              >
                <div className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[var(--color-mute)]">
                  {s.sub}
                </div>
                <div className="font-display mt-3 text-5xl font-bold tracking-tight text-[var(--color-ink)]">
                  <Counter
                    to={s.value}
                    suffix={s.value.includes("+") ? "+" : s.value.includes("%") ? "%" : ""}
                  />
                </div>
                <div className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{s.label}</div>
                {s.trending && (
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-blue)]">
                    <TrendingUp className="h-3 w-3" />
                    Trending up
                  </div>
                )}
                <div className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-[var(--color-blue)] transition-transform duration-500 group-hover:scale-x-100" />
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-blue-soft)]/0 via-[var(--color-blue-soft)]/50 to-[var(--color-blue-soft)]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
