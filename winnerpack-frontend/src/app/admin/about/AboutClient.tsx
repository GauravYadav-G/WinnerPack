"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Info, Save, Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';

const defaultAboutData = {
  tagline: "Pioneering B2B Industrial Packaging & Labeling Solutions",
  para1: "Winner Pack Technologies Pvt. Ltd. supplies environment-friendly secondary and tertiary packaging materials. Guided by our motto \"We Serve To Deserve\", we supply premium quality solutions tailored to your operational needs.",
  para2: "We specialize in BOPP tapes, strapping rolls, shrink films, and protective packaging, serving various key industrial sectors including food, cosmetics, pharmaceuticals, and retail logistics.",
  image1: "/images/desktop/about/plant_film_slitting_machine.jpg",
  image2: "/images/desktop/about/plant_extrusion_tower.jpg",
  stats: [
    { value: "8+", label: "Years in business" },
    { value: "4", label: "Product categories" },
    { value: "20+", label: "Product lines" },
    { value: "100%", label: "Customer commitment" },
  ],
};

export default function AboutClient() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [tagline, setTagline] = useState(defaultAboutData.tagline);
  const [para1, setPara1] = useState(defaultAboutData.para1);
  const [para2, setPara2] = useState(defaultAboutData.para2);
  const [image1, setImage1] = useState(defaultAboutData.image1);
  const [image2, setImage2] = useState(defaultAboutData.image2);
  const [stats, setStats] = useState(defaultAboutData.stats);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const res = await apiFetch("/api/content?key=homepage");
        if (res.ok) {
          const data = await res.json();
          // Support both { data: { about } } shape
          const content = data?.data || data;
          if (content?.about) {
            const a = content.about;
            if (a.tagline) setTagline(a.tagline);
            if (a.para1) setPara1(a.para1);
            if (a.para2) setPara2(a.para2);
            if (a.image1) setImage1(a.image1);
            if (a.image2) setImage2(a.image2);
            if (Array.isArray(a.stats) && a.stats.length > 0) setStats(a.stats);
          }
        }
      } catch (err) {
        console.error("Failed to load about data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAboutData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Load existing homepage data first so we don't overwrite other sections
      let existingData: any = {};
      try {
        const existing = await apiFetch("/api/content?key=homepage");
        if (existing.ok) {
          const existingJson = await existing.json();
          existingData = existingJson?.data || existingJson || {};
        }
      } catch (_) {}

      const updatedAbout = { tagline, para1, para2, image1, image2, stats };
      const mergedData = { ...existingData, about: updatedAbout };

      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "homepage", data: mergedData }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save about data.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving about data.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddStat = () => {
    setStats((prev) => [...prev, { value: "0+", label: "New Metric" }]);
  };

  const handleDeleteStat = (idx: number) => {
    setStats((prev) => prev.filter((_, i) => i !== idx));
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading About Content...
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full">

      {/* Header + Save */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Info className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              About Us Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage tagline, paragraphs, section images, and stats shown on the homepage About strip.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition cursor-pointer"
        >
          {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{saving ? "Saving..." : success ? "Saved!" : "Save About Data"}</span>
        </button>
      </div>

      {/* Text Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Text Content</h2>

        <div>
          <label className="block text-[11px] font-mono font-bold uppercase text-slate-500 mb-1.5">Main Tagline / Headline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            placeholder="Pioneering B2B Industrial Packaging..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold uppercase text-slate-500 mb-1.5">Paragraph 1</label>
          <textarea
            value={para1}
            onChange={(e) => setPara1(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-700 leading-relaxed focus:border-amber-500 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold uppercase text-slate-500 mb-1.5">Paragraph 2</label>
          <textarea
            value={para2}
            onChange={(e) => setPara2(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-700 leading-relaxed focus:border-amber-500 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Section Images */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-3">Section Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Image 1 (Top — Film Slitting Machine)", value: image1, setter: setImage1 },
            { label: "Image 2 (Bottom — Extrusion Tower)", value: image2, setter: setImage2 },
          ].map(({ label, value, setter }, i) => (
            <div key={i} className="space-y-2">
              <label className="block text-[11px] font-mono font-bold uppercase text-slate-500">{label}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-700 focus:border-amber-500 focus:outline-none"
                placeholder="/images/desktop/about/..."
              />
              {value && (
                <OptimizedImage
  src={value}
  alt={label}
  className="mt-2 w-full max-h-32 object-cover rounded-xl border border-slate-200"
/>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-700">Stats / Metrics</h2>
          <button
            onClick={handleAddStat}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 transition px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Stat
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((st, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 relative">
              <button
                onClick={() => handleDeleteStat(idx)}
                className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 transition cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600">
                STAT #{idx + 1}
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-500 mb-1">Value</label>
                <input
                  type="text"
                  value={st.value}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx].value = e.target.value;
                    setStats(updated);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-lg font-extrabold text-slate-900 font-display focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-500 mb-1">Label</label>
                <input
                  type="text"
                  value={st.label}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx].label = e.target.value;
                    setStats(updated);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
