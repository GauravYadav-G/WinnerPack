"use client";

/**
 * Auto-scrolling horizontal marquee ticker strip.
 * Text slides left continuously with an orange shimmer sweep.
 */
export default function ScrollTicker() {
  const items = [
    "22 YEARS IN BUSINESS",
    "1,400+ MACHINES INSTALLED",
    "12,000 TONNES / YEAR",
    "850+ ACTIVE CLIENTS",
    "98.4% ON-TIME DELIVERY",
    "PAN-INDIA DISPATCH",
  ];

  // Duplicate so the loop is seamless
  const track = [...items, ...items];

  return (
    <section className="relative flex h-24 items-center overflow-hidden bg-[var(--color-ink)] md:h-32">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      {/* Left & right edge fade masks */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-ink) 0%, transparent 12%, transparent 88%, var(--color-ink) 100%)",
        }}
      />

      {/* Scrolling track */}
      <div className="flex w-max animate-marquee items-center gap-0">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-0 font-display font-bold tracking-widest uppercase"
            style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
          >
            <span className="text-shimmer px-6 md:px-10">{item}</span>
            {/* Separator dot */}
            <span
              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ background: "#F59E0B", opacity: 0.7 }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
