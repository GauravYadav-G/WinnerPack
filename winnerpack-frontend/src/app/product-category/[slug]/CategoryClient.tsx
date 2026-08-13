"use client";
import { use, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { productCategories } from "@/data";
import { productHierarchy } from "@/components/Navbar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/primitives";
import CTABanner from "@/components/CTABanner";
import { cn } from "@/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useIsTouch } from "@/hooks";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import OptimizedImage from "@/components/OptimizedImage";

// Subcategory → representative image from its actual sub-products
const SUBCAT_IMAGES: Record<string, string> = {
  // Film Products — using newly uploaded product images
  "packaging-films": "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.jpg",
  "pof-shrink-film": "/images/products/cross-linked-pof/cross-linked-pof.jpg",
  "lamination-pe-film": "/images/products/adhesive-lamination-film/adhesive-lamination-film.jpg",
  "agricultural-films": "/images/products/plastic-mulching-film/plastic-mulching-film.jpg",
  "biodegradable-films": "/images/products/biodegradable-shrink-film/biodegradable-shrink-film.jpg",
  "flexible-laminate-rolls": "/images/products/plain-standup-pouches/plain-standup-pouches.jpg",
  "printed-pe-films": "/images/products/milk-packaging-film/milk-packaging-film.jpg",
  "ldpe-bags": "/images/products/ldpe-bags/pe-garbage-bags.jpg",
  "bopp-films": "/images/products/bopp-films-pouches/bopp-rolls.jpg",
  "pvc-shrink-films": "/images/products/pvc-shrink-rolls-pouches/pvc-shrink-rolls.jpg",

  // Labels & Stickers
  "plain-labels": "/images/products/plain-labels/image.png",
  "printed-labels": "/images/products/printed-labels/image.png",
  "barcode-labels": "/images/products/barcode-labels/image.png",
  "product-labels": "/images/products/product-labels/image.png",
  "self-adhesive-labels": "/images/products/self-adhesive-labels/image.png",
  "thermal-labels": "/images/products/thermal-labels/image.png",

  // Tapes
  "bopp-tapes": "/images/products/bopp-tapes/image.png",
  "printed-tapes": "/images/products/printed-bopp-tapes/image.png",
  "colored-tapes": "/images/products/coloured-bopp-tapes/image.png",
  "masking-tapes": "/images/products/silicon-tapes/image.png",

  // Strap
  "pp-strap-main": "/images/products/pp-strap/image.png",
  "printed-pp-strap": "/images/products/printed-pp-strap/image.png",
  "colored-pp-strap": "/images/products/colored-pp-strap/image.png",
  "pet-strap": "/images/products/pet-strap/image.png",
};

function SubcategoryCard({
  subcat,
}: {
  subcat: { id: string; title: string; slug: string; items: { name: string; slug: string }[] };
}) {
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const ref = useRef<HTMLElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const highlight = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(245,165,35,0.18), transparent 45%)`;

  function handleMove(e: React.MouseEvent) {
    if (reduce || touch || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set(-(py - 0.5) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  }

  const image = SUBCAT_IMAGES[subcat.id] || "/images/products/pof-shrink-rolls/image.png";

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: reduce || touch ? 0 : srx,
        rotateY: reduce || touch ? 0 : sry,
        transformPerspective: 1000,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-[20px] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-blue-3)]/50 hover:shadow-xl active:scale-[0.99] sm:active:scale-100"
    >
      {/* Image block with responsive aspect ratio */}
      <Link
        href={`/products/${subcat.slug}`}
        className="relative block overflow-hidden"
        aria-label={`${subcat.title} — view products`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <OptimizedImage
            src={image}
            alt={subcat.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

          {!reduce && !touch && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: highlight }}
            />
          )}

        </div>
      </Link>

      {/* Content block with touch-optimized typography and spacing */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
        <div>
          <Link href={`/products/${subcat.slug}`} className="block group/title">
            <h3 className="font-display text-[13px] sm:text-xl font-extrabold text-slate-900 group-hover/title:text-[var(--color-blue)] transition-colors tracking-tight leading-snug line-clamp-1 sm:line-clamp-none">
              {subcat.title}
            </h3>
          </Link>



          {/* Items list (Hidden on mobile to fix grid height overlap, shown on sm+) */}
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 hidden sm:block">
            {subcat.items.slice(0, 4).map((item) => (
              <div key={item.slug} className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-amber-dark)] shrink-0" />
                <span className="font-medium text-slate-600 leading-tight flex-1">{item.name}</span>
              </div>
            ))}
            {subcat.items.length > 4 && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-blue)] shrink-0" />
                <span className="font-semibold text-[var(--color-blue)]">+{subcat.items.length - 4} more products</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer row — mobile: just Explore link; desktop: Explore + Quote */}
        <div className="mt-2.5 pt-2 sm:mt-5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            href={`/products/${subcat.slug}`}
            className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-bold text-[var(--color-ink)] sm:text-[var(--color-blue)] hover:text-[var(--color-blue-2)] transition-colors min-h-[32px] sm:min-h-[40px]"
          >
            <span>Explore range</span>
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--color-amber-dark)]" />
          </Link>
          <Link
            href={`/contact?sku=${subcat.slug}&title=${encodeURIComponent(subcat.title)}`}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[var(--color-blue-soft)] px-4 py-2 text-xs font-bold text-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-white active:scale-95 transition-all shadow-2xs min-h-[38px]"
          >
            Quote
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function CategoryClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const hierarchyCategory = productHierarchy.find((c) => c.id === slug || c.catSlug === slug);
  const currentCategory = productCategories.find((c) => c.id === slug) || productCategories[0];

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        <PageHeader
          eyebrow="Product Category"
          title={hierarchyCategory?.title ?? currentCategory.title}
          intro={currentCategory.blurb}
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: hierarchyCategory?.title ?? currentCategory.title },
          ]}
          align="center"
        />

        <Section className="pt-6 sm:pt-10 pb-12 sm:pb-16 bg-transparent">
          <Container>

            {/* Back Button & Category Quick Switcher Pills — Mobile Touch Optimized */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[var(--color-line)] pb-4 sm:pb-5">
              <Link
                href="/products"
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-blue)] active:bg-slate-50 shadow-xs hover:shadow transition-all shrink-0 min-h-[42px]"
              >
                <ArrowLeft className="h-4 w-4 text-[var(--color-amber-dark)] shrink-0" />
                <span>Back to All Categories</span>
              </Link>

              {/* Horizontal Scrollable Category Pills with Touch Momentum */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x">
                {productCategories.map((cat) => {
                  const isActive = cat.id === currentCategory.id;
                  return (
                    <Link
                      key={cat.id}
                      href={`/product-category/${cat.id}`}
                      className={cn(
                        "shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 shadow-2xs whitespace-nowrap min-h-[38px] flex items-center justify-center active:scale-95",
                        isActive
                          ? "bg-[var(--color-blue-deep)] text-white ring-2 ring-[var(--color-blue-deep)]/25 font-bold shadow-md"
                          : "bg-white text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-slate-50"
                      )}
                    >
                      {cat.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Subcategory Cards Grid */}
            {hierarchyCategory ? (
              <>
                <div className="mb-4 sm:mb-6 flex items-center justify-between">
                  <h3 className="font-display text-base sm:text-xl font-bold text-[var(--color-ink)]">
                    Browse {hierarchyCategory.title} by Type
                  </h3>
                  <span className="font-mono text-xs font-bold text-[var(--color-mute)] bg-white border border-[var(--color-line)] px-2.5 py-1 rounded-full shadow-2xs">
                    {hierarchyCategory.subcategories.length} categories
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {hierarchyCategory.subcategories.map((subcat) => (
                    <SubcategoryCard
                      key={subcat.id}
                      subcat={subcat}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-[var(--color-line)] p-12 sm:p-16 text-center text-[var(--color-mute)] bg-white/50">
                No subcategories found for this category.
              </div>
            )}

          </Container>
        </Section>

        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}
