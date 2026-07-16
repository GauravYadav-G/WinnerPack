"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Package, Film, Wrench, Truck } from "lucide-react";
import { useRef, useState } from "react";

const profileHighlights = [
  {
    title: "Corrugated Boxes & Rolls",
    desc: "Corrugated box and roll packaging supplied to your spec.",
    icon: Package,
  },
  {
    title: "Strap Rolls",
    desc: "PP and PET strap rolls for secure palletized shipping.",
    icon: Truck,
  },
  {
    title: "Shrink & Stretch Films",
    desc: "POF shrink, LDPE shrink, PVC shrink, and machine stretch films.",
    icon: Film,
  },
  {
    title: "Strapping Machines & Tools",
    desc: "Strapping and taping machines, with spares and service.",
    icon: Wrench,
  },
];

export default function CompanyProfile() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play interrupted", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="profile" className="relative overflow-hidden bg-[var(--color-bone)] py-14 md:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-stripes opacity-40 pointer-events-none" />
      <div className="bg-noise absolute inset-0 pointer-events-none" />
      <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[var(--color-blue)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] grid-cols-1 lg:grid-cols-4">

          {/* Top-Left: Intro Column (Spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2 bg-white p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block rounded-full bg-[var(--color-blue-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-blue)]">
                Company Profile
              </span>

              <h2 className="font-display mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-5xl text-balance">
                Ghaziabad&apos;s trusted source for industrial packaging.
              </h2>

              <p className="mt-6 text-base leading-relaxed text-[var(--color-mute)]">
                Winner Pack Technologies supplies PP &amp; PET strap rolls, shrink and
                stretch films, corrugated packaging, courier bags, and the machines
                that run them — backed by service and spares out of our Ghaziabad,
                UP base.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="/about-us"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-blue)]"
                data-hover
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Top-Right: Video Player Column (Spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2 bg-white p-6 flex flex-col justify-center"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-line)] bg-slate-900 shadow-lg group">
              <video
                ref={videoRef}
                poster="/images/desktop/misc/image.png"
                loop
                muted
                playsInline
                onClick={handlePlayClick}
                className="h-full w-full object-cover cursor-pointer"
              >
                <source src="/images/video/generate_an_video_for_hero_sec.mp4" type="video/mp4" />
              </video>

              {/* Autoplay preview overlay when not playing */}
              {!isPlaying && (
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none">
                  <div className="flex items-center gap-2 self-start rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Winner Pack, Ghaziabad
                  </div>

                  <div className="flex items-center gap-4 self-center pointer-events-auto">
                    <button
                      onClick={handlePlayClick}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-blue)] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[var(--color-blue-2)]"
                      aria-label="Play video"
                    >
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </button>
                  </div>

                  <p className="font-mono text-[9px] text-white/60 tracking-wider">
                    Click to Play Video with Audio
                  </p>
                </div>
              )}

              {/* Pause button overlay on hover when playing */}
              {isPlaying && (
                <div
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Bottom Highlight Cards (4 cells) */}
          {profileHighlights.map((highlight, idx) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative overflow-hidden bg-white p-8 transition-colors duration-500 hover:bg-[var(--color-blue-deep)] flex flex-col justify-between"
                data-hover
              >
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                <div className="flex items-center justify-between mb-8">
                  <div className="font-mono text-[10px] font-bold text-[var(--color-line-2)] transition-colors group-hover:text-[var(--color-blue-3)]">
                    0{idx + 1}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--color-blue-soft)] text-[var(--color-blue)] transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:bg-[var(--color-blue)] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold leading-tight text-[var(--color-ink)] transition-colors group-hover:text-white">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-mute)] transition-colors group-hover:text-white/70">
                    {highlight.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--color-blue)] opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  Explore Spec Sheet
                  <span className="h-px w-6 bg-[var(--color-blue-3)]" />
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}