"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Loader2, Factory, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { productCategories } from "../../../data";
import { COMPANY } from "../../../lib/mock-data";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import CTABanner from "@/components/CTABanner";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";

import { apiFetch } from "@/lib/api";
import { marked } from "marked";
import { initialProducts } from "@/lib/fallback-data";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/products/${id}`)
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
          .catch((err) => console.error("Failed to load related products:", err));

        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load product detail from API, using client fallback:", err);
        const fallbackProduct = initialProducts.find((p) => p.id === id);
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
  }, [id]);

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


  // 5-Photo Gallery Collage Setup: Slot 0 = Featured Product Image; Slots 1-4 = Product's Dedicated Real-Life Application Folder Images
  const productAppDir = `/images/products/${product.id}/applications`;

  const displayGallery = [
    product.image || `${productAppDir}/app-1.png`,
    `${productAppDir}/app-1.png`,
    `${productAppDir}/app-2.png`,
    `${productAppDir}/app-3.png`,
    `${productAppDir}/app-4.png`,
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* ── 1. BENTO GALLERY HERO COLLAGE (5-PHOTO GRID WITH RESPONSIVE DESKTOP SPACING) ── */}
        <section className="bg-[var(--color-bone)] pt-6 md:pt-10 lg:pt-14 lg:pb-12 border-b border-[var(--color-line)]">
          <Container>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-7">
              <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-mute)]">
                <li><Link href="/" className="hover:text-[var(--color-amber-dark)] font-medium">Home</Link></li>
                <li><ChevronRight className="h-3 w-3 text-slate-400" /></li>
                <li><Link href="/products" className="hover:text-[var(--color-amber-dark)] font-medium">Products</Link></li>
                <li><ChevronRight className="h-3 w-3 text-slate-400" /></li>
                <li>
                  <Link href={`/product-category/${product.category}`} className="hover:text-[var(--color-amber-dark)] font-medium">
                    {category}
                  </Link>
                </li>
                <li><ChevronRight className="h-3 w-3 text-slate-400" /></li>
                <li className="font-bold text-[var(--color-ink)]">{product.title}</li>
              </ol>
            </nav>

            {/* 5-Photo Bento Grid Collage Header (Desktop: 5-Photo Bento Grid with Spacious Gaps | Mobile: 1 Featured Hero Image) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 items-stretch">
              {/* Left Column: 2 Stacked Images */}
              <div className="hidden md:flex md:col-span-3 flex-col gap-3 sm:gap-4 lg:gap-6">
                <div
                  onClick={() => setImg(displayGallery[1])}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[1] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                    }`}
                >
                  <img
                    src={displayGallery[1]}
                    alt={`${product.title} view 1`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div
                  onClick={() => setImg(displayGallery[2])}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[2] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                    }`}
                >
                  <img
                    src={displayGallery[2]}
                    alt={`${product.title} view 2`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Center Column: 1 Large Hero Featured Image */}
              <div className="md:col-span-6">
                <div className="relative aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/11] w-full h-full overflow-hidden rounded-xl sm:rounded-3xl border border-[var(--color-line)] bg-slate-950 shadow-md sm:shadow-lg group">
                  <img
                    src={img || displayGallery[0]}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Column: 2 Stacked Images */}
              <div className="hidden md:flex md:col-span-3 flex-col gap-3 sm:gap-4 lg:gap-6">
                <div
                  onClick={() => setImg(displayGallery[3])}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[3] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                    }`}
                >
                  <img
                    src={displayGallery[3]}
                    alt={`${product.title} view 3`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div
                  onClick={() => setImg(displayGallery[4])}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all duration-200 bg-slate-950 shadow-sm cursor-pointer group ${(img || displayGallery[0]) === displayGallery[4] ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/50" : "border-[var(--color-line)]"
                    }`}
                >
                  <img
                    src={displayGallery[4]}
                    alt={`${product.title} view 4`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Mobile-Only Horizontal Thumbnail Strip */}
            <div className="flex md:hidden items-center gap-2 overflow-x-auto pt-2.5 pb-0.5 scrollbar-none">
              {displayGallery.slice(0, 5).map((photo: string, pIdx: number) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setImg(photo)}
                  className={`relative shrink-0 h-12 w-16 overflow-hidden rounded-lg border-2 transition-all duration-200 bg-slate-950 ${(img || displayGallery[0]) === photo
                      ? "border-[var(--color-amber-dark)] ring-2 ring-[var(--color-amber)]/40 scale-95"
                      : "border-white/50 opacity-80"
                    }`}
                >
                  <img src={photo} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* ── 2. HERO CONTENT & FLOATING SIDEBAR CARD (GENEROUS DESKTOP GAPS & PADDING) ── */}
        <section className="bg-white py-4 sm:py-8 lg:py-16 xl:py-20 border-b border-[var(--color-line)] font-sans">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 xl:gap-16 items-start">

              {/* LEFT COLUMN: Main Info, Quick Stats, Overview & Features */}
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-6 lg:space-y-10 xl:space-y-12">

                {/* Header Title & Tag */}
                <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3 font-mono text-[11px] sm:text-sm font-bold uppercase tracking-wider text-[var(--color-mute)]">
                    <span className="rounded-md bg-[var(--color-bone)] border border-[var(--color-line)] px-2 py-0.5 lg:px-3 lg:py-1 text-[10px] sm:text-xs">
                      {product.tag || category}
                    </span>
                    <span>•</span>
                    <span>SKU: WP-{product.id.toUpperCase()}</span>
                  </div>

                  <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] font-display leading-tight">
                    {product.title}
                  </h1>

                  <p className="text-xs sm:text-base lg:text-lg text-[var(--color-mute)] leading-relaxed font-normal font-sans pt-1">
                    {product.blurb}
                  </p>
                </div>

                {/* Horizontal Quick Stats Bar (Spacious Desktop Padding & Rounded Corners) */}
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4 pt-1 lg:pt-2">
                  <div className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-3 lg:p-4 text-center space-y-0.5 lg:space-y-1">
                    <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto text-[var(--color-amber-dark)]" />
                    <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">Dispatch</div>
                    <div className="text-[10px] sm:text-sm lg:text-base font-extrabold text-[var(--color-ink)] font-sans truncate">24-48 HR</div>
                  </div>

                  <div className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-3 lg:p-4 text-center space-y-0.5 lg:space-y-1">
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto text-[var(--color-blue-deep)]" />
                    <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">QC</div>
                    <div className="text-[10px] sm:text-sm lg:text-base font-extrabold text-[var(--color-ink)] font-sans truncate">ISO 9001</div>
                  </div>

                  <div className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-3 lg:p-4 text-center space-y-0.5 lg:space-y-1">
                    <Factory className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto text-[var(--color-amber-dark)]" />
                    <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">Plant</div>
                    <div className="text-[10px] sm:text-sm lg:text-base font-extrabold text-[var(--color-ink)] font-sans truncate">100% In-House</div>
                  </div>

                  <div className="rounded-lg sm:rounded-xl lg:rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-1.5 sm:p-3 lg:p-4 text-center space-y-0.5 lg:space-y-1">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mx-auto text-[var(--color-blue-deep)]" />
                    <div className="text-[9px] sm:text-xs font-mono font-bold uppercase text-[var(--color-mute)]">Batch</div>
                    <div className="text-[10px] sm:text-sm lg:text-base font-extrabold text-[var(--color-ink)] font-sans truncate">COA Batch</div>
                  </div>
                </div>

                {/* Product Overview Section (Spacious Paragraph Spacing & Line Height on Desktop) */}
                <div className="space-y-2 lg:space-y-4 pt-3 lg:pt-6 border-t border-[var(--color-line)]">
                  <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold text-[var(--color-ink)] font-display">
                    Product Overview
                  </h2>
                  {product.longDesc && (
                    <div
                      className="text-xs sm:text-base lg:text-base text-[var(--color-mute)] leading-relaxed lg:leading-loose font-normal font-sans space-y-3 lg:space-y-5 [&_p]:text-xs [&_p]:sm:text-base [&_p]:lg:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_p]:lg:leading-loose [&_p]:font-sans [&_p]:font-normal [&_li]:text-xs [&_li]:sm:text-base [&_li]:lg:text-base [&_li]:text-[var(--color-mute)] [&_li]:font-sans [&_h1]:font-display [&_h1]:text-base [&_h1]:sm:text-xl [&_h1]:font-bold [&_h1]:text-[var(--color-ink)] [&_h2]:font-display [&_h2]:text-base [&_h2]:sm:text-xl [&_h2]:font-bold [&_h2]:text-[var(--color-ink)] [&_h3]:font-display [&_h3]:text-sm [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] max-w-none"
                      dangerouslySetInnerHTML={{ __html: marked.parse(product.longDesc) as string }}
                    />
                  )}
                </div>

                {/* What's Included / Key Features Section (Generous Desktop Grid Padding) */}
                <div className="space-y-3 lg:space-y-5 pt-3 lg:pt-6 border-t border-[var(--color-line)]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold text-[var(--color-ink)] font-display">
                      What's Included & Quality Guarantees
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-amber)]/20 border border-[var(--color-amber)]/40 px-2 py-0.5 lg:px-3 lg:py-1 text-[10px] sm:text-xs font-mono font-bold text-[var(--color-amber-dark)]">
                      ISO Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                    {[
                      { title: "FDA & WHO-GMP Compliant", icon: ShieldCheck },
                      { title: "Zero Downtime Tolerance", icon: Zap },
                      { title: "Full Traceability COA", icon: CheckCircle2 },
                      { title: "High Tensile Guarantee", icon: Factory },
                      { title: "Custom Gauge Options", icon: CheckCircle2 },
                      { title: "Engineering Support", icon: Zap },
                    ].map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-[var(--color-line)] bg-white px-3 py-2 lg:px-4 lg:py-3 text-[11px] sm:text-sm font-bold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber-dark)]/40 transition-colors"
                        >
                          <IconComp className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-[var(--color-amber-dark)] shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Sticky Product Specification Table Card (Generous Desktop Inner Padding & Row Height) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 font-sans">
                <div className="rounded-xl sm:rounded-3xl border border-[var(--color-line)] bg-white p-3.5 sm:p-6 lg:p-8 xl:p-10 shadow-md sm:shadow-lg lg:shadow-xl space-y-3 md:space-y-5 lg:space-y-7">

                  {/* Card Header & Badge */}
                  <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-2 md:pb-4 lg:pb-5">
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                        Technical Specifications
                      </span>
                      <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--color-ink)] font-display mt-0.5">
                        {product.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 sm:px-3 sm:py-1 lg:px-3.5 lg:py-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase text-amber-400 border border-amber-500/30">
                      ISO 9001
                    </span>
                  </div>

                  {/* Product Specifications Table */}
                  {specs.length > 0 ? (
                    <div className="overflow-x-auto scrollbar-none rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)]">
                      <table className="w-full text-left border-collapse min-w-[240px] font-sans">
                        <thead>
                          <tr className="border-b border-[var(--color-line)] bg-[var(--color-bone-2)]">
                            <th className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-3 lg:py-3.5 font-display text-[11px] sm:text-sm font-extrabold uppercase text-[var(--color-ink)] w-1/2">
                              Specification
                            </th>
                            <th className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-3 lg:py-3.5 font-display text-[11px] sm:text-sm font-extrabold uppercase text-[var(--color-ink)] w-1/2">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {specs.map((s: any, idx: number) => (
                            <tr
                              key={s.label}
                              className={`border-b border-[var(--color-line)] last:border-b-0 transition-colors ${idx % 2 === 1 ? "bg-white/70" : "bg-transparent"
                                }`}
                            >
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                {s.label}
                              </td>
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                {s.value}
                              </td>
                            </tr>
                          ))}
                          {product.options?.widths && (
                            <tr className="border-b border-[var(--color-line)] bg-white/70">
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                Widths
                              </td>
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                {product.options.widths.join(" · ")}
                              </td>
                            </tr>
                          )}
                          {product.options?.thicknesses && (
                            <tr className="border-b border-[var(--color-line)]">
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                Thickness
                              </td>
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                {product.options.thicknesses.join(" · ")}
                              </td>
                            </tr>
                          )}
                          {product.options?.colors && (
                            <tr className="border-b-0 bg-white/70">
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 font-mono text-[11px] sm:text-xs font-bold uppercase text-[var(--color-mute)]">
                                Colors
                              </td>
                              <td className="px-2.5 md:px-3.5 lg:px-4 py-1.5 md:py-2.5 lg:py-3 text-[11px] sm:text-sm font-semibold text-[var(--color-ink)] font-sans">
                                {product.options.colors.join(" · ")}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {/* Thickness & Length Standard Roll Matrix Table */}
                  {product.thicknessLengthMatrix && (
                    <div className="space-y-1 md:space-y-2 lg:space-y-3 pt-1 md:pt-2">
                      <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-ink)]">
                        <span>Standard Roll Yield Matrix</span>
                        <span className="text-[var(--color-amber-dark)] text-[10px] sm:text-xs">Micron → Length</span>
                      </div>
                      <div className="overflow-x-auto scrollbar-none rounded-lg sm:rounded-2xl border border-[var(--color-line)] bg-white shadow-2xs md:shadow-xs">
                        <table className="w-full text-center border-collapse text-[11px] sm:text-xs min-w-[220px]">
                          <thead>
                            <tr className="border-b border-[var(--color-line)] bg-[var(--color-bone-2)] font-mono text-[10px] sm:text-xs font-extrabold uppercase text-[var(--color-ink)]">
                              <th colSpan={2} className="px-1.5 md:px-3 lg:px-4 py-1.5 md:py-2.5 border-r border-[var(--color-line)] bg-[var(--color-amber)]/10 text-[var(--color-amber-dark)]">THICKNESS</th>
                              <th colSpan={2} className="px-1.5 md:px-3 lg:px-4 py-1.5 md:py-2.5 bg-[var(--color-blue-deep)]/10 text-[var(--color-blue-deep)]">LENGTH YIELD</th>
                            </tr>
                            <tr className="border-b border-[var(--color-line)] bg-[var(--color-mist)] font-mono text-[10px] sm:text-xs font-bold text-[var(--color-mute)]">
                              <th className="px-1.5 md:px-2.5 lg:px-3 py-1 border-r border-[var(--color-line)]">µm</th>
                              <th className="px-1.5 md:px-2.5 lg:px-3 py-1 border-r border-[var(--color-line)]">Gauge</th>
                              <th className="px-1.5 md:px-2.5 lg:px-3 py-1 border-r border-[var(--color-line)]">Meters</th>
                              <th className="px-1.5 md:px-2.5 lg:px-3 py-1">Feet</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.thicknessLengthMatrix.map((row: any, idx: number) => (
                              <tr
                                key={idx}
                                className={`border-b border-[var(--color-line)] last:border-b-0 font-mono text-[11px] sm:text-xs ${idx % 2 === 1 ? "bg-[var(--color-mist)]/50" : "bg-white"
                                  }`}
                              >
                                <td className="px-1.5 md:px-3 lg:px-4 py-1 md:py-2 lg:py-2.5 font-extrabold text-[var(--color-amber-dark)] border-r border-[var(--color-line)]">{row.micron}</td>
                                <td className="px-1.5 md:px-3 lg:px-4 py-1 md:py-2 lg:py-2.5 text-[var(--color-mute)] border-r border-[var(--color-line)]">{row.gauge}</td>
                                <td className="px-1.5 md:px-3 lg:px-4 py-1 md:py-2 lg:py-2.5 font-extrabold text-[var(--color-blue-deep)] border-r border-[var(--color-line)]">{row.meters}</td>
                                <td className="px-1.5 md:px-3 lg:px-4 py-1 md:py-2 lg:py-2.5 text-[var(--color-mute)]">{row.feet}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 md:pt-4 space-y-2 md:space-y-3 font-sans">
                    <Button to={`/contact?sku=${product.id}&title=${encodeURIComponent(product.title)}`} className="w-full justify-center min-h-[40px] md:min-h-[50px] lg:min-h-[54px] py-2.5 md:py-4 text-xs sm:text-sm lg:text-base font-bold shadow-xs md:shadow-md touch-manipulation font-sans">
                      Request Instant Custom Quote
                    </Button>
                    <Button to={`tel:${COMPANY.phoneHref}`} variant="outline" className="w-full justify-center min-h-[36px] md:min-h-[44px] lg:min-h-[46px] py-2 md:py-3 text-xs lg:text-sm font-bold touch-manipulation font-sans">
                      Call Sales: {COMPANY.phoneDisplay}
                    </Button>
                  </div>

                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ── 3. SUB-CATEGORIES SECTION (SPACIOUS DESKTOP CARD GRID) ── */}
        {product.subCategories && product.subCategories.length > 0 && (
          <Section className="bg-[var(--color-mist)] border-b border-[var(--color-line)] py-6 sm:py-12 lg:py-16 xl:py-20 font-sans">
            <Container>
              <div className="max-w-2xl mb-4 sm:mb-8 lg:mb-10">
                <Eyebrow>Product Sub-Categories</Eyebrow>
                <h2 className="mt-1 text-base sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[var(--color-ink)] font-display">
                  {product.title} Sub-Categories
                </h2>
              </div>

              {/* Side-by-side Grid with Generous Desktop Spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                {product.subCategories.map((sub: any) => (
                  <div
                    key={sub.id}
                    className="rounded-xl sm:rounded-2xl lg:rounded-3xl border border-[var(--color-line)] bg-white p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3 lg:space-y-5 font-sans"
                  >
                    <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                      {/* Compact Image */}
                      <div className="relative aspect-[2/1] sm:aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl border border-[var(--color-line)] bg-slate-950 shadow-inner group">
                        <img
                          src={sub.image}
                          alt={sub.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                          {sub.subtitle}
                        </span>
                        <h3 className="text-sm sm:text-lg lg:text-xl font-extrabold text-[var(--color-ink)] font-display mt-0.5 lg:mt-1">
                          {sub.title}
                        </h3>
                        <p className="text-xs sm:text-base lg:text-base text-[var(--color-mute)] leading-relaxed mt-1 sm:mt-1.5 line-clamp-3 font-sans font-normal">
                          {sub.blurb}
                        </p>
                      </div>

                      {/* Specs Table */}
                      {sub.specs && (
                        <div className="overflow-hidden scrollbar-none rounded-lg lg:rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)]">
                          <table className="w-full text-left border-collapse text-[11px] sm:text-xs font-sans table-fixed">
                            <tbody>
                              {Object.entries(sub.specs).slice(0, 4).map(([lbl, val]: any, sIdx: number) => (
                                <tr
                                  key={lbl}
                                  className={`border-b border-[var(--color-line)] last:border-b-0 ${sIdx % 2 === 1 ? "bg-white/60" : "bg-transparent"
                                    }`}
                                >
                                  <td className="px-2.5 lg:px-3 py-1.5 lg:py-2 font-mono font-bold uppercase text-[var(--color-mute)] w-2/5 text-[10px] sm:text-xs align-top">
                                    {lbl}
                                  </td>
                                  <td className="px-2.5 lg:px-3 py-1.5 lg:py-2 font-semibold text-[var(--color-ink)] w-3/5 break-words whitespace-normal font-sans text-[11px] sm:text-xs align-top">
                                    {val}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Compact Application tags */}
                      {sub.applications && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {sub.applications.slice(0, 3).map((app: string) => (
                            <span
                              key={app}
                              className="inline-flex items-center gap-1 rounded-md bg-[var(--color-bone)] border border-[var(--color-line)] px-2 py-0.5 lg:px-2.5 lg:py-1 text-[10px] sm:text-xs font-bold text-[var(--color-ink)] font-sans"
                            >
                              <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[var(--color-amber-dark)] shrink-0" />
                              <span className="truncate">{app}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 lg:pt-3">
                      <Button to={`/contact?sku=${product.id}&title=${encodeURIComponent(product.title)}&grade=${encodeURIComponent(sub.title)}`} className="w-full justify-center py-2 sm:py-2.5 lg:py-3 text-xs lg:text-sm font-bold font-sans">
                        Request Quote for {sub.title}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        <Section className="bg-[var(--color-mist)] py-8 lg:py-12">
          <Container>
            <div>
              <Link
                href="/products"
                className="link-underline inline-flex items-center gap-1.5 text-sm lg:text-base font-semibold text-[var(--color-blue-deep)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to full product line catalog
              </Link>
            </div>
          </Container>
        </Section>

        {/* ── 4. RELATED PRODUCTS (SPACIOUS DESKTOP SECTION PADDING) ── */}
        {related.length > 0 && (
          <Section className="bg-white pt-12 sm:pt-16 lg:pt-20 lg:pb-16 border-t border-[var(--color-line)]">
            <Container>
              <Eyebrow>Related Material Solutions</Eyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl lg:text-4xl font-display">
                Complementary Line Products
              </h2>
              <Stagger className="mt-8 lg:mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:gap-8 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
