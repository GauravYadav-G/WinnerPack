"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import FloatingWidgets from "@/components/FloatingWidgets";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
    description: "Traditional lamps, beautiful Rangoli, and festive celebrations with the team.",
    aspectRatio: "aspect-square",
  },
  {
    id: 3,
    title: "Collaborative Open Office Workspace",
    image: "/images/gallery/office_life.png",
    description: "Our modern collaborative engineering and operations workspace.",
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

  // Auto-close image preview modal on page scroll
  useEffect(() => {
    if (!selectedImage) return;

    const handleScroll = () => {
      setSelectedImage(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-[#fafafb] text-[var(--color-text)]">
      <Navbar />

      <PageWrapper>
        <PageHeader
          eyebrow="Gallery"
          title="Gallery"
          intro="A glimpse into our vibrant work culture, team journeys, office environment, and corporate milestones."
          crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        />

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
                    className="group relative overflow-hidden rounded-2xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer break-inside-avoid w-full flex flex-col mb-6 select-none"
                  >
                    {/* Centered Heading Above Image */}
                    <div className="py-3.5 px-4 text-center bg-white group-hover:bg-[var(--color-mist)] border-b border-[var(--color-line)] transition-colors duration-300">
                      <h3 className="font-display text-xs sm:text-sm font-bold text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-amber-dark)] transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    {/* Crisp Visual Image Container */}
                    <div className={`relative w-full overflow-hidden bg-[var(--color-bone)] ${item.aspectRatio}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>
        <CTABanner />
      </PageWrapper>

      {/* Lightbox Modal — White Theme */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white border border-[var(--color-line)] rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl overflow-hidden flex flex-col text-[var(--color-ink)]"
            >
              {/* Top Header Bar: Centered Glass Pill Heading */}
              <div className="relative px-2 sm:px-4 py-2 flex items-center justify-between border-b border-[var(--color-line)] pb-4">
                <div className="w-9" /> {/* Spacer */}
                
                <div className="px-5 py-2 rounded-full bg-[var(--color-bone)] border border-[var(--color-line)] shadow-2xs text-center max-w-xl">
                  <h3 className="font-display text-xs sm:text-sm md:text-base font-extrabold text-[var(--color-ink)] tracking-tight leading-tight">
                    {selectedImage.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="h-9 w-9 rounded-full bg-[var(--color-bone)] border border-[var(--color-line)] text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-amber)] hover:border-[var(--color-amber)] hover:text-white transition-all duration-300 shadow-2xs cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Ultra-Clean Framed Image Viewer */}
              <div className="relative flex-1 bg-[var(--color-bone)] rounded-2xl border border-[var(--color-line)] flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8 min-h-[340px] max-h-[70vh] shadow-inner mt-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-md border border-[var(--color-line)] bg-white p-2 transition-transform duration-300"
                />
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
