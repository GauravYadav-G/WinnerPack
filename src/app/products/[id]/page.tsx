"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Check, ArrowLeft } from "lucide-react";
import { productCategories } from "../../../data";
import { COMPANY } from "../../../lib/mock-data";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/ProductCard";
import CTABanner from "@/components/CTABanner";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";

import { Loader2 } from "lucide-react";
import { marked } from "marked";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setImg(data.gallery?.[0] || data.image || "");
        
        // Fetch related products dynamically
        fetch("/api/products")
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
        console.error("Failed to load product detail:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <ScrollToTop />
        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-amber-2)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">Loading product specs...</span>
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
        <ScrollToTop />
        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div>
              <p className="eyebrow text-[var(--color-amber-2)] font-mono text-sm uppercase tracking-wider">404</p>
              <h1 className="mt-4 text-3xl font-semibold text-white font-display">
                Product not found
              </h1>
              <p className="mt-3 text-white/60">
                We couldn't find that item. It may have been renamed or moved.
              </p>
              <div className="mt-8">
                <Button to="/products" variant="outlineLight" iconRight>
                  Back to catalog
                </Button>
              </div>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  const gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
  const category =
    productCategories.find((c) => c.id === product.category)?.title ||
    product.category;

  const specs = product.specs ? Object.entries(product.specs).map(([label, value]: any) => ({
    label,
    value,
  })) : [];

  const features = [
    "Manufactured in-house under strict ISO 9001:2015 controls.",
    "Batch-traceable with certificate of analysis (COA) compliance.",
    "Optimized for maximum efficiency on automated application lines.",
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />

      <PageWrapper>
        {/* Dark detail header */}
        <section className="relative overflow-hidden bg-[var(--color-blue-deep)] pb-16 pt-12 md:pt-14 lg:pb-20">
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[var(--color-amber)]/12 blur-[130px]"
            aria-hidden
          />
          <Container className="relative">
            <nav aria-label="Breadcrumb" className="mb-6">
              {/* Mobile-only breadcrumb */}
              <div className="md:hidden">
                <Link href="/products" className="inline-flex items-center gap-1 font-mono text-xs text-white/60 hover:text-[var(--color-amber)]">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to catalog
                </Link>
              </div>
              {/* Desktop-only breadcrumbs */}
              <ol className="hidden md:flex flex-wrap items-center gap-1.5 font-mono text-xs text-white/45">
                <li><Link href="/" className="hover:text-[var(--color-amber)]">Home</Link></li>
                <li><ChevronRight className="h-3 w-3 text-white/25" /></li>
                <li><Link href="/products" className="hover:text-[var(--color-amber)]">Products</Link></li>
                <li><ChevronRight className="h-3 w-3 text-white/25" /></li>
                <li>
                  <Link href={`/products?cat=${product.category}`} className="hover:text-[var(--color-amber)]">
                    {category}
                  </Link>
                </li>
                <li><ChevronRight className="h-3 w-3 text-white/25" /></li>
                <li className="text-white/75">{product.title}</li>
              </ol>
            </nav>

            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <Eyebrow tone="light">{category}</Eyebrow>
                <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-white font-display text-balance">
                  {product.title}
                </h1>
                <p className="mt-4 md:mt-5 max-w-lg text-sm md:text-base leading-relaxed text-white/70">
                  {product.blurb}
                </p>

                {specs.length > 0 && (
                  <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                    {specs.slice(0, 3).map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg md:rounded-xl border border-white/12 bg-white/5 px-3 py-2 md:px-4 md:py-3"
                      >
                        <p className="font-mono text-[9px] md:text-[0.6rem] uppercase tracking-wider text-white/45">
                          {s.label}
                        </p>
                        <p className="mt-0.5 font-display text-sm md:text-base font-semibold text-white">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 md:mt-9 flex flex-wrap gap-2 md:gap-3">
                  <Button to={`/contact?sku=${product.id}`} className="px-5 py-2.5 text-xs md:text-sm">
                    Request a Quote
                  </Button>
                  <Button to={`tel:${COMPANY.phoneHref}`} variant="outlineLight" className="px-5 py-2.5 text-xs md:text-sm">
                    Call engineering
                  </Button>
                </div>
              </div>

              {/* Gallery */}
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-white/10 shadow-lift p-1 bg-white/5">
                  <img
                    src={img}
                    alt={product.title}
                    className="aspect-[4/3] w-full object-cover rounded-2xl"
                  />
                </div>
                {gallery.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {gallery.map((g: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setImg(g)}
                        className={`overflow-hidden rounded-xl border transition-colors p-0.5 ${
                          img === g
                            ? "border-[var(--color-amber)]"
                            : "border-white/10 opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img src={g} alt="" className="aspect-square w-full object-cover rounded-lg" />
                      </button>
                    ))}
                  </div>
                )}
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Specs + features */}
        <Section className="bg-white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <Eyebrow>Technical specifications</Eyebrow>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl font-display text-balance">
                  Engineered to spec
                </h2>
                <dl className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-line)]">
                  {specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex flex-col gap-1 border-[var(--color-line)] p-3.5 md:p-5 ${
                        i % 2 === 1 ? "border-l" : ""
                      } ${i >= specs.length - 2 ? "" : "border-b"} bg-white`}
                    >
                      <dt className="font-mono text-[0.55rem] md:text-[0.65rem] uppercase tracking-wider text-[var(--color-mute)]">
                        {s.label}
                      </dt>
                      <dd className="text-xs md:text-sm font-semibold text-[var(--color-ink)]">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.1}>
                <Eyebrow>Why it works</Eyebrow>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl font-display text-balance">
                  Features &amp; applications
                </h2>
                
                {product.longDesc && (
                  <div
                    className="mt-6 text-xs md:text-sm leading-relaxed text-[var(--color-text)]/80 prose prose-slate max-w-none font-normal"
                    dangerouslySetInnerHTML={{ __html: marked.parse(product.longDesc) as string }}
                  />
                )}

                <ul className="mt-7 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-4 w-4 md:h-5 md:w-5 shrink-0 place-items-center rounded-full bg-[var(--color-amber)]/15 text-[var(--color-amber-dark)]">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-xs md:text-sm leading-relaxed text-[var(--color-text)]/85">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-5 md:p-6">
                  <p className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-[var(--color-mute)]">
                    Typical applications
                  </p>
                  <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2">
                    {product.applications && product.applications.map((a: string) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 rounded-full bg-white border border-[var(--color-line)] px-2.5 py-1 text-[10px] md:text-xs font-semibold text-[var(--color-ink)] shadow-sm"
                      >
                        <Icon name="ArrowRight" className="h-3 w-3 md:h-3.5 md:w-3.5 text-[var(--color-amber-dark)]" />
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mt-12">
              <Link
                href="/products"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-blue-deep)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all products
              </Link>
            </div>
          </Container>
        </Section>

        {/* Related */}
        {related.length > 0 && (
          <Section className="bg-[var(--color-mist)] pt-16 border-t border-[var(--color-line)]">
            <Container>
              <Eyebrow>Related products</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl font-display">
                You might also need
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
