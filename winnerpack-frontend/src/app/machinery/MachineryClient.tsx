"use client";
import { apiFetch } from "@/lib/api";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import ScrollProgress from "../../components/ScrollProgress";
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import CTABanner from "../../components/CTABanner";
import { marked } from "marked";
import { initialMachines } from "@/lib/fallback-data";


interface SpecItem {
  label: string;
  value: string;
}

interface Machine {
  model: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  specs: SpecItem[];
  highlights: string[];
}

export default function MachineryPage() {
  const [machineryList, setMachineryList] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/machines")
      .then((res) => {
        if (!res.ok) throw new Error("API responded with error status");
        return res.json();
      })
      .then((data) => {
        setMachineryList(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch machines from API, using client fallback:", err);
        setMachineryList(initialMachines as any);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-12 pb-16">
        {/* Background Atmosphere */}
        <div className="bg-noise absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-mute)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-blue)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-slate-400" />
              </li>
              <li>
                <Link href="/machinery" className="hover:text-[var(--color-blue)] transition-colors">
                  Machinery
                </Link>
              </li>
              <li>
                <ChevronRight className="h-3 w-3 text-slate-400" />
              </li>
              <li className="font-semibold text-[var(--color-ink)]">
                Machinery catalog
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display mt-3 md:mt-5 text-3xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] md:text-6xl text-balance">
              Automate the part of the line <br />
              that slows you down.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[var(--color-mute)] md:text-lg">
              Erectors, sealers, wrappers, strappers and shrink tunnels — installed, commissioned and serviced by people who know your line.
            </p>
          </div>

          {/* Machinery Stack */}
          <div className="space-y-8">
            {loading ? (
              <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--color-blue)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-mute)]">Syncing Machines Catalog...</span>
              </div>
            ) : machineryList.length === 0 ? (
              <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-[var(--color-mute)]">
                No machinery listed in the catalog yet.
              </div>
            ) : (
              <>
                {/* Desktop View: Stack of detailed article panels */}
                <div className="hidden md:block space-y-8">
                  {machineryList.map((m, idx) => (
                    <motion.article
                      key={m.model}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="grid overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white/40 shadow-sm hover:shadow-xl hover:border-[var(--color-blue)]/20 transition-all duration-500 lg:grid-cols-2 backdrop-blur-sm"
                    >
                      {/* Visual Panel */}
                      <div className="group relative aspect-[16/10] overflow-hidden bg-black/5 lg:aspect-auto">
                        <img
                          src={m.image}
                          alt={`${m.model} ${m.name}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/15 pointer-events-none" />
                      </div>

                      {/* Details Content Panel */}
                      <div className="flex flex-col p-10 relative">
                        {/* Floating Background Glow */}
                        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-tr from-[var(--color-blue)]/5 to-transparent opacity-30 blur-2xl pointer-events-none" />

                        <div className="flex items-start justify-between">
                          <div>
                            <span className="rounded bg-[var(--color-blue-soft)] text-[var(--color-blue)] border border-[var(--color-blue-3)]/10 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                              {m.model}
                            </span>
                            <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mt-2">
                              {m.name}
                            </h2>
                            <p className="text-xs text-[var(--color-blue)] font-semibold mt-1">
                              {m.tagline}
                            </p>
                          </div>
                        </div>

                        {m.desc && (
                          <div
                            className="mt-3 text-xs leading-relaxed text-[var(--color-mute)] prose prose-slate max-w-none"
                            dangerouslySetInnerHTML={{ __html: marked.parse(m.desc) as string }}
                          />
                        )}

                        {/* Technical Specifications Grid */}
                        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--color-line)]/50 pt-5">
                          {m.specs.map((s) => (
                            <div key={s.label} className="pb-1 border-b border-[var(--color-line)]/30">
                              <dt className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-mute)]">
                                {s.label}
                              </dt>
                              <dd className="text-xs font-bold text-[var(--color-ink)] mt-0.5">
                                {s.value}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        {/* Highlight Tags */}
                        <div className="mt-6 flex flex-wrap gap-1.5">
                          {m.highlights.map((h) => (
                            <span
                              key={h}
                              className="rounded-full border border-[var(--color-line)] bg-white/70 px-3 py-1 text-[10px] font-semibold text-[var(--color-ink)] shadow-sm"
                            >
                              {h}
                            </span>
                          ))}
                        </div>

                        {/* CTAs */}
                        <div className="mt-8 pt-6 border-t border-[var(--color-line)]/50 flex flex-wrap gap-3">
                          <Link
                            href={`/contact?sku=${m.model}&demo=true`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--color-blue)]"
                          >
                            Request a demo
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href={`/contact?sku=${m.model}&question=true`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-xs font-bold text-[var(--color-ink)] hover:border-[var(--color-ink)] transition"
                          >
                            Ask a question
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Mobile View: Swipeable high-density card track */}
                <div className="md:hidden">
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 -mx-5 px-5">
                    {machineryList.map((m) => (
                      <div
                        key={m.model}
                        className="snap-center shrink-0 w-[80vw] rounded-2xl border border-[var(--color-line)] bg-white p-4 shadow-md flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black/5 mb-3">
                            <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                            <span className="absolute top-2 left-2 rounded bg-[var(--color-blue-soft)] text-[var(--color-blue)] border border-[var(--color-blue-3)]/10 px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider">
                              {m.model}
                            </span>
                          </div>

                          <h2 className="font-display text-base font-bold text-[var(--color-ink)]">
                            {m.name}
                          </h2>
                          <p className="text-[10px] text-[var(--color-blue)] font-semibold mt-0.5">
                            {m.tagline}
                          </p>

                          {/* Top 2 Specifications */}
                          <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-[var(--color-line)]/50 pt-3">
                            {m.specs.slice(0, 2).map((s) => (
                              <div key={s.label}>
                                <span className="block font-mono text-[8px] uppercase tracking-wider text-[var(--color-mute)]">
                                  {s.label}
                                </span>
                                <span className="block text-[10px] font-bold text-[var(--color-ink)] mt-0.5 truncate">
                                  {s.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="mt-4 flex gap-2">
                          <Link
                            href={`/contact?sku=${m.model}&demo=true`}
                            className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-[var(--color-ink)] py-2 text-[10px] font-bold text-white transition"
                          >
                            Demo
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                          <Link
                            href={`/contact?sku=${m.model}&question=true`}
                            className="flex-1 inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white py-2 text-[10px] font-bold text-[var(--color-ink)]"
                          >
                            Inquire
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </main>

      <CTABanner />
      <Footer />
    </div>
  );
}
