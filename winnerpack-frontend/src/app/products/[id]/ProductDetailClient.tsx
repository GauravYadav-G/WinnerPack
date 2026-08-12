"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { productCategories } from "../../../data";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import CTABanner from "@/components/CTABanner";

// Layout components
import Navbar, { productHierarchy } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";

import { apiFetch } from "@/lib/api";
import { marked } from "marked";
import { initialProducts } from "@/lib/fallback-data";
import OptimizedImage from '@/components/OptimizedImage';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");

  // Maps navbar subcategory slugs → actual product ID in fallback-data
  const aliasMap: Record<string, string> = {
    // Film Products subcategories → actual parent/product IDs
    "packaging-films":      "packaging-films",       // ✓ direct match — has own entry
    "pof-shrink-film":      "pof-films-pouches",
    "lamination-pe-film":   "lamination-films-pouches",
    "agricultural-films":   "agricultural-films",    // ✓ direct match — has own entry
    "biodegradable-films":  "compostable-films-pouches",
    "flexible-laminates":   "lamination-films-pouches",
    "printed-pe-films":     "coloured-films-pouches",
    "stretch-film":         "stretch-film",           // ✓ direct match
    "ldpe-bags":            "ldpe-films-pouches",
    "bopp-films":           "bopp-films-pouches",
    "pvc-shrink-films":     "pvc-shrink-rolls-pouches",
    // Tape subcategories
    "bopp-tapes":           "bopp-tapes",             // ✓ direct match
    "printed-tapes":        "printed-bopp-tapes",
    "colored-tapes":        "coloured-bopp-tapes",
    "masking-tapes":        "silicon-tapes",
    // PP & PET Strap subcategories
    "pp-strap":             "pp-strap",               // ✓ direct match
    "printed-pp-strap":     "printed-pp-strap",       // ✓ direct match
    "colored-pp-strap":     "colored-pp-strap",       // ✓ direct match
    "pet-strap":            "pet-strap",              // ✓ direct match
  };
  const targetId = aliasMap[id] ?? id;

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/products/${targetId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setImg(data.gallery?.[0] || data.image || "");

        apiFetch("/api/products")
          .then((res) => res.json())
          .then((allProds) => {
            if (Array.isArray(allProds)) {
              const matches = allProds.filter(
                (p: any) => p.category === data.category && p.id !== data.id
              ).slice(0, 3);
              setRelated(matches);
            }
          })
          .catch(() => {
            // Backend offline — fall back gracefully to local category related items
          });

        setLoading(false);
      })
      .catch(() => {
        let fallbackProduct = initialProducts.find((p) => p.id === targetId || p.id === id);
        if (!fallbackProduct) {
          const parentWithSub = initialProducts.find((p) =>
            p.subCategories?.some((s: any) => s.id === targetId || s.id === id || s.slug === targetId || s.slug === id)
          );
          if (parentWithSub && parentWithSub.subCategories) {
            const sub: any = parentWithSub.subCategories.find((s: any) => s.id === targetId || s.id === id || s.slug === targetId || s.slug === id);
            if (sub) {
              fallbackProduct = {
                id: sub.id || id,
                title: sub.title,
                category: parentWithSub.category,
                tag: sub.subtitle || parentWithSub.tag,
                blurb: sub.blurb || parentWithSub.blurb,
                longDesc: sub.longDesc || sub.blurb || parentWithSub.longDesc,
                image: sub.image || parentWithSub.image,
                gallery: [sub.image || parentWithSub.image, ...(parentWithSub.gallery || [])],
                specs: sub.specs || parentWithSub.specs,
                applications: sub.applications || parentWithSub.applications,
                thicknessLengthMatrix: parentWithSub.thicknessLengthMatrix,
                options: parentWithSub.options,
              } as any;
            }
          }
        }

        if (fallbackProduct) {
          setProduct(fallbackProduct);
          setImg(fallbackProduct.gallery?.[0] || fallbackProduct.image || "");
          const matches = initialProducts.filter(
            (p: any) => p.category === fallbackProduct.category && p.id !== fallbackProduct.id
          ).slice(0, 3);
          setRelated(matches);
        } else {
          setProduct(null);
        }
        setLoading(false);
      });
  }, [id, targetId]);

  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | WinnerPack`;
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />

        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-amber-2)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">Loading product application data...</span>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div>
              <h1 className="font-display text-2xl font-bold">Product Specification Not Found</h1>
              <Link href="/products" className="mt-4 inline-block text-xs font-mono uppercase tracking-widest text-[var(--color-amber)] hover:underline">
                Return to Product Line Catalog
              </Link>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  const categoryObj = productCategories.find((c) => c.id === product.category);
  const category = categoryObj?.title || product.category;

  const specs = product.specs ? Object.entries(product.specs).map(([label, value]: any) => ({
    label,
    value,
  })) : [];

  // 5-Photo Gallery Collage Setup: Slot 0 = Featured Hero Image; Slots 1-4 = Dedicated Product Application Folder Images
  const productAppDir = `/images/products/${product.id}/applications`;

  const appSlotImages = Array.isArray(product.applicationSlots) && product.applicationSlots.length > 0
    ? product.applicationSlots.map((s: any) => s.image).filter(Boolean)
    : [
        `${productAppDir}/app-1.png`,
        `${productAppDir}/app-2.png`,
        `${productAppDir}/app-3.png`,
        `${productAppDir}/app-4.png`,
      ];

  const displayGallery = [
    product.image || appSlotImages[0] || `${productAppDir}/app-1.png`,
    appSlotImages[0] || `${productAppDir}/app-1.png`,
    appSlotImages[1] || `${productAppDir}/app-2.png`,
    appSlotImages[2] || `${productAppDir}/app-3.png`,
    appSlotImages[3] || `${productAppDir}/app-4.png`,
  ];

  const isParentProduct = Boolean(
    (Array.isArray(product.subCategories) && product.subCategories.length > 0) ||
    product.id === "lamination-films-pouches" ||
    product.id === "lamination-pe-film"
  );

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* ── CASE 1: PARENT PRODUCT / CATEGORY PAGE WITH PROMINENT SUBCATEGORY CARDS ── */}
        {isParentProduct ? (
          <>
            {/* 1. HERO BANNER */}
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] overflow-hidden bg-[var(--color-ink)] flex items-center justify-center border-b border-white/10">
              <div className="absolute inset-0">
                <OptimizedImage
                  src="/images/desktop/about/blown_film_tower.png"
                  alt={product.title}
                  className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/90 via-[var(--color-blue-deep)]/80 to-[var(--color-ink)]/95" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-display drop-shadow-md">
                  {product.title}
                </h1>

                <nav aria-label="Breadcrumb" className="pt-1">
                  <ol className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-white/70">
                    <li><Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/40" /></li>
                    <li><Link href="/products" className="hover:text-[var(--color-amber)] transition-colors">Products</Link></li>
                    {category && (
                      <>
                        <li><ChevronRight className="h-3 w-3 text-white/40" /></li>
                        <li><Link href={`/product-category/${product.category}`} className="hover:text-[var(--color-amber)] transition-colors">{category}</Link></li>
                      </>
                    )}
                    <li><ChevronRight className="h-3 w-3 text-white/40" /></li>
                    <li className="font-bold text-[var(--color-amber)]">{product.title}</li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* 2. PROMINENT SUBCATEGORY CARDS IN WINNERPACK ROYAL NAVY & AMBER THEME */}
            {product.subCategories && product.subCategories.length > 0 && (
              <section className="bg-[var(--color-mist)] py-8 sm:py-12 md:py-14 border-b border-[var(--color-line)]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                  <div className={`grid grid-cols-1 ${product.subCategories.length > 1 ? "md:grid-cols-2" : ""} gap-6 sm:gap-8 items-stretch`}>
                    {product.subCategories.map((sub: any) => (
                      <div
                        key={sub.id || sub.title}
                        className="bg-[var(--color-ink)] text-white rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between group hover:border-[var(--color-amber)]/40 transition-all duration-300"
                      >
                        <div className="space-y-4 sm:space-y-5">
                          <Link href={`/products/${sub.id || sub.slug || product.id}`} className="block bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 aspect-[16/10] overflow-hidden flex items-center justify-center">
                            <OptimizedImage
                              src={sub.image || product.image || "/images/products/specialty-pouches/image.png"}
                              alt={sub.title}
                              className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>

                          <div>
                            {sub.subtitle && (
                              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber)]">
                                {sub.subtitle}
                              </span>
                            )}
                            <Link href={`/products/${sub.id || sub.slug || product.id}`} className="block hover:text-[var(--color-amber)] transition-colors">
                              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight pt-1">
                                {sub.title}
                              </h3>
                            </Link>
                          </div>

                          {sub.blurb && (
                            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans font-normal">
                              {sub.blurb}
                            </p>
                          )}

                          {sub.specs && (
                            <ul className="space-y-2 text-xs sm:text-sm text-white/90 leading-relaxed font-sans font-normal">
                              {Object.entries(sub.specs).slice(0, 4).map(([lbl, val]: any) => (
                                <li key={lbl} className="flex items-start gap-2.5">
                                  <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                                  <span><strong className="text-white">{lbl}:</strong> {val}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="pt-6 sm:pt-7">
                          <Button
                            to={`/products/${sub.id || sub.slug || product.id}`}
                            className="w-full justify-center bg-[var(--color-amber)] text-[var(--color-blue-deep)] hover:bg-[var(--color-amber-dark)] font-bold py-3 text-xs sm:text-sm rounded-xl shadow-md font-sans transition-all"
                          >
                            View {sub.title} Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 3. STRUCTURED ARTICLE CONTENT (WINNERPACK TYPOGRAPHY & THEMING) */}
            <section className="bg-white py-10 sm:py-16 md:py-20 border-b border-[var(--color-line)] font-sans">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed space-y-6 sm:space-y-8 font-normal font-sans">
                
                <div className="space-y-4">
                  <Eyebrow>Material Overview</Eyebrow>
                  <p className="text-sm sm:text-base text-[var(--color-ink)] font-medium leading-relaxed">
                    {product.title} is a versatile and indispensable component in the realm of packaging solutions. Engineered for exceptional clarity, tensile strength, and flexibility, it is widely used across diverse industrial sectors to safeguard goods during handling, storage, and transport.
                  </p>
                </div>

                {product.longDesc ? (
                  <div
                    className="space-y-4 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-ink)] [&_h2]:pt-4 [&_h3]:font-display [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-sm [&_li]:text-[var(--color-mute)]"
                    dangerouslySetInnerHTML={{ __html: marked.parse(product.longDesc) as string }}
                  />
                ) : (
                  <p>
                    With its wide range of applications, including packaging for food, pharmaceuticals, agriculture, textiles, and industrial goods, WinnerPack products offer unmatched performance, reliability, and cost-effectiveness.
                  </p>
                )}

                {/* Benefits Section */}
                <div className="pt-6 border-t border-[var(--color-line)] space-y-5">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-[var(--color-amber)]" />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                      Key Industrial Benefits
                    </h2>
                  </div>
                  <p className="font-semibold text-[var(--color-ink)] font-sans">
                    Here are key industrial benefits of using WinnerPack {product.title}:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      "Enhanced durability and superior mechanical protection.",
                      "Reliable barrier against moisture, contaminants, and wear.",
                      "High clarity and visual appeal for premium branding.",
                      "Extended shelf life and protection in rigorous environments.",
                      "Compatible with high-speed automated packaging machinery.",
                      "Cost-effective solution adhering to ISO & international standards."
                    ].map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber)]/50 transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-amber-dark)] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          </>
        ) : (
          /* ── CASE 2: SUB-PRODUCT / SPECIFIC DETAIL PAGE (2-COLUMN WITH "OUR PRODUCTS" SIDEBAR) ── */
          <>
            {/* HERO BANNER */}
            <div className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] overflow-hidden bg-[var(--color-ink)] flex items-center justify-center border-b border-white/10">
              <div className="absolute inset-0">
                <OptimizedImage
                  src="/images/desktop/about/blown_film_tower.png"
                  alt={product.title}
                  className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/90 via-[var(--color-blue-deep)]/85 to-[var(--color-ink)]/95" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-2">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-display drop-shadow-md">
                  {product.title}
                </h1>

                <nav aria-label="Breadcrumb" className="pt-1">
                  <ol className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-white/70">
                    <li><Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/40" /></li>
                    <li><Link href="/products" className="hover:text-[var(--color-amber)] transition-colors">Products</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/40" /></li>
                    <li className="font-bold text-[var(--color-amber)]">{product.title}</li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* 2-COLUMN MAIN CONTENT (SIDEBAR + DETAILED CONTENT) */}
            <div className="bg-white py-10 sm:py-14 md:py-16 border-b border-[var(--color-line)] font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                  
                  {/* LEFT SIDEBAR: "OUR PRODUCTS" (DYNAMICALLY MATCHING NAVBAR) */}
                  <aside className="w-full lg:w-72 shrink-0 bg-[var(--color-mist)] border border-[var(--color-line)] rounded-2xl p-5 sm:p-6 shadow-2xs">
                    <div className="mb-5 pb-3 border-b border-[var(--color-line)]">
                      <h2 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-display tracking-tight">
                        Our Products
                      </h2>
                      <div className="h-0.5 w-10 bg-[var(--color-amber)] rounded-full mt-1.5" />
                    </div>

                    <nav className="space-y-6">
                      {productHierarchy.map((cat) => {
                        const isCurrentCat =
                          cat.id === product.category ||
                          cat.catSlug === product.category ||
                          cat.subcategories.some(
                            (sub) =>
                              sub.slug === product.id ||
                              sub.slug === id ||
                              sub.id === product.id ||
                              sub.title.toLowerCase() === product.title.toLowerCase() ||
                              sub.items.some(
                                (it) =>
                                  it.slug === product.id ||
                                  it.slug === id ||
                                  it.name.toLowerCase().trim() === product.title.toLowerCase().trim()
                              )
                          );

                        return (
                          <div key={cat.id} className="space-y-2.5">
                            {/* Main Category Header (Navbar Tier 1) */}
                            <span
                              className={`block text-[11px] font-mono font-bold uppercase tracking-wider transition-colors ${
                                isCurrentCat
                                  ? "text-[var(--color-amber-dark)] font-black"
                                  : "text-[var(--color-ink)]/70"
                              }`}
                            >
                              {cat.title}
                            </span>

                            {/* Subcategories (Navbar Tier 2) */}
                            <div className="space-y-3 pl-1.5 border-l-2 border-[var(--color-line)]">
                              {cat.subcategories.map((subcat) => {
                                const isDirectSubcat =
                                  subcat.slug === product.id ||
                                  subcat.slug === id ||
                                  subcat.id === product.id ||
                                  subcat.title.toLowerCase() === product.title.toLowerCase();

                                const isCurrentSubcat =
                                  isDirectSubcat ||
                                  subcat.items.some(
                                    (it) =>
                                      it.slug === product.id ||
                                      it.slug === id ||
                                      it.name.toLowerCase().trim() === product.title.toLowerCase().trim()
                                  );

                                return (
                                  <div key={subcat.id} className="space-y-1 pl-2">
                                    <Link
                                      href={`/products/${subcat.slug}`}
                                      className={`block text-xs sm:text-[13px] font-bold font-display tracking-tight transition-colors ${
                                        isDirectSubcat
                                          ? "text-[var(--color-amber-dark)] font-black"
                                          : isCurrentSubcat
                                          ? "text-[var(--color-blue-deep)] font-extrabold"
                                          : "text-[var(--color-ink)] hover:text-[var(--color-amber-dark)]"
                                      }`}
                                    >
                                      {subcat.title}
                                    </Link>

                                    {/* Specific Product Items (Navbar Tier 3) */}
                                    <ul className="space-y-1 pl-1">
                                      {subcat.items.map((item) => {
                                        const isActive =
                                          item.slug === product.id ||
                                          item.slug === id ||
                                          item.name.toLowerCase().trim() === product.title.toLowerCase().trim();

                                        return (
                                          <li key={item.name}>
                                            <Link
                                              href={`/products/${item.slug}`}
                                              className={`group flex items-center justify-between py-1 px-2 rounded-md text-xs font-sans transition-all duration-200 ${
                                                isActive
                                                  ? "font-extrabold text-[var(--color-blue-deep)] bg-[var(--color-amber)]/25 border-l-[3px] border-[var(--color-amber)] shadow-xs"
                                                  : "text-[var(--color-mute)] hover:text-[var(--color-ink)] hover:bg-slate-200/50"
                                              }`}
                                            >
                                              <span className="truncate">{item.name}</span>
                                              {isActive && (
                                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber-dark)] shrink-0 ml-1.5" />
                                              )}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </nav>
                  </aside>

                  {/* RIGHT COLUMN: DETAILED ARTICLE CONTENT */}
                  <main className="flex-1 max-w-4xl space-y-8 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed font-sans font-normal">
                    
                    {/* Top Featured Product Rolls Image & Interactive Gallery */}
                    <div className="bg-[var(--color-mist)] border border-[var(--color-line)] rounded-2xl p-2 sm:p-3 shadow-xs max-w-xl space-y-2.5">
                      <div className="aspect-[16/10] overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
                        <OptimizedImage
                          src={img || product.image || "/images/products/specialty-pouches/image.png"}
                          alt={product.title}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                      </div>

                      {displayGallery.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {displayGallery.slice(0, 5).map((photo: string, pIdx: number) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setImg(photo)}
                              className={`relative shrink-0 h-12 w-16 overflow-hidden rounded-lg border-2 transition-all duration-200 bg-slate-900 ${(img || displayGallery[0]) === photo
                                  ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/40 scale-95"
                                  : "border-white/50 opacity-80 hover:opacity-100"
                                }`}
                            >
                              <OptimizedImage
                                src={photo}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Standardized Rich Article Content */}
                    <div className="space-y-6 pt-2">
                      {product.blurb && (
                        <p className="text-sm sm:text-base text-[var(--color-ink)] font-medium leading-relaxed">
                          <strong className="text-[var(--color-ink)]">{product.title}</strong> is an advanced, high-performance packaging solution. {product.blurb}
                        </p>
                      )}

                      {product.longDesc && (
                        <div
                          className="space-y-5 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-ink)] [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-[var(--color-line)] [&_h3]:font-display [&_h3]:text-lg [&_h3]:sm:text-xl [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_h3]:pt-4 [&_h3]:border-t [&_h3]:border-[var(--color-line)] [&_ul]:list-none [&_ul]:space-y-2 [&_li]:text-xs [&_li]:sm:text-sm [&_li]:text-[var(--color-ink)] [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['•'] [&_li]:before:text-[var(--color-amber)] [&_li]:before:font-black [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2"
                          dangerouslySetInnerHTML={{ __html: marked.parse(product.longDesc) as string }}
                        />
                      )}
                    </div>

                    {/* Benefits Section */}
                    {Array.isArray(product.applications) && product.applications.length > 0 && (
                      <div className="pt-6 border-t border-[var(--color-line)] space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-5 w-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                            Key Applications & Benefits
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {product.applications.map((app: string, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber)]/50 transition-colors"
                            >
                              <CheckCircle2 className="h-4 w-4 text-[var(--color-amber-dark)] shrink-0 mt-0.5" />
                              <span>{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specifications & Technical Features Box */}
                    {specs.length > 0 && (
                      <div className="pt-6 border-t border-[var(--color-line)] space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-5 w-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                            Specifications & Technical Features
                          </h2>
                        </div>
                        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-4 sm:p-5">
                          <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[var(--color-ink)] font-sans">
                            {specs.map((s: any) => (
                              <li key={s.label} className="flex items-start gap-2.5">
                                <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                                <span><strong className="text-[var(--color-ink)]">{s.label}:</strong> {s.value}</span>
                              </li>
                            ))}
                            {product.options?.widths && (
                              <li className="flex items-start gap-2.5">
                                <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                                <span><strong className="text-[var(--color-ink)]">Available Widths:</strong> {product.options.widths.join(" · ")}</span>
                              </li>
                            )}
                            {product.options?.thicknesses && (
                              <li className="flex items-start gap-2.5">
                                <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                                <span><strong className="text-[var(--color-ink)]">Thickness Options:</strong> {product.options.thicknesses.join(" · ")}</span>
                              </li>
                            )}
                            {product.options?.colors && (
                              <li className="flex items-start gap-2.5">
                                <span className="h-2 w-2 rounded-full bg-[var(--color-amber)] shrink-0 mt-1.5" />
                                <span><strong className="text-[var(--color-ink)]">Colors Available:</strong> {product.options.colors.join(" · ")}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Thickness & Length Yield Matrix */}
                    {product.thicknessLengthMatrix && (
                      <div className="pt-6 border-t border-[var(--color-line)] space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="h-5 w-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                              Thickness & Length Yield Matrix
                            </h2>
                          </div>
                          <span className="text-[var(--color-amber-dark)] text-xs font-mono font-bold">Micron → Length</span>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-[var(--color-line)] bg-white shadow-2xs">
                          <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                            <thead>
                              <tr className="border-b border-[var(--color-line)] bg-[var(--color-bone-2)] text-[var(--color-ink)] font-bold">
                                <th className="px-3 py-2 border-r border-[var(--color-line)] bg-[var(--color-amber)]/10 text-[var(--color-amber-dark)]">Micron (µm)</th>
                                <th className="px-3 py-2 border-r border-[var(--color-line)]">Gauge</th>
                                <th className="px-3 py-2 border-r border-[var(--color-line)] bg-[var(--color-blue-deep)]/10 text-[var(--color-blue-deep)]">Meters</th>
                                <th className="px-3 py-2">Feet</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.thicknessLengthMatrix.map((row: any, idx: number) => (
                                <tr key={idx} className={`border-b border-[var(--color-line)] last:border-b-0 ${idx % 2 === 1 ? "bg-[var(--color-mist)]" : "bg-white"}`}>
                                  <td className="px-3 py-2 font-bold text-[var(--color-amber-dark)] border-r border-[var(--color-line)]">{row.micron}</td>
                                  <td className="px-3 py-2 text-[var(--color-mute)] border-r border-[var(--color-line)]">{row.gauge}</td>
                                  <td className="px-3 py-2 font-bold text-[var(--color-blue-deep)] border-r border-[var(--color-line)]">{row.meters}</td>
                                  <td className="px-3 py-2 text-[var(--color-mute)]">{row.feet}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Bottom CTA / Contact Bar */}
                    <div className="pt-8 border-t border-[var(--color-line)]">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[var(--color-mist)] border border-[var(--color-line)] shadow-xs">
                        <div className="text-xs sm:text-sm text-[var(--color-mute)] font-sans">
                          Please contact us on <a href="tel:+918595072187" className="font-bold text-[var(--color-ink)] hover:text-[var(--color-amber-dark)] transition-colors">+91 85950 72187</a> or email us <a href="mailto:sales@winnerpack.in" className="font-bold text-[var(--color-ink)] hover:text-[var(--color-amber-dark)] transition-colors">sales@winnerpack.in</a> for quotations or custom requirements.
                        </div>
                        <Button
                          to={`/contact?sku=${product.id}&title=${encodeURIComponent(product.title)}`}
                          className="shrink-0 bg-[var(--color-amber)] text-[var(--color-blue-deep)] hover:bg-[var(--color-amber-dark)] font-bold px-6 py-2.5 rounded-xl shadow-md text-xs sm:text-sm font-sans transition-all"
                        >
                          Send Inquiry
                        </Button>
                      </div>
                    </div>

                  </main>
                </div>
              </div>
            </div>
          </>
        )}

        <Section className="bg-[var(--color-mist)] py-8">
          <Container>
            <div>
              <Link
                href="/products"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-blue-deep)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to full product line catalog
              </Link>
            </div>
          </Container>
        </Section>

        {/* Related Products */}
        {related.length > 0 && (
          <Section className="bg-white pt-16 border-t border-[var(--color-line)]">
            <Container>
              <Eyebrow>Related Material Solutions</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl font-display">
                Complementary Line Products
              </h2>
              <Stagger className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p: any) => (
                  <StaggerItem key={p.id} className="h-full">
                    <ProductCard product={p} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>
        )}

        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
