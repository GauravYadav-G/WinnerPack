"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, Mail, Clock } from "lucide-react";
import { cn } from "../utils/cn";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Machinery", href: "/machinery" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky state when scrolled past the top bar (36px)
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── TOP BAR (Sticwell Style) ── */}
      <div className="bg-[var(--color-ink)] text-white/70 text-[11px] sm:text-xs py-2 border-b border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center flex-wrap gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <a href="mailto:sales@winnerpack.in" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Mail className="h-3.5 w-3.5 text-[var(--color-amber)]" />
              <span>sales@winnerpack.in</span>
            </a>
            <a href="tel:+911204107800" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[var(--color-amber)]" />
              <span className="font-mono">+91 120 410 7800</span>
            </a>
          </div>
          
          {/* Right: Timing / Info */}
          <div className="hidden sm:flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[var(--color-amber)]" />
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR (Sticwell Style: Sticky on scroll) ── */}
      <div className="h-[72px] relative z-40">
        <nav className={cn(
          "bg-white border-b border-[var(--color-line)] h-[72px] w-full transition-all duration-300",
          scrolled ? "fixed top-0 left-0 z-50 shadow-md" : "relative z-40"
        )}>
          <div className="max-w-7xl mx-auto px-5 md:px-8 h-full flex items-center justify-between">
            
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3" data-hover>
              <img src="/logo.png" alt="Winner Pack Logo" className="h-10 w-auto object-contain" />
              <div className="leading-tight">
                <div className="font-display text-sm sm:text-base font-bold tracking-tight text-[var(--color-ink)]">Winner Pack</div>
                <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-blue)]">
                  Technologies
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1.5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs sm:text-sm font-semibold tracking-wide px-3.5 py-2.5 rounded-md transition-all duration-200",
                        isActive
                          ? "text-[var(--color-amber)] bg-amber-50/50"
                          : "text-[var(--color-ink)] hover:text-[var(--color-amber)] hover:bg-amber-50/30"
                      )}
                      data-hover
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Action Call / Contact Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="bg-[var(--color-amber)] text-[var(--color-blue-deep)] px-5 py-2 rounded-md text-xs sm:text-sm font-bold shadow-md shadow-[var(--color-amber)]/20 hover:bg-[var(--color-amber)]/95 transition-all duration-200 hover:-translate-y-0.5"
                data-hover
              >
                Request a Quote
              </Link>
            </div>

            {/* Mobile Hamburguer Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-[var(--color-ink)] hover:text-[var(--color-blue)] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>

          {/* Mobile Drawer Menu Overlay - Nested inside sticky nav */}
          {open && (
            <div className="md:hidden absolute inset-x-0 top-[72px] bg-white border-b border-[var(--color-line)] shadow-lg z-30 flex flex-col p-5 gap-4 animate-fade-in">
              <ul className="flex flex-col gap-1">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.label} className="border-b border-slate-50 last:border-0">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block py-3 px-2 text-sm font-semibold transition-colors rounded-lg",
                          isActive
                            ? "text-[var(--color-amber)] bg-amber-50/50"
                            : "text-[var(--color-ink)] hover:text-[var(--color-amber)] hover:bg-slate-50"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              {/* Mobile CTA */}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block text-center bg-[var(--color-amber)] text-[var(--color-blue-deep)] py-3 rounded-lg text-sm font-bold hover:bg-[var(--color-amber)]/90 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
