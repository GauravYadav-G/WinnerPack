"use client";

import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";

interface PageWrapperProps extends HTMLMotionProps<"main"> {
  children: React.ReactNode;
}

export default function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.main>
  );
}
