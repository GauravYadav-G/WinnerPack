import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Image with scroll-driven parallax and reveal-mask entrance.
 */
export default function ParallaxImage({
  src,
  alt = "",
  className = "",
  speed = 0.3,
  rounded = "rounded-xl",
}: {
  src: string;
  alt?: string;
  className?: string;
  speed?: number;
  rounded?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${rounded} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
