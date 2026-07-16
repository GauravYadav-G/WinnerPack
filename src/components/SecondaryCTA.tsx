"use client";

import { ArrowRight, PhoneCall } from "lucide-react";

export default function SecondaryCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bone)] py-14 md:py-16 text-center border-y border-[var(--color-line)]">
      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8" data-reveal>
        <span className="inline-block rounded-full bg-[var(--color-blue-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-blue)]">
          Consultation
        </span>
        
        <h2 className="font-display mt-5 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]">
          Ready to optimize your packaging throughput?
        </h2>
        
        <p className="mt-4 mx-auto max-w-xl text-sm leading-relaxed text-[var(--color-mute)] md:text-base">
          Talk to our application engineers today. We will configure straps, films, and machines specifically for your payloads.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--color-amber)] px-6 py-3.5 text-sm font-semibold text-[var(--color-blue-deep)] shadow-lg transition hover:bg-[var(--color-amber)]/90"
            data-hover
          >
            <span className="relative z-10">Request Consultation</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+911204107800"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--color-ink)] shadow-sm transition hover:bg-[var(--color-bone)]"
            data-hover
          >
            <PhoneCall className="h-4 w-4 text-[var(--color-blue)]" />
            <span>Call +91 120 410 7800</span>
          </a>
        </div>
      </div>
    </section>
  );
}
