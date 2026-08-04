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
  title?: string;
}

// 1. Top Hero: Uncropped Winner Pack Team Office Celebration Photo
const mainHeroImage: GalleryItem = {
  id: 1,
  image: "/images/gallery/team_office_celebration.jpg",
  title: "Winner Pack Team Celebration",
};

// Block 1: Left Portrait 1 + Right Stacked Landscapes
const portraitImage1: GalleryItem = {
  id: 2,
  image: "/images/gallery/team_rafting_expedition.jpg",
  title: "Team Rafting Expedition",
};

const block1Landscapes: GalleryItem[] = [
  {
    id: 3,
    image: "/images/gallery/gallery_plant_converting.jpg",
    title: "Pouch Converting & Slitting Hall",
  },
  {
    id: 4,
    image: "/images/gallery/gallery_office_reception.jpg",
    title: "Winner Pack Corporate Reception",
  },
];

// Block 2: Left Stacked Landscapes + Right Portrait 2
const block2Landscapes: GalleryItem[] = [
  {
    id: 5,
    image: "/images/gallery/gallery_extrusion_tower.jpg",
    title: "Multilayer Blown Film Extrusion Tower",
  },
  {
    id: 6,
    image: "/images/gallery/gallery_factory_hall.jpg",
    title: "Manufacturing Machinery Hall Overview",
  },
];

const portraitImage2: GalleryItem = {
  id: 7,
  image: "/images/gallery/team_river_beach.jpg",
  title: "Team River Beach Gathering",
};

// Bottom Closing Banner: Automatic High-Speed Slitting Machine
const bottomBannerImage: GalleryItem = {
  id: 8,
  image: "/images/gallery/gallery_slitting_machine.jpg",
  title: "Automatic High-Speed Slitting Machine",
};

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

        {/* Dynamic Visual Collage Gallery Section (Stretched max-w-[1536px]) */}
        <section className="py-10 md:py-16 bg-white">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 md:px-10 lg:px-12 space-y-8 md:space-y-12">
            
            {/* 1. TOP HERO: Full-Width Uncropped Main Office Team Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedImage(mainHeroImage)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 transition-all duration-500 cursor-pointer w-full select-none"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[var(--color-bone)] flex items-center justify-center">
                <img
                  src={mainHeroImage.image}
                  alt={mainHeroImage.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* 2. COLLAGE BLOCK A: Single Full-Width Portrait 1 (Left) + 2 Stacked Landscapes (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              
              {/* Left Column: Full-Width Single Portrait 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => setSelectedImage(portraitImage1)}
                className="lg:col-span-5 group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none h-full"
              >
                <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] aspect-[3/4] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                  <img
                    src={portraitImage1.image}
                    alt={portraitImage1.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Right Column: 2 Stacked Landscape Plant Photos */}
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 justify-between">
                {block1Landscapes.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * (idx + 1) }}
                    onClick={() => setSelectedImage(item)}
                    className="group relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none"
                  >
                    <div className="relative w-full h-full min-h-[190px] sm:min-h-[220px] aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* 3. COLLAGE BLOCK B: 2 Stacked Landscapes (Left) + Single Full-Width Portrait 2 (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              
              {/* Left Column: 2 Stacked Landscape Plant Photos */}
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 justify-between order-2 lg:order-1">
                {block2Landscapes.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * (idx + 1) }}
                    onClick={() => setSelectedImage(item)}
                    className="group relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none"
                  >
                    <div className="relative w-full h-full min-h-[190px] sm:min-h-[220px] aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Full-Width Single Portrait 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => setSelectedImage(portraitImage2)}
                className="lg:col-span-5 group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none h-full order-1 lg:order-2"
              >
                <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] aspect-[3/4] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                  <img
                    src={portraitImage2.image}
                    alt={portraitImage2.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </motion.div>

            </div>

            {/* 4. BOTTOM BANNER: High-Speed Slitting Machine Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setSelectedImage(bottomBannerImage)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 transition-all duration-500 cursor-pointer w-full select-none"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[var(--color-bone)] flex items-center justify-center">
                <img
                  src={bottomBannerImage.image}
                  alt={bottomBannerImage.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
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
