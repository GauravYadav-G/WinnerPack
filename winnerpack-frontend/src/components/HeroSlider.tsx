"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fetchContent } from "@/lib/content-cache";

type Slide = {
  id: string;
  tag: string;
  heading: string;
  description: string;
  desktopMediaUrl: string;
  mobileMediaUrl: string;
  image?: string;
};

const defaultSlides: Slide[] = [
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
    heading: "End-to-End Solutions",
    description: "Syncing high-tensile strapping, stretch wrap, and tapes to maximize line efficiency and lower total cost-per-pallet.",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-3.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-3.png",
  },
  {
    id: "ad",
    tag: "04 / INFRASTRUCTURE",
    heading: "Tailored Specs. Direct Dispatch.",
    description: "Precision-extruded packaging materials designed for maximum load retention and line throughput.",
    desktopMediaUrl: "/images/desktop/hero-slider/slide-4.png",
    mobileMediaUrl: "/images/mobile/hero-slider/slide-4.png",
  },
];

const DEFAULT_DESKTOP_BANNER = "/images/desktop/hero-slider/right-banner.png";

export default function HeroSlider() {
  const [slides, setSlides] = useState<any[]>(defaultSlides);
  const [desktopRightBanner, setDesktopRightBanner] = useState<string>(DEFAULT_DESKTOP_BANNER);
  const [current, setCurrent] = useState(0);

  // Fetch dynamic content from API
  useEffect(() => {
    fetchContent("homepage")
      .then((data) => {
        if (data.slides && data.slides.length > 0) {
          setSlides(data.slides);
        }
        if (data.rightBanner) {
          setDesktopRightBanner(data.rightBanner);
        }
      })
      .catch((err) => console.error("Failed to load dynamic hero content:", err));
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const currentSlideImage = slides[current]?.desktopMediaUrl || slides[current]?.image || "";
  const currentRightBanner = desktopRightBanner;

  return (
    <section className="relative h-[25vh] md:h-[72vh] w-full overflow-hidden bg-black text-white select-none">
      {/* Split Layout */}
      <div className="absolute inset-x-0 bottom-0 top-0 h-full z-0 flex gap-0">

        {/* Left Side: Animated Slider */}
        <div className="relative w-full lg:w-[70%] h-full overflow-hidden bg-black">
          <AnimatePresence>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <div
                className="absolute inset-0 bg-[length:100%_100%] bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${currentSlideImage}')` }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Side: Static Banner */}
        <div className="relative hidden lg:block lg:w-[30%] h-full overflow-hidden bg-black">
          <div
            className="absolute inset-0 bg-[length:100%_100%] bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${currentRightBanner}')` }}
          />
        </div>

      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-5 z-20 flex gap-2 md:left-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "w-8 bg-[var(--color-amber)]" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
