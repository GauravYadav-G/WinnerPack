"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { fetchContent } from "@/lib/content-cache";
import { defaultAbout } from "@/lib/site-defaults";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutStrip() {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    fetchContent("homepage")
      .then((data) => {
        if (data.about) setAbout(data.about);
      })
      .catch(() => {
        // Use local content when the CMS is unavailable.
      });
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-bone)] py-12 sm:py-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-[var(--color-amber)]/[0.055] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <span className="mb-2 font-mono text-xs font-bold tracking-widest text-[var(--color-amber-dark)]">
            About Us
          </span>
          <h2
            id="about-heading"
            className="font-display text-balance text-2xl font-extrabold leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {about.tagline}
          </h2>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)]" />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 sm:mt-11"
        >
          <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch">
            <div className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-[var(--color-line)] sm:min-h-[390px] lg:col-span-7 lg:min-h-[410px] lg:rounded-[2rem]">
              <OptimizedImage
                src={about.image1 || "/images/desktop/about/about_factory_floor_v2.webp"}
                alt="Winner Pack industrial packaging production facility"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                width={1448}
                height={1086}
              />
            </div>

            <div className="flex min-h-[360px] flex-col justify-between rounded-[1.75rem] border border-[var(--color-line)] bg-white p-7 shadow-[0_14px_40px_rgba(23,13,73,0.06)] sm:p-9 lg:col-span-5 lg:min-h-[410px] lg:rounded-[2rem] lg:p-10">
              <div>
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-1.5 w-9 rounded-full bg-[var(--color-amber)]" aria-hidden="true" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-amber-dark)]">
                    Our promise
                  </span>
                </div>
                <blockquote className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-4xl">
                  “We Serve To Deserve”
                </blockquote>
                <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-mute)] sm:text-base">
                  {about.para2 || "Premium secondary and tertiary packaging, developed around your operational requirements."}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-line)] pt-5 text-sm font-semibold text-[var(--color-ink-3)]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)]">
                    <Leaf className="h-4 w-4" aria-hidden="true" />
                  </span>
                  Environment-conscious materials and processes
                </div>
              </div>

              <Link
                href="/about-us"
                className="group mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-ink-3)] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-steel)]"
              >
                Discover our story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {about.stats?.length > 0 && (
            <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] bg-white sm:grid-cols-4">
              {about.stats.slice(0, 4).map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="relative px-5 py-5 text-center sm:px-6 sm:py-6"
                >
                  {index > 0 && (
                    <span className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-[var(--color-line)] sm:block" aria-hidden="true" />
                  )}
                  {index > 1 && (
                    <span className="absolute inset-x-5 top-0 h-px bg-[var(--color-line)] sm:hidden" aria-hidden="true" />
                  )}
                  <p className="font-display text-2xl font-extrabold leading-none tracking-tight text-[var(--color-ink-3)] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--color-mute)] sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
