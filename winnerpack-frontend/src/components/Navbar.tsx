"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, Mail, Clock, ChevronDown } from "lucide-react";
import { cn } from "../utils/cn";
import { productCategories } from "../data";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products", hasMegaMenu: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" }
];

// Helper to map item names to folder slugs
function getItemSlug(name: string): string {
  const map: Record<string, string> = {
    "Plain Labels": "plain-labels",
    "Printed Labels": "printed-labels",
    "Barcode Labels": "barcode-labels",
    "Product Labels": "product-labels",
    "Self Adhesive Labels": "self-adhesive-labels",
    "Thermal Labels": "thermal-labels",
    "LDPE Films & Pouches": "ldpe-films-pouches",
    "POF Films & Pouches": "pof-films-pouches",
    "Coloured Films & Pouches": "coloured-films-pouches",
    "BOPP Films & Pouches": "bopp-films-pouches",
    "PVC Shrink Rolls & Pouches": "pvc-shrink-rolls-pouches",
    "Stretch Film": "stretch-film",
    "Lamination Films & Pouches": "lamination-films-pouches",
    "Compostable Films & Pouches": "compostable-films-pouches",
    "POF Shrink Rolls & Pouches": "pof-shrink-rolls",
    "LDPE Shrink Rolls & Pouches": "ldpe-shrink-rolls",
    "PVC Shrink Rolls, Pouches & Tubes": "pvc-shrink-rolls",
    "Poly Courier Bags": "poly-courier-bags",
    "Paper Courier Bags": "paper-courier-bags",
    "PETG Rolls & Pouches / BOPP Pouches / ESD Pouches": "specialty-pouches",
    "PP Strap": "pp-strap",
    "Printed PP Strap": "printed-pp-strap",
    "Colored PP Strap": "colored-pp-strap",
    "PET Strap": "pet-strap",
    "Bubble Roll & Pouches": "bubble-roll",
    "EPE Foam Rolls": "epe-foam-rolls",
    "Air Bags": "air-bags",
    "Corrugated Boxes": "corrugated-boxes",
    "Corrugated Rolls": "corrugated-rolls",
    "Edge Protector": "edge-protector",
    "BOPP Tapes": "bopp-tapes",
    "Printed BOPP Tapes": "printed-bopp-tapes",
    "Coloured BOPP Tapes": "coloured-bopp-tapes",
    "Silicon Tapes": "silicon-tapes",
    "Pallet Cover": "pallet-cover",
    "Pallet Liner": "pallet-liner"
  };
  return map[name] || name.toLowerCase().replace(/\s+/g, "-");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky state when scrolled past the top bar (36px)
      setScrolled(window.scrollY > 36);

      // Automatically close mobile navbar drawer on scroll
      setOpen((isOpen) => {
        if (isOpen) return false;
        return isOpen;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── TOP BAR (Sticwell Style) ── */}
      <div className="bg-[var(--color-ink)] text-white/70 text-[11px] sm:text-xs py-2 border-b border-white/5 relative z-50">
        <div className="max-w-[1536px] mx-auto px-2 sm:px-3 md:px-4 flex justify-between items-center flex-wrap gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap -ml-1 sm:-ml-3 md:-ml-4 lg:-ml-5">
            <a href="mailto:sales@winnerpack.in" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Mail className="h-3.5 w-3.5 text-[var(--color-amber)]" />
              <span>sales@winnerpack.in</span>
            </a>
            <a href="tel:+918595072187" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[var(--color-amber)]" />
              <span className="font-mono">+91 85950 72187</span>
            </a>
            <a href="tel:+917428770999" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[var(--color-amber)]" />
              <span className="font-mono">+91 74287 70999</span>
            </a>
          </div>
          
          {/* Right: Timing / Info */}
          <div className="hidden sm:flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[var(--color-amber)]" />
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR (Clean White Navbar with Deep Navy Mega Menu Preview) ── */}
      <div className="h-[80px] relative z-40">
        <nav className={cn(
          "bg-white border-b border-[var(--color-line)] h-[80px] w-full transition-all duration-300 text-[var(--color-ink)]",
          scrolled ? "fixed top-0 left-0 z-50 shadow-md bg-white/95 backdrop-blur-md" : "relative z-40"
        )}>
          <div className="max-w-[1536px] mx-auto px-2 sm:px-3 md:px-4 h-full flex items-center justify-between">
            
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3.5 -ml-1 sm:-ml-3 md:-ml-4 lg:-ml-5 group" data-hover>
              <img src="/logo.png" alt="Winner Pack Logo" className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="leading-tight">
                <div className="font-display text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-[var(--color-ink)] leading-none">
                  Winner Pack
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--color-blue)] mt-1">
                  Technologies Pvt. Ltd.
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1.5">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.hasMegaMenu && pathname.startsWith("/product"));

                if (link.hasMegaMenu) {
                  return (
                    <li
                      key={link.label}
                      className="relative py-5"
                      onMouseEnter={() => setIsProductsHovered(true)}
                      onMouseLeave={() => setIsProductsHovered(false)}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "inline-flex items-center gap-1 text-xs sm:text-sm font-semibold tracking-wide px-3.5 py-2.5 rounded-md transition-all duration-200",
                          isActive || isProductsHovered
                            ? "text-[var(--color-amber)] bg-amber-50/50"
                            : "text-[var(--color-ink)] hover:text-[var(--color-amber)] hover:bg-amber-50/30"
                        )}
                        data-hover
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200 text-[var(--color-amber)]", isProductsHovered && "rotate-180")} />
                      </Link>

                      {/* ── SINGHAL GLOBAL STYLE MEGA MENU DROPDOWN (Reduced Width with Natural Height Layout) ── */}
                      <div
                        className={cn(
                          "absolute left-1/2 -translate-x-1/2 top-[56px] w-[90vw] max-w-5xl bg-[var(--color-ink)]/98 backdrop-blur-2xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-xl border border-white/10 p-6 md:p-7 transition-all duration-300 z-50 pointer-events-auto",
                          isProductsHovered
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none"
                        )}
                      >
                        {/* Top Decorative Amber Line */}
                        <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-amber)] to-transparent" />

                        {/* Mega Menu Grid Layout (4 Vertical Category Columns) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                          {productCategories.map((category) => (
                            <div key={category.id} className="flex flex-col gap-3">
                              
                              {/* Category Header (Amber Title with Bullet) */}
                              <Link
                                href={`/product-category/${category.id}`}
                                className="group flex items-center justify-between border-b border-white/10 pb-2 text-xs font-extrabold uppercase tracking-widest text-[var(--color-amber)] hover:text-[var(--color-amber-2)] transition-colors"
                              >
                                <span>• {category.title}</span>
                              </Link>

                              {/* Products List under Category (Natural Vertical List) */}
                              <ul className="flex flex-col gap-2">
                                {category.items.map((item) => {
                                  const slug = getItemSlug(item);
                                  return (
                                    <li key={item}>
                                      <Link
                                        href={`/products/${slug}`}
                                        className="group flex items-center text-xs text-white/85 hover:text-[var(--color-amber)] transition-all duration-150 py-0.5"
                                      >
                                        <span className="inline-block transition-transform duration-150 group-hover:translate-x-1.5">
                                          {item}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                }

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

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-[var(--color-ink)] hover:text-[var(--color-blue)] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile Drawer Menu Overlay */}
          {open && (
            <div className="md:hidden absolute inset-x-0 top-[72px] bg-white border-b border-[var(--color-line)] shadow-lg z-30 flex flex-col p-5 gap-4 animate-fade-in max-h-[85vh] overflow-y-auto">
              <ul className="flex flex-col gap-1">
                {links.map((link) => {
                  const isActive = pathname === link.href;

                  if (link.hasMegaMenu) {
                    return (
                      <li key={link.label} className="border-b border-slate-100 pb-2">
                        <button
                          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                          className={cn(
                            "flex items-center justify-between w-full py-3 px-2 text-sm font-semibold transition-colors rounded-lg",
                            isActive
                              ? "text-[var(--color-amber)] bg-amber-50/50"
                              : "text-[var(--color-ink)] hover:text-[var(--color-amber)] hover:bg-slate-50"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={cn("h-4 w-4 text-[var(--color-amber)] transition-transform duration-200", mobileCategoriesOpen && "rotate-180")} />
                        </button>

                        {/* Mobile Products Preview - Clean 2-Column Text Grid */}
                        {mobileCategoriesOpen && (
                          <div className="mt-2 py-2 px-1 space-y-4 border-l-2 border-[var(--color-amber)] ml-3">
                            {productCategories.map((cat) => (
                              <div key={cat.id} className="space-y-1.5">
                                {/* Category Header */}
                                <Link
                                  href={`/product-category/${cat.id}`}
                                  onClick={() => setOpen(false)}
                                  className="block text-xs font-bold uppercase text-[var(--color-amber)] tracking-wider"
                                >
                                  • {cat.title}
                                </Link>

                                {/* Clean 2-Column Grid of Text Links */}
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 pl-2">
                                  {cat.items.map((item) => (
                                    <Link
                                      key={item}
                                      href={`/products/${getItemSlug(item)}`}
                                      onClick={() => setOpen(false)}
                                      className="text-xs text-slate-700 hover:text-[var(--color-amber)] transition-colors leading-snug py-0.5 truncate"
                                      title={item}
                                    >
                                      {item}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  }

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

          </div>
        </nav>
      </div>
    </>
  );
}

