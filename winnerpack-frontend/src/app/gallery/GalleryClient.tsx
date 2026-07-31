"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import FloatingWidgets from "@/components/FloatingWidgets";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Plus, X } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  aspectRatio: string; // Dynamic aspect ratio for a premium masonry look
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Annual Team Outing & Retreat",
    category: "trips",
    tag: "Team Outings",
    image: "/images/gallery/team_trek.png",
    description: "Annual mountain retreat celebrating teamwork, shared milestones, and collaboration.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 2,
    title: "Diwali Celebrations at Head Office",
    category: "events",
    tag: "Celebrations",
    image: "/images/gallery/diwali_party.png",
    description: "Traditional lamps, beautiful Rangoli, and festive lunch with the team.",
    aspectRatio: "aspect-square",
  },
  {
    id: 3,
    title: "Collaborative Open Office Workspace",
    category: "office",
    tag: "Office Life",
    image: "/images/gallery/office_life.png",
    description: "Our modern collaborative engineering and operations workspace in Ghaziabad.",
    aspectRatio: "aspect-video",
  },
  {
    id: 4,
    title: "Annual Excellence Awards Ceremony",
    category: "events",
    tag: "Celebrations",
    image: "/images/gallery/awards_ceremony.png",
    description: "Honoring outstanding performance milestones across our production and supply chain.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 5,
    title: "Weekend Team Trekking Expedition",
    category: "trips",
    tag: "Team Outings",
    image: "/images/gallery/team_trek.png",
    description: "Building trust and resilience during our weekend hiking and rafting trip.",
    aspectRatio: "aspect-video",
  },
  {
    id: 6,
    title: "Independence Day Flag Hoisting",
    category: "events",
    tag: "Celebrations",
    image: "/images/gallery/diwali_party.png",
    description: "A proud gathering of our staff to celebrate national pride and corporate values.",
    aspectRatio: "aspect-square",
  },
  {
    id: 7,
    title: "Product Design & ESG Brainstorming",
    category: "office",
    tag: "Office Life",
    image: "/images/gallery/office_life.png",
    description: "Cross-functional teams collaborating on eco-friendly packaging materials.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 8,
    title: "New Year Celebration & Cake Cutting",
    category: "events",
    tag: "Celebrations",
    image: "/images/gallery/diwali_party.png",
    description: "Welcoming the year with music, team activities, and resolutions.",
    aspectRatio: "aspect-video",
  },
  {
    id: 9,
    title: "Winner Pack Premier League Cricket",
    category: "trips",
    tag: "Team Outings",
    image: "/images/gallery/team_trek.png",
    description: "Friendly match bringing together sales, engineering, and logistics teams.",
    aspectRatio: "aspect-square",
  },
  {
    id: 10,
    title: "Office Chill & Recreation Zone",
    category: "office",
    tag: "Office Life",
    image: "/images/gallery/office_life.png",
    description: "A relaxed corner designed for breaks, conversations, and fresh thinking.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 11,
    title: "Monthly Milestone Celebrations",
    category: "events",
    tag: "Celebrations",
    image: "/images/gallery/diwali_party.png",
    description: "Celebrating team birthdays and project deliveries together.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 12,
    title: "Cultural Team Trip to Taj Mahal",
    category: "trips",
    tag: "Team Outings",
    image: "/images/gallery/team_trek.png",
    description: "A memorable heritage trip with the entire operations and customer success teams.",
    aspectRatio: "aspect-video",
  },
];

const categories = [
  { id: "all", name: "All Memories" },
  { id: "office", name: "Office Environment" },
  { id: "trips", name: "Team Outings & Trips" },
  { id: "events", name: "Events & Celebrations" },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

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
            
            {/* Minimalist Filter Navigation */}
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-slate-100 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                    activeCategory === cat.id
                      ? "bg-[var(--color-blue)] text-white shadow-sm"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Visual-First Masonry-Style Photo Grid */}
            <motion.div 
              layout 
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
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

                    {/* Premium Subtle Shadow Gradient (Hidden by default, fades in on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                    {/* Content overlay visible on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-amber)] mb-1">
                        {item.tag}
                      </span>
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Main image container */}
                <div className="relative h-80 sm:h-[480px] w-full bg-slate-950">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Text Description Box in Lightbox */}
                <div className="p-6 sm:p-8 bg-slate-950 border-t border-white/5 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[var(--color-amber)] text-[10px] font-bold uppercase tracking-widest mb-2">
                    {selectedImage.tag}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">
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
