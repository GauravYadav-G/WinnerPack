"use client";

import { motion } from "framer-motion";
import { productCategories } from "../data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Maps product name to the asset folder containing image.png
function getItemFolder(name: string): string {
  const map: Record<string, string> = {
    "Plain Labels": "plain-labels",
    "Printed Labels": "printed-labels",
    "Barcode Labels": "barcode-labels",
    "Product Labels": "product-labels",
    "Self Adhesive Labels": "self-adhesive-labels",
    "Thermal Labels": "thermal-labels",
    "POF Shrink Rolls & Pouches": "pof-shrink-rolls",
    "LDPE Shrink Rolls & Pouches": "ldpe-shrink-rolls",
    "PVC Shrink Rolls, Pouches & Tubes": "pvc-shrink-rolls",
    "Poly Courier Bags": "poly-courier-bags",
    "Paper Courier Bags": "paper-courier-bags",
    "PETG Rolls & Pouches / BOPP Pouches / ESD Pouches": "specialty-pouches",
    "PP Strap": "pp-strap",
    "Printed PP Strap": "printed-pp-strap",
    "Colored PP Strap": "colored-pp-strap",
    "PET Strap": "pet-strap",
    "Bubble Roll & Pouches": "bubble-roll",
    "EPE Foam Rolls": "epe-foam-rolls",
    "Air Bags": "air-bags",
    "Corrugated Boxes": "corrugated-boxes",
    "Corrugated Rolls": "corrugated-rolls",
    "Edge Protector": "edge-protector",
    "BOPP Tapes": "bopp-tapes",
    "Printed BOPP Tapes": "printed-bopp-tapes",
    "Coloured BOPP Tapes": "coloured-bopp-tapes",
    "Silicon Tapes": "silicon-tapes",
    "Manual Stretch Film": "manual-stretch-film",
    "Machine Stretch Film": "machine-stretch-film",
    "Pallet Cover": "pallet-cover",
    "Pallet Liner": "pallet-liner"
  };
  return map[name] || name.toLowerCase().replace(/\s+/g, "-");
}

// Flat list of all 30 product items across the 6 categories
const allProducts = productCategories.flatMap((cat) =>
  cat.items.map((item) => {
    const folder = getItemFolder(item);
    return {
      id: folder,
      categoryId: cat.id,
      categoryName: cat.title,
      itemName: item,
      imagePath: `/images/products/${folder}/image.png`
    };
  })
);

// Only display 12 products (3 rows in a 4-column layout)
const visibleProducts = allProducts.slice(0, 12);

interface ProductCardProps {
  product: typeof allProducts[number];
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Links directly to the product's detailed description page */}
      <Link href={`/products/${product.id}`} className="block h-full w-full">
        {/* Aspect Ratio 19/16 for Image */}
        <div className="relative aspect-[19/16] w-full overflow-hidden bg-[var(--color-bone)]">
          <img
            src={product.imagePath}
            alt={product.itemName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle overlay to enhance contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Product Title at Bottom */}
        <div className="py-3.5 px-3 text-center border-t border-[var(--color-line)] flex items-center justify-center min-h-[56px]">
          <h3 className="font-display text-xs sm:text-sm font-semibold tracking-tight text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-blue)] leading-tight line-clamp-2">
            {product.itemName}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductCategories() {
  return (
    <section id="products" className="relative overflow-hidden bg-white py-12 md:py-16">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-fine opacity-10 pointer-events-none" aria-hidden />
      
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* Centered Heading with Underline Underneath (matching SKN Industries style) */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-blue)] font-bold">
            Explore Range
          </span>
          <h2 className="font-display mt-2 text-2xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-5xl text-balance">
            Product Gallery
          </h2>
          <div className="mt-3 h-0.5 w-14 bg-[var(--color-amber)]" />
        </div>

        {/* Responsive Grid: 4 columns on large desktop, 3 columns on tablet, 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" data-reveal>
          {visibleProducts.map((p, i) => (
            <ProductCard key={p.itemName} product={p} index={i} />
          ))}
        </div>

        {/* Center Button to View All Products */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-blue)] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[var(--color-blue)]/30 transition hover:bg-[var(--color-blue-deep)]"
            data-hover
          >
            <span className="relative z-10">View All Products</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

      </div>
    </section>
  );
}
