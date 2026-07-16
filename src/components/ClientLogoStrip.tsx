"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Brand {
  name: string;
  logo: React.ReactNode;
}

const clients: Brand[] = [
  {
    name: "Lava",
    logo: (
      <img
        src="/Brand_logo/lava.png"
        alt="Lava"
        className="h-8 md:h-12 w-auto max-w-[110px] md:max-w-[160px] object-contain opacity-90 hover:opacity-100 transition-all duration-300 invert mix-blend-screen"
      />
    )
  },
  {
    name: "Vivo",
    logo: (
      <img
        src="/Brand_logo/vivo.png"
        alt="Vivo"
        className="h-14 md:h-16 w-auto max-w-[150px] md:max-w-[180px] object-contain opacity-90 hover:opacity-100 transition-all duration-300 invert mix-blend-screen"
      />
    )
  },
  {
    name: "Noise",
    logo: (
      <img
        src="/Brand_logo/noise.png"
        alt="Noise"
        className="h-14 md:h-16 w-auto max-w-[150px] md:max-w-[180px] object-contain opacity-90 hover:opacity-100 transition-all duration-300 invert mix-blend-screen"
      />
    )
  },
  {
    name: "Fire-Boltt",
    logo: (
      <img
        src="/Brand_logo/firebolt.png"
        alt="Fire-Boltt"
        className="h-14 md:h-16 w-auto max-w-[150px] md:max-w-[180px] object-contain opacity-90 hover:opacity-100 transition-all duration-300 invert mix-blend-screen"
      />
    )
  }
];

const LogoCard: React.FC<{ brand: Brand; floatDir: "up" | "down"; index: number }> = ({
  brand,
  floatDir,
  index,
}) => {
  const cardRef = useRef<HTMLLIElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);

    // 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -6;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.05)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
  }, []);

  const floatDuration = 5 + (index % 4) * 0.8;
  const floatDelay = (index % 5) * 0.6;

  return (
    <li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`logo-card group shrink-0 w-[140px] md:w-[220px] h-[64px] md:h-[86px] flex items-center justify-center px-4 md:px-6 ${
        floatDir === "up" ? "animate-float-y" : "animate-float-y-reverse"
      }`}
      style={{
        "--float-duration": `${floatDuration}s`,
        "--float-delay": `${floatDelay}s`,
      } as React.CSSProperties}
    >
      {/* Inner glow that follows mouse */}
      <div className="card-glow" />

      {/* Logo content */}
      <div className="relative z-10 text-white transition-all duration-500 flex items-center justify-center">
        {brand.logo}
      </div>

      {/* Tooltip */}
      <div className="brand-tooltip">{brand.name}</div>
    </li>
  );
};

export default function ClientLogoStrip() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);
  const speed = 35;
  const direction = "left";
  const floatDirection = "up";

  useEffect(() => {
    if (!scrollerRef.current) return;
    const scroller = scrollerRef.current;

    // Clear existing cloned nodes to prevent accumulation on hot reload
    const existingClones = scroller.querySelectorAll('[aria-hidden="true"]');
    existingClones.forEach((clone) => clone.remove());

    // Clone children for seamless loop
    const items = Array.from(scroller.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scroller.appendChild(clone);
    });

    scroller.style.setProperty("--scroll-duration", `${speed}s`);
    scroller.style.setProperty(
      "--scroll-direction",
      direction === "left" ? "normal" : "reverse"
    );

    setReady(true);
  }, [direction, speed]);

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-8 md:py-16 text-white">
      {/* Atmosphere */}
      <div className="bg-noise absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-35 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
            Trusted Partners
          </div>
        </div>

        <div className="slider-mask relative overflow-hidden">
          <ul
            ref={scrollerRef}
            className={`flex gap-5 md:gap-6 py-6 w-max flex-nowrap ${
              ready ? "animate-scroll" : ""
            }`}
          >
            {clients.map((brand, idx) => (
              <LogoCard
                key={`${brand.name}-${idx}`}
                brand={brand}
                floatDir={floatDirection}
                index={idx}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
