"use client";
import { Suspense } from "react";
import { productCategories } from "../../data";
import { Container } from "@/components/ui/primitives";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import OptimizedImage from '@/components/OptimizedImage';

// Featured Products covering all 4 primary categories: Films, Labels, Tapes, Strapping
const featuredProducts = [
  {
    id: "flexible-laminated-rolls",
    title: "Flexible Laminated Rolls & Pouches",
    category: "film-products",
    tag: "Films & Pouches",
    blurb: "High-barrier 2-layer, 3-layer, and 4-layer laminated packaging rolls & pouches printed up to 8 colors for food, FMCG, and pharma packaging.",
    image: "/images/products/lamination-films-pouches/image.png",
  },
  {
    id: "printed-labels",
    title: "Printed Product Labels & Stickers",
    category: "label-sticker-products",
    tag: "Labels & Stickers",
    blurb: "High-density thermal transfer barcode labels, printed product stickers, and self-adhesive labels for retail, pharma, and shipping.",
    image: "/images/products/printed-labels/image.png",
  },
  {
    id: "bopp-tapes",
    title: "BOPP Sealing Tapes & Custom Printed Tapes",
    category: "tapes",
    tag: "Packaging Tapes",
    blurb: "High-tack BOPP box sealing tapes, custom printed brand logo tapes, and specialized silicon tapes for secure carton closure.",
    image: "/images/products/bopp-tapes/image.png",
  },
  {
    id: "pet-strap",
    title: "High-Tensile PET & PP Strapping Rolls",
    category: "strapping",
    tag: "Strapping Products",
    blurb: "High break-strength PET strapping and colored PP strapping rolls engineered for heavy pallet unitization and industrial baling.",
    image: "/images/products/pet-strap/image.png",
  },
  {
    id: "printed-pe-films",
    title: "Printed PE Films (Milk, Ghee, SMP, Water)",
    category: "film-products",
    tag: "Dairy & Liquid Packaging",
    blurb: "100% Virgin 3-layer co-extruded PE films with Metallocene poly for leak-proof automated pouch packaging of milk, ghee, milk powder, and drinking water.",
    image: "/images/products/coloured-films-pouches/image.png",
  },
  {
    id: "stretch-film",
    title: "Industrial Stretch Film Rolls",
    category: "film-products",
    tag: "Pallet Unitization",
    blurb: "Hand and machine-grade cast stretch films delivering up to 300% pre-stretch for secure pallet unitization and transoceanic shipping.",
    image: "/images/products/stretch-film/image.png",
  },
];

