import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * Wraps any content with a scroll-driven entrance that fades + lifts
 * based on how far the section is into the viewport.
 */
export default function ScrollSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className} transition={{ delay }}>
      {children}
    </motion.div>
  );
}
