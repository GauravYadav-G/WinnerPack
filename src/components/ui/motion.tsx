import { motion } from "framer-motion";

interface StaggerProps {
  className?: string;
  children: React.ReactNode;
}

export function Stagger({ className, children }: StaggerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  className?: string;
  children: React.ReactNode;
}

export function StaggerItem({ className, children }: StaggerItemProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  } as const;

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

interface RevealProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export function Reveal({ className, children, delay }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
