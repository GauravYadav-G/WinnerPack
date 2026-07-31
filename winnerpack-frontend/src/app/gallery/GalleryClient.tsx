"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import FloatingWidgets from "@/components/FloatingWidgets";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Maximize2, X, Tag } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  tag: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "High-Tensile PET Strapping Rolls",
    category: "strapping",
    tag: "Strapping Rolls",
    image: "/images/desktop/strapping_rolls/pet_strap.png",
    description: "Embossed and smooth PET strap rolls engineered for heavy payload palletization and high breaking strength.",
  },
  {
    id: 2,
    title: "Polypropylene (PP) Strap Rolls",
    category: "strapping",
    tag: "Strapping Rolls",
    image: "/images/desktop/strapping_rolls/pp_strap.png",
    description: "Virgin PP strapping rolls designed for automatic strapping lines with zero feed jam maintenance.",
  },
  {
    id: 3,
    title: "High-Cling LLDPE Stretch Film Rolls",
    category: "films",
    tag: "Stretch & Shrink Films",
    image: "/images/desktop/stretch_films/cast_stretch.png",
    description: "Multi-layer cast LLDPE stretch wrap with up to 300% pre-stretch capability for load stabilization.",
  },
  {
    id: 4,
    title: "BOPP Self-Adhesive Packing Tapes",
    category: "tapes",
    tag: "BOPP Tapes",
    image: "/images/desktop/bopp_tapes/transparent_bopp.png",
    description: "High-micron acrylic adhesive BOPP sealing tapes available in transparent, brown, and custom printed variants.",
  },
  {
    id: 5,
    title: "Polyolefin (POF) Shrink Film",
    category: "films",
    tag: "Stretch & Shrink Films",
    image: "/images/desktop/shrink_films/pof_shrink.png",
    description: "Crystal-clear 5-layer POF shrink film for retail presentation and moisture-proof bundling.",
  },
  {
    id: 6,
    title: "Air Bubble Wrap Protective Rolls",
    category: "protective",
    tag: "Protective Packaging",
    image: "/images/desktop/protective/air_bubble.png",
    description: "Shock-absorbing polyethylene air bubble rolls engineered for fragile e-commerce cushioning.",
  },
  {
    id: 7,
    title: "Ghaziabad Plant Extrusion Facility",
    category: "plant",
    tag: "Plant & Production",
    image: "/images/desktop/industries/ecommerce_logistics_industry.png",
    description: "State-of-the-art continuous co-extrusion lines operating in Ghaziabad, UP.",
  },
  {
    id: 8,
    title: "Batch Tensile & Elongation Testing",
    category: "quality",
    tag: "Quality Testing",
    image: "/images/desktop/industries/electronics_industry.png",
    description: "Rigorous QMS tensile load and adhesive micron checks performed before dispatch.",
  },
  {
    id: 9,
    title: "Custom Printed Logo BOPP Tapes",
    category: "tapes",
    tag: "BOPP Tapes",
    image: "/images/desktop/bopp_tapes/printed_bopp.png",
    description: "Brand-customized rotogravure printed sealing tapes for tamper-evident shipping.",
  },
  {
    id: 10,
    title: "Heavy-Duty Pallet Wrap Machine Rolls",
    category: "films",
    tag: "Stretch & Shrink Films",
    image: "/images/desktop/stretch_films/machine_stretch.png",
    description: "Puncture-resistant machine-grade stretch film rolls for high-speed automated turntable wrappers.",
  },
  {
    id: 11,
    title: "Biodegradable & Recyclable Mailer Bags",
    category: "protective",
    tag: "Protective Packaging",
    image: "/images/desktop/protective/courier_bags.png",
    description: "Eco-friendly courier envelopes and bubble mailers compliant with ESG mandates.",
  },
  {
    id: 12,
    title: "Dispatch & Warehouse Storage Hub",
    category: "plant",
    tag: "Plant & Production",
    image: "/images/desktop/industries/food_fmcg_industry.png",
    description: "Surplus annual inventory facility ensuring same-day dispatch across 1,200+ pin codes.",
  },
];

const categories = [
  { id: "all", name: "All Showcase" },
  { id: "strapping", name: "Strapping Rolls" },
  { id: "films", name: "Stretch & Shrink Films" },
  { id: "tapes", name: "BOPP Tapes" },
  { id: "protective", name: "Protective Packaging" },
  { id: "plant", name: "Plant & Operations" },
  { id: "quality", name: "Quality Testing" },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Navbar />

      <PageWrapper>
        {/* Breadcrumb Header */}
        <section className="relative overflow-hidden bg-[var(--color-ink)] py-12 md:py-20 text-white">
          <div className="bg-noise absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
          <div className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-blue)]/15 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <nav className="flex items-center gap-2 text-xs font-medium text-white/60 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">Gallery</span>
            </nav>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
              Packaging & Plant Gallery
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
              Explore our comprehensive portfolio of high-tensile strapping rolls, stretch films, BOPP tapes, and state-of-the-art Ghaziabad manufacturing operations.
            </p>
          </div>
        </section>

        {/* Gallery Content Section */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "bg-[var(--color-blue)] text-white shadow-md"
                      : "bg-white text-[var(--color-mute)] hover:bg-slate-100 border border-[var(--color-line)]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedImage(item)}
                    className="group relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[var(--color-blue)] cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-60 sm:h-64 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      {/* Zoom Icon Button */}
                      <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm text-[var(--color-ink)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <Maximize2 className="h-4 w-4" />
                      </div>

                      {/* Tag Badge */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-blue)]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                        <Tag className="h-3 w-3" />
                        {item.tag}
                      </div>
                    </div>

                    {/* Info Body */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-blue)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[var(--color-mute)] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative h-80 sm:h-[450px] w-full bg-slate-100">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="h-full w-full object-contain bg-slate-900"
                  />
                </div>

                <div className="p-6 sm:p-8 bg-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-blue-soft)] text-[var(--color-blue)] text-xs font-bold uppercase tracking-wider mb-2">
                    {selectedImage.tag}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                    {selectedImage.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-mute)] leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <CTABanner />
      </PageWrapper>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
