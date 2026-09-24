"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import CTABanner from "@/components/CTABanner";
import FloatingWidgets from "@/components/FloatingWidgets";
import { PageHeader } from "@/components/ui/PageHeader";
import OptimizedImage from "@/components/OptimizedImage";
import { apiFetch } from "@/lib/api";

interface GalleryItem {
  id: number;
  image: string;
  title?: string;
  position?: string;
}

const DEFAULTS = {
  mainHero: { id: 1, image: "/images/gallery/team_office_celebration.jpg", title: "Winner Pack Team Celebration", position: "object-[center_35%]" },
  portraits: [
    { id: 2, image: "/images/gallery/team_rafting_expedition.jpg", title: "Team Rafting Expedition" },
    { id: 7, image: "/images/gallery/team_river_beach.jpg", title: "Team River Beach Gathering" },
    { id: 9, image: "/images/gallery/new_gallery_2.png", title: "Winner Pack Team Tour Group Photo" },
  ],
  landscapes: [
    { id: 3, image: "/images/gallery/gallery_plant_converting.jpg", title: "Pouch Converting & Slitting Hall" },
    { id: 4, image: "/images/gallery/gallery_office_reception.jpg", title: "Winner Pack Corporate Reception" },
    { id: 5, image: "/images/gallery/gallery_extrusion_tower.jpg", title: "Multilayer Blown Film Extrusion Tower" },
    { id: 6, image: "/images/gallery/gallery_factory_hall.jpg", title: "Manufacturing Machinery Hall Overview" },
    { id: 10, image: "/images/gallery/new_gallery_1.png", title: "Team on Tour — Inside the Bus", position: "object-left" },
    { id: 8, image: "/images/gallery/gallery_slitting_machine.jpg", title: "Automatic High-Speed Slitting Machine" },
    { id: 11, image: "/images/gallery/factory_building_facade.jpg", title: "Winner Pack Technologies Factory Headquarters" },
  ],
};

const cardLayouts = [
  "sm:col-span-2 lg:col-span-8 aspect-[16/10] lg:aspect-[16/9]",
  "lg:col-span-4 aspect-[4/3] lg:aspect-auto",
  "lg:col-span-4 aspect-[4/3]",
  "lg:col-span-4 aspect-[4/3]",
  "lg:col-span-4 aspect-[4/3]",
  "lg:col-span-6 aspect-[16/10]",
  "lg:col-span-6 aspect-[16/10]",
  "lg:col-span-4 aspect-[4/3]",
  "lg:col-span-4 aspect-[4/3]",
  "lg:col-span-4 aspect-[4/3]",
  "sm:col-span-2 lg:col-span-12 aspect-[16/10] sm:aspect-[16/8]",
];

