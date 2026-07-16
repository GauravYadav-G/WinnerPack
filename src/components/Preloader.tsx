"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setShow(false), 400);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-ink)]"
        >
          <div className="bg-noise absolute inset-0" />
          <div className="absolute inset-0 bg-grid-dark opacity-30" />

          <div className="relative w-full max-w-md px-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 flex items-center gap-3"
            >
              <img src="/logo.png" alt="Winner Pack Logo" className="h-10 w-auto object-contain" />
              <div className="leading-tight">
                <div className="font-display text-base font-bold">Winner Pack</div>
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Technologies</div>
              </div>
            </motion.div>

            <div className="font-display mb-3 flex items-baseline gap-2">
              <motion.span
                key={count}
                initial={{ opacity: 0.5, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-8xl font-bold leading-none tracking-tight"
              >
                {count}
              </motion.span>
              <span className="text-3xl font-light text-white/40">%</span>
            </div>

            <div className="mb-4 h-px w-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${count}%` }}
                className="h-full bg-gradient-to-r from-[var(--color-blue)] via-[var(--color-blue-3)] to-[var(--color-amber)]"
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                {count < 30 && "Initializing…"}
                {count >= 30 && count < 60 && "Loading assets…"}
                {count >= 60 && count < 90 && "Calibrating layout…"}
                {count >= 90 && "Ready"}
              </motion.span>
              <span>DASNA · IN</span>
            </div>

            {/* Decorative scanline */}
            <motion.div
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-blue-3)] to-transparent opacity-40"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
