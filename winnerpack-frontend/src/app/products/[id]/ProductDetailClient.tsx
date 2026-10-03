"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Loader2, CheckCircle2, HelpCircle, ChevronDown } from "lucide-react";
import { productCategories } from "../../../data";
import { Eyebrow } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import CTABanner from "@/components/CTABanner";

// Layout components
import Navbar, { plasticStretchFilmItems as STRETCH_FILM_ITEMS, productHierarchy } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import { PageHeader } from "@/components/ui/PageHeader";

import { apiFetch } from "@/lib/api";
import { renderSafeMarkdown } from "@/utils/markdown";
import { initialProducts } from "@/lib/fallback-data";
import OptimizedImage from '@/components/OptimizedImage';
import ProductInquiryModal from "@/components/ProductInquiryModal";
import { PRODUCT_IMAGE_MAP } from "@/components/ProductCard";
import { extractProductFaqsFromContent, stripStructuredProductSections } from "@/utils/product-content";

type ProductFaq = { question: string; answer: string };

function getProductFaqs(product: { id?: string; longDesc?: string; faqs?: ProductFaq[] }): ProductFaq[] {
  if (Array.isArray(product.faqs) && product.faqs.length > 0) return product.faqs;
  return extractProductFaqsFromContent(product.longDesc);
}

