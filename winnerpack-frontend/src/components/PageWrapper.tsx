"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface PageWrapperProps extends HTMLMotionProps<"main"> {
  children: React.ReactNode;
}

export default function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
      className={className}
      {...props}
    >
      {children}
    </motion.main>
  );
}
