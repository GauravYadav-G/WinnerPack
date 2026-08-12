"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Loader2, CheckCircle2, HelpCircle, ChevronDown } from "lucide-react";
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

function extractFaqs(longDesc?: string) {
  if (!longDesc) return [];
  const faqPatterns = [
    "### Frequently Asked Questions",
    "### FAQ",
    "#### 1. What",
    "#### 1. "
  ];
  let startIdx = -1;
  for (const pattern of faqPatterns) {
    const idx = longDesc.indexOf(pattern);
    if (idx !== -1 && (startIdx === -1 || idx < startIdx)) {
      startIdx = idx;
    }
  }
  if (startIdx === -1) return [];

  const faqText = longDesc.substring(startIdx);
  const regex = /####\s*(\d+\.\s*[^?\n]+\??)\n+([\s\S]*?)(?=(####\s*\d+\.|$))/g;
  const faqs: { question: string; answer: string }[] = [];
  let match;
  while ((match = regex.exec(faqText)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }
  return faqs;
}

function getLongDescWithoutFaq(longDesc?: string) {
  if (!longDesc) return "";
  const faqPatterns = [
    "### Frequently Asked Questions",
    "### FAQ",
    "#### 1. What",
    "#### 1. "
  ];
  let earliestIdx = -1;
  for (const pattern of faqPatterns) {
    const idx = longDesc.indexOf(pattern);
    if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
      earliestIdx = idx;
    }
  }
  if (earliestIdx === -1) return longDesc;
  return longDesc.substring(0, earliestIdx).trim();
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="pt-10 border-t border-[var(--color-line)] space-y-6 font-sans">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-[var(--color-amber-dark)] shrink-0" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
            Frequently Asked Questions
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-mute)]">
          Find comprehensive answers to common questions about materials, customization, standards, and packaging applications.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = openIdx === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-[var(--color-amber)] bg-white shadow-md ring-1 ring-[var(--color-amber)]/30"
                  : "border-[var(--color-line)] bg-[var(--color-mist)] hover:border-slate-300"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 font-sans font-bold text-sm sm:text-base text-[var(--color-ink)] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center h-7 w-7 rounded-lg text-xs font-mono font-black shrink-0 transition-colors ${
                    isOpen ? "bg-[var(--color-amber)] text-[var(--color-blue-deep)]" : "bg-slate-200 text-slate-700"
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-[var(--color-amber)]/20 text-[var(--color-amber-dark)]" : "text-slate-400"
                }`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 text-xs sm:text-sm text-[var(--color-mute)] leading-relaxed border-t border-slate-100 font-sans">
                  <div
                    className="space-y-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-xs [&_li]:sm:text-sm [&_strong]:text-[var(--color-ink)]"
                    dangerouslySetInnerHTML={{ __html: marked.parse(faq.answer) as string }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");

  // Maps navbar subcategory slugs → actual product ID in fallback-data
  const aliasMap: Record<string, string> = {
    // Film Products 11 Main Categories
    "packaging-films":      "packaging-films",
    "pof-shrink-film":      "pof-shrink-film",
    "lamination-pe-film":   "lamination-pe-film",
    "agricultural-films":   "agricultural-films",
    "biodegradable-films":  "biodegradable-films",
    "flexible-laminates":   "flexible-laminates",
    "printed-pe-films":     "printed-pe-films",
    "stretch-film":         "stretch-film",
    "ldpe-bags":            "ldpe-bags",
    "bopp-films":           "bopp-films",
    "pvc-shrink-films":     "pvc-shrink-films",
    // Labels & Stickers
    "plain-labels":         "plain-labels",
    "printed-labels":       "printed-labels",
    "barcode-labels":       "barcode-labels",
    "product-labels":       "product-labels",
    "self-adhesive-labels": "self-adhesive-labels",
    "thermal-labels":       "thermal-labels",
    // Tapes
    "bopp-tapes":           "bopp-tapes",
    "printed-tapes":        "printed-bopp-tapes",
    "colored-tapes":        "coloured-bopp-tapes",
    "masking-tapes":        "silicon-tapes",
    // PP & PET Strap
    "pp-strap":             "pp-strap",
    "printed-pp-strap":     "printed-pp-strap",
    "colored-pp-strap":     "colored-pp-strap",
    "pet-strap":            "pet-strap",
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
        const fallback = initialProducts.find((p) => p.id === targetId || p.id === id);
        const mergedData = {
          ...data,
          subCategories: (Array.isArray(data.subCategories) && data.subCategories.length > 0)
            ? data.subCategories
            : fallback?.subCategories || [],
        };
        setProduct(mergedData);
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
                gallery: sub.gallery || [sub.image || parentWithSub.image],
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





  const fallbackParent = initialProducts.find((p) => p.id === product.id || p.id === id || p.id === targetId);
  const displaySubCategories = (Array.isArray(product.subCategories) && product.subCategories.length > 0)
    ? product.subCategories
    : fallbackParent?.subCategories || [];

  const isParentProduct = Boolean(
    displaySubCategories.length > 0 ||
    product.id === "pof-shrink-film" ||
    product.id === "packaging-films" ||
    product.id === "plastic-stretch-film" ||
    product.id === "lamination-films-pouches" ||
    product.id === "lamination-pe-film" ||
    product.id === "film-products"
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
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] overflow-hidden bg-[var(--color-blue-deep)] flex items-center justify-center border-b border-white/10">
              <div className="absolute inset-0">
                <OptimizedImage
                  src={product.headerImage || "/images/desktop/portfolio/action_extrusion_tower_blue.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover object-center opacity-75 sm:opacity-85 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/65 via-[var(--color-blue-deep)]/45 to-[var(--color-ink)]/65 pointer-events-none" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-display drop-shadow-lg">
                  {product.title}
                </h1>

                <nav aria-label="Breadcrumb" className="pt-1">
                  <ol className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-white/90 drop-shadow-md">
                    <li><Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/50" /></li>
                    <li><Link href="/products" className="hover:text-[var(--color-amber)] transition-colors">Products</Link></li>
                    {category && (
                      <>
                        <li><ChevronRight className="h-3 w-3 text-white/50" /></li>
                        <li><Link href={`/product-category/${product.category}`} className="hover:text-[var(--color-amber)] transition-colors">{category}</Link></li>
                      </>
                    )}
                    <li><ChevronRight className="h-3 w-3 text-white/50" /></li>
                    <li className="font-bold text-[var(--color-amber)]">{product.title}</li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* 2. PROMINENT SUBCATEGORY CARDS IN WINNERPACK ROYAL NAVY & AMBER THEME */}
            {displaySubCategories.length > 0 && (
              <section className="bg-[var(--color-mist)] py-8 sm:py-12 md:py-14 border-b border-[var(--color-line)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                    {displaySubCategories.map((sub: any) => (
                      <div
                        key={sub.id || sub.title}
                        className="bg-[var(--color-ink)] text-white rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl p-5 sm:p-7 flex flex-col justify-between group hover:border-[var(--color-amber)]/40 transition-all duration-300"
                      >
                        <div className="space-y-4 sm:space-y-5">
                          <Link href={`/products/${sub.id || sub.slug || product.id}`} className="block bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 aspect-[16/10] overflow-hidden flex items-center justify-center">
                            <OptimizedImage
                              src={sub.image || product.image || "/images/products/specialty-pouches/image.png"}
                              alt={sub.title}
                              className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                            />
                          </Link>

                          <div>
                            <Link href={`/products/${sub.id || sub.slug || product.id}`} className="block hover:text-[var(--color-amber)] transition-colors">
                              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight">
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
                                  <span><strong className="text-white">{lbl}:</strong> {String(val)}</span>
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
                    className="space-y-3.5 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_p]:my-1.5 [&_h2]:font-display [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-ink)] [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-[var(--color-line)] [&_h3]:font-display [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:pt-2 [&_h3]:border-t [&_h3]:border-[var(--color-line)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-2.5 [&_li]:text-xs [&_li]:sm:text-sm [&_li]:text-[var(--color-ink)] [&_li]:marker:text-[var(--color-amber-dark)] [&_li]:marker:font-bold [&_li_p]:my-0 [&_li_p]:inline [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-2.5"
                    dangerouslySetInnerHTML={{ __html: marked.parse(getLongDescWithoutFaq(product.longDesc)) as string }}
                  />
                ) : (
                  <p>{product.blurb}</p>
                )}

                {/* Key Performance Applications */}
                {Array.isArray(product.applications) && product.applications.length > 0 && (
                  <div className="pt-4 border-t border-[var(--color-line)]">
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-[var(--color-ink)] mb-4">
                      Key Performance Applications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.applications.map((benefit: string, bIdx: number) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber)]/50 transition-colors"
                        >
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-amber-dark)] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DEDICATED FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
                <FaqSection faqs={extractFaqs(product.longDesc)} />

              </div>
            </section>
          </>
        ) : (
          /* ── CASE 2: SUB-PRODUCT / SPECIFIC DETAIL PAGE (2-COLUMN WITH "OUR PRODUCTS" SIDEBAR) ── */
          <>
            {/* HERO BANNER */}
            <div className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] overflow-hidden bg-[var(--color-blue-deep)] flex items-center justify-center border-b border-white/10">
              <div className="absolute inset-0">
                <OptimizedImage
                  src={product.headerImage || "/images/desktop/portfolio/action_extrusion_tower_blue.jpg"}
                  alt={product.title}
                  className="w-full h-full object-cover object-center opacity-75 sm:opacity-85 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/65 via-[var(--color-blue-deep)]/45 to-[var(--color-ink)]/65 pointer-events-none" />
              </div>

              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-2">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-display drop-shadow-lg">
                  {product.title}
                </h1>

                <nav aria-label="Breadcrumb" className="pt-1">
                  <ol className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-white/90 drop-shadow-md">
                    <li><Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/50" /></li>
                    <li><Link href="/products" className="hover:text-[var(--color-amber)] transition-colors">Products</Link></li>
                    <li><ChevronRight className="h-3 w-3 text-white/50" /></li>
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
                                      className={`flex items-center justify-between py-0.5 text-xs sm:text-[13px] font-bold font-display tracking-tight transition-colors ${
                                        isDirectSubcat
                                          ? "text-[var(--color-ink)] font-black"
                                          : isCurrentSubcat
                                          ? "text-[var(--color-blue-deep)] font-extrabold"
                                          : "text-[var(--color-ink)] hover:text-[var(--color-amber-dark)]"
                                      }`}
                                    >
                                      <span>{subcat.title}</span>
                                      {isDirectSubcat && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber-dark)] shrink-0 ml-1.5" />
                                      )}
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
                                              className={`flex items-center justify-between py-0.5 px-1.5 rounded-md text-xs font-sans transition-colors ${
                                                isActive
                                                  ? "font-extrabold text-[var(--color-ink)]"
                                                  : "text-[var(--color-mute)] hover:text-[var(--color-ink)]"
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
                    
                    {/* Top Featured Full-Width Rectangle Product Image (Taller Card Height) */}
                    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-md">
                      <div className="aspect-[16/13] sm:aspect-[16/12] w-full overflow-hidden">
                        <OptimizedImage
                          src={img || product.image || "/images/products/specialty-pouches/image.png"}
                          alt={product.title}
                          className="w-full h-full object-cover object-center transition-all duration-300"
                        />
                      </div>
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
                          className="space-y-3.5 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_p]:my-1.5 [&_h2]:font-display [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-ink)] [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-[var(--color-line)] [&_h3]:font-display [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:pt-2 [&_h3]:border-t [&_h3]:border-[var(--color-line)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-2.5 [&_li]:text-xs [&_li]:sm:text-sm [&_li]:text-[var(--color-ink)] [&_li]:marker:text-[var(--color-amber-dark)] [&_li]:marker:font-bold [&_li_p]:my-0 [&_li_p]:inline [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-2.5"
                          dangerouslySetInnerHTML={{ __html: marked.parse(getLongDescWithoutFaq(product.longDesc)) as string }}
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

                    {/* Technical Specifications Table */}
                    {specs.length > 0 && (
                      <div className="pt-6 border-t border-[var(--color-line)] space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-5 w-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                            Technical Specifications
                          </h2>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] shadow-xs">
                          <table className="w-full border-collapse text-xs sm:text-sm font-sans">
                            <thead>
                              <tr className="bg-[var(--color-ink)] text-white">
                                <th className="px-4 py-3 text-left font-bold tracking-wide w-2/5 border-r border-white/10">Specification</th>
                                <th className="px-4 py-3 text-left font-bold tracking-wide">Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {specs.map((s: any, idx: number) => (
                                <tr
                                  key={s.label}
                                  className={`border-b border-[var(--color-line)] last:border-b-0 transition-colors hover:bg-[var(--color-amber)]/5 ${
                                    idx % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                  }`}
                                >
                                  <td className="px-4 py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top">
                                    {s.label}
                                  </td>
                                  <td className="px-4 py-3 text-[var(--color-mute)] align-top">{s.value}</td>
                                </tr>
                              ))}
                              {product.options?.widths && (
                                <tr className={`border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-amber)]/5 ${
                                  specs.length % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                }`}>
                                  <td className="px-4 py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top">Available Widths</td>
                                  <td className="px-4 py-3 text-[var(--color-mute)] align-top">{product.options.widths.join(" · ")}</td>
                                </tr>
                              )}
                              {product.options?.thicknesses && (
                                <tr className={`border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-amber)]/5 ${
                                  (specs.length + (product.options?.widths ? 1 : 0)) % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                }`}>
                                  <td className="px-4 py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top">Thickness Options</td>
                                  <td className="px-4 py-3 text-[var(--color-mute)] align-top">{product.options.thicknesses.join(" · ")}</td>
                                </tr>
                              )}
                              {product.options?.colors && (
                                <tr className={`border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-amber)]/5 ${
                                  (specs.length + (product.options?.widths ? 1 : 0) + (product.options?.thicknesses ? 1 : 0)) % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                }`}>
                                  <td className="px-4 py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top">Colors Available</td>
                                  <td className="px-4 py-3 text-[var(--color-mute)] align-top">{product.options.colors.join(" · ")}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}



                    {/* DEDICATED FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
                    <FaqSection faqs={extractFaqs(product.longDesc)} />

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
