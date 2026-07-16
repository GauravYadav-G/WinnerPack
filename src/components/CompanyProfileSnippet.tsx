"use client";

import { ArrowRight } from "lucide-react";

export default function CompanyProfileSnippet() {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-16">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-4xl text-center" data-reveal>
          <span className="inline-block rounded-full bg-[var(--color-blue-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-blue)]">
            Company Profile
          </span>

          <h2 className="font-display mt-4 text-xl font-bold leading-tight text-[var(--color-ink)] sm:text-2xl md:text-4xl lg:text-5xl">
            Ghaziabad&apos;s trusted source for{" "}
            <span className="italic font-light text-[var(--color-blue)]" style={{ fontFamily: "Fraunces, serif" }}>
              industrial packaging.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-[var(--color-mute)] md:text-lg text-balance">
            Winner Pack Technologies Private Limited supplies environment-friendly
            secondary and tertiary packaging materials and machinery. Guided by our
            motto \"We Serve To Deserve\", we supply stretch films, strapping rolls,
            shrink films, and packaging machinery from our Ghaziabad, UP base.
          </p>

          <div className="mt-8">
            <a
              href="/about-us"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-blue)]"
              data-hover
            >
              Read More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}