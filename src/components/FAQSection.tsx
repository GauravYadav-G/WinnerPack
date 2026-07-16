"use client";

import { motion } from "framer-motion";
import { Accordion } from "./ui/Accordion";
import { FAQS } from "../lib/mock-data";

export default function FAQSection() {
  return (
    <section id="faqs" className="relative overflow-hidden bg-[var(--color-bone)] py-10 md:py-16">
      {/* Background textures */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl px-5 md:px-8">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[var(--color-blue-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-blue)]">
            Support
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion items={FAQS} />
        </motion.div>
      </div>
    </section>
  );
}
