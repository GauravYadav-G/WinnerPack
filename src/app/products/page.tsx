"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { productCategories } from "../../data";
import type { Product } from "../../data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import CTABanner from "@/components/CTABanner";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";

const TABS = [
  { slug: "all", name: "All products" },
  ...productCategories.map((c) => ({ slug: c.id, name: c.title })),
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProductsList(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const active = searchParams?.get("cat") ?? "all";

  const filtered =
    active === "all"
      ? productsList
      : productsList.filter((p) => p.category === active);

  const countFor = (slug: string) =>
    slug === "all"
      ? productsList.length
      : productsList.filter((p) => p.category === slug).length;

  const setCat = (slug: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (slug === "all") {
      params.delete("cat");
    } else {
      params.set("cat", slug);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeName = TABS.find((t) => t.slug === active)?.name ?? "All products";

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      <PageWrapper>
        <PageHeader
          eyebrow="Product catalog"
          title={
            <>
              Everything you need to <br />
              secure a load.
            </>
          }
          intro="Filter by category to find the exact grade, gauge and format for your line. Every product is manufactured and quality-controlled in-house."
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: "Product catalog" },
          ]}
        />

        <Section className="pt-12 sm:pt-14 lg:pt-16 bg-transparent">
          <Container>
            {/* Mobile filter chips */}
            <div className="mb-6 flex gap-1.5 overflow-x-auto pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {TABS.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setCat(t.slug)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    active === t.slug
                      ? "border-[var(--color-blue-deep)] bg-[var(--color-blue-deep)] text-white shadow-sm"
                      : "border-[var(--color-line)] text-[var(--color-mute)] bg-white/80",
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-14">
              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <div>
                    <span className="inline-block rounded-full bg-[var(--color-amber)]/15 px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                      Filter by category
                    </span>
                    <ul className="mt-4 space-y-1">
                      {TABS.map((t) => (
                        <li key={t.slug}>
                          <button
                            onClick={() => setCat(t.slug)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                              active === t.slug
                                ? "bg-[var(--color-blue-deep)] text-white"
                                : "text-[var(--color-ink)]/75 hover:bg-white/50",
                            )}
                          >
                            <span>{t.name}</span>
                            <span
                              className={cn(
                                "font-mono text-xs",
                                active === t.slug ? "text-[var(--color-amber-2)]" : "text-[var(--color-mute)]",
                              )}
                            >
                              {String(countFor(t.slug)).padStart(2, "0")}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-[var(--color-ink)] font-display">
                      Not sure what you need?
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-mute)]">
                      Our engineers will spec the right material for your load and
                      line speed.
                    </p>
                    <Button
                      className="mt-4 w-full"
                      to={`/contact?sku=custom`}
                      variant="primary"
                    >
                      Request a Quote
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Grid */}
              <div>
                <div className="mb-6 flex items-center justify-between border-b border-[var(--color-line)] pb-4">
                  <p className="text-sm text-[var(--color-mute)]">
                    <span className="font-semibold text-[var(--color-ink)]">{filtered.length}</span>{" "}
                    products · <span className="text-[var(--color-ink)]">{activeName}</span>
                  </p>
                </div>

                {loading ? (
                  <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--color-blue-deep)]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-mute)]">Syncing Products Catalog...</span>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[var(--color-line)] p-16 text-center text-[var(--color-mute)]">
                    No products in this category yet.
                  </div>
                ) : (
                  <Stagger
                    key={active}
                    className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {filtered.map((p) => (
                      <StaggerItem key={p.id} className="h-full">
                        <ProductCard product={p} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </div>
            </div>
          </Container>
        </Section>

        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-bone)]" />}>
      <ProductsContent />
    </Suspense>
  );
}
