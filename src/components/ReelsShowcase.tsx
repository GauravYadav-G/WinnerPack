"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, Eye, Volume2, VolumeX, Play, Pause } from "lucide-react";

type Reel = {
  id: string;
  title: string;
  views: string;
  videoUrl: string;
};

const reels: Reel[] = [
  {
    id: "extrusion",
    title: "PP Extrusion Line in Dasna Plant-2",
    views: "12.4K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-industrial-factory-robotic-arm-moving-fast-41584-large.mp4",
  },
  {
    id: "stretch",
    title: "Pallet wrapper tension & load test",
    views: "8.9K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-moving-in-a-futuristic-automated-factory-41583-large.mp4",
  },
  {
    id: "strap",
    title: "WP-PET12 high-tension strapping loop",
    views: "15.1K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-production-line-of-bottles-in-a-factory-41585-large.mp4",
  },
  {
    id: "tape",
    title: "48-hr custom printed BOPP tape run",
    views: "9.3K",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-industrial-machinery-operating-41586-large.mp4",
  },
];

export default function ReelsShowcase() {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenReel = (reel: Reel) => {
    setActiveReel(reel);
    setPlaying(true);
  };

  const handleCloseReel = () => {
    setActiveReel(null);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.error(err));
      }
      setPlaying(!playing);
    }
  };

  // Duplicate list to achieve continuous infinite marquee loop
  const duplicatedReels = [...reels, ...reels, ...reels];

  return (
    <section className="relative overflow-hidden bg-[var(--color-bone)] py-14 md:py-16 text-[var(--color-ink)]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-5xl text-balance">
            Live Plant Feeds
          </h2>
          <p className="mt-3 text-[9px] text-[var(--color-mute)] font-mono uppercase tracking-[0.25em]">
            Hover to Pause · Tap to expand video feed
          </p>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Shadow overlays for edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r from-[var(--color-bone)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l from-[var(--color-bone)] to-transparent" />

        <div className="reels-marquee-track">
          {duplicatedReels.map((r, idx) => (
            <div
              key={`${r.id}-${idx}`}
              onClick={() => handleOpenReel(r)}
              className="group relative w-[400px] h-[240px] flex-shrink-0 cursor-pointer snap-start p-1.5 border border-[var(--color-line)] rounded-2xl bg-white/40 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[var(--color-blue)]/30 hover:shadow-md"
            >
              {/* Inner card with separated border and glassmorphic backdrop */}
              <div className="relative w-full h-full rounded-xl overflow-hidden backdrop-blur-lg bg-white/20 border border-white/30 flex flex-col justify-between">
                {/* Loop video in background (Muted, AutoPlay) */}
                <video
                  src={r.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col justify-end h-full p-5 text-white">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-cyan-400 font-medium mb-1">
                    <Eye className="h-3.5 w-3.5" />
                    {r.views} views
                  </div>
                  <h3 className="font-sans text-sm font-semibold leading-snug group-hover:text-cyan-400 transition-colors">
                    {r.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Player Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={handleCloseReel} />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#161923] shadow-2xl"
            >
              {/* HTML5 video element */}
              <video
                ref={videoRef}
                src={activeReel.videoUrl}
                autoPlay
                loop
                muted={muted}
                className="h-full w-full object-cover"
                onClick={togglePlay}
              />

              {/* Close Trigger */}
              <button
                onClick={handleCloseReel}
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 hover:bg-white hover:text-black transition"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Top info layer */}
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent p-5 pt-8 text-white pointer-events-none">
                <h4 className="font-semibold text-sm max-w-[80%] leading-snug">
                  {activeReel.title}
                </h4>
              </div>

              {/* Bottom HUD controls */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-5 pt-12 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/60">
                    <Eye className="h-3.5 w-3.5" />
                    {activeReel.views} views
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                    >
                      {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                    </button>

                    <button
                      onClick={() => setMuted(!muted)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                    >
                      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inject custom Marquee styling block */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeReels {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .reels-marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marqueeReels 32s linear infinite;
        }
        .reels-marquee-track:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
