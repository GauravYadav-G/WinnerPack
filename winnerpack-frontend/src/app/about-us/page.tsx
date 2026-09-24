"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Factory, ShieldCheck, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import { PageHeader } from "@/components/ui/PageHeader";
import OptimizedImage from "@/components/OptimizedImage";

const metrics = [
  { value: "2018", label: "Our journey began" },
  { value: "20+", label: "Specialized product lines" },
];

export default function AboutUs() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6%" },
    transition: { duration: 0.45 },
  };

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        <PageHeader
          title="About Us"
          eyebrow="Built to Hold Industry Together."
          crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
          align="left"
        />

        <section className="border-b border-[var(--color-line)] bg-white py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <motion.div {...reveal} className="lg:col-span-6">
                <p className="font-mono text-xs font-bold tracking-widest text-[var(--color-amber-dark)]">Who We Are</p>
                <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
                  Practical Packaging Solutions, Built Around Real Operations.
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--color-mute)] sm:text-base">
                  <p>
                    Winner Pack Technologies Pvt. Ltd. supplies and manufactures packaging materials for industrial businesses across diverse sectors.
                  </p>
                  <p>
                    Our range includes strapping rolls, shrink and stretch films, tapes, courier bags, labels, and protective packaging—supported by responsive coordination and clear technical specifications.
                  </p>
                </div>
                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {["Material selection support", "Custom specification guidance", "Reliable dispatch coordination", "Quality-focused supply"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-bone)] px-4 py-3 text-sm font-semibold text-[var(--color-ink)]">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-amber-dark)]" /> {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...reveal} className="lg:col-span-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-slate-900 shadow-xl sm:rounded-3xl">
                  <OptimizedImage src="/images/desktop/about/about_factory_floor_v2.png" alt="Packaging film production floor with technicians inspecting the line" className="h-full w-full object-cover" loading="eager" fetchPriority="high" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-blue-deep)]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
                    <p className="font-mono text-xs font-bold tracking-wider text-[var(--color-amber)] [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">Winner Pack Technologies</p>
                    <p className="mt-1 font-display text-lg font-bold sm:text-2xl [text-shadow:_0_2px_10px_rgba(0,0,0,0.85)]">Manufacturing and Supply Capability You Can Depend On.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bone)] sm:grid-cols-2">
              {metrics.map((metric, index) => (
                <div key={metric.label} className={`p-6 text-center sm:p-8 ${index > 0 ? "border-t border-[var(--color-line)] sm:border-l sm:border-t-0" : ""}`}>
                  <div className="font-display text-3xl font-extrabold text-[var(--color-amber-dark)] sm:text-4xl">{metric.value}</div>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-mute)]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-line)] bg-[var(--color-bone)] py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="mb-8 text-center sm:mb-10">
              <p className="font-mono text-xs font-bold tracking-widest text-[var(--color-amber-dark)]">What Guides Us</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-4xl">Clear Purpose. Consistent Execution.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <motion.article {...reveal} className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-amber-soft)] text-[var(--color-amber-dark)]"><Zap className="h-5 w-5" /></div>
                <p className="mt-6 font-mono text-xs font-bold tracking-widest text-[var(--color-amber-dark)]">Our Mission</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug text-[var(--color-ink)] sm:text-2xl">
                  Deliver Precision Packaging Materials With Transparent Specifications and Responsive Customer Support.
                </h3>
              </motion.article>
              <motion.article {...reveal} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-blue-deep)] p-6 text-white shadow-sm sm:rounded-3xl sm:p-8">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[var(--color-amber)]"><ShieldCheck className="h-5 w-5" /></div>
                <p className="mt-6 font-mono text-xs font-bold tracking-widest text-[var(--color-amber)]">Our Vision</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug sm:text-2xl">
                  Be the Trusted Packaging Partner Behind Efficient, Reliable, and Sustainable Supply Chains.
                </h3>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-line)] bg-white py-10 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <motion.div {...reveal} className="lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-slate-900 shadow-lg sm:rounded-3xl">
                  <OptimizedImage src="/images/desktop/about/film_slitting_operator_v2.png" alt="Technician operating a flexible film slitting and rewinding line" className="h-full w-full object-cover" />
                </div>
              </motion.div>
              <motion.div {...reveal} className="lg:col-span-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-blue-soft)] text-[var(--color-blue)]"><Factory className="h-5 w-5" /></div>
                <p className="mt-5 font-mono text-xs font-bold tracking-widest text-[var(--color-amber-dark)]">Operational Capability</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight text-[var(--color-ink)] sm:text-4xl">From Requirement to Reliable Dispatch.</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-mute)] sm:text-base">
                  We connect material selection, converting, quality oversight, and supply coordination so each solution fits the application, machinery, load, and delivery conditions.
                </p>
                <div className="mt-6 space-y-3">
                  {["Application-led material guidance", "Precision converting and finishing", "Quality checks and batch consistency", "Responsive inventory and dispatch support"].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-b border-[var(--color-line)] pb-3 text-sm font-semibold text-[var(--color-ink)] sm:text-base">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-amber-dark)]" /> {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <CTABanner />
      </PageWrapper>
      <Footer />
    </div>
  );
}
