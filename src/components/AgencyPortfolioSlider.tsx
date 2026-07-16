"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

/**
 * VERIFICATION NOTE (audited against winnerpack.in, 15 Jul 2026):
 * Every card in the original version repeated a claim already flagged as
 * unverified/fabricated elsewhere in this project — 12,000+ tons annual
 * capacity, a second plant, ISO 9001:2015 certification, in-house
 * extrusion + batch traceability, "100% recyclable" + bio-polymer R&D
 * language, a guaranteed 24-48h nationwide SLA, and in-house automated
 * machine lines. None of these appear on the real site or in any public
 * record, and "guaranteed timeframe" in particular is a real liability
 * risk if a shipment runs late and a customer holds you to it.
 *
 * Replaced all five with claims that ARE backed by something real on
 * winnerpack.in: confirmed width/thickness ranges, the site's own
 * qualitative product-feature language, its stated core values, its
 * actual (6-category) product breadth, and the courier bag tamper-evident
 * feature. Same punchy card format, just truthful.
 */

type PortfolioCard = {
  id: string;
  tag: string;
  heading: string;
  description: string;
  bgColor: string;
  textColor: string;
  tagColor: string;
  arrowColor: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  blendMode?: string;
};

const cards: PortfolioCard[] = [
  {
    id: "customization",
    tag: "01 / CUSTOMIZATION",
    heading: "Made-to-Order Widths & Gauges",
    // VERIFIED — real width/thickness ranges from winnerpack.in/pp-pet-strap/
    // and winnerpack.in/stretch-films/
    description: "Strap widths from 6-19mm and stretch film from 9-55 micron, customized to your line's requirements.",
    bgColor: "bg-[#F59E0B]", // Mustard yellow
    textColor: "text-[#0F1117]", // Dark ink
    tagColor: "text-[#0F1117]/60",
    arrowColor: "text-[#0F1117]",
    mediaType: "image",
    mediaUrl: "/images/desktop/portfolio/capacity_featured.png",
  },
  {
    id: "quality",
    tag: "02 / QUALITY",
    heading: "Built for the Line",
    // VERIFIED — paraphrased from winnerpack.in/pof-shrink-film/ feature list
    // (no ISO claim restored — unconfirmed, see prior audit)
    description: "Films engineered for strong seals, high clarity and gloss, and reliable performance across a wide temperature range.",
    bgColor: "bg-[#0B0F19]", // Cosmic dark blue
    textColor: "text-white",
    tagColor: "text-cyan-400",
    arrowColor: "text-cyan-400",
    mediaType: "image",
    mediaUrl: "/images/desktop/portfolio/quality_featured.png",
  },
  {
    id: "values",
    tag: "03 / VALUES",
    heading: "Serve To Deserve",
    // VERIFIED — paraphrased from winnerpack.in/about/ core values
    description: "Customer commitment, quality, integrity and teamwork — the stated values behind every order.",
    bgColor: "bg-[#064E3B]", // Emerald green
    textColor: "text-white",
    tagColor: "text-emerald-400",
    arrowColor: "text-emerald-400",
    mediaType: "image",
    mediaUrl: "/images/desktop/portfolio/sustainability_featured.png",
  },
  {
    id: "range",
    tag: "04 / RANGE",
    heading: "One Supplier, Six Categories",
    // VERIFIED — matches winnerpack.in nav exactly; no SLA/hour guarantee claimed
    description: "Labels, films, strap, tapes, protective packaging and pallet wrapping — plus the machines to apply them.",
    bgColor: "bg-[#7C2D12]", // Terracotta / Rust red
    textColor: "text-white",
    tagColor: "text-orange-300",
    arrowColor: "text-orange-300",
    mediaType: "image",
    mediaUrl: "/images/desktop/portfolio/dispatch_featured.png",
  },
  {
    id: "security",
    tag: "05 / SECURITY",
    heading: "Tamper-Evident by Design",
    // VERIFIED — paraphrased from winnerpack.in/courier-bags/
    description: "Courier bags seal with a void-tape strip that shows visible signs of tampering if opened in transit.",
    bgColor: "bg-[#1E293B]", // Slate grey
    textColor: "text-white",
    tagColor: "text-blue-400",
    arrowColor: "text-blue-400",
    mediaType: "image",
    mediaUrl: "/images/desktop/portfolio/integration_featured.png",
  },
];

export default function AgencyPortfolioSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate cards 3 times for a seamless continuous loop
  const duplicatedCards = [...cards, ...cards, ...cards];

  return (
    <section
      className="relative overflow-hidden bg-[var(--color-bone)] py-20 text-[var(--color-ink)]"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mb-14">
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-5xl text-balance">
            Our Standards
          </h2>
          <p className="mt-4 text-[9px] text-[var(--color-mute)] font-mono uppercase tracking-[0.25em]">
            Hover to pause · Explore our core product & service standards
          </p>
        </div>

        {/* Constrained Viewport matching site borders */}
        <div className="relative w-full overflow-hidden rounded-3xl">
          {/* Shadow overlays for edge fade within container */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[var(--color-bone)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[var(--color-bone)] to-transparent" />

          <div className="portfolio-marquee-track py-4">
            {duplicatedCards.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                className={`group relative flex w-[320px] md:w-[480px] h-[380px] flex-shrink-0 overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl ${card.bgColor} ${card.textColor}`}
              >
                <div className="grid h-full w-full grid-cols-1 md:grid-cols-12">
                  {/* Left Column: Typography */}
                  <div className="col-span-1 md:col-span-6 p-6 md:p-8 flex flex-col justify-between h-full relative z-10">
                    <div>
                      <span className={`block font-mono text-[9px] font-bold uppercase tracking-[0.25em] ${card.tagColor}`}>
                        {card.tag}
                      </span>
                      <h3 className="font-display mt-4 text-2xl font-bold leading-[0.95] tracking-tight md:text-3xl lg:text-4xl text-balance">
                        {card.heading}
                      </h3>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs leading-relaxed opacity-85 max-w-[220px]">
                        {card.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-wider">
                        <span>Explore details</span>
                        <motion.div
                          variants={{
                            initial: { x: 0 },
                            hover: { x: 5 },
                          }}
                          initial="initial"
                          whileHover="hover"
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className={`flex items-center ${card.arrowColor}`}
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Rich Media */}
                  <div className="col-span-1 md:col-span-6 relative h-[180px] md:h-full w-full overflow-hidden self-end md:self-auto border-t md:border-t-0 md:border-l border-[var(--color-line)]/20">
                    {card.mediaType === "image" ? (
                      <motion.img
                        src={card.mediaUrl}
                        alt={card.heading}
                        className={`h-full w-full object-cover object-center ${card.blendMode || ""}`}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <motion.video
                        src={card.mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover object-center"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inject custom Marquee styling block */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marqueePortfolio {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .portfolio-marquee-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: marqueePortfolio 48s linear infinite;
        }
        .portfolio-marquee-track:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}