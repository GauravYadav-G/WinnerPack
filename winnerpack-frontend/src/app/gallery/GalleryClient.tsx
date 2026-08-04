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

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "/images/gallery/team_office_celebration.jpg",
  },
  {
    id: 2,
    image: "/images/gallery/team_rafting_expedition.jpg",
  },
  {
    id: 3,
    image: "/images/gallery/team_river_beach.jpg",
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
          intro="A glimpse into our work culture, team activities, and corporate environment."
          crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        />

        {/* Dynamic Visual Gallery Section */}
        <section className="py-12 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            
            {/* Visual-First Equal-Height Large Photo Grid */}
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
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
                    className="group relative overflow-hidden rounded-2xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none"
                  >
                    {/* Large Uniform Aspect-Ratio Image Container */}
                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[var(--color-bone)]">
                      <img
                        src={item.image}
                        alt="Gallery Image"
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
