"use client";

import { motion } from "framer-motion";
import { TIMELINE } from "../lib/mock-data";
import OptimizedImage from '@/components/OptimizedImage';

const timelineImages = [
  "/images/desktop/journey/journey_trading_2018.png",
  "/images/desktop/journey/journey_incorporation_2020.png",
  "/images/desktop/journey/journey_manufacturing_2022.png",
  "/images/desktop/journey/journey_portfolio_2024.png",
];

export default function DiscoverCompany() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bone)] py-14 md:py-16">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[var(--color-blue-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-blue)]">
            Our Journey
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-[var(--color-ink)] md:text-4xl">
            Discover Our Company
          </h2>
        </div>

        <div className="space-y-10 md:space-y-24">
          {TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const img = timelineImages[idx] || "/images/desktop/hero/hero-factory.jpg";

            return (
              <div 
                key={item.year}
                className="grid gap-8 items-center md:grid-cols-12"
              >
                {/* Left/Right Text */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`md:col-span-6 ${isEven ? "md:order-1" : "md:order-2"}`}
                >
                  <div className="font-display text-3xl font-extrabold text-[var(--color-blue)] mb-3 md:text-4xl">
                    {item.year}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--color-mute)]">
                    {item.text}
                  </p>
                </motion.div>

                {/* Left/Right Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`md:col-span-6 overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-md ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <OptimizedImage
  src={img}
  alt={item.title}
  className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-105"
/>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
