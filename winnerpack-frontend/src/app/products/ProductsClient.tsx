"use client";
import { Suspense } from "react";
import { productCategories } from "../../data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/primitives";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";
import { motion } from "framer-motion";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";

function ProductsContent() {
  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        <PageHeader
          eyebrow="Product Catalog"
          title={
            <>
              High Performance Industrial <br />
              Packaging Solutions
            </>
          }
          intro="Explore our specialized product categories engineered for high tensile strength, load stability, and durability."
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
          ]}
        />

        <Section className="py-12 sm:py-16 bg-transparent">
          <Container>
            
            {/* Centered Category Cards Header */}
            <div className="text-center mb-10 flex flex-col items-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-blue)] font-bold">
                Categories
              </span>
              <h2 className="font-display mt-2 text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl text-balance">
                Our Product Categories
              </h2>
              <div className="mt-3 h-0.5 w-14 bg-[var(--color-amber)]" />
            </div>

            {/* 3 CATEGORY CARDS — Compact & Reduced Sizing on Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              {productCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                >
                  <Link
                    href={`/product-category/${cat.id}`}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.99] sm:active:scale-100 block h-full"
                  >
                    {/* Square Shape Aspect Ratio for Image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bone)]">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Category Title at Bottom */}
                    <div className="py-2.5 sm:py-3.5 px-3 sm:px-4 text-center border-t border-[var(--color-line)] bg-white flex items-center justify-center min-h-[44px] sm:min-h-[56px]">
                      <h3 className="font-display text-xs sm:text-sm font-semibold tracking-tight text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-blue)] leading-tight line-clamp-2">
                        {cat.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
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


