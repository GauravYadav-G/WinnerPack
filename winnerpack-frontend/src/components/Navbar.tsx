"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, Mail, Clock, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";
import OptimizedImage from '@/components/OptimizedImage';

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products", hasMegaMenu: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" }
];

// Complete 3-Tier Hierarchy with 11 specified Film Products order
export const productHierarchy = [
  {
    id: "film-products",
    title: "Film Products",
    catSlug: "film-products",
    subcategories: [
      {
        id: "packaging-films",
        title: "Packaging Films",
        slug: "packaging-films",
        items: [
          { name: "LDPE Shrink Film", slug: "ldpe-shrink-film" },
          { name: "PE Liners And Garbage Bags", slug: "pe-liners-garbage-bags" },
          { name: "Plastic Stretch Film", slug: "plastic-stretch-film" },
          { name: "Collation Shrink Film", slug: "collation-shrink-film" },
        ]
      },
      {
        id: "pof-shrink-film",
        title: "POF Shrink Film",
        slug: "pof-shrink-film",
        items: [
          { name: "Cross-Linked POF Film", slug: "cross-linked-pof" },
          { name: "Non-Cross-Linked POF Film", slug: "non-cross-linked-pof-film" },
          // { name: "POF Shrink Pouches", slug: "pof-shrink-pouches" },
        ]
      },
      {
        id: "lamination-pe-film",
        title: "Lamination PE Film",
        slug: "lamination-pe-film",
        items: [
          { name: "Adhesive Lamination Film", slug: "adhesive-lamination-film" },
          { name: "Pharma Grade Poly", slug: "pharma-grade-poly" },
        ]
      },
      {
        id: "agricultural-films",
        title: "Agricultural Films",
        slug: "agricultural-films",
        items: [
          { name: "Plastic Mulching Film", slug: "plastic-mulching-film" },
          { name: "Low Tunnel Film", slug: "low-tunnel-film" },
          { name: "Mulch Film", slug: "mulch-film" },
        ]
      },
      {
        id: "biodegradable-films",
        title: "Biodegradable Films",
        slug: "biodegradable-films",
        items: [
          { name: "Bio Degradable Mulch Film", slug: "bio-degradable-mulch-film" },
          { name: "Biodegradable Shrink Film", slug: "biodegradable-shrink-film" },
          { name: "Biodegradable Shopping Bag", slug: "biodegradable-shopping-bag" },
        ]
      },
      {
        id: "flexible-laminate-rolls",
        title: "Flexible Laminate Rolls & Pouches",
        slug: "flexible-laminates",
        items: [
          { name: "Agro Chemical Laminates", slug: "agro-chemical-laminates" },
          { name: "Plain Standup Pouches", slug: "plain-standup-pouches" },
          { name: "Lidding Foils And Laminates", slug: "lidding-foils-laminates" },
          { name: "Wrap Around Labels", slug: "wrap-around-labels" },
          { name: "Laminated Pouch India", slug: "laminated-pouch-india" },
          { name: "Polyester Laminated Roll", slug: "polyester-laminated-roll" },
          { name: "Multi Coloured Laminated Roll", slug: "multi-coloured-laminated-roll" },
          { name: "Food Packaging Laminates In Pouch And Roll Form", slug: "food-packaging-laminates" },
        ]
      },
      {
        id: "printed-pe-films",
        title: "Printed PE Films",
        slug: "printed-pe-films",
        items: [
          { name: "Milk Pouch & Milk Packaging Film", slug: "milk-packaging-film" },
          { name: "Ghee Vanaspati Packaging Film", slug: "ghee-packaging-film" },
          { name: "SMP Packaging Film", slug: "smp-packaging-film" },
          { name: "Water Packaging Film", slug: "water-packaging-film" },
        ]
      },

      {
        id: "ldpe-bags",
        title: "LDPE Bags",
        slug: "ldpe-bags",
        items: [
          { name: "Antistatic Poly Bags", slug: "antistatic-poly-bags" },
          { name: "Biohazard Bags", slug: "biohazard-bags" },
          { name: "Black Refuse Sacks", slug: "black-refuse-sacks" },
          { name: "Clear Polythene Packing Bags", slug: "clear-polythene-packing-bags" },
          { name: "Ice Bags", slug: "ice-bags" },
          { name: "Plastic Dcut Bags", slug: "plastic-dcut-bags" },
          { name: "Polythene Clothing Packing Bags", slug: "polythene-clothing-packing-bags" },
          { name: "Grip Seal Bags", slug: "grip-seal-bags" },
          { name: "Poly Mailer Bags", slug: "poly-mailer-bags" },
          { name: "Plastic Bags with Hanger Hook", slug: "plastic-bags-hanger-hook" },
          { name: "Soft Loop Handle Bags", slug: "soft-loop-handle-bags" },
          { name: "Plastic Drawstring Bags", slug: "plastic-drawstring-bags" },
        ]
      },
      {
        id: "bopp-films",
        title: "BOPP FILMS",
        slug: "bopp-films",
        items: [
          { name: "BOPP Rolls", slug: "bopp-film-rolls" },
          { name: "BOPP Pouches", slug: "bopp-display-pouches" },
        ]
      },
      {
        id: "pvc-shrink-films",
        title: "PVC SHRINK FILMS",
        slug: "pvc-shrink-films",
        items: [
          { name: "PVC Shrink Rolls", slug: "pvc-heat-shrink-rolls" },
          { name: "PVC Shrink Pouches", slug: "pvc-shrink-pouches-sleeves" },
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
        items: []
      },
      {
        id: "printed-labels",
        title: "Printed Labels",
        slug: "printed-labels",
        items: []
      },
      {
        id: "barcode-labels",
        title: "Barcode Labels",
        slug: "barcode-labels",
        items: []
      },
      {
        id: "product-labels",
        title: "Product Labels",
        slug: "product-labels",
        items: []
      },
      {
        id: "self-adhesive-labels",
        title: "Self Adhesive Labels",
        slug: "self-adhesive-labels",
        items: []
      },
      {
        id: "thermal-labels",
        title: "Thermal Labels",
        slug: "thermal-labels",
        items: []
      },
      {
        id: "hologram-stickers",
        title: "Hologram Stickers",
        slug: "hologram-stickers",
        items: []
      },
      {
        id: "security-void-stickers",
        title: "Security Void Stickers",
        slug: "security-void-stickers",
        items: []
      },
      {
        id: "tamper-evident-stickers",
        title: "Tamper-Evident Stickers",
        slug: "tamper-evident-stickers",
        items: []
      },
      {
        id: "thermal-transfer-ribbons",
        title: "Thermal Transfer Ribbons",
        slug: "thermal-transfer-ribbons",
        items: []
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
        items: []
      },
      {
        id: "printed-tapes",
        title: "Printed BOPP Tapes",
        slug: "printed-bopp-tapes",
        items: []
      },
      {
        id: "colored-tapes",
        title: "Coloured BOPP Tapes",
        slug: "coloured-bopp-tapes",
        items: []
      },
      {
        id: "silicon-tapes",
        title: "Silicon Tapes",
        slug: "silicon-tapes",
        items: []
      },
    ]
  },
  {
    id: "pp-strap",
    title: "Others",
    catSlug: "pp-strap",
    subcategories: [
      {
        id: "pp-strap-main",
        title: "PP Strap",
        slug: "pp-strap",
        items: []
      },
      {
        id: "printed-pp-strap",
        title: "Printed PP Strap",
        slug: "printed-pp-strap",
        items: []
      },
      {
        id: "colored-pp-strap",
        title: "Colored PP Strap",
        slug: "colored-pp-strap",
        items: []
      },
      {
        id: "pet-strap",
        title: "PET Strap",
        slug: "pet-strap",
        items: []
      },
    ]
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeSubCatId, setActiveSubCatId] = useState<string | null>(null);
  const [activeSubCatTop, setActiveSubCatTop] = useState(0);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileActiveCatId, setMobileActiveCatId] = useState<string>("film-products");
  const [mobileExpandedSubCatId, setMobileExpandedSubCatId] = useState<string | null>(null);

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
            <a href="mailto:info@winnerpack.in" className="flex items-center gap-1.5 hover:text-[var(--color-amber)] transition-colors">
              <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--color-amber)] shrink-0" />
              <span className="hidden min-[400px]:inline">info@winnerpack.in</span>
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
                        setActiveSubCatTop(0);
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
                        <div
                          data-cascade-menu
                          className="absolute -left-36 lg:-left-44 top-[56px] z-50 flex items-start pointer-events-auto"
                        >

                          {/* ── TIER 1: 4 Main Categories Menu ── */}
                          <div className="w-56 lg:w-60 bg-[#120a3b] text-white shadow-2xl rounded-xl border border-white/10 overflow-hidden py-1 z-30 shrink-0">
                            <div className="divide-y divide-white/5">
                              {productHierarchy.map((category) => {
                                const isCurrentActive = activeCatId === category.id;
                                return (
                                  <div
                                    key={category.id}
                                    onMouseEnter={() => {
                                      setActiveCatId(category.id);
                                      setActiveSubCatId(null);
                                      setActiveSubCatTop(0);
                                    }}
                                    className="relative group/item"
                                  >
                                    <Link
                                      href={`/product-category/${category.catSlug}`}
                                      className={cn(
                                        "w-full px-4 py-3 text-left text-xs lg:text-[13px] transition-all duration-150 flex items-center justify-between cursor-pointer border-b border-white/5",
                                        isCurrentActive
                                          ? "bg-white text-[#120a3b] font-bold shadow-xs"
                                          : "bg-[#120a3b] text-white hover:bg-white hover:text-[#120a3b] hover:font-bold font-medium"
                                      )}
                                    >
                                      <span className="truncate">{category.title}</span>
                                      {category.subcategories && category.subcategories.length > 0 && (
                                        <ChevronRight className={cn(
                                          "h-3.5 w-3.5 shrink-0 ml-1 transition-transform",
                                          isCurrentActive ? "text-[#120a3b] translate-x-0.5" : "text-white/60 group-hover/item:text-[#120a3b] group-hover/item:translate-x-0.5"
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
                                <div className="divide-y divide-white/5 max-h-[75vh] overflow-y-auto no-scrollbar">
                                  {currentCategory.subcategories.map((subcat) => {
                                    const isSubActive = activeSubCatId === subcat.id;
                                    return (
                                      <div
                                        key={subcat.id}
                                        onMouseEnter={(event) => {
                                          const rowTop = event.currentTarget.getBoundingClientRect().top;
                                          const menuTop = event.currentTarget
                                            .closest("[data-cascade-menu]")
                                            ?.getBoundingClientRect().top;

                                          setActiveSubCatId(subcat.id);
                                          setActiveSubCatTop(Math.max(0, rowTop - (menuTop ?? rowTop)));
                                        }}
                                        className="relative group/subitem"
                                      >
                                        <Link
                                          href={`/products/${subcat.slug}`}
                                          className={cn(
                                            "w-full px-4 py-2.5 text-left text-xs lg:text-[13px] transition-all duration-150 flex items-center justify-between cursor-pointer border-b border-white/5",
                                            isSubActive
                                              ? "bg-white text-[#120a3b] font-bold shadow-xs"
                                              : "bg-[#120a3b] text-white hover:bg-white hover:text-[#120a3b] hover:font-bold font-medium"
                                          )}
                                        >
                                          <span className="truncate">{subcat.title}</span>
                                          {subcat.items && subcat.items.length > 0 && (
                                            <ChevronRight className={cn(
                                              "h-3.5 w-3.5 shrink-0 ml-1 transition-transform",
                                              isSubActive ? "text-[#120a3b] translate-x-0.5" : "text-white/60 group-hover/subitem:text-[#120a3b] group-hover/subitem:translate-x-0.5"
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
                                style={{ marginTop: activeSubCatTop }}
                                className="w-64 lg:w-72 bg-[#120a3b] text-white shadow-2xl rounded-xl border border-white/10 overflow-hidden py-1 ml-1 z-10 shrink-0 transition-all duration-150 animate-fade-in"
                              >
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
                                      className="w-full px-4 py-2.5 text-left text-xs lg:text-[13px] transition-all duration-150 flex items-center justify-between cursor-pointer bg-[#120a3b] text-white hover:bg-white hover:text-[#120a3b] hover:font-bold border-b border-white/5 font-medium group"
                                    >
                                      <span className="truncate">{item.name}</span>
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
              <div className="lg:hidden absolute inset-x-0 top-[72px] sm:top-[76px] bg-white border-b border-[var(--color-line)] shadow-[0_8px_32px_rgba(10,22,40,0.12)] z-30 flex flex-col p-5 gap-4 animate-fade-in max-h-[85vh] overflow-y-auto scrollbar-none">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = pathname === link.href;

                    if (link.hasMegaMenu) {
                      return (
                        <li key={link.label} className="border-b border-slate-100 pb-2">
                          <div className="flex items-center justify-between w-full">
                            <Link
                              href="/products"
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex-1 py-3 px-2 text-sm font-semibold transition-colors rounded-lg flex items-center justify-between",
                                isActive
                                  ? "text-[var(--color-amber)] bg-amber-50/50 font-bold"
                                  : "text-[var(--color-ink)] hover:text-[var(--color-amber)] hover:bg-slate-50"
                              )}
                            >
                              <span>{link.label}</span>
                            </Link>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setMobileCategoriesOpen(!mobileCategoriesOpen);
                              }}
                              className="p-2 text-[var(--color-amber)] hover:bg-amber-50 rounded-lg shrink-0 transition-colors"
                              aria-label="Toggle subcategories catalog preview"
                            >
                              <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileCategoriesOpen && "rotate-180")} />
                            </button>
                          </div>

                          {/* Mobile Products Preview — Redesigned with Desktop 3-Tier Hierarchy */}
                          {mobileCategoriesOpen && (
                            <div className="mt-2 py-3 px-2 space-y-4 bg-slate-50/80 rounded-xl border border-slate-200/80">

                              {/* Tier 1: Main Category Switcher Pills */}
                              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none touch-pan-x -mx-1 px-1">
                                {productHierarchy.map((cat) => {
                                  const isActiveCat = cat.id === mobileActiveCatId || cat.catSlug === mobileActiveCatId;
                                  return (
                                    <button
                                      key={cat.id}
                                      type="button"
                                      onClick={() => {
                                        setMobileActiveCatId(cat.id);
                                        setMobileExpandedSubCatId(null);
                                      }}
                                      className={cn(
                                        "shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 shadow-2xs whitespace-nowrap min-h-[34px] flex items-center justify-center",
                                        isActiveCat
                                          ? "bg-[var(--color-blue-deep)] text-white shadow-xs"
                                          : "bg-white text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-slate-100"
                                      )}
                                    >
                                      {cat.title}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Selected Category Content */}
                              {(() => {
                                const selectedCat = productHierarchy.find(
                                  (c) => c.id === mobileActiveCatId || c.catSlug === mobileActiveCatId
                                ) || productHierarchy[0];

                                return (
                                  <div className="space-y-3 pt-1">
                                    {/* Category Main Page Quick Link */}
                                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                                        {selectedCat.title} Formats
                                      </span>
                                      <Link
                                        href={`/product-category/${selectedCat.catSlug}`}
                                        onClick={() => setOpen(false)}
                                        className="text-xs font-bold text-[var(--color-blue)] hover:underline flex items-center gap-1"
                                      >
                                        <span>View all</span>
                                        <ChevronRight className="h-3 w-3" />
                                      </Link>
                                    </div>

                                    {/* Tier 2 & Tier 3: Subcategories list for active category */}
                                    <div className="space-y-2">
                                      {selectedCat.subcategories.map((subcat) => {
                                        const isExpanded = mobileExpandedSubCatId === subcat.id;
                                        return (
                                          <div key={subcat.id} className="rounded-lg bg-white border border-slate-200/70 overflow-hidden shadow-2xs">
                                            <div className="flex items-center justify-between p-2.5">
                                              <Link
                                                href={`/products/${subcat.slug}`}
                                                onClick={() => setOpen(false)}
                                                className="text-xs font-extrabold font-display text-[var(--color-ink)] hover:text-[var(--color-blue)] transition-colors flex-1"
                                              >
                                                {subcat.title}
                                              </Link>

                                              {subcat.items && subcat.items.length > 0 ? (
                                                <button
                                                  type="button"
                                                  onClick={() => setMobileExpandedSubCatId(isExpanded ? null : subcat.id)}
                                                  className="p-1 text-slate-400 hover:text-[var(--color-blue)] transition-colors shrink-0"
                                                  aria-label={`Toggle ${subcat.title} sub-items`}
                                                >
                                                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isExpanded && "rotate-180")} />
                                                </button>
                                              ) : (
                                                <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
                                              )}
                                            </div>

                                            {/* Sub-items drop down */}
                                            {isExpanded && subcat.items && subcat.items.length > 0 && (
                                              <div className="px-3 pb-2.5 pt-1 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-1.5">
                                                {subcat.items.map((item) => (
                                                  <Link
                                                    key={item.name}
                                                    href={`/products/${item.slug}`}
                                                    onClick={() => setOpen(false)}
                                                    className="text-[11px] font-medium text-slate-600 hover:text-[var(--color-blue)] transition-colors py-1 px-1.5 rounded hover:bg-white truncate"
                                                    title={item.name}
                                                  >
                                                    • {item.name}
                                                  </Link>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
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

                {/* Quick Contact Info — Stitch design bottom drawer */}
                <div className="mt-1 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <a href="tel:+918595072187" className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)] hover:text-[var(--color-blue)] transition-colors">
                    <Phone className="h-3.5 w-3.5 text-[var(--color-amber-dark)] shrink-0" />
                    +91 85950 72187
                  </a>
                  <a href="mailto:info@winnerpack.in" className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)] hover:text-[var(--color-blue)] transition-colors">
                    <Mail className="h-3.5 w-3.5 text-[var(--color-amber-dark)] shrink-0" />
                    info@winnerpack.in
                  </a>
                </div>

                {/* Mobile CTA */}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-[var(--color-blue-deep)] text-white py-3 rounded-xl text-sm font-bold hover:bg-[var(--color-blue-deep)]/90 transition-colors"
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
