"use client";
import { Suspense } from "react";
import { productCategories } from "../../data";
import { Container } from "@/components/ui/primitives";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import OptimizedImage from '@/components/OptimizedImage';

// Additional Featured Products for the showcase section
const featuredProducts = [
  {
    id: "flexible-laminated-rolls",
    title: "Flexible Laminated Rolls & Pouches",
    category: "film-products",
    tag: "Multi-Layer Laminates",
    blurb: "High-barrier 2-layer, 3-layer, and 4-layer laminated packaging rolls & pouches printed up to 8 colors for food, FMCG, and pharma packaging.",
    image: "/images/products/lamination-films-pouches/image.png",
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
    id: "ldpe-bags",
    title: "LDPE Poly Bags & Sacks",
    category: "film-products",
    tag: "Cleanroom & Industrial Bags",
    blurb: "Antistatic ESD poly bags, biohazard specimen bags, black refuse sacks, ice bags, poly mailers, and soft loop handle bags.",
    image: "/images/products/ldpe-films-pouches/applications/app-3.png",
  },
  {
    id: "stretch-film",
    title: "Industrial Stretch Film Rolls",
    category: "film-products",
    tag: "Pallet Unitization",
    blurb: "Hand and machine-grade cast stretch films delivering up to 300% pre-stretch for secure pallet unitization and transoceanic shipping.",
    image: "/images/products/stretch-film/image.png",
  },
  {
    id: "bopp-films",
    title: "BOPP Films & Display Pouches",
    category: "film-products",
    tag: "High-Clarity Overwrap",
    blurb: "Bi-axially oriented polypropylene plain, corona-treated, and heat-sealable rolls & glass-clear retail display pouches with header slots.",
    image: "/images/products/bopp-films-pouches/image.png",
  },
  {
    id: "pvc-shrink-films",
    title: "PVC Heat Shrink Films",
    category: "film-products",
    tag: "Tamper-Evident Shrink",
    blurb: "High-gloss PVC shrink rolls and pre-formed open-end pouches providing 40-50% TD shrinkage at low activation temperatures for multi-packs.",
    image: "/images/products/pvc-shrink-rolls-pouches/image.png",
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
                  WinnerPack Industry Expertise
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-ink)] text-balance">
                  Multilayer Films & Industrial Packaging Solutions
                </h2>
                <div className="w-20 h-1 bg-[var(--color-amber)] rounded-full mb-2" />
              </div>

              <div className="mt-6 space-y-4 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed">
                <p>
                  Established as one of the leading organizations engaged in manufacturing, supplying, and exporting a wide collection of <strong className="text-[var(--color-ink)] font-semibold">Multilayer Films and Flexible Laminates in Rolls & Pouches</strong>. Our comprehensive range consists of Unprinted PE Films, Printed PE Films (Milk, Ghee, SMP, Water), Flexible Laminated Rolls and Pouches, Shrink Films (POF, LDPE, PVC), Wrap-Around Labels, Lidding Foils, Stretch Films, and Industrial Poly Bags. We manufacture all our products using prime virgin raw materials, which are procured from trustworthy multinational resin vendors. All our products are widely used in various industries for packaging purposes and are known for their durability, seamless finish, barrier protection, and tear resistance.
                </p>
                <p>
                  Promoted by technocrats that have decades of hands-on experience in this domain, we have been successfully providing our clients with high quality products as per their exact specifications. Our modern manufacturing facility, equipped with advanced multi-layer blown film extrusion lines, high-speed rotogravure & flexographic printing presses, and automated pouch converting machinery, enables us to fabricate all our products in accordance with global quality standards. Besides this, our team of expert professionals work in close proximity with our clients to understand their exact packaging demands in a better way.
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
                    Since our inception, WinnerPack as a packaging material manufacturer has left no stone unturned in improving and identifying the needs of our clients who come from different industrial spheres. Delivering quality packaging products worldwide with successful application and satisfied client base have been the backbone of our company.
                  </p>
                  <p>
                    The products manufactured at WinnerPack include: high-clarity stretch film, machine stretch film, surface protection film, flexible packaging material, laminated pouches, milk packaging film, water packaging film, collation shrink film, LDPE poly bags, BOPP films, and specialized industrial tapes.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-line)] flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)] font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Prime Virgin Resins
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-ink)] font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> FDA Food-Safe Certified
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: ALTERNATING FEATURE SECTIONS (Reference Images 3 & 4)            */}
        {/* ========================================================================= */}

        {/* FEATURE BLOCK 1: Food Grade Packaging Material (Image 3 Top) */}
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
                  FOOD GRADE PACKAGING MATERIAL
                </h3>
                <div className="w-14 h-1 bg-[var(--color-amber)] mb-6" />

                <div className="space-y-4 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed">
                  <p>
                    All the packaging material manufactured by us is quality tested and made from superior quality 100% prime virgin raw materials, and once it is manufactured it is labelled as food grade.
                  </p>
                  <p>
                    Being one of the major suppliers of packaging products in India and worldwide, WinnerPack has ensured that only the best is catered to the client with the help of hi-tech engineering and a skilled team of experts. Our films block moisture, oxygen, and UV light, preserving fresh taste and nutritional value over long-term shelf storage.
                  </p>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* FEATURE BLOCK 2: Food Packaging & Flexible Laminates (Image 3 Bottom / 4 Top) */}
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
                FOOD PACKAGING INDIA & GLOBAL MARKETS
              </h3>
              <div className="w-16 h-1 bg-[var(--color-amber)] mb-6" />

              <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed">
                <p>
                  We provide Food Packaging Material as per the demand of our customers in India and across the world. We customize the packaging product as per the specifications provided by our clients, ensuring maximum satisfaction for them.
                </p>
                <p>
                  Using the latest technology we ensure that quality of our packaging product is never compromised at the time when it is manufactured. We have a host of our Exclusive Design Patterns from which the customer can choose the packaging design which best suits their requirement. Our Packaging Material has features like Multiple Barrier Sealing Support, good intact sealing results in freshness of food for a longer period of time, and printed packaging materials that can have your company logo, colors and designs.
                </p>
                <p>
                  The Packaging Material that we use is of a superior quality as we use nothing but the best when it comes to Food Packaging Material.
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
                alt="WinnerPack Food Packaging Warehouse Dispatch"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>
        </section>

        {/* FEATURE BLOCK 3: Advanced Industrial Packaging (Image 4 Bottom) */}
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
                  Global Supply Leader
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)] uppercase tracking-tight mb-4 text-balance">
                  PACKAGING MATERIAL EXCELLENCE
                </h3>
                <div className="w-14 h-1 bg-[var(--color-amber)] mb-6" />

                <div className="space-y-4 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed">
                  <p>
                    WinnerPack is a leading spearhead in the Packaging Industry, providing excellent packaging solutions in accord with diverse industry needs.
                  </p>
                  <p>
                    After gaining momentum in the Packaging Industry, WinnerPack has extended its manufacturing capabilities to engineer specialized high-strength films, stretch wraps, barrier laminates, and custom labels serving pharmaceuticals, dairy, electronics, agriculture, and logistics worldwide.
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
        {/* SECTION 5: MAIN CATEGORIES GRID (4 Square Cards)                           */}
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
                Explore our primary product categories engineered for high tensile strength, load stability, and barrier protection.
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
        {/* SECTION 6: FEATURED PRODUCTS SHOWCASE GRID (Reference Image 5)             */}
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
                Discover our specialized packaging solutions manufactured to exact technical standards.
              </p>
            </div>

            {/* Product Cards Grid (Image 5 style) */}
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




