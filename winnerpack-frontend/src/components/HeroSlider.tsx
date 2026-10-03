"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fetchContent } from "@/lib/content-cache";
import { fallbackData } from "@/lib/fallback-data";
import OptimizedImage from "@/components/OptimizedImage";

type Slide = {
  id: string;
  tag: string;
  heading: string;
  description: string;
  desktopMediaUrl: string;
  mobileMediaUrl: string;
  image?: string;
};

const defaultSlides: Slide[] = fallbackData.slides.slice(0, 4).map((slide) => ({
  id: slide.id,
  tag: slide.tag,
  heading: slide.heading,
  description: slide.description,
  desktopMediaUrl: slide.desktopMediaUrl,
  mobileMediaUrl: slide.mobileMediaUrl,
}));
const DEFAULT_DESKTOP_BANNER = fallbackData.rightBanner;

export default function HeroSlider({ previewData }: { previewData?: any } = {}) {
  const [slides, setSlides] = useState<any[]>(Array.isArray(previewData?.slides) ? previewData.slides : defaultSlides);
  const [desktopRightBanner, setDesktopRightBanner] = useState<string>(previewData?.rightBanner ?? DEFAULT_DESKTOP_BANNER);
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Sync when previewData updates
  useEffect(() => {
    if (previewData) {
      if (Array.isArray(previewData.slides)) {
        setSlides(previewData.slides.slice(0, 4));
      }
      if (previewData.rightBanner !== undefined) {
        setDesktopRightBanner(previewData.rightBanner);
      }
      return;
    }
    fetchContent("homepage")
      .then((data) => {
        if (data && Array.isArray(data.slides)) {
          setSlides(data.slides.slice(0, 4));
        }
        if (data && data.rightBanner !== undefined) {
          setDesktopRightBanner(data.rightBanner);
        }
      })
      .catch(() => {
        // Backend offline — fall back gracefully to default hero slides
      });
  }, [previewData]);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = window.setTimeout(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        interval = setInterval(() => {
          setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
      }
    }, 20_000);
    return () => {
      window.clearTimeout(start);
      if (interval) clearInterval(interval);
    };
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

  const currentRightBannerSrc = desktopRightBanner;
  const activeSlide = slides[current];

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[25vh] sm:h-[40vh] md:h-[55vh] lg:h-[700px] w-full overflow-hidden bg-black text-white select-none"
    >
      {/* Split Layout */}
      <div className="absolute inset-x-0 bottom-0 top-0 h-full z-0 flex gap-0">

        {/* Left Side: Slider Image */}
        <div className="relative w-full lg:w-[70%] h-full overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            {activeSlide && (() => {
              const src = activeSlide.desktopMediaUrl || activeSlide.image || "";
              const isFirst = current === 0;
              return (
                <motion.div
                  key={activeSlide.id || current}
                  initial={isFirst ? false : { opacity: 0.1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.1 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full"
                >
                  <OptimizedImage
                    src={src}
                    mobileSrc={isFirst && /\/slide-1\.(?:png|jpe?g|webp)$/i.test(src)
                      ? "/images/mobile/hero-slider/slide-1.avif"
                      : undefined}
                    alt={`WinnerPack — ${activeSlide.heading || 'Engineered Packaging Solutions'}`}
                    className="h-full w-full object-cover object-center"
                    loading={isFirst ? "eager" : "lazy"}
                    fetchPriority="auto"
                    width={1400}
                    height={700}
                    sizes="(max-width: 1023px) 100vw, 70vw"
                    quality={74}
                  />
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Navigation Arrows — 44×44px minimum touch target */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right Side: Static Banner */}
        <div className="relative hidden lg:block lg:w-[30%] h-full overflow-hidden bg-black">
          <OptimizedImage
            src={currentRightBannerSrc}
            alt="WinnerPack packaging product range"
            className="absolute inset-0 h-full w-full object-cover"
            sizes="30vw"
            quality={72}
          />
        </div>

      </div>

      {/* Slide Indicators — 44×44px minimum touch target */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-3 sm:left-5 md:left-8 z-20 flex items-center gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="-m-3 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-amber)]"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`block h-1 md:h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-5 md:w-8 bg-[var(--color-amber)]" : "w-1.5 md:w-2 bg-white/40"
                }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
