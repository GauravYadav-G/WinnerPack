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
  image: string;
  aspectRatio?: string;
}

const mainHeaderImage: GalleryItem = {
  id: 1,
  image: "/images/gallery/team_office_celebration.jpg",
};

const secondaryImages: GalleryItem[] = [
  {
    id: 2,
    image: "/images/gallery/gallery_office_reception.jpg",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 3,
    image: "/images/gallery/gallery_plant_converting.jpg",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 4,
    image: "/images/gallery/gallery_extrusion_tower.jpg",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 5,
    image: "/images/gallery/gallery_factory_hall.jpg",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 6,
    image: "/images/gallery/gallery_slitting_machine.jpg",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 7,
    image: "/images/gallery/team_rafting_expedition.jpg",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 8,
    image: "/images/gallery/team_river_beach.jpg",
    aspectRatio: "aspect-[3/4]",
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
          intro="A glimpse into our work culture, manufacturing environment, and team activities."
          crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        />

        {/* Dynamic Visual Gallery Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-8 md:space-y-10">
            
            {/* ROW 1: Full-Width Uncropped Main Office Team Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedImage(mainHeaderImage)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 transition-all duration-500 cursor-pointer w-full select-none"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[var(--color-bone)] flex items-center justify-center">
                <img
                  src={mainHeaderImage.image}
                  alt="Winner Pack Team Celebration"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* ROW 2: Authentic Corporate & Factory Plant Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
              {secondaryImages.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * (idx + 1) }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none"
                >
                  <div className={`relative w-full ${item.aspectRatio || "aspect-[4/3]"} overflow-hidden bg-[var(--color-bone)]`}>
                    <img
                      src={item.image}
                      alt="Winner Pack Gallery Photo"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
        <CTABanner />
      </PageWrapper>

      {/* Lightbox Modal — White Theme (Pure Image View, No Heading / Description) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white border border-[var(--color-line)] rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl overflow-hidden flex flex-col items-center justify-center text-[var(--color-ink)]"
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-white/90 border border-[var(--color-line)] text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-amber)] hover:border-[var(--color-amber)] hover:text-white transition-all duration-300 shadow-md cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Ultra-Clean Framed Image Viewer */}
              <div className="relative w-full flex-1 bg-[var(--color-bone)] rounded-2xl border border-[var(--color-line)] flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8 min-h-[340px] max-h-[75vh] shadow-inner">
                <img
                  src={selectedImage.image}
                  alt="Gallery Image Preview"
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
