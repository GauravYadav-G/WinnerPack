"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Image as ImageIcon, Save, Check, RefreshCw, Plus, Trash2, Link as LinkIcon, Layout } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from '@/components/OptimizedImage';

export default function HeroClient() {
  const [slides, setSlides] = useState<any[]>([]);
  const [rightBanner, setRightBanner] = useState<string>("/images/desktop/hero-slider/right-banner.png");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadHeroContent() {
      try {
        const res = await apiFetch("/api/content?key=homepage");
        if (res.ok) {
          const data = await res.json();
          const contentObj = data?.data || data;
          if (contentObj) {
            if (Array.isArray(contentObj.slides)) {
              setSlides(contentObj.slides);
            }
            if (contentObj.rightBanner) {
              setRightBanner(contentObj.rightBanner);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHeroContent();
  }, []);

  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      tag: "NEW SOLUTION",
      heading: "High-Performance Industrial Packaging",
      description: "Engineered films, strapping, and custom packaging solutions.",
      desktopMediaUrl: "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      ctaText: "Explore Products",
      ctaLink: "/products"
    };
    setSlides((prev) => [...prev, newSlide]);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) {
      alert("At least one hero slide is required.");
      return;
    }
    if (confirm("Delete this hero banner slide?")) {
      setSlides((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "homepage", data: { slides, rightBanner } }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save hero slides.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save hero slides");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5 w-full font-sans">

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#120a3b] text-amber-400">
              <ImageIcon className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-[#120a3b] font-display tracking-tight">
              Homepage Hero Slider & Showcase Banners
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage carousel hero banners, headlines, right hero showcase banner, descriptions, and CTA action buttons.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAddSlide}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-[#120a3b] hover:bg-slate-100 transition cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#fe8220]" />
            <span>Add Hero Banner</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#fe8220] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saving ? "Publishing Changes..." : success ? "Published!" : "Publish Hero Changes"}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
          Loading Hero Banner Data...
        </div>
      ) : (
        <div className="space-y-8">

          {/* 1. RIGHT SIDE HERO SHOWCASE BANNER IMAGE CONTROL */}
          <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layout className="h-4.5 w-4.5 text-[#fe8220]" />
                <h2 className="text-sm font-bold text-[#120a3b] font-display">
                  Right Hero Showcase Image (Desktop Right Banner)
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                LIVE ON DESKTOP HERO
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Preview */}
              <div className="md:col-span-4 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative flex items-center justify-center p-2">
                {rightBanner ? (
                  <OptimizedImage
  src={rightBanner}
  alt="Right Hero Banner Preview"
  className="h-full w-full object-cover rounded-xl"
/>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">No Image Provided</span>
                )}
              </div>

              {/* Input */}
              <div className="md:col-span-8 space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                    Right Hero Banner Asset Path / Image URL
                  </label>
                  <input
                    type="text"
                    value={rightBanner}
                    onChange={(e) => setRightBanner(e.target.value)}
                    placeholder="/images/desktop/hero-slider/right-banner.png"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">
                    This image is rendered on the right side of the desktop hero slider section across all slides.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CAROUSEL HERO SLIDES LIST */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-500">
              Carousel Hero Slides ({slides.length} Slides)
            </h2>

            <div className="space-y-6">
              {slides.map((slide, idx) => (
                <motion.div
                  key={slide.id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:border-[#fe8220] transition duration-200"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#120a3b] text-amber-400">
                        SLIDE #{idx + 1}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">ID: {slide.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        ACTIVE ON HOMEPAGE
                      </span>
                      <button
                        onClick={() => handleDeleteSlide(idx)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition cursor-pointer"
                        title="Delete Slide"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Media Preview (4 cols) */}
                    <div className="md:col-span-4 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative flex items-center justify-center p-2">
                      {slide.desktopMediaUrl || slide.image ? (
                        <OptimizedImage
  src={slide.desktopMediaUrl || slide.image}
  alt={slide.heading}
  className="h-full w-full object-cover rounded-xl"
/>
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">No Media Asset</span>
                      )}
                    </div>

                    {/* Form Fields (8 cols) */}
                    <div className="md:col-span-8 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                            Category Tag Line
                          </label>
                          <input
                            type="text"
                            value={slide.tag || ""}
                            onChange={(e) => {
                              const updated = [...slides];
                              updated[idx].tag = e.target.value;
                              setSlides(updated);
                            }}
                            className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                            Slide Heading
                          </label>
                          <input
                            type="text"
                            value={slide.heading || ""}
                            onChange={(e) => {
                              const updated = [...slides];
                              updated[idx].heading = e.target.value;
                              setSlides(updated);
                            }}
                            className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                          Description Subtitle
                        </label>
                        <textarea
                          rows={2}
                          value={slide.description || ""}
                          onChange={(e) => {
                            const updated = [...slides];
                            updated[idx].description = e.target.value;
                            setSlides(updated);
                          }}
                          className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900 focus:border-[#fe8220] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                            Desktop Media Asset Path / URL
                          </label>
                          <input
                            type="text"
                            value={slide.desktopMediaUrl || slide.image || ""}
                            onChange={(e) => {
                              const updated = [...slides];
                              updated[idx].desktopMediaUrl = e.target.value;
                              setSlides(updated);
                            }}
                            className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1 flex items-center gap-1">
                            <LinkIcon className="h-3 w-3 text-slate-400" /> CTA Button Link Target
                          </label>
                          <input
                            type="text"
                            value={slide.ctaLink || "/products"}
                            onChange={(e) => {
                              const updated = [...slides];
                              updated[idx].ctaLink = e.target.value;
                              setSlides(updated);
                            }}
                            className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
