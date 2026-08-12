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

// Product Category Menu matching Tilak Polypack structure with WinnerPack brand theme
const extendedProductMenu = [
  {
    id: "lamination-pe-film",
    title: "Lamination PE Film",
    tag: "High-Bonding Barrier & Lamination Films",
    catSlug: "film-products",
    items: [
      { name: "Adhesive Lamination Film", slug: "lamination-films-pouches" },
      { name: "Pharma Grade Poly", slug: "ldpe-films-pouches" },
      { name: "Barrier Lamination Film", slug: "lamination-films-pouches" },
      { name: "Laminated Pouches & Rolls", slug: "lamination-films-pouches" },
    ]
  },
  {
    id: "surface-protection-tapes",
    title: "Surface Protection Tapes",
    tag: "Residue-Free Guard Films & Tapes",
    catSlug: "tapes",
    items: [
      { name: "Surface Protection Films", slug: "coloured-films-pouches" },
      { name: "Carpet Protection Film", slug: "coloured-films-pouches" },
      { name: "Floor Protection Tape", slug: "bopp-tapes" },
      { name: "Stainless Steel Protection Sheet", slug: "coloured-films-pouches" },
    ]
  },
  {
    id: "agricultural-films",
    title: "Agricultural Films",
    tag: "UV Stabilized Greenhouse & Mulch",
    catSlug: "film-products",
    items: [
      { name: "Plastic Mulching Film", slug: "compostable-films-pouches" },
      { name: "Low Tunnel Film", slug: "ldpe-films-pouches" },
      { name: "Mulch Film", slug: "compostable-films-pouches" },
    ]
  },
  {
    id: "biodegradable-films",
    title: "Biodegradble Films",
    tag: "100% Eco-Friendly & Compostable",
    catSlug: "film-products",
    items: [
      { name: "Bio Degradable Mulch Film", slug: "compostable-films-pouches" },
      { name: "Biodegradable Shrink Film", slug: "pof-films-pouches" },
      { name: "Biodegradable Shopping Bag", slug: "compostable-films-pouches" },
      { name: "Compostable Pouches", slug: "compostable-films-pouches" },
    ]
  },
  {
    id: "packaging-films",
    title: "Packaging Films",
    tag: "Industrial Bundle & Pallet Wrap",
    catSlug: "film-products",
    items: [
      { name: "LDPE Shrink Film", slug: "ldpe-films-pouches" },
      { name: "PE Liners And Garbage Bags", slug: "ldpe-films-pouches" },
      { name: "Plastic Stretch Film", slug: "stretch-film" },
      { name: "Collation Shrink Film", slug: "pof-films-pouches" },
    ]
  },
  {
    id: "flexible-laminate-rolls",
    title: "Flexible Laminate Rolls & Pouches",
    tag: "Multi-Layer Barrier Pouches & Foils",
    catSlug: "film-products",
    items: [
      { name: "Food Packaging Laminates", slug: "lamination-films-pouches" },
      { name: "Agro Chemical Laminates", slug: "lamination-films-pouches" },
      { name: "Plain Standup Pouches", slug: "bopp-films-pouches" },
      { name: "Lidding Foils And Laminates", slug: "lamination-films-pouches" },
      { name: "Wrap Around Labels", slug: "printed-labels" },
      { name: "Laminated Pouch India", slug: "lamination-films-pouches" },
    ]
  },
  {
    id: "printed-pe-films",
    title: "Printed PE Films",
    tag: "Flexographic Printed Liquid Packaging",
    catSlug: "film-products",
    items: [
      { name: "Milk Packaging Film", slug: "coloured-films-pouches" },
      { name: "Ghee Packaging Film", slug: "coloured-films-pouches" },
      { name: "SMP Packaging Film", slug: "coloured-films-pouches" },
      { name: "Water Packaging Film", slug: "coloured-films-pouches" },
    ]
  },
  {
    id: "stretch-film",
    title: "Stretch Film",
    tag: "Machine & Manual Load Unitization",
    catSlug: "film-products",
    items: [
      { name: "Sustainable Stretch Wrap", slug: "stretch-film" },
      { name: "Mini Stretch Wrap Rolls", slug: "stretch-film" },
      { name: "Manual Stretch Film", slug: "stretch-film" },
      { name: "Machine Grade Stretch Film", slug: "stretch-film" },
    ]
  },
  {
    id: "labels-stickers",
    title: "Labels & Stickers",
    tag: "Thermal Transfer & Product Stickers",
    catSlug: "label-sticker-products",
    items: [
      { name: "Plain Labels", slug: "plain-labels" },
      { name: "Printed Labels", slug: "printed-labels" },
      { name: "Barcode Labels", slug: "barcode-labels" },
      { name: "Product Labels", slug: "product-labels" },
      { name: "Self Adhesive Labels", slug: "self-adhesive-labels" },
      { name: "Thermal Labels", slug: "thermal-labels" },
    ]
  },
  {
    id: "tapes-division",
    title: "Tapes Division",
    tag: "High-Tack BOPP & Specialty Tapes",
    catSlug: "tapes",
    items: [
      { name: "BOPP Tapes", slug: "bopp-tapes" },
      { name: "Printed BOPP Tapes", slug: "printed-bopp-tapes" },
      { name: "Coloured BOPP Tapes", slug: "coloured-bopp-tapes" },
      { name: "Silicon Tapes", slug: "silicon-tapes" },
    ]
  },
  {
    id: "pp-pet-strapping",
    title: "PP & PET Strapping",
    tag: "High Tensile Pallet Strapping Rolls",
    catSlug: "pp-strap",
    items: [
      { name: "PP Strap", slug: "pp-strap" },
      { name: "Printed PP Strap", slug: "printed-pp-strap" },
      { name: "Colored PP Strap", slug: "colored-pp-strap" },
      { name: "PET Strap", slug: "pet-strap" },
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
  const [activeCategoryTab, setActiveCategoryTab] = useState<string | null>(null);
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
                        setActiveCategoryTab(null);
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

                      {/* ── TILAK POLYPACK STYLE DYNAMIC FLYOUT SUBMENU ── */}
                      {isProductsHovered && (
                        <div className="absolute left-0 top-[56px] z-50 flex items-start pointer-events-auto">
                          
                          {/* 1st Tier: Category Dropdown List */}
                          <div className="w-64 lg:w-72 bg-[#120a3b] text-white shadow-2xl rounded-xl border border-white/10 overflow-hidden py-1 z-20">
                            {/* Top decorative accent bar */}
                            <div className="h-1 bg-gradient-to-r from-[var(--color-amber)] to-[#ff9e43]" />

                            <div className="divide-y divide-white/5 max-h-[75vh] overflow-y-auto no-scrollbar">
                              {extendedProductMenu.map((category) => {
                                const isCurrentActive = activeCategoryTab === category.id;
                                return (
                                  <div
                                    key={category.id}
                                    onMouseEnter={() => setActiveCategoryTab(category.id)}
                                    className="relative group/item"
                                  >
                                    <Link
                                      href={`/product-category/${category.catSlug}`}
                                      className={cn(
                                        "w-full px-4 py-2.5 text-left text-xs lg:text-[13px] transition-all duration-150 flex items-center justify-between cursor-pointer",
                                        isCurrentActive
                                          ? "bg-white text-[#120a3b] font-black shadow-sm border-l-4 border-l-[var(--color-amber)]"
                                          : "bg-[#120a3b] text-white/85 hover:bg-white/10 hover:text-[var(--color-amber)] font-medium"
                                      )}
                                    >
                                      <span className="truncate">{category.title}</span>
                                      {category.items && category.items.length > 0 && (
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

                          {/* 2nd Tier: Flyout Submenu Panel (Appears dynamically attached to the side only when hovering!) */}
                          {(() => {
                            const currentCategory = extendedProductMenu.find((c) => c.id === activeCategoryTab);
                            if (!currentCategory || !currentCategory.items || currentCategory.items.length === 0) {
                              return null;
                            }
                            return (
                              <div
                                onMouseEnter={() => setActiveCategoryTab(currentCategory.id)}
                                className="w-80 lg:w-96 bg-[#0d072b] text-white shadow-2xl rounded-xl border border-white/10 p-4 ml-1 z-10 transition-all duration-150 animate-fade-in"
                              >
                                {/* Submenu Header */}
                                <div className="border-b border-white/10 pb-2.5 mb-3 flex items-center justify-between">
                                  <div>
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-amber)]">
                                      {currentCategory.tag}
                                    </span>
                                    <h4 className="text-xs lg:text-sm font-extrabold text-white font-display mt-0.5 truncate">
                                      {currentCategory.title}
                                    </h4>
                                  </div>
                                  <Link
                                    href={`/product-category/${currentCategory.catSlug}`}
                                    onClick={() => setIsProductsHovered(false)}
                                    className="text-[11px] font-bold text-white/60 hover:text-[var(--color-amber)] transition-colors shrink-0 ml-2"
                                  >
                                    View All →
                                  </Link>
                                </div>

                                {/* Sub-Items Grid in 2 Columns */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {currentCategory.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={`/products/${item.slug}`}
                                      onClick={() => setIsProductsHovered(false)}
                                      className="p-2.5 rounded-lg bg-[#1a114b] hover:bg-[#26186c] border border-white/5 hover:border-[var(--color-amber)]/40 transition-all flex items-center justify-between text-xs text-white/90 hover:text-[var(--color-amber)] font-medium shadow-xs"
                                    >
                                      <span className="truncate">{item.name}</span>
                                      <ChevronRight className="h-3 w-3 text-[var(--color-amber)] opacity-60 shrink-0 ml-1" />
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
