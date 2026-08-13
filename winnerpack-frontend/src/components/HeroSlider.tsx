"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fetchContent } from "@/lib/content-cache";
import { fallbackData } from "@/lib/fallback-data";

type Slide = {
  id: string;
  tag: string;
  heading: string;
  description: string;
  desktopMediaUrl: string;
  mobileMediaUrl: string;
  image?: string;
};

// CMS seed data still stores the original `/images/...` paths. The matching
// WebP assets are generated at build time; user uploads use absolute URLs and
// are intentionally left untouched.
function getOptimizedStaticImage(src: string): string {
  return src;
}

const defaultSlides: Slide[] = fallbackData.slides.map((slide) => ({
  id: slide.id,
  tag: slide.tag,
  heading: slide.heading,
  description: slide.description,
  desktopMediaUrl: getOptimizedStaticImage(slide.desktopMediaUrl),
  mobileMediaUrl: getOptimizedStaticImage(slide.mobileMediaUrl),
}));
const DEFAULT_DESKTOP_BANNER = getOptimizedStaticImage(fallbackData.rightBanner);

export default function HeroSlider() {
  const [slides, setSlides] = useState<any[]>(defaultSlides);
  const [desktopRightBanner, setDesktopRightBanner] = useState<string>(DEFAULT_DESKTOP_BANNER);
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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
      .catch(() => {
        // Backend offline — fall back gracefully to default hero slides
      });
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Check if horizontal movement is dominant and exceeds threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentSlideImage = getOptimizedStaticImage(
    slides[current]?.desktopMediaUrl || slides[current]?.image || ""
  );
  const currentRightBanner = getOptimizedStaticImage(desktopRightBanner);

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[25vh] md:h-[72vh] w-full overflow-hidden bg-black text-white select-none"
    >
      {/* Split Layout */}
      <div className="absolute inset-x-0 bottom-0 top-0 h-full z-0 flex gap-0">

        {/* Left Side: Slider Image */}
        <div className="relative w-full lg:w-[70%] h-full overflow-hidden bg-black">
          <AnimatePresence>
            <motion.div
              key={current}
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full bg-[length:100%_100%] bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${currentSlideImage}')` }}
            />
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
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-3 sm:left-5 md:left-8 z-20 flex items-center gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber)]"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`block h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-5 md:w-8 bg-[var(--color-amber)]" : "w-1.5 md:w-2 bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