function getProductDetailContent(product: { id?: string; longDesc?: string }) {
  return stripStructuredProductSections(product.longDesc);
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [showAllMobile, setShowAllMobile] = useState(false);

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
      </div>

      <div className="space-y-3 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = openIdx === index;
          const isHiddenOnMobile = index >= 3 && !showAllMobile;

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isHiddenOnMobile ? "hidden sm:block" : "block"
                } ${isOpen
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
                  <span className={`flex items-center justify-center h-7 w-7 rounded-lg text-xs font-mono font-black shrink-0 transition-colors ${isOpen ? "bg-[var(--color-amber)] text-[var(--color-blue-deep)]" : "bg-slate-200 text-slate-700"
                    }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[var(--color-amber)]/20 text-[var(--color-amber-dark)]" : "text-slate-400"
                  }`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 text-xs sm:text-sm text-[var(--color-mute)] leading-relaxed border-t border-slate-100 font-sans">
                  <div
                    className="space-y-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-xs [&_li]:sm:text-sm [&_strong]:text-[var(--color-ink)]"
                    dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(faq.answer) }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Show Remaining FAQs Button with Arrow Key */}
      {faqs.length > 3 && (
        <div className="pt-2 text-center sm:hidden">
          <button
            type="button"
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-blue-deep)] shadow-2xs active:bg-slate-50 transition-all"
          >
            <span>{showAllMobile ? "Show fewer FAQs" : `View all ${faqs.length} FAQs`}</span>
            <ChevronDown className={`h-4 w-4 text-[var(--color-amber-dark)] transition-transform duration-300 ${showAllMobile ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );
}

function getSubcategoryImages(sub: any, parentProduct: any) {
  const images: string[] = [];

  const addImg = (img?: string) => {
    if (img && typeof img === "string" && img !== "/images/products/stretch-film/image.webp" && !images.includes(img)) {
      images.push(img);
    }
  };

  const subId = sub.id || sub.slug;
  if (subId && PRODUCT_IMAGE_MAP[subId]) {
    addImg(PRODUCT_IMAGE_MAP[subId]);
  }

  // 1. Direct sub image
  addImg(sub.image);

  // 2. Direct sub gallery
  if (Array.isArray(sub.gallery)) {
    sub.gallery.forEach((i: string) => addImg(i));
  }

  // 3. Child product lookup in initialProducts
  const childProd = initialProducts.find(
    (p: any) => p.id === subId || p.id === sub.id || p.title?.toLowerCase() === sub.title?.toLowerCase()
  );

  if (childProd) {
    if (PRODUCT_IMAGE_MAP[childProd.id]) {
      addImg(PRODUCT_IMAGE_MAP[childProd.id]);
    }
    addImg(childProd.image);
    if (Array.isArray(childProd.gallery)) {
      childProd.gallery.forEach((i: string) => addImg(i));
    }
    if (Array.isArray(childProd.subCategories)) {
      childProd.subCategories.forEach((cs: any) => {
        if (PRODUCT_IMAGE_MAP[cs.id]) {
          addImg(PRODUCT_IMAGE_MAP[cs.id]);
        }
        addImg(cs.image);
        if (Array.isArray(cs.gallery)) {
          cs.gallery.forEach((i: string) => addImg(i));
        }
      });
    }
  }

  // Fallback to sub.image or parentProduct image
  if (images.length === 0) {
    images.push(
      PRODUCT_IMAGE_MAP[subId] ||
      sub.image ||
      PRODUCT_IMAGE_MAP[parentProduct?.id] ||
      parentProduct?.image ||
      "/images/products/specialty-pouches/image.webp"
    );
  }

  return images;
}

function SubcategoryCardImageGallery({ images, title }: { images: string[]; title: string; categoryName?: string }) {
  const currentImg = images[0] || "/images/products/specialty-pouches/image.webp";

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
      <OptimizedImage
        src={currentImg}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const isNavbarProduct = productHierarchy.some((category) =>
    category.subcategories.some(
      (subcategory) =>
        subcategory.slug === id ||
        subcategory.items.some((item) => item.slug === id)
    )
  ) || STRETCH_FILM_ITEMS.some((item) => item.slug === id);
  if (!isNavbarProduct) notFound();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Maps navbar subcategory slugs → actual product ID in fallback-data
  const aliasMap: Record<string, string> = {
    // Film Products 11 Main Categories
    "packaging-films": "packaging-films",
    "pof-shrink-film": "pof-shrink-film",
    "lamination-pe-film": "lamination-pe-film",
    "agricultural-films": "agricultural-films",
    "biodegradable-films": "biodegradable-films",
    "flexible-laminates": "flexible-laminates",
    "printed-pe-films": "printed-pe-films",
    "stretch-film": "plastic-stretch-film",
    "ldpe-bags": "ldpe-bags",
    "bopp-films": "bopp-films",
    "pvc-shrink-films": "pvc-shrink-films",
    // Labels & Stickers
    "plain-labels": "plain-labels",
    "printed-labels": "printed-labels",
    "barcode-labels": "barcode-labels",
    "product-labels": "product-labels",
    "self-adhesive-labels": "self-adhesive-labels",
    "thermal-labels": "thermal-labels",
    "hologram-stickers": "hologram-stickers",
    "security-void-stickers": "security-void-stickers",
    "tamper-evident-stickers": "tamper-evident-stickers",
    "thermal-transfer-ribbons": "thermal-transfer-ribbons",
    // Tapes
    "bopp-tapes": "bopp-tapes",
    "printed-tapes": "printed-bopp-tapes",
    "colored-tapes": "coloured-bopp-tapes",
    "masking-tapes": "silicon-tapes",
    // PP & PET Strap
    "pp-strap": "pp-strap",
    "printed-pp-strap": "printed-pp-strap",
    "colored-pp-strap": "colored-pp-strap",
    "pet-strap": "pet-strap",
  };
  const targetId = aliasMap[id] ?? id;

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiFetch(`/api/products/${targetId}`, { signal: controller.signal, cache: "no-store" })
      .then(async (productResponse) => {
        if (productResponse.status === 404) {
          if (!controller.signal.aborted) {
            setProduct(null);
            setLoading(false);
          }
          return null;
        }
        if (!productResponse.ok) throw new Error("Product not found");
        return productResponse.json();
      })
      .then((data) => {
        if (controller.signal.aborted || !data) return;
        setProduct(data);
        setImg(data.gallery?.[0] || data.image || "");

        setLoading(false);
      })
      .catch((error) => {
        if (controller.signal.aborted || error.name === "AbortError") return;
        let fallbackProduct = initialProducts.find((p) => p.id === targetId || p.id === id);
        if (!fallbackProduct) {
          const parentWithSub = initialProducts.find((p) =>
            p.subCategories?.some((s: any) => s.id === targetId || s.id === id || s.slug === targetId || s.slug === id)
          );
          if (parentWithSub && parentWithSub.subCategories) {
            const sub: any = parentWithSub.subCategories.find((s: any) => s.id === targetId || s.id === id || s.slug === targetId || s.slug === id);
            if (sub) {
              const mappedSubImg = PRODUCT_IMAGE_MAP[sub.id] || PRODUCT_IMAGE_MAP[sub.slug] || sub.image;
              fallbackProduct = {
                id: sub.id || id,
                title: sub.title,
                category: parentWithSub.category,
                tag: sub.subtitle || parentWithSub.tag,
                blurb: sub.blurb || parentWithSub.blurb,
                longDesc: sub.longDesc || sub.blurb || parentWithSub.longDesc,
                image: mappedSubImg || parentWithSub.image,
                gallery: sub.gallery || [mappedSubImg || parentWithSub.image],
                specs: sub.specs || parentWithSub.specs,
                applications: sub.applications || parentWithSub.applications,
              } as any;
            }
          }
        }

        if (fallbackProduct) {
          const mappedImg = PRODUCT_IMAGE_MAP[targetId] || PRODUCT_IMAGE_MAP[id] || PRODUCT_IMAGE_MAP[fallbackProduct.id];
          if (mappedImg) {
            fallbackProduct = {
              ...fallbackProduct,
              image: mappedImg,
              gallery: fallbackProduct.gallery ? [mappedImg, ...fallbackProduct.gallery.filter((g: string) => g !== mappedImg)] : [mappedImg],
            };
          }
          setProduct(fallbackProduct);
          setImg(mappedImg || fallbackProduct.gallery?.[0] || fallbackProduct.image || "");
        } else {
          setProduct(null);
        }
        setLoading(false);
      });

    return () => controller.abort();
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

  const isStretchFilmRoute =
    id === "plastic-stretch-film" ||
    product.id === "plastic-stretch-film" ||
    STRETCH_FILM_ITEMS.some((item) => item.slug === id || item.slug === product.id);

  const currentHierarchyCategory =
    (isStretchFilmRoute
      ? productHierarchy.find((hierarchyCategory) => hierarchyCategory.id === "film-products")
      : null) ||
    productHierarchy.find((hierarchyCategory) =>
      hierarchyCategory.subcategories.some(
        (sub) =>
          sub.slug === product.id ||
          sub.slug === id ||
          sub.id === product.id ||
          sub.items.some((it) => it.slug === product.id || it.slug === id)
      )
    ) ||
    productHierarchy.find(
      (hierarchyCategory) =>
        hierarchyCategory.id === product.category ||
        hierarchyCategory.catSlug === product.category
    ) ||
    (product.category === "pallet-wrapping" || product.category === "protective"
      ? productHierarchy.find((h) => h.id === "film-products")
      : null) ||
    productHierarchy[0];

  const categoryObj =
    productCategories.find((c) => c.id === currentHierarchyCategory?.id) ||
    productCategories.find((c) => c.id === product.category) ||
    productCategories[0];
  const category = categoryObj?.title || "Film Products";

  const isLabelProduct = currentHierarchyCategory?.id === "label-sticker-products" || product.category === "label-sticker-products";
  const isFilmProduct = Boolean(
    currentHierarchyCategory?.id === "film-products" ||
    product.category === "film-products" ||
    product.category === "pallet-wrapping" ||
    product.category === "protective" ||
    product.id === "pof-shrink-film" ||
    product.id === "packaging-films" ||
    product.id === "plastic-stretch-film" ||
    STRETCH_FILM_ITEMS.some((st) => st.slug === product.id || st.slug === id) ||
    product.id === "lamination-pe-film" ||
    product.id === "film-products"
  );
  const labelParent = isLabelProduct
    ? initialProducts.find((parent) => parent.subCategories?.some((sub: any) => sub.id === product.id))
    : undefined;
  const directProductFaqs = getProductFaqs(product);
  const productFaqs = directProductFaqs.length > 0 ? directProductFaqs : (labelParent ? getProductFaqs(labelParent) : []);
  const directProductDetailContent = getProductDetailContent(product);
  const productDetailContent = directProductDetailContent || (labelParent ? getProductDetailContent(labelParent) : "");

  const specs = product.specs ? Object.entries(product.specs).map(([label, value]: any) => ({
    label,
    value,
  })) : [];





  const fallbackParent = initialProducts.find((p) => p.id === product.id || p.id === id || p.id === targetId);
  const displaySubCategories = (Array.isArray(product.subCategories) && product.subCategories.length > 0)
    ? product.subCategories
    : fallbackParent?.subCategories || [];

  const FILM_PARENT_IDS = new Set([
    "packaging-films",
    "pof-shrink-film",
    "plastic-stretch-film",
    "lamination-pe-film",
    "agricultural-films",
    "biodegradable-films",
    "flexible-laminates",
    "flexible-laminate-rolls",
    "printed-pe-films",
    "ldpe-bags",
    "bopp-films",
    "pvc-shrink-films",
    "film-products",
    "ldpe-films-pouches",
    "coloured-films-pouches"
  ]);

  const isParentProduct = Boolean(
    (product?.id && FILM_PARENT_IDS.has(product.id) && displaySubCategories.length > 0) ||
    product?.id === "film-products"
  );

  return (
    <div className="min-h-screen bg-[#fafafb] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* ── CASE 1: PARENT PRODUCT / CATEGORY PAGE WITH PROMINENT SUBCATEGORY CARDS ── */}
        {isParentProduct ? (
          <>
            {/* 1. UNIFIED PAGE HEADER MATCHING ALL OTHER PAGES */}
            <PageHeader
              eyebrow="Product Line"
              title={product.title}
              intro={product.blurb}
              align="left"
            />

            {/* 2. PROMINENT SUBCATEGORY / IN-PAGE VARIANTS SECTION */}
            {displaySubCategories.length > 0 && (
              <section id="variants" className="bg-slate-50 py-10 sm:py-14 md:py-16 border-b border-[var(--color-line)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)] mb-1.5 block">
                      {isFilmProduct ? "Industrial Line Navigation" : "Product Variations & Specifications"}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                      {isFilmProduct ? "Explore Industrial Line Options" : "Available Formats & Types"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 items-stretch">
                    {displaySubCategories.map((sub: any) => {
                      const subImages = getSubcategoryImages(sub, product);
                      const subSlug = sub.id || sub.slug || product.id;

                      if (isFilmProduct) {
                        // Film products navigate to subcategory pages
                        return (
                          <div
                            key={sub.id || sub.title}
                            className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-blue-3)]/50 hover:shadow-xl active:scale-[0.99] sm:active:scale-100"
                          >
                            <Link href={`/products/${subSlug}`} className="block relative">
                              <SubcategoryCardImageGallery images={subImages} title={sub.title} categoryName={category || product.title} />
                            </Link>

                            <div className="flex flex-1 flex-col justify-between p-3 sm:p-6">
                              <div>
                                <Link href={`/products/${subSlug}`} className="block">
                                  <h3 className="font-display text-xs sm:text-xl font-extrabold text-slate-900 group-hover:text-[var(--color-blue)] transition-colors tracking-tight leading-snug line-clamp-2 sm:line-clamp-none">
                                    {sub.title}
                                  </h3>
                                </Link>

                                {sub.blurb && (
                                  <p className="hidden sm:block mt-1 sm:mt-2 text-sm text-slate-600 leading-relaxed font-sans font-normal">
                                    {sub.blurb}
                                  </p>
                                )}

                                {sub.specs && (
                                  <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2 hidden sm:block">
                                    {Object.entries(sub.specs).slice(0, 4).map(([lbl, val]: any) => (
                                      <div key={lbl} className="flex items-start justify-between gap-2.5 text-xs">
                                        <span className="font-semibold text-slate-900 shrink-0">{lbl}:</span>
                                        <span className="font-medium text-slate-600 text-right leading-tight">{String(val)}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="mt-2 pt-2 sm:mt-5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-1 sm:gap-2">
                                <Link
                                  href={`/products/${subSlug}`}
                                  className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] sm:text-[var(--color-blue)] hover:text-[var(--color-blue-2)] transition-colors min-h-[28px] sm:min-h-[40px]"
                                >
                                  <span>Explore range</span>
                                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--color-amber-dark)]" />
                                </Link>
                                <Link
                                  href={`/contact?sku=${subSlug}&title=${encodeURIComponent(sub.title)}`}
                                  className="hidden sm:inline-flex items-center justify-center rounded-full bg-[var(--color-blue-soft)] px-4 py-1.5 text-xs font-bold text-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-white transition-all shadow-2xs"
                                >
                                  Quote
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Labels & Stickers / Tapes: In-page variant cards with full description and instant inquiry trigger
                      return (
                        <div
                          key={sub.id || sub.title}
                          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-amber)]/50 hover:shadow-xl"
                        >
                          <div className="relative">
                            <SubcategoryCardImageGallery images={subImages} title={sub.title} categoryName={category || product.title} />
                          </div>

                          <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                            <div>
                              <h3 className="font-display text-base sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                {sub.title}
                              </h3>

                              {sub.subtitle && (
                                <p className="text-xs font-semibold text-[var(--color-amber-dark)] mt-1">
                                  {sub.subtitle}
                                </p>
                              )}

                              {sub.blurb && (
                                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                                  {sub.blurb}
                                </p>
                              )}

                              {sub.specs && (
                                <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
                                  {Object.entries(sub.specs).slice(0, 5).map(([lbl, val]: any) => (
                                    <div key={lbl} className="flex items-start justify-between gap-2.5 text-xs">
                                      <span className="font-semibold text-slate-900 shrink-0">{lbl}:</span>
                                      <span className="font-medium text-slate-600 text-right leading-tight">{String(val)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {Array.isArray(sub.applications) && sub.applications.length > 0 && (
                                <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                                  {sub.applications.map((app: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
                                    >
                                      {app}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setIsInquiryOpen(true)}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-amber-dark)] hover:text-[var(--color-amber)] transition-colors min-h-[36px] cursor-pointer"
                              >
                                <span>Inquire for this specification</span>
                                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              </button>
                              <Link
                                href={`/contact?sku=${product.id}&title=${encodeURIComponent(`${product.title} - ${sub.title}`)}`}
                                className="inline-flex items-center justify-center rounded-full bg-[var(--color-amber-soft)] px-3.5 py-1.5 text-xs font-bold text-[var(--color-amber-dark)] hover:bg-[var(--color-amber)] hover:text-white transition-all shadow-2xs"
                              >
                                Quote
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
                    {isLabelProduct
                      ? `${product.title} should be specified around the application surface, print method, adhesive, handling conditions, and required label life. A sample application is the reliable way to confirm performance before a production run.`
                      : `${product.title} is a versatile packaging component used across industrial sectors to safeguard goods during handling, storage, and transport. Final performance depends on the selected material, dimensions, and operating conditions.`}
                  </p>
                </div>

                {product.longDesc ? (
                  <div
                    className="space-y-3.5 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_p]:my-1.5 [&_h2]:font-display [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-ink)] [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-[var(--color-line)] [&_h3]:font-display [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:pt-2 [&_h3]:border-t [&_h3]:border-[var(--color-line)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-2.5 [&_li]:text-xs [&_li]:sm:text-sm [&_li]:text-[var(--color-ink)] [&_li]:marker:text-[var(--color-amber-dark)] [&_li]:marker:font-bold [&_li_p]:my-0 [&_li_p]:inline [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-2.5"
                    dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(productDetailContent) }}
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
                <FaqSection faqs={productFaqs} />

              </div>
            </section>
          </>
        ) : (
          /* ── CASE 2: SUB-PRODUCT / SPECIFIC DETAIL PAGE (2-COLUMN WITH "OUR PRODUCTS" SIDEBAR) ── */
          <>
            {/* 1. UNIFIED PAGE HEADER MATCHING ALL OTHER PAGES */}
            <PageHeader
              eyebrow={category}
              title={product.title}
              intro={product.blurb}
              align="left"
            >
              <div className="hidden sm:flex flex-row items-center justify-start gap-3 pt-2 w-auto">
                <Button type="button" onClick={() => setIsInquiryOpen(true)} variant="secondary" iconRight className="rounded-xl px-5 py-3 text-sm font-extrabold shadow-lg shadow-black/20 justify-center min-h-[44px]">
                  Request a Quote
                </Button>
                <a href="#product-specifications" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 text-center flex items-center justify-center min-h-[44px]">
                  View Specifications
                </a>
              </div>
            </PageHeader>

            {/* 2-COLUMN MAIN CONTENT (SIDEBAR + DETAILED CONTENT) */}
            <div className="bg-white py-10 sm:py-14 md:py-16 border-b border-[var(--color-line)] font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                  {/* LEFT SIDEBAR: "OUR PRODUCTS" (MOBILE TOUCH-OPTIMIZED COLLAPSIBLE & DESKTOP FIXED) */}
                  <aside className="w-full lg:hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-4 shadow-2xs">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-amber-dark)]">Product range</p>
                        <h2 className="mt-0.5 font-display text-base font-extrabold text-[var(--color-ink)]">{category}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                          className="px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-blue-deep)] flex items-center gap-1.5 shadow-2xs active:scale-95"
                        >
                          <span>{isMobileNavOpen ? "Hide catalog" : "Explore catalog"}</span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isMobileNavOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Mobile Category Menu */}
                    {isMobileNavOpen && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-line)] space-y-4 max-h-[350px] overflow-y-auto scrollbar-none pr-1">
                        {currentHierarchyCategory && (
                          <div className="space-y-2">
                            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                              {currentHierarchyCategory.title}
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {currentHierarchyCategory.subcategories.map((subcat) => {
                                const isStretchOption = STRETCH_FILM_ITEMS.some((st) => st.slug === product.id || st.slug === id);
                                const isActive = subcat.slug === product.id || subcat.slug === id || (subcat.slug === "plastic-stretch-film" && isStretchOption);
                                return (
                                  <Link
                                    key={subcat.id}
                                    href={`/products/${subcat.slug}`}
                                    onClick={() => setIsMobileNavOpen(false)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-display truncate transition-colors ${isActive
                                      ? "bg-[var(--color-blue-deep)] text-white"
                                      : "bg-white text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-slate-50"
                                      }`}
                                  >
                                    {subcat.title}
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Mobile Stretch Film Related Fields */}
                            {(product.id === "plastic-stretch-film" || id === "plastic-stretch-film" || STRETCH_FILM_ITEMS.some((st) => st.slug === product.id || st.slug === id)) && (
                              <div className="mt-3 pt-2.5 border-t border-slate-200">
                                <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)] mb-1.5">
                                  Plastic Stretch Film Options
                                </span>
                                <div className="grid grid-cols-2 gap-1.5">
                                  {STRETCH_FILM_ITEMS.map((st) => {
                                    const isStActive = st.slug === product.id || st.slug === id;
                                    return (
                                      <Link
                                        key={st.slug}
                                        href={`/products/${st.slug}`}
                                        onClick={() => setIsMobileNavOpen(false)}
                                        className={`px-2 py-1 rounded text-xs font-medium font-sans truncate transition-colors ${isStActive
                                            ? "bg-[var(--color-blue-deep)] text-white font-bold"
                                            : "bg-white text-slate-700 border border-slate-200"
                                          }`}
                                      >
                                        {st.name}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </aside>

                  <aside className="hidden w-full shrink-0 rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-5 shadow-2xs lg:block lg:w-72 sm:p-6">
                    <div className="mb-5 pb-3 border-b border-[var(--color-line)]">
                      <h2 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-display tracking-tight">
                        Our Products
                      </h2>
                      <div className="h-0.5 w-10 bg-[var(--color-amber)] rounded-full mt-1.5" />
                    </div>

                    <nav className="space-y-6">
                      {currentHierarchyCategory && (
                        <div className="space-y-2.5">
                          {/* Main Category Header (Navbar Tier 1) */}
                          <span className="block text-xs font-mono font-black uppercase tracking-wider text-[var(--color-amber-dark)]">
                            {currentHierarchyCategory.title}
                          </span>

                          {/* Subcategories (Navbar Tier 2) */}
                          <div className="space-y-3 pl-1.5 border-l-2 border-[var(--color-line)]">
                            {currentHierarchyCategory.subcategories.map((subcat) => {
                              const isStretchOption = STRETCH_FILM_ITEMS.some((st) => st.slug === product.id || st.slug === id);
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
                                ) ||
                                (subcat.slug === "plastic-stretch-film" && (isStretchOption || product.id === "plastic-stretch-film" || id === "plastic-stretch-film"));

                              return (
                                <div key={subcat.id} className="space-y-1 pl-2">
                                  <Link
                                    href={`/products/${subcat.slug}`}
                                    className={`flex items-center justify-between py-0.5 text-xs sm:text-[13px] font-bold font-display tracking-tight transition-colors ${isDirectSubcat
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
                                      const isDirectItem =
                                        item.slug === product.id ||
                                        item.slug === id ||
                                        item.name.toLowerCase().trim() === product.title.toLowerCase().trim();
                                      const isActive = isDirectItem;

                                      return (
                                        <li key={item.name} className="space-y-0.5">
                                          <Link
                                            href={`/products/${item.slug}`}
                                            className={`flex items-center justify-between py-0.5 px-1.5 rounded-md text-xs font-sans transition-colors ${isActive
                                              ? "font-extrabold text-[var(--color-ink)]"
                                              : "text-[var(--color-mute)] hover:text-[var(--color-ink)]"
                                              }`}
                                          >
                                            <span className="truncate">{item.name}</span>
                                            {isActive && (
                                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber-dark)] shrink-0 ml-1.5" />
                                            )}
                                          </Link>

                                          {/* If Plastic Stretch Film is active, show its 11 sub-options nested under it */}
                                          {item.slug === "plastic-stretch-film" && (isDirectItem || STRETCH_FILM_ITEMS.some((st) => st.slug === product.id || st.slug === id)) && (
                                            <ul className="space-y-0.5 pl-3 border-l-2 border-slate-200 ml-2 my-1">
                                              {STRETCH_FILM_ITEMS.map((st) => {
                                                const isStActive = st.slug === product.id || st.slug === id;
                                                return (
                                                  <li key={st.slug}>
                                                    <Link
                                                      href={`/products/${st.slug}`}
                                                      className={`block py-0.5 px-1 rounded text-[11px] font-sans truncate transition-colors ${
                                                        isStActive ? "font-bold text-[var(--color-blue-deep)]" : "text-slate-500 hover:text-slate-800"
                                                      }`}
                                                    >
                                                      {st.name}
                                                    </Link>
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          )}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </nav>
                  </aside>

                  {/* RIGHT COLUMN: DETAILED ARTICLE CONTENT */}
                  <main className="flex-1 max-w-4xl space-y-8 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed font-sans font-normal">

                    {/* Top Featured Full-Width Product Image — Touch Responsive */}
                    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm">
                      <div className="aspect-[3/2] w-full overflow-hidden bg-white">
                        <OptimizedImage
                          src={img || product.image || "/images/products/specialty-pouches/image.webp"}
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
                          dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(productDetailContent) }}
                        />
                      )}
                    </div>

                    {/* Benefits Section */}
                    {Array.isArray(product.applications) && product.applications.length > 0 && (
                      <div id="product-specifications" className="pt-6 border-t border-[var(--color-line)] space-y-4">
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
                          <h2 className="text-lg sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                            Technical Specifications
                          </h2>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] shadow-2xs">
                          <table className="w-full border-collapse text-xs sm:text-sm font-sans">
                            <thead>
                              <tr className="bg-[var(--color-ink)] text-white">
                                <th className="px-3 py-2.5 sm:px-4 sm:py-3 text-left font-bold tracking-wide w-2/5 border-r border-white/10">Specification</th>
                                <th className="px-3 py-2.5 sm:px-4 sm:py-3 text-left font-bold tracking-wide">Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {specs.map((s: any, idx: number) => (
                                <tr
                                  key={s.label}
                                  className={`border-b border-[var(--color-line)] last:border-b-0 transition-colors hover:bg-[var(--color-amber)]/5 ${idx % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                    }`}
                                >
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top break-words">
                                    {s.label}
                                  </td>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-[var(--color-mute)] align-top break-words">{s.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}



                    {/* IN-PAGE PRODUCT TYPES & VARIATIONS GRID (PLACED BELOW HERO & SPECS TABLE) */}
                    {displaySubCategories.length > 0 && (
                      <div id="variants" className="pt-8 border-t border-[var(--color-line)] space-y-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2.5">
                            <div className="h-5 w-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                              Available Types & Specifications
                            </h2>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6 pt-1 items-stretch">
                          {displaySubCategories.map((sub: any) => {
                            const subImages = getSubcategoryImages(sub, product);
                            return (
                              <div
                                key={sub.id || sub.title}
                                className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-amber)]/50 hover:shadow-xl"
                              >
                                <div className="relative">
                                  <SubcategoryCardImageGallery images={subImages} title={sub.title} categoryName={category || product.title} />
                                </div>

                                <div className="flex flex-1 flex-col justify-between p-3 sm:p-5">
                                  <div>
                                    <h3 className="font-display text-xs sm:text-base font-extrabold text-slate-900 tracking-tight leading-snug line-clamp-2 sm:line-clamp-none">
                                      {sub.title}
                                    </h3>

                                    {sub.subtitle && (
                                      <p className="text-xs font-semibold text-[var(--color-amber-dark)] mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
                                        {sub.subtitle}
                                      </p>
                                    )}

                                    {sub.blurb && (
                                      <p className="hidden sm:block mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                                        {sub.blurb}
                                      </p>
                                    )}

                                    {sub.specs && (
                                      <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 hidden sm:block">
                                        {Object.entries(sub.specs).slice(0, 5).map(([lbl, val]: any) => (
                                          <div key={lbl} className="flex items-start justify-between gap-2 text-xs">
                                            <span className="font-semibold text-slate-900 shrink-0">{lbl}:</span>
                                            <span className="font-medium text-slate-600 text-right leading-tight">{String(val)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {Array.isArray(sub.applications) && sub.applications.length > 0 && (
                                      <div className="mt-3 pt-2.5 border-t border-slate-100 hidden sm:flex flex-wrap gap-1">
                                        {sub.applications.map((app: string, idx: number) => (
                                          <span
                                            key={idx}
                                            className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-slate-600"
                                          >
                                            {app}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  <div className="mt-2.5 pt-2 sm:mt-4 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1 sm:gap-2">
                                    <button
                                      type="button"
                                      onClick={() => setIsInquiryOpen(true)}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-amber-dark)] hover:text-[var(--color-amber)] transition-colors min-h-[30px] sm:min-h-[32px] cursor-pointer"
                                    >
                                      <span>Inquire</span>
                                      <ArrowRight className="h-3 w-3" />
                                    </button>
                                    <Link
                                      href={`/contact?sku=${product.id}&title=${encodeURIComponent(`${product.title} - ${sub.title}`)}`}
                                      className="inline-flex items-center justify-center rounded-full bg-[var(--color-amber-soft)] px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-bold text-[var(--color-amber-dark)] hover:bg-[var(--color-amber)] hover:text-white transition-all shadow-2xs"
                                    >
                                      Quote
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* DEDICATED FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
                    <FaqSection faqs={productFaqs} />

                    {/* Bottom CTA / Contact Bar */}
                    <div className="pt-8 border-t border-[var(--color-line)]">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[var(--color-mist)] border border-[var(--color-line)] shadow-xs">
                        <div className="text-xs sm:text-sm text-[var(--color-mute)] font-sans">
                          Please contact us on <a href="tel:+918595072187" className="font-bold text-[var(--color-ink)] hover:text-[var(--color-amber-dark)] transition-colors">+91 85950 72187</a> or email us <a href="mailto:info@winnerpack.in" className="font-bold text-[var(--color-ink)] hover:text-[var(--color-amber-dark)] transition-colors">info@winnerpack.in</a> for quotations or custom requirements.
                        </div>
                        <Button
                          type="button"
                          onClick={() => setIsInquiryOpen(true)}
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


        <CTABanner />
      </PageWrapper>

      <Footer />
      {isInquiryOpen && (
        <ProductInquiryModal
          productId={product.id}
          productTitle={product.title}
          onClose={() => setIsInquiryOpen(false)}
        />
      )}
    </div>
  );
}
