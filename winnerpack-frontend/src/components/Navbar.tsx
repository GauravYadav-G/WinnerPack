"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, Mail, Clock, ChevronDown, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import { productCategories } from "../data";
import OptimizedImage from '@/components/OptimizedImage';

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
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(productCategories[0]?.id || "film-products");
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
      <div className="bg-[var(--color-ink)] text-white/70 text-[10px] sm:text-[11px] md:text-xs py-2 border-b border-white/5 relative z-50">
        <div className="max-w-[1536px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex justify-between items-center">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <a href="mailto:sales@winnerpack.in" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--color-amber)] shrink-0" />
              <span className="hidden min-[400px]:inline">sales@winnerpack.in</span>
              <span className="min-[400px]:hidden">Email</span>
            </a>
            <a href="tel:+918595072187" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--color-amber)] shrink-0" />
              <span className="font-mono">+91 85950 72187</span>
            </a>
            <a href="tel:+917428770999" className="hidden md:flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[var(--color-amber)] shrink-0" />
              <span className="font-mono">+91 74287 70999</span>
            </a>
          </div>
          
          {/* Right: Timing / Info */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <Clock className="h-3.5 w-3.5 text-[var(--color-amber)] shrink-0" />
            <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div className="h-[72px] sm:h-[76px] lg:h-[80px] relative z-40">
        <nav className={cn(
          "bg-white border-b border-[var(--color-line)] h-[72px] sm:h-[76px] lg:h-[80px] w-full transition-all duration-300 text-[var(--color-ink)]",
          scrolled ? "fixed top-0 left-0 z-50 shadow-md bg-white/95 backdrop-blur-md" : "relative z-40"
        )}>
          <div className="max-w-[1536px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full flex items-center justify-between">
            
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 group shrink-0" data-hover>
              <OptimizedImage
                src={"/logo.png"}
                alt="Winner Pack Logo"
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="leading-tight flex flex-col">
                <div className="font-display text-base sm:text-lg lg:text-xl xl:text-2xl font-black tracking-tight text-[var(--color-ink)] leading-none">
                  Winner Pack
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] lg:text-[10px] font-extrabold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[var(--color-blue)] mt-0.5 sm:mt-1 text-right">
                  Technologies Pvt Ltd
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links — visible at lg (1024px) and above */}
            <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
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
                          "inline-flex items-center gap-1 text-[13px] lg:text-sm font-semibold tracking-wide px-2.5 lg:px-3.5 py-2.5 rounded-md transition-all duration-200",
                          isActive || isProductsHovered
                            ? "text-[var(--color-amber)] bg-amber-50/50"
                            : "text-[var(--color-ink)] hover:text-[var(--color-amber)] hover:bg-amber-50/30"
                        )}
                        data-hover
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200 text-[var(--color-amber)]", isProductsHovered && "rotate-180")} />
                      </Link>

                      {/* ── SPLIT-PANE MEGA MENU DROPDOWN (Tabbed Category Side List + Products Grid) ── */}
                      <div
                        className={cn(
                          "absolute left-1/2 -translate-x-1/2 top-[56px] w-[92vw] max-w-5xl bg-[var(--color-ink)]/98 backdrop-blur-2xl text-white shadow-[0_25px_60px_rgba(0,0,0,0.7)] rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 z-50 pointer-events-auto",
                          isProductsHovered
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none"
                        )}
                      >
                        {/* Top Decorative Amber Line */}
                        <div className="h-1 bg-gradient-to-r from-[var(--color-amber)] via-[#ff9e43] to-[var(--color-amber)]" />

                        <div className="flex flex-row min-h-[380px]">
                          {/* Left Column: Vertical Category Tabs (Active state highlights with white bg & dark ink text) */}
                          <div className="w-64 lg:w-72 shrink-0 bg-[#0c072b] border-r border-white/10 flex flex-col divide-y divide-white/5 py-2">
                            <div className="px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-amber)]">
                              Product Categories
                            </div>
                            {productCategories.map((category) => {
                              const isActive = activeCategoryTab === category.id;
                              const Icon = category.icon;
                              return (
                                <button
                                  key={category.id}
                                  type="button"
                                  onMouseEnter={() => setActiveCategoryTab(category.id)}
                                  onClick={() => setActiveCategoryTab(category.id)}
                                  className={cn(
                                    "w-full px-5 py-3.5 text-left text-xs lg:text-sm transition-all duration-200 flex items-center justify-between group cursor-pointer",
                                    isActive
                                      ? "bg-white text-[#120a3b] font-extrabold shadow-md border-l-4 border-[var(--color-amber)]"
                                      : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={cn(
                                      "p-1.5 rounded-lg transition-colors shrink-0",
                                      isActive ? "bg-amber-100 text-[var(--color-amber-dark)]" : "bg-white/5 text-white/60 group-hover:text-[var(--color-amber)]"
                                    )}>
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="truncate">{category.title}</span>
                                  </div>
                                  <span className={cn(
                                    "text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors shrink-0 ml-2",
                                    isActive ? "bg-[#120a3b] text-white" : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white"
                                  )}>
                                    {category.items.length}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Right Area: Dynamic Product Items Grid */}
                          {(() => {
                            const currentCategory = productCategories.find((c) => c.id === activeCategoryTab) || productCategories[0];
                            return (
                              <div className="flex-1 p-6 lg:p-7 bg-[#120a3b]/95 flex flex-col justify-between">
                                <div>
                                  {/* Category Header */}
                                  <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5 gap-4">
                                    <div>
                                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-amber)]">
                                        {currentCategory.tag}
                                      </span>
                                      <h3 className="text-base lg:text-lg font-extrabold text-white font-display mt-0.5">
                                        {currentCategory.title}
                                      </h3>
                                    </div>
                                    <Link
                                      href={`/product-category/${currentCategory.id}`}
                                      onClick={() => setIsProductsHovered(false)}
                                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-amber)] hover:text-white transition-colors bg-white/5 hover:bg-[var(--color-amber)] px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-transparent shrink-0"
                                    >
                                      <span>View Category</span>
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                  </div>

                                  {/* Sub-Items Grid (2 or 3 Columns) */}
                                  <div className="grid grid-cols-2 gap-2.5">
                                    {currentCategory.items.map((item) => {
                                      const slug = getItemSlug(item);
                                      return (
                                        <Link
                                          key={item}
                                          href={`/products/${slug}`}
                                          onClick={() => setIsProductsHovered(false)}
                                          className="group p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-[var(--color-amber)]/40 transition-all duration-200 flex items-center justify-between text-xs text-white/90 hover:text-white"
                                        >
                                          <span className="font-medium group-hover:font-bold group-hover:text-[var(--color-amber)] transition-colors truncate">
                                            {item}
                                          </span>
                                          <ChevronRight className="h-3.5 w-3.5 text-white/30 group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Bottom Info Bar */}
                                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                                  <span className="font-mono text-[11px] truncate mr-4">
                                    {currentCategory.blurb}
                                  </span>
                                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0">
                                    ISO Verified
                                  </span>
                                </div>
                              </div>
                            );
                          })()}
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
                        "text-[13px] lg:text-sm font-semibold tracking-wide px-2.5 lg:px-3.5 py-2.5 rounded-md transition-all duration-200",
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

            {/* Action Call / Contact Button — visible at lg and above */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                href="/contact"
                className="bg-[var(--color-amber)] text-[var(--color-blue-deep)] px-4 lg:px-5 py-2 lg:py-2.5 rounded-md text-xs lg:text-sm font-bold shadow-md shadow-[var(--color-amber)]/20 hover:bg-[var(--color-amber)]/95 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                data-hover
              >
                Request a Quote
              </Link>
            </div>

            {/* Mobile/Tablet Hamburger Toggle — visible below lg */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-[var(--color-ink)] hover:text-[var(--color-blue)] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Mobile/Tablet Drawer Menu Overlay — visible below lg */}
            {open && (
              <div className="lg:hidden absolute inset-x-0 top-[72px] sm:top-[76px] bg-white border-b border-[var(--color-line)] shadow-lg z-30 flex flex-col p-5 gap-4 animate-fade-in max-h-[85vh] overflow-y-auto">
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

                          {/* Mobile Products Preview */}
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
