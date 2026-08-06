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
import OptimizedImage from '@/components/OptimizedImage';

interface GalleryItem {
  id: number;
  image: string;
  title?: string;
  position?: string;
}

// 1. Top Hero: Uncropped Winner Pack Team Office Celebration Photo
const mainHeroImage: GalleryItem = {
  id: 1,
  image: "/images/gallery/team_office_celebration.jpg",
  title: "Winner Pack Team Celebration",
  position: "object-[center_35%]"
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

// Block 3: Team Tour Photos — Portrait (Left) + Landscape (Right)
const portraitImage3: GalleryItem = {
  id: 9,
  image: "/images/gallery/new_gallery_2.png",
  title: "Winner Pack Team Tour Group Photo",
};

const block3Landscapes: GalleryItem[] = [
  {
    id: 10,
    image: "/images/gallery/new_gallery_1.png",
    title: "Team on Tour — Inside the Bus",
    position: "object-left", // Forces left-alignment to prevent cropping the left side
  },
];

// Bottom Closing Banners
const bottomBannerImage: GalleryItem = {
  id: 8,
  image: "/images/gallery/gallery_slitting_machine.jpg",
  title: "Automatic High-Speed Slitting Machine",
};

const facadeBannerImage: GalleryItem = {
  id: 11,
  image: "/images/gallery/factory_building_facade.jpg",
  title: "Winner Pack Technologies Pvt. Ltd. — Factory Headquarters",
};

export default function GalleryClient() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // DB States
  const [mainHero, setMainHero] = useState<GalleryItem>(mainHeroImage);
  const [portrait1, setPortrait1] = useState<GalleryItem>(portraitImage1);
  const [b1Landscapes, setB1Landscapes] = useState<GalleryItem[]>(block1Landscapes);
  const [b2Landscapes, setB2Landscapes] = useState<GalleryItem[]>(block2Landscapes);
  const [portrait2, setPortrait2] = useState<GalleryItem>(portraitImage2);
  const [portrait3, setPortrait3] = useState<GalleryItem>(portraitImage3);
  const [b3Landscapes, setB3Landscapes] = useState<GalleryItem[]>(block3Landscapes);
  const [bottomBanner, setBottomBanner] = useState<GalleryItem>(bottomBannerImage);
  const [facadeBanner, setFacadeBanner] = useState<GalleryItem>(facadeBannerImage);

  // Fetch dynamic gallery content from DB if active
  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/content?key=gallery");
        if (res.ok) {
          const result = await res.json();
          const content = result?.data || result;
          if (content) {
            if (content.mainHero) setMainHero(content.mainHero);
            if (Array.isArray(content.portraits)) {
              if (content.portraits[0]) setPortrait1(content.portraits[0]);
              if (content.portraits[1]) setPortrait2(content.portraits[1]);
              if (content.portraits[2]) setPortrait3(content.portraits[2]);
            }
            if (Array.isArray(content.landscapes)) {
              const l = content.landscapes;
              // Map landscapes to layout blocks dynamically
              if (l[0] && l[1]) setB1Landscapes([l[0], l[1]]);
              else if (l[0]) setB1Landscapes([l[0]]);

              if (l[2] && l[3]) setB2Landscapes([l[2], l[3]]);
              else if (l[2]) setB2Landscapes([l[2]]);

              if (l[4] && l[5]) setB3Landscapes([l[4], l[5]]);
              else if (l[4]) setB3Landscapes([l[4]]);

              if (l[6]) setBottomBanner(l[6]);
              if (l[7]) setFacadeBanner(l[7]);
            }
          }
        }
      } catch (err) {
        console.warn("Could not load gallery from DB, using defaults:", err);
      }
    }
    fetchGallery();
  }, []);

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
              onClick={() => setSelectedImage(mainHero)}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 transition-all duration-500 cursor-pointer w-full select-none"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9.5] overflow-hidden bg-[var(--color-bone)] flex items-center justify-center">
                <OptimizedImage
  src={mainHero.image}
  alt={mainHero.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${mainHero.position || "object-[center_35%]"}`}
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
                onClick={() => setSelectedImage(portrait1)}
                className="lg:col-span-5 group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none h-full"
              >
                <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] aspect-[3/4] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                  <OptimizedImage
  src={portrait1.image}
  alt={portrait1.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${portrait1.position || "object-center"}`}
/>
                </div>
              </motion.div>

              {/* Right Column: 2 Stacked Landscape Plant Photos */}
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 justify-between">
                {b1Landscapes.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * (idx + 1) }}
                    onClick={() => setSelectedImage(item)}
                    className="group relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none"
                  >
                    <div className="relative w-full h-full min-h-[190px] sm:min-h-[220px] aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                      <OptimizedImage
  src={item.image}
  alt={item.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${item.position || "object-center"}`}
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
                {b2Landscapes.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * (idx + 1) }}
                    onClick={() => setSelectedImage(item)}
                    className="group relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none"
                  >
                    <div className="relative w-full h-full min-h-[190px] sm:min-h-[220px] aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                      <OptimizedImage
  src={item.image}
  alt={item.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${item.position || "object-center"}`}
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
                onClick={() => setSelectedImage(portrait2)}
                className="lg:col-span-5 group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none h-full order-1 lg:order-2"
              >
                <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] aspect-[3/4] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                  <OptimizedImage
  src={portrait2.image}
  alt={portrait2.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${portrait2.position || "object-center"}`}
/>
                </div>
              </motion.div>

            </div>

            {/* 4. COLLAGE BLOCK C: Team Tour Portrait (Left) + Bus Interior Landscape (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

              {/* Left Column: Team Tour Portrait */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => setSelectedImage(portrait3)}
                className="lg:col-span-5 group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none h-full"
              >
                <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] aspect-[3/4] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                  <OptimizedImage
  src={portrait3.image}
  alt={portrait3.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${portrait3.position || "object-center"}`}
/>
                </div>
              </motion.div>

              {/* Right Column: Bus Interior Landscape */}
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 justify-between">
                {b3Landscapes.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * (idx + 1) }}
                    onClick={() => setSelectedImage(item)}
                    className="group relative flex-1 overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer w-full flex flex-col select-none"
                  >
                    <div className="relative w-full h-full min-h-[360px] sm:min-h-[460px] aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--color-bone)]">
                      <OptimizedImage
  src={item.image}
  alt={item.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${item.position || "object-center"}`}
/>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* 5. BOTTOM BANNER: Slitting Machine + HQ Facade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => setSelectedImage(bottomBanner)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 transition-all duration-500 cursor-pointer w-full select-none"
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[var(--color-bone)] flex items-center justify-center">
                  <OptimizedImage
  src={bottomBanner.image}
  alt={bottomBanner.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${bottomBanner.position || "object-center"}`}
/>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                onClick={() => setSelectedImage(facadeBanner)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-amber)]/50 transition-all duration-500 cursor-pointer w-full select-none"
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[var(--color-bone)] flex items-center justify-center">
                  <OptimizedImage
  src={facadeBanner.image}
  alt={facadeBanner.title ?? "Gallery image"}
  className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${facadeBanner.position || "object-center"}`}
/>
                </div>
              </motion.div>
            </div>

          </div>
        </section>
        <CTABanner />
      </PageWrapper>

      {/* Lightbox Modal */}
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
                <OptimizedImage
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
