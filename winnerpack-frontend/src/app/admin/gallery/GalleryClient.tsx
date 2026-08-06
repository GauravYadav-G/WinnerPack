"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Sliders, Save, Image as ImageIcon, Check, RefreshCw, Plus, Trash2 } from "lucide-react";

export default function GalleryClient() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [mainHero, setMainHero] = useState({
    image: "/images/gallery/team_office_celebration.jpg",
    title: "Winner Pack Team Celebration",
  });

  const [portraits, setPortraits] = useState([
    { id: 1, title: "Team Rafting Expedition", image: "/images/gallery/team_rafting_expedition.jpg" },
    { id: 2, title: "Team River Beach Gathering", image: "/images/gallery/team_river_beach.jpg" },
    { id: 3, title: "Winner Pack Team Tour Group Photo", image: "/images/gallery/new_gallery_2.png" },
  ]);

  const [landscapes, setLandscapes] = useState([
    { id: 1, title: "Pouch Converting & Slitting Hall", image: "/images/gallery/gallery_plant_converting.jpg" },
    { id: 2, title: "Winner Pack Corporate Reception", image: "/images/gallery/gallery_office_reception.jpg" },
    { id: 3, title: "Multilayer Blown Film Extrusion Tower", image: "/images/gallery/gallery_extrusion_tower.jpg" },
    { id: 4, title: "Manufacturing Machinery Hall Overview", image: "/images/gallery/gallery_factory_hall.jpg" },
    { id: 5, title: "Automatic High-Speed Slitting Machine", image: "/images/gallery/gallery_slitting_machine.jpg" },
    { id: 6, title: "Team on Tour — Inside the Bus", image: "/images/gallery/new_gallery_1.png" },
    { id: 7, title: "Winner Pack HQ — Factory Headquarters", image: "/images/gallery/factory_building_facade.jpg" },
  ]);

  useEffect(() => {
    async function loadGalleryData() {
      try {
        const res = await apiFetch("/api/content?key=gallery");
        if (res.ok) {
          const data = await res.json();
          if (data && data.data) {
            if (data.data.mainHero) setMainHero(data.data.mainHero);
            if (Array.isArray(data.data.portraits)) setPortraits(data.data.portraits);
            if (Array.isArray(data.data.landscapes)) setLandscapes(data.data.landscapes);
          }
        }
      } catch (err) {
        console.error("Failed to fetch gallery content:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGalleryData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        mainHero,
        portraits,
        landscapes
      };
      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "gallery", data: payload })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save gallery content.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving gallery specs.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Gallery Media Data...
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#120a3b] text-amber-400">
              <Sliders className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-[#120a3b] font-display tracking-tight">
              Gallery Showcase & Plant Photo Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage, replace, and re-order photos displayed on the public `/gallery` showcase.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#fe8220] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
        >
          {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          <span>{saving ? "Saving Changes..." : success ? "Saved Successfully!" : "Save Gallery Specs"}</span>
        </button>
      </div>

      {/* 1. Main Hero Image Control */}
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-[#fe8220]" /> Top Hero Feature Photo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src={mainHero.image} alt={mainHero.title} className="h-full w-full object-cover" />
          </div>
          <div className="md:col-span-7 space-y-3">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                Photo Title / Alt Text
              </label>
              <input
                type="text"
                value={mainHero.title}
                onChange={(e) => setMainHero({ ...mainHero, title: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1">
                Image Asset Path / URL
              </label>
              <input
                type="text"
                value={mainHero.image}
                onChange={(e) => setMainHero({ ...mainHero, image: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Portrait Photos Cards */}
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[#fe8220]" /> Vertical Portrait Showcase Photos ({portraits.length})
          </h2>
          <button
            onClick={() => {
              setPortraits([
                ...portraits,
                { id: Date.now(), title: "New Portrait Photo", image: "/images/gallery/team_river_beach.jpg" }
              ]);
            }}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#fe8220] hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Portrait Photo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {portraits.map((item, idx) => (
            <div key={item.id || idx} className="rounded-2xl border border-slate-200 p-4 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Portrait #{idx + 1}</span>
                <button
                  onClick={() => setPortraits(portraits.filter((_, i) => i !== idx))}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="aspect-[3/2] rounded-xl overflow-hidden border border-slate-200 bg-white">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...portraits];
                    updated[idx].title = e.target.value;
                    setPortraits(updated);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => {
                    const updated = [...portraits];
                    updated[idx].image = e.target.value;
                    setPortraits(updated);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-mono text-slate-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Landscape Photos Cards */}
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[#fe8220]" /> Horizontal Plant & Machinery Photos ({landscapes.length})
          </h2>
          <button
            onClick={() => {
              setLandscapes([
                ...landscapes,
                { id: Date.now(), title: "New Plant Facility Photo", image: "/images/gallery/gallery_extrusion_tower.jpg" }
              ]);
            }}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#fe8220] hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> Add Landscape Photo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {landscapes.map((item, idx) => (
            <div key={item.id || idx} className="rounded-2xl border border-slate-200 p-4 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500">Landscape #{idx + 1}</span>
                <button
                  onClick={() => setLandscapes(landscapes.filter((_, i) => i !== idx))}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-white">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...landscapes];
                    updated[idx].title = e.target.value;
                    setLandscapes(updated);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => {
                    const updated = [...landscapes];
                    updated[idx].image = e.target.value;
                    setLandscapes(updated);
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-mono text-slate-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
