"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

// Verified WhatsApp glyph
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function ActionButton({
  href,
  from,
  to,
  shadowColor,
  label,
  hovered,
  onHoverStart,
  onHoverEnd,
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
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        title={label}
        aria-label={label}
        className="relative flex h-11 w-11 md:h-13 md:w-13 shrink-0 items-center justify-center rounded-full text-white outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 transition-transform active:scale-95"
        style={{
          background: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
          boxShadow: `0 8px 20px -5px ${shadowColor}, 0 3px 6px -2px ${shadowColor}, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        <span className="pointer-events-none absolute inset-x-1 top-1 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent" />
        {children}
      </motion.a>
    </div>
  );
}

export default function FloatingWidgets() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [waHovered, setWaHovered] = useState(false);
  const [igHovered, setIgHovered] = useState(false);
  const [fbHovered, setFbHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close speed dial when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        @keyframes action-pulse {
          0% { box-shadow: 0 0 0 0 var(--pulse-color); }
          70% { box-shadow: 0 0 0 14px rgba(0,0,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
        }
      `}</style>

      <div ref={containerRef} className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-3 md:bottom-7 md:right-6">
        {/* Expanded Stack of Social Icons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-end gap-2.5"
            >
              {/* Facebook Floating Icon */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                <ActionButton
                  href="https://www.facebook.com/winnerpackindia"
                  label="Follow on Facebook"
                  from="#1877F2"
                  to="#0B52B7"
                  shadowColor="rgba(24,119,242,0.45)"
                  hovered={fbHovered}
                  onHoverStart={() => setFbHovered(true)}
                  onHoverEnd={() => setFbHovered(false)}
                >
                  <FacebookIcon className="relative z-10 h-5 w-5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]" />
                </ActionButton>
              </motion.div>

              {/* Instagram Floating Icon */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}>
                <ActionButton
                  href="https://www.instagram.com/winnerpacktechnologies/"
                  label="Follow on Instagram"
                  from="#833AB4"
                  to="#E1306C"
                  shadowColor="rgba(225,48,108,0.45)"
                  hovered={igHovered}
                  onHoverStart={() => setIgHovered(true)}
                  onHoverEnd={() => setIgHovered(false)}
                >
                  <InstagramIcon className="relative z-10 h-5 w-5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]" />
                </ActionButton>
              </motion.div>

              {/* WhatsApp Floating Icon */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                <ActionButton
                  href="https://wa.me/918595072187"
                  label="WhatsApp Support"
                  from="#2DDB6E"
                  to="#0F9D6E"
                  shadowColor="rgba(15,157,110,0.5)"
                  hovered={waHovered}
                  onHoverStart={() => setWaHovered(true)}
                  onHoverEnd={() => setWaHovered(false)}
                >
                  <WhatsAppIcon className="relative z-10 h-5 w-5 md:h-6 md:w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]" />
                </ActionButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Close social links" : "Connect with us"}
          className="relative flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full text-white outline-none transition-transform active:scale-95 shadow-xl bg-gradient-to-r from-[var(--color-blue-deep)] via-[var(--color-blue)] to-[var(--color-amber-dark)] cursor-pointer"
          style={{
            boxShadow: "0 10px 25px -5px rgba(10,22,40,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <span className="pointer-events-none absolute inset-x-1 top-1 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent" />
          
          {!isExpanded && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                "--pulse-color": "rgba(230,140,30,0.5)",
                animation: "action-pulse 2.6s cubic-bezier(0.4,0,0.6,1) infinite",
              } as React.CSSProperties}
            />
          )}

          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center"
          >
            {isExpanded ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <div className="relative flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white drop-shadow-sm" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-amber)] text-[9px] font-black text-[var(--color-blue-deep)] shadow-xs">
                  3
                </span>
              </div>
            )}
          </motion.div>
        </button>
      </div>
    </>
  );
}