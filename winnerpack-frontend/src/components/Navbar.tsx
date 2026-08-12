"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, Mail, Clock, ChevronDown, ChevronRight } from "lucide-react";
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

// Complete 3-Tier Hierarchy: Categories -> Subcategories -> Specific Product Types
const productHierarchy = [
  {
    id: "film-products",
    title: "Film Products",
    catSlug: "film-products",
    subcategories: [
      {
        id: "ldpe-films-pouches",
        title: "LDPE Films & Pouches",
        slug: "ldpe-films-pouches",
        items: [
          { name: "LDPE Shrink Film", slug: "ldpe-films-pouches" },
          { name: "Standard Normal LDPE Film", slug: "ldpe-films-pouches" },
          { name: "LDPE Pouches & Bags", slug: "ldpe-films-pouches" },
        ]
      },
      {
        id: "pof-films-pouches",
        title: "POF Films & Pouches",
        slug: "pof-films-pouches",
        items: [
          { name: "Cross-Linked POF Film", slug: "pof-films-pouches" },
          { name: "Non-Cross-Linked POF Film", slug: "pof-films-pouches" },
          { name: "POF Shrink Pouches", slug: "pof-films-pouches" },
        ]
      },
      {
        id: "coloured-films-pouches",
        title: "Coloured Films & Pouches",
        slug: "coloured-films-pouches",
        items: [
          { name: "CPE Pouches (Cast Polyethylene)", slug: "coloured-films-pouches" },
          { name: "Milky White Pouches & Films", slug: "coloured-films-pouches" },
        ]
      },
      {
        id: "bopp-films-pouches",
        title: "BOPP Films & Pouches",
        slug: "bopp-films-pouches",
        items: [
          { name: "BOPP Film Rolls", slug: "bopp-films-pouches" },
          { name: "BOPP Display Pouches", slug: "bopp-films-pouches" },
        ]
      },
      {
        id: "pvc-shrink-rolls-pouches",
        title: "PVC Shrink Rolls & Pouches",
        slug: "pvc-shrink-rolls-pouches",
        items: [
          { name: "PVC Heat Shrink Rolls", slug: "pvc-shrink-rolls-pouches" },
          { name: "PVC Shrink Pouches & Sleeves", slug: "pvc-shrink-rolls-pouches" },
        ]
      },
      {
        id: "stretch-film",
        title: "Stretch Film",
        slug: "stretch-film",
        items: [
          { name: "Manual Grade Stretch Film", slug: "stretch-film" },
          { name: "Machine Grade Stretch Film", slug: "stretch-film" },
        ]
      },
      {
        id: "lamination-films-pouches",
        title: "Lamination Films & Pouches",
        slug: "lamination-films-pouches",
        items: [
          { name: "Lamination Film Rolls", slug: "lamination-films-pouches" },
          { name: "Laminated Barrier Pouches", slug: "lamination-films-pouches" },
        ]
      },
      {
        id: "compostable-films-pouches",
        title: "Compostable Films & Pouches",
        slug: "compostable-films-pouches",
        items: [
          { name: "Compostable Film Rolls", slug: "compostable-films-pouches" },
          { name: "Compostable Pouches & Bags", slug: "compostable-films-pouches" },
        ]
      },
    ]
  },
  {
    id: "label-sticker-products",
    title: "Labels & Stickers",
    catSlug: "label-sticker-products",
    subcategories: [
      {
        id: "plain-labels",
        title: "Plain Labels",
        slug: "plain-labels",
        items: [
          { name: "Plain Chromo Paper Labels", slug: "plain-labels" },
          { name: "Plain Thermal Transfer Labels", slug: "plain-labels" },
        ]
      },
      {
        id: "printed-labels",
        title: "Printed Labels",
        slug: "printed-labels",
        items: [
          { name: "Flexo & Digital Printed Labels", slug: "printed-labels" },
          { name: "Wide Format Promotional Labels", slug: "printed-labels" },
        ]
      },
      {
        id: "barcode-labels",
        title: "Barcode Labels",
        slug: "barcode-labels",
        items: [
          { name: "Thermal Transfer Barcode Labels", slug: "barcode-labels" },
          { name: "GS1 & Data Matrix Barcode Labels", slug: "barcode-labels" },
        ]
      },
      {
        id: "product-labels",
        title: "Product Labels",
        slug: "product-labels",
        items: [
          { name: "Clear & Metallic Product Labels", slug: "product-labels" },
          { name: "Jar & Bottle Product Labels", slug: "product-labels" },
        ]
      },
      {
        id: "self-adhesive-labels",
        title: "Self Adhesive Labels",
        slug: "self-adhesive-labels",
        items: [
          { name: "Paper Self-Adhesive Labels", slug: "self-adhesive-labels" },
          { name: "Film Self-Adhesive Labels", slug: "self-adhesive-labels" },
        ]
      },
      {
        id: "thermal-labels",
        title: "Thermal Labels",
        slug: "thermal-labels",
        items: [
          { name: "Direct Thermal Labels", slug: "thermal-labels" },
          { name: "Thermal Transfer Labels", slug: "thermal-labels" },
        ]
      },
    ]
  },
  {
    id: "tapes",
    title: "Tapes",
    catSlug: "tapes",
    subcategories: [
      {
        id: "bopp-tapes",
        title: "BOPP Tapes",
        slug: "bopp-tapes",
        items: [
          { name: "Clear BOPP Packing Tape", slug: "bopp-tapes" },
          { name: "Brown Heavy Duty BOPP Tape", slug: "bopp-tapes" },
        ]
      },
      {
        id: "printed-bopp-tapes",
        title: "Printed BOPP Tapes",
        slug: "printed-bopp-tapes",
        items: [
          { name: "Custom Logo Printed Tape", slug: "printed-bopp-tapes" },
          { name: "Security & Warning Printed Tape", slug: "printed-bopp-tapes" },
        ]
      },
      {
        id: "coloured-bopp-tapes",
        title: "Coloured BOPP Tapes",
        slug: "coloured-bopp-tapes",
        items: [
          { name: "Solid Color Identification Tape", slug: "coloured-bopp-tapes" },
          { name: "Floor Marking Colored Tape", slug: "coloured-bopp-tapes" },
        ]
      },
      {
        id: "silicon-tapes",
        title: "Silicon Tapes",
        slug: "silicon-tapes",
        items: [
          { name: "High Temp Silicon Tape", slug: "silicon-tapes" },
          { name: "Self-Fusing Silicon Tape", slug: "silicon-tapes" },
        ]
      },
    ]
  },
  {
    id: "pp-strap",
    title: "PP & PET Strap",
    catSlug: "pp-strap",
    subcategories: [
      {
        id: "pp-strap-main",
        title: "PP Strap",
        slug: "pp-strap",
        items: [
          { name: "Automatic PP Strapping Roll", slug: "pp-strap" },
          { name: "Manual / Semi-Auto PP Strap", slug: "pp-strap" },
        ]
      },
      {
        id: "printed-pp-strap",
        title: "Printed PP Strap",
        slug: "printed-pp-strap",
        items: [
          { name: "Corporate Branded PP Strap", slug: "printed-pp-strap" },
          { name: "Security Warning PP Strap", slug: "printed-pp-strap" },
        ]
      },
      {
        id: "colored-pp-strap",
        title: "Colored PP Strap",
        slug: "colored-pp-strap",
        items: [
          { name: "Solid Colored PP Strap", slug: "colored-pp-strap" },
          { name: "Embossed Color PP Strap", slug: "colored-pp-strap" },
        ]
      },
      {
        id: "pet-strap",
        title: "PET Strap",
        slug: "pet-strap",
        items: [
          { name: "High-Tensile Green PET Strap", slug: "pet-strap" },
          { name: "Heavy Duty Embossed PET Strap", slug: "pet-strap" },
        ]
      },
    ]
  }
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
  return map[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeSubCatId, setActiveSubCatId] = useState<string | null>(null);
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
                      onMouseLeave={() => {
                        setIsProductsHovered(false);
                        setActiveCatId(null);
                        setActiveSubCatId(null);
                      }}
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

                      {/* ── 3-TIER DYNAMIC CASCADING FLYOUT MENU ── */}
                      {isProductsHovered && (
                        <div className="absolute left-0 top-[56px] z-50 flex items-start pointer-events-auto">
                          
                          {/* ── TIER 1: 4 Main Categories Menu ── */}
                          <div className="w-56 lg:w-60 bg-[#120a3b] text-white shadow-2xl rounded-xl border border-white/10 overflow-hidden py-1 z-30 shrink-0">
                            {/* Top decorative accent bar */}
                            <div className="h-1 bg-gradient-to-r from-[var(--color-amber)] to-[#ff9e43]" />

                            <div className="divide-y divide-white/5">
                              {productHierarchy.map((category) => {
                                const isCurrentActive = activeCatId === category.id;
                                return (
                                  <div
                                    key={category.id}
                                    onMouseEnter={() => {
                                      setActiveCatId(category.id);
                                      setActiveSubCatId(null);
                                    }}
                                    className="relative group/item"
                                  >
                                    <Link
                                      href={`/product-category/${category.catSlug}`}
                                      className={cn(
                                        "w-full px-4 py-3 text-left text-xs lg:text-[13px] transition-all duration-150 flex items-center justify-between cursor-pointer border-b border-white/5",
                                        isCurrentActive
                                          ? "bg-white text-[#120a3b] font-black shadow-sm border-l-4 border-l-[var(--color-amber)]"
                                          : "bg-[#120a3b] text-white/85 hover:bg-white/10 hover:text-[var(--color-amber)] font-medium"
                                      )}
                                    >
                                      <span className="truncate">{category.title}</span>
                                      {category.subcategories && category.subcategories.length > 0 && (
                                        <ChevronRight className={cn(
                                          "h-3.5 w-3.5 shrink-0 ml-1 transition-transform",
                                          isCurrentActive ? "text-[var(--color-amber-dark)] translate-x-0.5" : "text-white/30"
                                        )} />
                                      )}
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* ── TIER 2: Subcategories Menu (Opens on Hovering a Category) ── */}
                          {(() => {
                            const currentCategory = productHierarchy.find((c) => c.id === activeCatId);
                            if (!currentCategory || !currentCategory.subcategories || currentCategory.subcategories.length === 0) {
                              return null;
                            }
                            return (
                              <div
                                onMouseEnter={() => setActiveCatId(currentCategory.id)}
                                className="w-64 lg:w-72 bg-[#120a3b] text-white shadow-2xl rounded-xl border border-white/10 overflow-hidden py-1 ml-1 z-20 shrink-0 transition-all duration-150 animate-fade-in"
                              >
                                {/* Top decorative accent bar matching main menu */}
                                <div className="h-1 bg-gradient-to-r from-[var(--color-amber)] to-[#ff9e43]" />

                                <div className="divide-y divide-white/5 max-h-[75vh] overflow-y-auto no-scrollbar">
                                  {currentCategory.subcategories.map((subcat) => {
                                    const isSubActive = activeSubCatId === subcat.id;
                                    return (
                                      <div
                                        key={subcat.id}
                                        onMouseEnter={() => setActiveSubCatId(subcat.id)}
                                        className="relative group/subitem"
                                      >
                                        <Link
                                          href={`/products/${subcat.slug}`}
                                          className={cn(
                                            "w-full px-4 py-2.5 text-left text-xs lg:text-[13px] transition-all duration-150 flex items-center justify-between cursor-pointer border-b border-white/5",
                                            isSubActive
                                              ? "bg-white text-[#120a3b] font-black shadow-sm border-l-4 border-l-[var(--color-amber)]"
                                              : "bg-[#120a3b] text-white/85 hover:bg-white hover:text-[#120a3b] hover:font-black hover:border-l-4 hover:border-l-[var(--color-amber)] font-medium"
                                          )}
                                        >
                                          <span className="truncate">{subcat.title}</span>
                                          {subcat.items && subcat.items.length > 0 && (
                                            <ChevronRight className={cn(
                                              "h-3.5 w-3.5 shrink-0 ml-1 transition-transform",
                                              isSubActive ? "text-[var(--color-amber-dark)] translate-x-0.5" : "text-white/30"
                                            )} />
                                          )}
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}

                          {/* ── TIER 3: Specific Product Types Menu (Opens on Hovering a Subcategory) ── */}
                          {(() => {
                            const currentCategory = productHierarchy.find((c) => c.id === activeCatId);
                            if (!currentCategory) return null;
                            const currentSubCat = currentCategory.subcategories.find((s) => s.id === activeSubCatId);
                            if (!currentSubCat || !currentSubCat.items || currentSubCat.items.length === 0) {
                              return null;
                            }
                            return (
                              <div
                                onMouseEnter={() => {
                                  setActiveCatId(currentCategory.id);
                                  setActiveSubCatId(currentSubCat.id);
                                }}
                                className="w-64 lg:w-72 bg-[#120a3b] text-white shadow-2xl rounded-xl border border-white/10 overflow-hidden py-1 ml-1 z-10 shrink-0 transition-all duration-150 animate-fade-in"
                              >
                                {/* Top decorative accent bar matching main menu */}
                                <div className="h-1 bg-gradient-to-r from-[var(--color-amber)] to-[#ff9e43]" />

                                <div className="divide-y divide-white/5 max-h-[75vh] overflow-y-auto no-scrollbar">
                                  {currentSubCat.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={`/products/${item.slug}`}
                                      onClick={() => {
                                        setIsProductsHovered(false);
                                        setActiveCatId(null);
                                        setActiveSubCatId(null);
                                      }}
                                      className="w-full px-4 py-2.5 text-left text-xs lg:text-[13px] transition-all duration-150 flex items-center justify-between cursor-pointer bg-[#120a3b] text-white/85 hover:bg-white hover:text-[#120a3b] hover:font-black hover:border-l-4 hover:border-l-[var(--color-amber)] border-b border-white/5 font-medium group"
                                    >
                                      <span className="truncate">{item.name}</span>
                                      <ChevronRight className="h-3.5 w-3.5 text-white/30 group-hover:text-[var(--color-amber-dark)] shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}

                        </div>
                      )}
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
