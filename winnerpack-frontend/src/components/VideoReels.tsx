"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";
import { defaultVideoReels } from "@/lib/site-defaults";

interface ReelItem {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  videoSrc: string;
  posterSrc: string;
}

export default function VideoReels({ previewData }: { previewData?: any } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const isHoveredRef = useRef(false);

  // Content configuration with fallback defaults
  const reels: ReelItem[] = previewData?.reels || defaultVideoReels.reels;
  const eyebrow: string = previewData?.eyebrow || defaultVideoReels.eyebrow;
  const title: string = previewData?.title || defaultVideoReels.title;
  const subtitle: string = previewData?.subtitle || defaultVideoReels.subtitle;

  // Duplicate reels array to create a seamless infinite auto-scroll loop
  const displayReels = [...reels, ...reels];

  // Lighthouse zero-impact observer: only mount and autoplay videos when user scrolls near the section
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Continuous auto-scrolling animation (pauses smoothly when user hovers any card)
  useEffect(() => {
    const container = sliderRef.current;
    if (!container || !isNearViewport) return;

    let animationId: number;
    let lastTime = performance.now();

    const scrollStep = (now: number) => {
      const elapsed = now - lastTime;
      lastTime = now;

      if (!isHoveredRef.current && container) {
        // Smooth cinematic pace (~40px per second)
        container.scrollLeft += elapsed * 0.045;

        // Wrap seamlessly at midpoint for infinite marquee effect
        const halfScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= halfScroll) {
          container.scrollLeft -= halfScroll;
        }
      }

      animationId = requestAnimationFrame(scrollStep);
    };

    animationId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isNearViewport]);

  return (
    <section
      ref={sectionRef}
      id="video-reels"
      className="relative w-full overflow-hidden bg-[#fbfbf9] py-16 sm:py-24 border-b border-[#e5dfd2]"
    >
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-stripes opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-96 w-full max-w-6xl rounded-full bg-[#fe8220]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/3 h-80 w-80 rounded-full bg-[#d4630a]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1536px] px-4 md:px-10">
        {/* Centered Section Header */}
        <div className="mb-10 sm:mb-14 md:mb-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs font-bold tracking-widest text-[#d4630a] font-mono mb-2 uppercase">
            {eyebrow}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-[#0d072c] text-balance">
            {title}
          </h2>
          <div className="mt-3.5 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#fe8220] to-[#ffa048] mx-auto" />
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#55506a] max-w-2xl text-balance">
            {subtitle}
          </p>
        </div>

        {/* ── AUTO-SCROLLING REELS CAROUSEL STAGE (Zero arrows, pure cards) ── */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto py-4 px-2 sm:px-4 md:px-6 scrollbar-none select-none [mask-image:linear-gradient(to_right,transparent_0%,black_3%,black_97%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_3%,black_97%,transparent_100%)]"
          >
            {displayReels.map((reel, index) => (
              <div
                key={`${reel.id}-${index}`}
                className="shrink-0 w-[200px] xs:w-[220px] sm:w-[250px] md:w-[280px] lg:w-[305px] aspect-[9/16]"
              >
                <ReelCard
                  reel={reel}
                  isNearViewport={isNearViewport}
                  onHoverChange={(hovered) => {
                    isHoveredRef.current = hovered;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// REEL CARD COMPONENT
// - Edge-to-edge pure video (Zero text, Zero badges)
// - Auto-plays in continuous loop
// - Unmutes on hover, muted all other times
// - Pauses auto-scroll on hover
// -------------------------------------------------------------
interface ReelCardProps {
  reel: ReelItem;
  isNearViewport: boolean;
  onHoverChange: (hovered: boolean) => void;
}

function ReelCard({
  reel,
  isNearViewport,
  onHoverChange,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Clean up any pending hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  // Auto-play video continuously when near viewport, with guaranteed continuous loop restart
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isNearViewport) return;

    video.muted = !isUnmuted;
    video.loop = true;

    // Redundant onEnded safety handler: immediately rewinds and restarts video if loop ends
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoLoaded(true))
        .catch(() => {
          if (video) {
            video.muted = true;
            video.play().then(() => setIsVideoLoaded(true)).catch(() => {});
          }
        });
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [isNearViewport, isUnmuted]);

  // On hover: pause auto-scroll immediately; only unmute audio after mouse sticks for 3 seconds
  const handleMouseEnter = () => {
    onHoverChange(true);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setIsUnmuted(true);
      const video = videoRef.current;
      if (video) {
        video.muted = false;
        video.volume = 1.0;
        video.play().catch(() => {});
      }
    }, 3000);
  };

  // On leave: cancel 3-second timer, mute audio, and resume auto-scroll
  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    onHoverChange(false);
    setIsUnmuted(false);
    const video = videoRef.current;
    if (video) {
      video.muted = true;
    }
  };

  // Toggle on click for touch devices or instant unmute
  const handleClick = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    const video = videoRef.current;
    if (!video) return;
    const nextState = !isUnmuted;
    setIsUnmuted(nextState);
    video.muted = !nextState;
    if (nextState) video.volume = 1.0;
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-3xl bg-slate-950 border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform-gpu hover:-translate-y-2 select-none"
      role="region"
      aria-label={reel.title}
    >
      {/* 1. Lightweight WebP Poster (Visible until video playback starts) */}
      <img
        src={reel.posterSrc}
        alt=""
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:scale-105 ${
          isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* 2. Pure Borderless Auto-Playing Video (Continuous loop, muted by default) */}
      {isNearViewport && (
        <video
          ref={videoRef}
          src={reel.videoSrc}
          poster={reel.posterSrc}
          autoPlay
          loop
          muted={!isUnmuted}
          playsInline
          onEnded={(e) => {
            const v = e.currentTarget;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* 3. Discreet Sound Wave Indicator (Visible only when audio is unmuted on hover) */}
      <div
        className={`pointer-events-none absolute bottom-5 right-5 z-20 flex items-center justify-center h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-amber-400 transition-all duration-300 ${
          isUnmuted ? "opacity-100 scale-100 shadow-lg" : "opacity-0 scale-75"
        }`}
        aria-hidden="true"
      >
        <Volume2 className="w-5 h-5 animate-pulse" />
      </div>
    </div>
  );
}
