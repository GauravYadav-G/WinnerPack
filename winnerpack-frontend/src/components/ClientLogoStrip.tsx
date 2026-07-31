"use client";

import { Globe, ShieldCheck, Award } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Brand data — name + brand colour for the text logo pill
───────────────────────────────────────────────────────────── */
const row1 = [
  { name: "Lava",              img: "/Brand_logo/lava.png" },
  { name: "Adani",             color: "#0060a8" },
  { name: "Coca-Cola",         color: "#e41e2b" },
  { name: "Nestlé",            color: "#7b512c" },
  { name: "Samsung",           color: "#1428a0" },
  { name: "P&G",               color: "#00205b" },
  { name: "Wipro",             color: "#555" },
  { name: "ITC",               color: "#003366" },
  { name: "Godrej",            color: "#00529b" },
  { name: "L'ORÉAL",           color: "#1a1a1a" },
  { name: "Unilever",          color: "#1f365d" },
  { name: "HUL",               color: "#1428a0" },
];

const row2 = [
  { name: "Vivo",              img: "/Brand_logo/vivo.png" },
  { name: "Noise",             img: "/Brand_logo/noise.png" },
  { name: "Fire-Boltt",        img: "/Brand_logo/firebolt.png" },
  { name: "Amway",             color: "#002f6c" },
  { name: "Bisleri",           color: "#009b84" },
  { name: "Britannia",         color: "#d32f2f" },
  { name: "Dabur",             color: "#00703c" },
  { name: "Dr. Reddy's",       color: "#3f2b96" },
  { name: "Haldiram's",        color: "#e31e24" },
  { name: "Jindal Steel",      color: "#005a9c" },
  { name: "PATANJALI",         color: "#006837" },
  { name: "DIAGEO",            color: "#9b2743" },
];

/* ─────────────────────────────────────────────────────────────
   Single logo pill — glass morphism card
───────────────────────────────────────────────────────────── */
function LogoPill({ brand }: { brand: (typeof row1)[number] }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-14 px-7 mx-3 rounded-2xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow duration-300 select-none cursor-default group">
      {"img" in brand && brand.img ? (
        <img
          src={brand.img}
          alt={brand.name}
          className="max-h-7 max-w-[100px] w-auto h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-400 opacity-60 group-hover:opacity-100"
        />
      ) : (
        <span
          className="font-bold text-sm sm:text-base tracking-tight whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "color" in brand ? brand.color : "#333" }}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Marquee row — duplicated for seamless infinite scroll
───────────────────────────────────────────────────────────── */
function MarqueeRow({
  brands,
  reverse = false,
}: {
  brands: (typeof row1)[number][];
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[var(--color-bone)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[var(--color-bone)] to-transparent" />

      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {/* Double the list for seamless loop */}
        {[...brands, ...brands].map((brand, i) => (
          <LogoPill key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────────────── */
export default function ClientLogoStrip() {
  return (
    <section
      id="clients"
      className="relative overflow-hidden bg-[var(--color-bone)] py-20 sm:py-28 border-t border-b border-[var(--color-line)]"
    >
      {/* Soft radial glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[800px] rounded-full bg-[var(--color-amber)]/6 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-18 pb-10 border-b border-[var(--color-line)]">

          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.1] text-balance">
              Brands from all over the world love us!
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <p className="text-sm sm:text-base text-[var(--color-mute)] leading-relaxed">
              From renowned FMCG giants to electronics leaders — our clients trust WinnerPack for guaranteed supply, precise specs, and zero quality escapes.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--color-line)]">
              {[
                { icon: Globe,        label: "32+ Global Brands" },
                { icon: ShieldCheck,  label: "100% Quality QC" },
                { icon: Award,        label: "ISO Certified" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 flex-shrink-0 text-[var(--color-amber)]" />
                  <span className="text-xs font-semibold text-[var(--color-ink)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Marquee Rows ── */}
        <div className="space-y-4">
          <MarqueeRow brands={row1} />
          <MarqueeRow brands={row2} reverse />
        </div>
      </div>

      {/* Keyframe styles injected inline */}
      <style jsx global>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

