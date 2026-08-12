"use client";
import { Suspense } from "react";
import { productCategories } from "../../data";
import { PageHeader } from "@/components/ui/PageHeader";
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
        {/* SECTION 1: DEDICATED PAGE HEADER (Matching Home / Inner Page Standards)     */}
        {/* ========================================================================= */}
        <PageHeader
          eyebrow="Product Catalog"
          title="Products"
          intro="Explore our specialized industrial packaging films, pouches, self-adhesive labels, high-tack tapes, and strapping rolls."
          crumbs={[
            { label: "Home", to: "/" },
            { label: "Products" },
          ]}
          align="center"
        />

        {/* ========================================================================= */}
        {/* SECTION 2: PRODUCT DESCRIPTION & FEATURED LDPE SHRINK FILM AT TOP          */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-[var(--color-bone)] py-10 sm:py-16 lg:py-20 border-b border-[var(--color-line)]">
          <div className="absolute inset-0 bg-grid-fine opacity-15 pointer-events-none" aria-hidden />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[var(--color-amber)]/5 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Header & Eyebrow */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-0.5 w-6 sm:w-8 bg-[var(--color-amber-dark)] rounded-full" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
                    Manufacturing Excellence & LDPE Shrink Solutions
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-snug sm:leading-[1.15] text-balance">
                  Complete Industrial Packaging Solutions — LDPE Shrink Film, Multilayer Laminates, Labels, Tapes & Strapping
                </h2>
              </div>

              {/* Product Description Narrative */}
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal">
                <p>
                  Winner Pack Technologies Pvt. Ltd. is a pioneer in manufacturing, supplying, and exporting high-performance <strong className="text-[var(--color-ink)] font-semibold">LDPE Shrink Film, Multilayer Co-Extruded Barrier Films, Self-Adhesive Labels, Box Sealing Tapes, and PET/PP Strapping Rolls</strong>. Our heavy-duty <strong className="text-[var(--color-ink)] font-semibold">LDPE Collation Shrink Film</strong> is specially engineered for high-speed automated packaging of mineral water bottle multipacks, carbonated soft drinks, food cans, and bulk retail goods — delivering superior puncture resistance, high holding force, and crystal-clear clarity.
                </p>
                <p>
                  Promoted by technocrats with decades of hands-on experience, our modern manufacturing facility features multi-layer blown film extrusion towers, high-speed rotogravure & flexographic printing presses up to 8 colors, and automated converting machinery. We fabricate all products using 100% prime virgin food-grade raw materials adhering strictly to international ISO & FDA compliance standards.
                </p>
              </div>

              {/* Full-Width Landscape LDPE Shrink Film Image (Exact Width of Text Container) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-line)] bg-white shadow-xl group"
              >
                <OptimizedImage
                  src="/images/products/ldpe-shrink-film/ldpe-bottle-wrap.jpg"
                  alt="LDPE Shrink Film Collation Wrap for Water Bottles Multipacks"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 text-white pointer-events-none">
                  <span className="inline-block px-3 py-1 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[var(--color-blue-deep)]/90 backdrop-blur-md text-white rounded-full shadow-sm">
                    Featured: Heavy-Duty LDPE Collation Shrink Film Bottle Packaging
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: WHAT WE DO (Matching Home Page Section Layout)                 */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-white py-10 sm:py-16 md:py-24 border-b border-[var(--color-line)]">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid gap-8 md:gap-12 lg:grid-cols-12 items-center">
              
              {/* Left Content Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-4 sm:space-y-6"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-0.5 w-6 sm:w-8 bg-[var(--color-amber-dark)] rounded-full" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
                    What We Do
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight text-balance">
                  Packaging Material Manufacturer
                </h2>
                <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full" />

                <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed font-normal">
                  <p>
                    Since our inception, WinnerPack as a packaging material manufacturer has left no stone unturned in improving and identifying the needs of our clients who come from different industrial spheres. Delivering quality packaging products worldwide with successful application and a satisfied client base forms the backbone of our company.
                  </p>
                  <p>
                    The products manufactured at WinnerPack include: machine & hand stretch films, surface protection films, LDPE poly bags & shipping sacks, flexible laminated barrier pouches, milk & water packaging films, self-adhesive product labels & barcode stickers, high-tack BOPP box sealing & printed tapes, and high-tensile PET/PP strapping rolls.
                  </p>
                </div>
              </motion.div>

              {/* Right Feature Card Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-line)] bg-[var(--color-bone)] shadow-xl group">
                  <OptimizedImage
                    src="/images/desktop/portfolio/ldpe_app_cargo.png"
                    alt="WinnerPack Industrial Cargo Packaging"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: ALTERNATING FEATURE BLOCKS (Home Page Card & Typography Style) */}
        {/* ========================================================================= */}

        {/* Feature Block 1: Food Grade Materials */}
        <section className="py-10 sm:py-16 md:py-20 bg-[var(--color-mist)] border-b border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[var(--color-line)] bg-white group"
              >
                <OptimizedImage
                  src="/images/products/coloured-films-pouches/image.png"
                  alt="Food Grade Packaging Material"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-0.5 w-6 sm:w-8 bg-[var(--color-amber-dark)] rounded-full" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
                    Hygiene & Safety First
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-ink)] leading-snug text-balance">
                  Food Grade & Industrial Packaging Materials
                </h3>
                <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full" />

                <div className="space-y-3 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed">
                  <p>
                    All the packaging material manufactured by us is quality tested and made from superior quality 100% prime virgin raw materials. Once manufactured, our flexible films, laminated barrier pouches, and food-contact packaging are certified food grade.
                  </p>
                  <p>
                    Being one of the major suppliers of packaging products in India and worldwide, WinnerPack has ensured that only the best is catered to the client with the help of hi-tech engineering and a skilled team of experts. Our films block moisture, oxygen, and UV light, preserving fresh taste and nutritional value over long-term storage.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Block 2: Custom Printed Range */}
        <section className="py-10 sm:py-16 md:py-20 bg-white border-b border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-0.5 w-6 sm:w-8 bg-[var(--color-amber-dark)] rounded-full" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
                    Tailored Customization
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-ink)] leading-snug text-balance">
                  Custom Printed Films, Labels, Tapes & Strapping
                </h3>
                <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full" />

                <div className="space-y-3 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed">
                  <p>
                    We provide Food & Industrial Packaging Materials as per the exact demand of our customers in India and across the world. We customize packaging dimensions, barrier layers, label die-cuts, tape widths, and strap break-strengths ensuring maximum satisfaction for our clients.
                  </p>
                  <p>
                    Using advanced rotogravure & flexographic printing technology up to 8 colors, we deliver vibrant custom designs across barrier films, brand printed sealing tapes, barcode tracking labels, and printed strapping rolls with your company logo, graphics, and color specifications.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[var(--color-line)] bg-slate-900 group"
              >
                <OptimizedImage
                  src="/images/desktop/portfolio/product_app_warehouse_dispatch.png"
                  alt="WinnerPack Packaging Warehouse Dispatch"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Block 3: Industrial Cargo Unitization */}
        <section className="py-10 sm:py-16 md:py-20 bg-[var(--color-bone)] border-b border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[var(--color-line)] bg-slate-900 group"
              >
                <OptimizedImage
                  src="/images/desktop/portfolio/product_app_blown_film.png"
                  alt="Industrial Packaging Material Production"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col justify-center space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-0.5 w-6 sm:w-8 bg-[var(--color-amber-dark)] rounded-full" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono">
                    End-to-End Industrial Packaging
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-ink)] leading-snug text-balance">
                  Complete Industrial Packaging Excellence
                </h3>
                <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full" />

                <div className="space-y-3 text-xs sm:text-base text-[var(--color-mute)] leading-relaxed">
                  <p>
                    WinnerPack is a leading spearhead in the Packaging Industry, providing excellent packaging solutions in accord with diverse industry needs.
                  </p>
                  <p>
                    From high-stretch machine wrap securing heavy palletized cargo during transoceanic shipping, to printed box sealing tapes, thermal barcode tracking labels, and high-tensile PET strapping rolls, WinnerPack delivers complete end-to-end industrial load unitization.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-blue-deep)] hover:bg-[var(--color-ink)] text-white font-bold text-sm rounded-xl transition-colors shadow-md font-sans"
                  >
                    Request Custom Quote <ArrowRight className="w-4 h-4 text-[var(--color-amber)]" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: MAIN CATEGORIES GRID (Matching Home Page ProductCategories Header) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-white py-10 sm:py-16 md:py-24 border-b border-[var(--color-line)]">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            
            {/* Centered Executive Header (Identical to Home Page ProductCategories) */}
            <div className="text-center mb-6 sm:mb-12 flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
                Industrial Range & Categories
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight text-balance">
                Our Product Categories
              </h2>
              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
              <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[var(--color-mute)] max-w-2xl mx-auto">
                Explore our 4 primary product lines — engineered for high strength, clear identification, secure sealing, and pallet load unitization.
              </p>
            </div>

            {/* 4 Category Cards in Grid (Matching Home Page Product Cards) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
              {productCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <Link
                    href={`/product-category/${cat.id}`}
                    className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--color-line)] bg-white transition-all duration-300 hover:border-[var(--color-amber-dark)] hover:shadow-xl hover:-translate-y-1 block h-full"
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

                    <div className="p-4 sm:p-5 text-center bg-white flex flex-col justify-between flex-grow min-h-[90px]">
                      <h3 className="font-display font-bold text-sm sm:text-base text-[var(--color-ink)] group-hover:text-[var(--color-blue)] transition-colors leading-snug line-clamp-2">
                        {cat.title}
                      </h3>
                      <span className="inline-flex items-center justify-center gap-1 font-mono text-xs font-bold text-[var(--color-amber-dark)] mt-2 group-hover:translate-x-1 transition-all">
                        Explore Category <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: FEATURED PRODUCTS SHOWCASE GRID (Home Page Card & Grid Style) */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-[var(--color-bone)] py-10 sm:py-16 md:py-24 border-b border-[var(--color-line)]">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            
            {/* Centered Executive Header (Identical to Home Page Header) */}
            <div className="text-center mb-6 sm:mb-12 flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[var(--color-amber-dark)] font-mono mb-1.5 sm:mb-2">
                Featured Industrial Products
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight text-balance">
                Featured Packaging Line
              </h2>
              <div className="mt-3 sm:mt-4 h-1 sm:h-1.5 w-12 sm:w-16 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-2)] rounded-full mx-auto" />
              <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[var(--color-mute)] max-w-2xl mx-auto">
                Discover our specialized films, labels, tapes, and strapping manufactured to exact technical standards.
              </p>
            </div>

            {/* Product Cards Grid (Home Page Card Styling) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
              {featuredProducts.map((prod, i) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <Link
                    href={`/products/${prod.id}`}
                    className="group flex flex-col h-full rounded-2xl border border-[var(--color-line)] bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--color-amber-dark)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-bone)]">
                      <OptimizedImage
                        src={prod.image}
                        alt={prod.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[var(--color-ink)] rounded-full shadow-sm">
                          {prod.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-display text-base sm:text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-blue)] transition-colors leading-snug">
                          {prod.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[var(--color-mute)] line-clamp-3 leading-relaxed">
                          {prod.blurb}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[var(--color-line)] flex items-center justify-between font-mono text-xs font-bold text-[var(--color-amber-dark)] group-hover:text-[var(--color-blue)] transition-colors">
                        <span>View Product Specifications</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
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




