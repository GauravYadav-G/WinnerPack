"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

type Slide = {
  id: string;
  tag: string;
  heading: string;
  description: string;
  desktopMediaUrl: string;
  mobileMediaUrl: string;
};

const slides: Slide[] = [
  {
    id: "capacity",
    tag: "01 / CAPACITY",
    heading: "12,000+ Tons Annually",
    description: "Dual-plant automated capacity ensures consistent thickness and high-speed delivery for heavy industrial loads.",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-1.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-1.png",
  },
  {
    id: "quality",
    tag: "02 / QUALITY",
    heading: "ISO 9001:2015 Standards",
    description: "Process-controlled extrusion runs with strict tensile testing and batch traceability on every dispatch.",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-2.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-2.png",
  },
  {
    id: "automation",
    tag: "03 / PERFORMANCE",
    heading: "End-to-End Automation",
    description: "Syncing strapping, wrapping and taping machines to maximize line efficiency and lower total cost-per-pallet.",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-3.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-3.png",
  },
  {
    id: "ad",
    tag: "04 / INFRASTRUCTURE",
    heading: "End-to-End Automation",
    description: "Syncing strapping, wrapping and taping machines to maximize line efficiency and lower total cost-per-pallet.",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-4.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-4.png",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[55dvh] md:h-[72vh] w-full overflow-hidden bg-[var(--color-ink)] text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-dark opacity-35 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-20 z-10 pointer-events-none" />

      {/* 70/30 Split Layout */}
      <div className="absolute inset-x-0 bottom-0 top-0 h-full z-0 flex gap-0">

        {/* Left Side: Animated Slider (70% width) */}
        <div className="relative w-[70%] h-full overflow-hidden border-r border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <div
                className="absolute inset-0 bg-[length:100%_100%] bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${isMobile ? slides[current].mobileMediaUrl : slides[current].desktopMediaUrl}')` }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Left (Middle of left side) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-white hover:text-black focus:outline-none"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Navigation Arrows - Right (Middle of right side of the main slider) */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-white hover:text-black focus:outline-none"
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

        {/* Right Side: Static Banner (30% width) */}
        <div className="relative w-[30%] h-full overflow-hidden bg-[var(--color-ink)] group">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 group-hover:scale-105"
            style={{ backgroundImage: "url('/images/desktop/hero-slider/right-banner.png')" }}
          />
        </div>

      </div>

      {/* Slide Indicators (Left corner of the left slider) */}
      <div className="absolute bottom-6 left-5 z-20 flex gap-2 md:left-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-[var(--color-amber)]" : "w-2 bg-white/40"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
