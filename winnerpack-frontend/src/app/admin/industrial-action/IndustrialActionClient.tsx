"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Image as ImageIcon, Save, Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

const defaultSlides = [
  { id: "action-die-ring-bubble", image: "/images/desktop/portfolio/action_die_ring_bubble.jpg", title: "" },
  { id: "stretch-pallet-wrapping", image: "/images/desktop/portfolio/showcase_stretch_pallet_wrapping.png", title: "" },
  { id: "action-polymer-granules-hopper", image: "/images/desktop/portfolio/action_polymer_granules_hopper.jpg", title: "" },
  { id: "pp-strapping-action", image: "/images/desktop/portfolio/gallery_pp_strapping.png", title: "" },
  { id: "action-factory-plant-overview", image: "/images/desktop/portfolio/action_factory_plant_overview.jpg", title: "" },
  { id: "heavy-ldpe-bags", image: "/images/desktop/portfolio/showcase_heavy_duty_ldpe_bags.png", title: "" },
  { id: "action-extrusion-tower-blue", image: "/images/desktop/portfolio/action_extrusion_tower_blue.jpg", title: "" },
  { id: "action-roll-rewinding-slitting", image: "/images/desktop/portfolio/action_roll_rewinding_slitting.jpg", title: "" },
];

export default function IndustrialActionClient() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [headerData, setHeaderData] = useState({
    tag: "REAL-WORLD APPLICATIONS",
    title: "Materials in Industrial Action",
  });
  const [slides, setSlides] = useState<any[]>(defaultSlides);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await apiFetch("/api/content?key=industrial_action");
        if (res.ok) {
          const result = await res.json();
          if (result?.data) {
            if (result.data.actionHeader) setHeaderData(result.data.actionHeader);
            if (Array.isArray(result.data.actionSlides) && result.data.actionSlides.length > 0) {
              setSlides(result.data.actionSlides);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load industrial action data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "industrial_action",
          data: { actionHeader: headerData, actionSlides: slides },
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save industrial action data.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving industrial action data.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddSlide = () => {
    setSlides((prev) => [
      ...prev,
      { id: `slide-${Date.now()}`, image: "/images/desktop/portfolio/action_factory_plant_overview.jpg", title: "" },
    ]);
  };

  const handleDeleteSlide = (idx: number) => {
    if (confirm("Remove this image slide?")) {
      setSlides((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Industrial Action Data...
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full">

      {/* Header + Save */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <ImageIcon className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Materials in Industrial Action
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage the image slider shown between the "Six Reasons" and "Brands" sections on the homepage.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition cursor-pointer"
        >
          {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{saving ? "Saving..." : success ? "Saved!" : "Save Changes"}</span>
        </button>
      </div>

      {/* Section Header Editor */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Section Header</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-500 mb-1.5">Tag / Eyebrow Label</label>
            <input
              type="text"
              value={headerData.tag}
              onChange={(e) => setHeaderData({ ...headerData, tag: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-500 mb-1.5">Section Title</label>
            <input
              type="text"
              value={headerData.title}
              onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Slides Manager */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-700">Image Slides ({slides.length})</h2>
          <button
            onClick={handleAddSlide}
            className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 hover:text-amber-700 transition px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Slide
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {slides.map((slide, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
              {/* Image Preview */}
              <div className="relative aspect-video bg-slate-900">
                <OptimizedImage
  src={slide.image}
  alt={slide.title || `Slide ${idx + 1}`}
  className="h-full w-full object-cover opacity-90"
/>
                <button
                  onClick={() => handleDeleteSlide(idx)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <div className="absolute bottom-1.5 left-2 font-mono text-[9px] text-white/60 font-bold">
                  #{idx + 1}
                </div>
              </div>

              {/* Fields */}
              <div className="p-3 space-y-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Image Path</label>
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => {
                      const updated = [...slides];
                      updated[idx] = { ...updated[idx], image: e.target.value };
                      setSlides(updated);
                    }}
                    className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-mono text-slate-700 focus:border-amber-500 focus:outline-none"
                    placeholder="/images/desktop/portfolio/..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Caption (optional)</label>
                  <input
                    type="text"
                    value={slide.title || ""}
                    onChange={(e) => {
                      const updated = [...slides];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setSlides(updated);
                    }}
                    className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-700 focus:border-amber-500 focus:outline-none"
                    placeholder="Optional caption..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
