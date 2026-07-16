"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

export default function ProcessVideoBlock() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play interrupted", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--color-bone)] py-14 md:py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
      
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full bg-[var(--color-blue-soft)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-blue)]">
            Manufacturing Video
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-[var(--color-ink)] md:text-4xl">
            Tour Our Dasna Plant-2 Facility
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[var(--color-line)] bg-slate-900 shadow-xl group"
        >
          <video
            ref={videoRef}
            poster="/images/desktop/misc/image.png"
            loop
            muted
            playsInline
            onClick={handlePlayClick}
            className="h-full w-full object-cover cursor-pointer"
          >
            <source src="/images/video/generate_an_video_for_hero_sec.mp4" type="video/mp4" />
          </video>

          {/* Autoplay preview overlay when not playing */}
          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none">
              <div className="flex items-center gap-2 self-start rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Dasna Facility Plant-2
              </div>
              
              <div className="flex items-center gap-4 self-center pointer-events-auto">
                <button
                  onClick={handlePlayClick}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-blue)] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[var(--color-blue-2)]"
                  aria-label="Play video"
                >
                  <Play className="h-6 w-6 fill-current ml-1" />
                </button>
              </div>

              <p className="font-mono text-[9px] text-white/60 tracking-wider">
                Click to Play Video with Audio
              </p>
            </div>
          )}

          {/* Pause button overlay on hover when playing */}
          {isPlaying && (
            <div 
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 hover:opacity-100 cursor-pointer"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
