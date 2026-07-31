"use client";
import { apiFetch } from "@/lib/api";
import { use, useState, useEffect } from "react";
import { productCategories } from "@/data";
import type { Product } from "@/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { ProductCard } from "@/components/ProductCard";
import CTABanner from "@/components/CTABanner";
import { cn } from "@/utils/cn";
import { Loader2, ArrowLeft } from "lucide-react";
import { initialProducts } from "@/lib/fallback-data";
import Link from "next/link";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";

export default function CategoryClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Find category definition
  const currentCategory = productCategories.find((c) => c.id === slug) || productCategories[0];

  useEffect(() => {
    apiFetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API responded with error status");
        return res.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          setProductsList(initialProducts as any);
        } else {
          setProductsList(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch products from API, using client fallback:", err);
        setProductsList(initialProducts as any);
        setLoading(false);
      });
  }, []);

  // Filter products for this specific category (matching fallback-data and DB categories)
  const categoryProducts = productsList.filter((p) => {
    const catId = p.category;
    if (currentCategory.id === "film-products") {
      return catId === "films" || catId === "film-products" || catId === "film";
    }
    if (currentCategory.id === "label-sticker-products") {
      return catId === "labels" || catId === "label-sticker-products" || catId === "label";
    }
    if (currentCategory.id === "other-products") {
      return catId === "other" || catId === "other-products" || catId === "strapping" || catId === "protective" || catId === "tapes";
    }
    return catId === currentCategory.id;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* Dedicated Category Page Header */}
        <PageHeader
          eyebrow="Category Catalog"
          title={currentCategory.title}
          intro={currentCategory.blurb}
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: currentCategory.title },
          ]}
        />

        <Section className="pt-8 sm:pt-10 pb-16 bg-transparent">
          <Container>

            {/* Back Button & Category Tabs Navigation Bar (Mobile & Desktop Optimized) */}
            <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[var(--color-line)] pb-5">
              <Link
                href="/products"
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-blue)] shadow-sm hover:shadow transition-all shrink-0"
              >
                <ArrowLeft className="h-4 w-4 text-[var(--color-amber-dark)]" />
                <span>Back to All Categories</span>
              </Link>

              {/* Category Quick Switcher Pills (Horizontally Scrollable on Mobile) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto -mx-1 px-1 sm:mx-0 sm:px-0">
                {productCategories.map((cat) => {
                  const isActive = cat.id === currentCategory.id;
                  return (
                    <Link
                      key={cat.id}
                      href={`/product-category/${cat.id}`}
                      className={cn(
                        "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 shadow-sm whitespace-nowrap",
                        isActive
                          ? "bg-[var(--color-blue-deep)] text-white ring-2 ring-[var(--color-blue-deep)]/20"
                          : "bg-white text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-slate-50"
                      )}
                    >
                      {cat.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Category Hero Banner */}
            <div className="mb-10 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-center">
                  <span className="inline-block w-fit rounded-full bg-[var(--color-amber)]/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-blue-deep)] mb-3">
                    {currentCategory.tag}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
                    {currentCategory.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--color-mute)] leading-relaxed">
                    {currentCategory.blurb} Every item in this category is manufactured with high precision, meeting international quality and load safety standards.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="rounded-full bg-[var(--color-blue-deep)] px-3 py-1 font-mono text-xs font-bold text-white">
                      {categoryProducts.length} Items Available
                    </span>
                  </div>
                </div>
                <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:col-span-5 overflow-hidden bg-slate-100 border-t lg:border-t-0 lg:border-l border-[var(--color-line)]">
                  <img
                    src={currentCategory.image}
                    alt={currentCategory.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* Products Section Header */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--color-ink)]">
                Available Products in {currentCategory.title}
              </h3>
              <span className="font-mono text-xs font-bold text-[var(--color-mute)]">
                {categoryProducts.length} Products
              </span>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--color-blue-deep)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-mute)]">
                  Loading {currentCategory.title}...
                </span>
              </div>
            ) : categoryProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--color-line)] p-16 text-center text-[var(--color-mute)]">
                No products found in this category currently.
              </div>
            ) : (
              <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {categoryProducts.map((p) => (
                  <StaggerItem key={p.id} className="h-full">
                    <ProductCard product={p} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}

          </Container>
        </Section>

        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
