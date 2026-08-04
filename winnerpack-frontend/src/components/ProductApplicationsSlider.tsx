"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

interface ApplicationImageSlide {
  id: string;
  image: string;
}

const applicationSlides: ApplicationImageSlide[] = [
  {
    id: "action-die-ring-bubble",
    image: "/images/desktop/portfolio/action_die_ring_bubble.jpg",
  },
  {
    id: "action-polymer-granules-hopper",
    image: "/images/desktop/portfolio/action_polymer_granules_hopper.jpg",
  },
  {
    id: "action-factory-plant-overview",
    image: "/images/desktop/portfolio/action_factory_plant_overview.jpg",
  },
  {
    id: "action-extrusion-tower-blue",
    image: "/images/desktop/portfolio/action_extrusion_tower_blue.jpg",
  },
  {
    id: "action-roll-rewinding-slitting",
    image: "/images/desktop/portfolio/action_roll_rewinding_slitting.jpg",
  },
  {
    id: "stretch-pallet-wrapping",
    image: "/images/desktop/portfolio/showcase_stretch_pallet_wrapping.png",
  },
  {
    id: "pp-strapping-action",
    image: "/images/desktop/portfolio/gallery_pp_strapping.png",
  },
  {
    id: "heavy-ldpe-bags",
    image: "/images/desktop/portfolio/showcase_heavy_duty_ldpe_bags.png",
  },
];

export default function ProductApplicationsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const touchStartX = useRef<number | null>(null);

  const total = applicationSlides.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-scroll timer
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3200);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
    touchStartX.current = null;
  };

  const getSpacing = () => {
    if (windowWidth < 640) return 180;
    if (windowWidth < 1024) return 280;
    if (windowWidth < 1280) return 360;
    return 420;
  };

  const spacing = getSpacing();

  return (
    <section
      className="relative overflow-hidden bg-[var(--color-bone)] py-16 sm:py-24 border-t border-b border-[var(--color-line)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-[1536px] px-4 md:px-10">

        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
            Real-World Applications
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
            Materials in Industrial Action
          </h2>
          <div className="mt-4 h-1.5 w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />

          {/* Centered Controls */}
          <div className="hidden sm:flex items-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="flex items-center justify-center h-11 w-11 rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] shadow-xs hover:border-[var(--color-amber)] hover:bg-amber-50 hover:text-[var(--color-amber-dark)] transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="flex items-center justify-center h-11 w-11 rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] shadow-xs hover:border-[var(--color-amber)] hover:bg-amber-50 hover:text-[var(--color-amber-dark)] transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── CAROUSEL STAGE (Pure Borderless Full-Cover Images) ── */}
        <div className="relative h-[440px] sm:h-[500px] md:h-[550px] lg:h-[590px] w-full flex items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          {applicationSlides.map((slide, i) => {
            let offset = i - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 2;

            const scale = isActive ? 1.0 : absOffset === 1 ? 0.84 : 0.7;
            const opacity = isActive ? 1 : absOffset === 1 ? 0.75 : 0.35;
            const zIndex = isActive ? 30 : absOffset === 1 ? 20 : 10;
            const translateX = offset * spacing;

            return (
              <div
                key={slide.id}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "absolute top-1/2 left-1/2 w-[270px] sm:w-[330px] md:w-[380px] lg:w-[410px] h-[390px] sm:h-[460px] md:h-[510px] lg:h-[550px] rounded-3xl overflow-hidden cursor-pointer select-none transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform",
                  isActive
                    ? "shadow-2xl ring-2 ring-[var(--color-amber)]/40"
                    : "shadow-md opacity-60 hover:opacity-85",
                  !isVisible && "pointer-events-none opacity-0"
                )}
                style={{
                  zIndex,
                  opacity,
                  transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale})`,
                }}
              >
                {/* Borderless Full-Cover Image */}
                <img
                  src={slide.image}
                  alt="Materials in Industrial Action"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Indicator Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {applicationSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                index === activeIndex
                  ? "w-9 bg-[var(--color-amber)]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              )}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