export default function GalleryClient() {
  const reduceMotion = useReducedMotion();
  const [mainHero, setMainHero] = useState<GalleryItem>(DEFAULTS.mainHero);
  const [portraits, setPortraits] = useState<GalleryItem[]>(DEFAULTS.portraits);
  const [landscapes, setLandscapes] = useState<GalleryItem[]>(DEFAULTS.landscapes);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await apiFetch("/api/content?key=gallery");
        if (!response.ok) return;
        const result = await response.json();
        const content = result?.data || result;
        if (!content) return;
        if (content.mainHero) setMainHero(content.mainHero);
        if (Array.isArray(content.portraits) && content.portraits.length) setPortraits(content.portraits);
        if (Array.isArray(content.landscapes) && content.landscapes.length) setLandscapes(content.landscapes);
      } catch {
        // Use the local gallery when the content service is unavailable.
      }
    }
    loadGallery();
  }, []);

  const galleryItems = useMemo(
    () => [mainHero, ...portraits, ...landscapes].filter((item) => item?.image),
    [mainHero, portraits, landscapes]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((current) => current === null ? null : (current + 1) % galleryItems.length);
      if (event.key === "ArrowLeft") setSelectedIndex((current) => current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [galleryItems.length, selectedIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold: 40px, predominantly horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swiped left -> Next photo
        setSelectedIndex((current) => (current === null ? null : (current + 1) % galleryItems.length));
      } else {
        // Swiped right -> Previous photo
        setSelectedIndex((current) => (current === null ? null : (current - 1 + galleryItems.length) % galleryItems.length));
      }
    } else if (deltaY > 80 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      // Swiped down significantly -> Dismiss preview
      setSelectedIndex(null);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const selectedImage = selectedIndex === null ? null : galleryItems[selectedIndex];

  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-text)]">
      <Navbar />
      <PageWrapper>
        <PageHeader
          title="Gallery"
          eyebrow="Manufacturing Facilities, Materials & Team"
          crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
          align="left"
        />

        <section className="bg-[var(--color-bone)] py-8 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8">
            <div className="mb-5 sm:mb-10 flex justify-end">
              <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[var(--color-mute)] sm:text-right">
                <span className="sm:hidden">Tap any photo to view in full screen. Swipe left or right to browse.</span>
                <span className="hidden sm:inline">Select any image to open the full view. Use the arrow keys to browse the collection.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
              {galleryItems.map((item, index) => (
                <motion.button
                  key={`${item.id}-${index}`}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.035, 0.18) }}
                  onClick={() => setSelectedIndex(index)}
                  className={`group relative min-h-[12.5rem] sm:min-h-[15rem] md:min-h-[17rem] overflow-hidden rounded-xl sm:rounded-2xl border border-[var(--color-line)] bg-white text-left shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-amber)]/50 hover:shadow-xl active:scale-[0.99] touch-manipulation focus-visible:ring-2 focus-visible:ring-[var(--color-amber)] ${cardLayouts[index % cardLayouts.length]}`}
                  aria-label={`Open ${item.title ?? "gallery image"}`}
                >
                  <OptimizedImage
                    src={item.image}
                    alt={item.title ?? "Winner Pack gallery"}
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.position || "object-center"}`}
                  />

                  {/* Expand Icon */}
                  <span className="absolute right-3 top-3 sm:right-4 sm:top-4 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-white/30 bg-[var(--color-blue-deep)]/60 text-white backdrop-blur-sm transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 group-hover:bg-white group-hover:text-[var(--color-blue-deep)] group-focus-visible:opacity-100 shadow-sm">
                    <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
        <CTABanner />
      </PageWrapper>

      {/* Lightbox Preview Modal with Touch Gestures */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title ?? "Gallery preview"}
            onClick={() => setSelectedIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-blue-deep)]/95 p-3 sm:p-8 backdrop-blur-md select-none"
          >
            {/* Close Button with generous touch target */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-3 top-3 sm:right-8 sm:top-8 z-30 grid h-11 w-11 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[var(--color-blue-deep)] active:scale-95 shadow-lg"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev Image Button */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);
              }}
              className="absolute left-2 sm:left-8 top-1/2 z-30 grid h-11 w-11 sm:h-10 sm:w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[var(--color-blue-deep)] active:scale-95 shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next Image Button */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % galleryItems.length);
              }}
              className="absolute right-2 sm:right-8 top-1/2 z-30 grid h-11 w-11 sm:h-10 sm:w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-[var(--color-blue-deep)] active:scale-95 shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Lightbox Image Container */}
            <motion.figure
              key={`${selectedImage.id}-${selectedIndex}`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[92vh] sm:max-h-[88vh] w-full max-w-5xl flex-col rounded-2xl bg-white p-2.5 sm:p-5 shadow-2xl"
            >
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-bone)]">
                <OptimizedImage
                  src={selectedImage.image}
                  alt={selectedImage.title ?? "Gallery image preview"}
                  className="max-h-[80vh] sm:max-h-[82vh] w-auto max-w-full object-contain"
                />
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingWidgets />
    </div>
  );
}
