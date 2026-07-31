"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Verified WhatsApp glyph (Bootstrap Icons, MIT licensed) — the earlier
// hand-typed path had a broken curve in it, which is what rendered oddly.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}



// Solid, elevated button — the pattern real support widgets (Intercom,
// Drift, HubSpot) actually ship: a high-contrast circle, a crisp icon,
// and shadow-based depth. It reads as premium and, unlike glass, stays
// legible over any page background.
function ActionButton({
  href,
  from,
  to,
  shadowColor,
  label,
  hovered,
  onHoverStart,
  onHoverEnd,
  delay,
  children,
}: {
  href: string;
  from: string;
  to: string;
  shadowColor: string;
  label: string;
  hovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  delay: number;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  return (
    <div className="flex items-center gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden md:block rounded-full bg-[#1A1A1A] px-3.5 py-2 text-xs font-semibold text-white shadow-lg whitespace-nowrap"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        title={label}
        aria-label={label}
        className="relative flex h-11 w-11 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full text-white outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
        style={{
          background: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
          boxShadow: `0 10px 24px -6px ${shadowColor}, 0 4px 8px -2px ${shadowColor}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        {/* gentle top sheen for a bit of polish without going full glass */}
        <span className="pointer-events-none absolute inset-x-1 top-1 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent" />
        {/* single slow pulse ring instead of a constant ping — reads as premium, not noisy */}
        <span
          className="absolute inset-0 rounded-full"
          style={
            {
              "--pulse-color": shadowColor,
              animation: "action-pulse 2.6s cubic-bezier(0.4,0,0.6,1) infinite",
            } as React.CSSProperties
          }
        />
        {children}
      </motion.a>
    </div>
  );
}

export default function FloatingWidgets() {
  const [waHovered, setWaHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes action-pulse {
          0% { box-shadow: 0 0 0 0 var(--pulse-color); }
          70% { box-shadow: 0 0 0 14px rgba(0,0,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
        }
      `}</style>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-7">
        <ActionButton
          href="https://wa.me/918595072187"
          label="WhatsApp Support"
          from="#2DDB6E"
          to="#0F9D6E"
          shadowColor="rgba(15,157,110,0.5)"
          hovered={waHovered}
          onHoverStart={() => setWaHovered(true)}
          onHoverEnd={() => setWaHovered(false)}
          delay={0.1}
        >
          <WhatsAppIcon className="relative z-10 h-6 w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]" />
        </ActionButton>
      </div>
    </>
  );
}