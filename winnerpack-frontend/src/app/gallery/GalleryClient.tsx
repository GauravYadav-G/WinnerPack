"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import FloatingWidgets from "@/components/FloatingWidgets";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus, X, ArrowUpRight } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  aspectRatio: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Annual Team Outing & Retreat",
    image: "/images/gallery/team_trek.png",
    description: "Annual mountain retreat celebrating teamwork, shared milestones, and collaborative growth.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 2,
    title: "Diwali Celebrations at Head Office",
    image: "/images/gallery/diwali_party.png",
    description: "Traditional lamps, beautiful Rangoli, and festive lunch with the team at Ghaziabad.",
    aspectRatio: "aspect-square",
  },
  {
    id: 3,
    title: "Collaborative Open Office Workspace",
    image: "/images/gallery/office_life.png",
    description: "Our modern collaborative engineering and operations workspace in Ghaziabad.",
    aspectRatio: "aspect-video",
  },
  {
    id: 4,
    title: "Annual Excellence Awards Ceremony",
    image: "/images/gallery/awards_ceremony.png",
    description: "Honoring outstanding performance milestones across our production and supply chain.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 5,
    title: "Weekend Team Trekking Expedition",
    image: "/images/gallery/team_trek.png",
    description: "Building trust and resilience during our weekend hiking and rafting trip.",
    aspectRatio: "aspect-video",
  },
  {
    id: 6,
    title: "Independence Day Flag Hoisting",
    image: "/images/gallery/diwali_party.png",
    description: "A proud gathering of our staff to celebrate national pride and corporate values.",
    aspectRatio: "aspect-square",
  },
  {
    id: 7,
    title: "Product Design & ESG Brainstorming",
    image: "/images/gallery/office_life.png",
    description: "Cross-functional teams collaborating on eco-friendly packaging materials.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 8,
    title: "New Year Celebration & Cake Cutting",
    image: "/images/gallery/diwali_party.png",
    description: "Welcoming the year with music, team activities, and resolutions.",
    aspectRatio: "aspect-video",
  },
  {
    id: 9,
    title: "Winner Pack Premier League Cricket",
    image: "/images/gallery/team_trek.png",
    description: "Friendly match bringing together sales, engineering, and logistics teams.",
    aspectRatio: "aspect-square",
  },
  {
    id: 10,
    title: "Office Chill & Recreation Zone",
    image: "/images/gallery/office_life.png",
    description: "A relaxed corner designed for breaks, conversations, and fresh thinking.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 11,
    title: "Monthly Milestone Celebrations",
    image: "/images/gallery/diwali_party.png",
    description: "Celebrating team birthdays and project deliveries together.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 12,
    title: "Cultural Team Trip to Taj Mahal",
    image: "/images/gallery/team_trek.png",
    description: "A memorable heritage trip with the entire operations and customer success teams.",
    aspectRatio: "aspect-video",
  },
];

export default function GalleryClient() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafb] text-[var(--color-text)]">
      <Navbar />

      <PageWrapper>
        {/* Figma Style Header Section */}
        <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 text-white">
          <div className="absolute inset-0 bg-stripes opacity-15 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[var(--color-blue)]/20 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <nav className="flex items-center gap-2 text-xs font-semibold text-white/50 mb-4 tracking-wider uppercase">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">Life at Winner Pack</span>
            </nav>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Life at Winner Pack
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/60 leading-relaxed font-normal">
              A glimpse into our vibrant work culture, team journeys, office environment, and corporate milestones.
            </p>
          </div>
        </section>

        {/* Dynamic Visual Gallery Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            
            {/* Visual-First Masonry-Style Photo Grid */}
            <motion.div 
              layout 
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              <AnimatePresence mode="popLayout">
                {galleryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedImage(item)}
                    className={`group relative overflow-hidden rounded-2xl bg-slate-900 cursor-pointer break-inside-avoid w-full ${item.aspectRatio}`}
                  >
                    {/* Visual Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Premium Subtle Shadow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                    {/* Content overlay visible on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="font-display text-lg font-bold leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-white/70 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Center Hover Action Icon */}
                    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Plus className="h-5 w-5" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>
        <CTABanner />
      </PageWrapper>

      {/* Immersive awards.com / Figma Style Lightbox Modal (Rendered outside PageWrapper to prevent transform coordinate limits) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full h-[85vh] sm:h-[80vh] bg-[#0c1322] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row"
            >
              
              {/* Left Section: Visual Image Viewer (65% width) */}
              <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden h-[50%] md:h-full">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-full max-w-full object-contain p-4 md:p-6"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Right Section: Premium Metadata details panel (35% width) */}
              <div className="w-full md:w-[360px] lg:w-[400px] bg-[#070d19] border-t md:border-t-0 md:border-l border-white/5 p-6 sm:p-8 flex flex-col justify-between h-[50%] md:h-full">
                
                {/* Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-blue)]">
                      LIFE AT WINNER PACK
                    </span>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="h-8 w-8 rounded-full bg-white/5 text-white/70 flex items-center justify-center hover:bg-white/15 hover:text-white transition-colors"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Center Details */}
                  <div className="space-y-4">
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                      {selectedImage.title}
                    </h3>
                    <div className="h-0.5 w-12 bg-[var(--color-amber)] rounded-full" />
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-normal">
                      {selectedImage.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Panel Branding */}
                <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    WPT © {new Date().getFullYear()}
                  </span>
                  <a
                    href="#contact"
                    onClick={() => setSelectedImage(null)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[var(--color-amber)] hover:text-white transition-colors"
                  >
                    Join our team
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
