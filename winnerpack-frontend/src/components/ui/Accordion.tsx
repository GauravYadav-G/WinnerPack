"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 w-full">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition duration-300 hover:shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-display text-base font-semibold text-[var(--color-ink)]"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-[var(--color-mute)] transition-transform duration-300",
                  isOpen && "rotate-180 text-[var(--color-blue)]"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-6 pb-5 pt-0 text-sm leading-relaxed text-[var(--color-mute)] border-t border-[var(--color-line)]/50">
                    <p>{item.content}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
