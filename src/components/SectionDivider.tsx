import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Animated SVG divider that draws a flowing line between sections.
 */
export default function SectionDivider({ from = "light", to = "light" }: { from?: string; to?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  const fromColor = from === "dark" ? "#06101F" : "#F6F4EE";
  const toColor = to === "dark" ? "#06101F" : "#F6F4EE";

  return (
    <div ref={ref} className="pointer-events-none relative h-24 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`divider-${from}-${to}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="50%" stopColor={fromColor} stopOpacity="0" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1200" height="100" fill={`url(#divider-${from}-${to})`} />
        <motion.path
          d="M 0 50 Q 300 20, 600 50 T 1200 50"
          stroke="#1E5BFF"
          strokeWidth="1"
          fill="none"
          strokeDasharray="6 6"
          style={{ pathLength, opacity }}
        />
        <motion.circle cx="600" cy="50" r="3" fill="#1E5BFF" style={{ opacity }} />
      </svg>
    </div>
  );
}