function ProductsContent() {
  return (
    <div className="min-h-screen bg-white text-[var(--color-text)] font-sans">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* ========================================================================= */}
        {/* SECTION 1: HERO HEADER BANNER (Reference Image 1 Top)                     */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden bg-[var(--color-blue-deep)] flex items-center justify-center">
          {/* Background Manufacturing / Facility Image with Blue Gradient Overlay */}
          <OptimizedImage
            src="/images/desktop/portfolio/action_extrusion_tower_blue.jpg"
            alt="WinnerPack Industrial Packaging Manufacturing Plant"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/90 via-[var(--color-blue-deep)]/75 to-[var(--color-steel)]/90" />

          {/* Banner Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md text-balance"
            >
              Products
            </motion.h1>
            
            {/* Breadcrumb links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm text-white/70"
            >
              <Link href="/" className="hover:text-[var(--color-amber)] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white font-medium">Products</span>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: COMPANY OVERVIEW / INTRO TEXT (Reference Image 1 Bottom)        */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[var(--color-bone)] border-b border-[var(--color-line)]">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-blue)] font-bold">
                  <span className="w-8 h-0.5 bg-[var(--color-blue)]"></span>
                  WinnerPack Manufacturing Excellence
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-ink)] text-balance">
                  Complete Industrial Packaging Solutions — Films, Labels, Tapes & Strapping
                </h2>
                <div className="w-20 h-1 bg-[var(--color-amber)] rounded-full mb-2" />
              </div>

              <div className="mt-6 space-y-4 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed">
                <p>
                  Established as one of the leading organizations engaged in manufacturing, supplying, and exporting a wide collection of <strong className="text-[var(--color-ink)] font-semibold">Multilayer Films, Self-Adhesive Labels & Stickers, High-Tack Packaging Tapes, and High-Tensile Strapping Rolls</strong>. Our comprehensive catalog spans Unprinted & Printed PE Films (Milk, Ghee, SMP, Water), Flexible Laminated Rolls and Pouches, POF/PVC/LDPE Shrink Films, Machine & Hand Stretch Wrap, Custom Printed Barcode Labels, Product Stickers, BOPP Box Sealing Tapes, and PET/PP Strapping. We manufacture all our products using prime virgin raw materials and high-tack adhesives procured from trustworthy global vendors.
                </p>
                <p>
                  Promoted by technocrats with decades of hands-on experience in this domain, we provide our global clients with engineered packaging solutions as per their exact specifications. Our modern manufacturing facility is equipped with advanced multi-layer blown film extrusion lines, high-speed rotogravure & flexographic printing presses, adhesive coating units, and automated converting lines to fabricate products adhering strictly to international quality standards.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: "WHAT WE DO" FLOATING CARD OVERLAY (Reference Image 2)           */}
        {/* ========================================================================= */}
        <section className="relative w-full py-16 sm:py-24 bg-[var(--color-blue-deep)] overflow-hidden">
          {/* Full-width background image */}
          <OptimizedImage
            src="/images/desktop/portfolio/product_app_pallet_wrapping.png"
            alt="Packaging Material Manufacturer What We Do"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/95 via-[var(--color-blue-deep)]/85 to-[var(--color-steel)]/75" />

          <Container className="relative z-10">
            <div className="flex justify-end">
              {/* Floating Light Card Overlay */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-7/12 lg:w-1/2 bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-lift border border-[var(--color-line)]"
              >
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[var(--color-blue)] uppercase block mb-2">
                  WHAT WE DO
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)] uppercase tracking-tight mb-4">
                  PACKAGING MATERIAL MANUFACTURER
                </h3>

                <div className="w-12 h-1 bg-[var(--color-amber)] mb-6" />

                <div className="space-y-4 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed">
                  <p>
                    Since our inception, WinnerPack as a packaging material manufacturer has left no stone unturned in improving and identifying the needs of our clients who come from different industrial spheres. Delivering quality packaging products worldwide with successful application and a satisfied client base forms the backbone of our company.
                  </p>
                  <p>
                    The products manufactured at WinnerPack include: machine & hand stretch films, surface protection films, LDPE poly bags & shipping sacks, flexible laminated barrier pouches, milk & water packaging films, self-adhesive product labels & barcode stickers, high-tack BOPP box sealing & printed tapes, and high-tensile PET/PP strapping rolls.
                  </p>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: ALTERNATING FEATURE SECTIONS (Reference Images 3 & 4)            */}
        {/* ========================================================================= */}

        {/* FEATURE BLOCK 1: Food Grade & Industrial Packaging Material (Image 3 Top) */}
        <section className="py-12 sm:py-16 bg-white border-b border-[var(--color-line)]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[var(--color-line)] bg-[var(--color-bone)]"
              >
                <OptimizedImage
                  src="/images/products/coloured-films-pouches/image.png"
                  alt="Food Grade Packaging Material"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                <span className="font-mono text-xs font-bold text-[var(--color-blue)] tracking-wider uppercase mb-1">
                  Hygiene & Safety First
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)] uppercase tracking-tight mb-4 text-balance">
                  FOOD GRADE & INDUSTRIAL PACKAGING MATERIALS
                </h3>
                <div className="w-14 h-1 bg-[var(--color-amber)] mb-6" />

                <div className="space-y-4 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed">
                  <p>
                    All the packaging material manufactured by us is quality tested and made from superior quality 100% prime virgin raw materials. Once manufactured, our flexible films, laminated barrier pouches, and food-contact packaging are certified food grade.
                  </p>
                  <p>
                    Being one of the major suppliers of packaging products in India and worldwide, WinnerPack has ensured that only the best is catered to the client with the help of hi-tech engineering and a skilled team of experts. Our films block moisture, oxygen, and UV light, preserving fresh taste and nutritional value over long-term storage.
                  </p>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* FEATURE BLOCK 2: Custom Printed Films, Labels, Tapes & Strapping (Image 3 Bottom / 4 Top) */}
        <section className="py-0 bg-white border-b border-[var(--color-line)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Solid Navy Box */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[var(--color-blue-deep)] text-white p-8 sm:p-12 md:p-16 flex flex-col justify-center"
            >
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6 leading-tight text-balance">
                CUSTOM PRINTED FILMS, LABELS, TAPES & STRAPPING
              </h3>
              <div className="w-16 h-1 bg-[var(--color-amber)] mb-6" />

              <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed">
                <p>
                  We provide Food & Industrial Packaging Materials as per the exact demand of our customers in India and across the world. We customize packaging dimensions, barrier layers, label die-cuts, tape widths, and strap break-strengths ensuring maximum satisfaction for our clients.
                </p>
                <p>
                  Using advanced rotogravure & flexographic printing technology up to 8 colors, we deliver vibrant custom designs across barrier films, brand printed sealing tapes, barcode tracking labels, and printed strapping rolls with your company logo, graphics, and color specifications.
                </p>
                <p>
                  The packaging material that we use is of superior quality as we use nothing but the best when it comes to industrial packaging solutions.
                </p>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative min-h-[320px] md:min-h-full bg-slate-900"
            >
              <OptimizedImage
                src="/images/desktop/portfolio/product_app_warehouse_dispatch.png"
                alt="WinnerPack Packaging Warehouse Dispatch"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>
        </section>

        {/* FEATURE BLOCK 3: Complete Cargo Unitization & Packaging Excellence (Image 4 Bottom) */}
        <section className="py-12 sm:py-16 bg-[var(--color-mist)] border-t border-[var(--color-line)]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[var(--color-line)] bg-slate-900"
              >
                <OptimizedImage
                  src="/images/desktop/portfolio/product_app_blown_film.png"
                  alt="Industrial Packaging Material Production"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                <span className="font-mono text-xs font-bold text-[var(--color-blue)] tracking-wider uppercase mb-1">
                  End-to-End Industrial Packaging
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)] uppercase tracking-tight mb-4 text-balance">
                  COMPLETE INDUSTRIAL PACKAGING EXCELLENCE
                </h3>
                <div className="w-14 h-1 bg-[var(--color-amber)] mb-6" />

                <div className="space-y-4 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed">
                  <p>
                    WinnerPack is a leading spearhead in the Packaging Industry, providing excellent packaging solutions in accord with diverse industry needs.
                  </p>
                  <p>
                    From high-stretch machine wrap securing heavy palletized cargo during transoceanic shipping, to printed box sealing tapes, thermal barcode tracking labels, and high-tensile PET strapping rolls, WinnerPack delivers complete end-to-end industrial load unitization.
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-blue-deep)] hover:bg-[var(--color-ink)] text-white font-bold text-sm rounded-lg transition-colors shadow-md font-sans"
                  >
                    Request Custom Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: MAIN CATEGORIES GRID (4 Square Cards: Films, Labels, Tapes, Strapping) */}
        {/* ========================================================================= */}
        <section className="py-16 bg-white border-t border-[var(--color-line)]">
          <Container>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-blue)] font-bold block mb-2">
                CATEGORIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] uppercase tracking-tight text-balance">
                OUR PRODUCT CATEGORIES
              </h2>
              <div className="mt-3 h-1 w-16 bg-[var(--color-amber)] mx-auto rounded-full" />
              <p className="mt-4 text-[var(--color-mute)] text-sm sm:text-base">
                Explore our 4 primary product lines — engineered for high strength, clear identification, secure sealing, and pallet load unitization.
              </p>
            </div>

            {/* 4 Category Cards in Single Row / 2x2 Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {productCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    href={`/product-category/${cat.id}`}
                    className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-blue)] hover:shadow-lift hover:-translate-y-1 block h-full"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bone)]">
                      <OptimizedImage
                        src={cat.image}
                        alt={cat.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="inline-block px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-[var(--color-blue-deep)] text-white rounded">
                          {cat.tag.split("·")[0].trim()}
                        </span>
                      </div>
                    </div>

                    <div className="py-4 px-4 text-center bg-white flex flex-col justify-between flex-grow min-h-[80px]">
                      <h3 className="font-display font-semibold text-base text-[var(--color-ink)] group-hover:text-[var(--color-blue)] transition-colors leading-snug line-clamp-2">
                        {cat.title}
                      </h3>
                      <span className="inline-flex items-center justify-center gap-1 font-mono text-xs font-semibold text-[var(--color-blue)] group-hover:text-[var(--color-amber-dark)] mt-2 group-hover:translate-x-1 transition-all">
                        Explore Category <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: FEATURED PRODUCTS SHOWCASE GRID (Covering All 4 Product Lines) */}
        {/* ========================================================================= */}
        <section className="py-16 bg-[var(--color-bone)] border-t border-[var(--color-line)]">
          <Container>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-blue)] font-bold block mb-2">
                FEATURED PRODUCTS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] uppercase tracking-tight text-balance">
                FEATURED INDUSTRIAL PACKAGING PRODUCTS
              </h2>
              <div className="mt-3 h-1 w-16 bg-[var(--color-amber)] mx-auto rounded-full" />
              <p className="mt-4 text-[var(--color-mute)] text-sm sm:text-base">
                Discover our specialized films, labels, tapes, and strapping manufactured to exact technical standards.
              </p>
            </div>

            {/* Product Cards Grid (Covering Films, Labels, Tapes & Strapping) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {featuredProducts.map((prod, i) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <Link
                    href={`/products/${prod.id}`}
                    className="group flex flex-col h-full rounded-2xl border border-[var(--color-line)] bg-white overflow-hidden shadow-sm hover:shadow-lift hover:border-[var(--color-blue)] transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-bone)]">
                      <OptimizedImage
                        src={prod.image}
                        alt={prod.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[var(--color-ink)] rounded-full shadow-sm">
                          {prod.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-display text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-blue)] transition-colors leading-snug">
                          {prod.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[var(--color-mute)] line-clamp-3 leading-relaxed">
                          {prod.blurb}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[var(--color-line)] flex items-center justify-between font-mono text-xs font-semibold text-[var(--color-blue)] group-hover:text-[var(--color-amber-dark)] transition-colors">
                        <span>View Product Specifications</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Banner */}
        <CTABanner />
      </PageWrapper>

      <Footer />
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  );
}




