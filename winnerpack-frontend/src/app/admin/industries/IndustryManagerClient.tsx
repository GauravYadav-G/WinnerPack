"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Compass, Save, Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import { industryVerticals as defaultIndustries } from "@/data";
import OptimizedImage from '@/components/OptimizedImage';

export default function IndustryManagerClient() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [industries, setIndustries] = useState<any[]>(defaultIndustries);

  useEffect(() => {
    async function loadIndustries() {
      try {
        const res = await apiFetch("/api/content?key=industries");
        if (res.ok) {
          const data = await res.json();
          const content = data?.data ?? data;
          if (Array.isArray(content?.industries)) {
            setIndustries(content.industries);
          }
        }
      } catch (err) {
        console.error("Failed to load industry content:", err);
      } finally {
        setLoading(false);
      }
    }
    loadIndustries();
  }, []);

  const handleAddIndustry = () => {
    const newInd = {
      id: `ind-${Date.now()}`,
      name: "New Industry Sector",
      tagline: "Industrial Packaging & Material Unitization",
      heroHeadline: "High-Performance Packaging Solutions for Industrial Operations",
      packagingChallenge: "Describe the specific packaging challenge faced by this industry vertical...",
      image: "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      buyerOutcomes: [
        { title: "Tamper Protection", desc: "Secure closure for high-value dispatch." },
        { title: "Cost Optimization", desc: "Lower cost per unit through high-yield materials." }
      ]
    };
    setIndustries((prev) => [...prev, newInd]);
  };

  const handleDeleteIndustry = (idx: number) => {
    if (confirm("Delete this industry vertical?")) {
      setIndustries((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "industries", data: { industries } })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save industry data.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving industry data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Industry Verticals Data...
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#120a3b] text-amber-400">
              <Compass className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-[#120a3b] font-display tracking-tight">
              Industry Verticals Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage target industry sectors, packaging challenges, buyer outcomes, and industry showcase images.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAddIndustry}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-[#120a3b] hover:bg-slate-100 transition cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#fe8220]" />
            <span>Add Industry Vertical</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#fe8220] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saving ? "Saving Changes..." : success ? "Saved Successfully!" : "Save Industry Data"}</span>
          </button>
        </div>
      </div>

      {/* Industry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {industries.map((ind, idx) => (
          <div key={ind.id || idx} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:border-[#fe8220] transition duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <OptimizedImage
  src={ind.image}
  alt={ind.name}
  className="h-12 w-16 rounded-xl object-cover border border-slate-200 bg-slate-50"
/>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#fe8220]">
                    ID: {ind.id}
                  </span>
                  <input
                    type="text"
                    value={ind.name || ""}
                    onChange={(e) => {
                      const updated = [...industries];
                      updated[idx].name = e.target.value;
                      setIndustries(updated);
                    }}
                    className="text-base font-bold text-[#120a3b] font-display block rounded-lg border border-transparent hover:border-slate-200 px-1 py-0.5"
                  />
                </div>
              </div>
              <button
                onClick={() => handleDeleteIndustry(idx)}
                className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Tagline Subtitle
                </label>
                <input
                  type="text"
                  value={ind.tagline || ""}
                  onChange={(e) => {
                    const updated = [...industries];
                    updated[idx].tagline = e.target.value;
                    setIndustries(updated);
                  }}
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={ind.image || ""}
                  onChange={(e) => {
                    const updated = [...industries];
                    updated[idx].image = e.target.value;
                    setIndustries(updated);
                  }}
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                Headline Hero Banner Text
              </label>
              <input
                type="text"
                value={ind.heroHeadline || ""}
                onChange={(e) => {
                  const updated = [...industries];
                  updated[idx].heroHeadline = e.target.value;
                  setIndustries(updated);
                }}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-[#120a3b]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                Industry Packaging Challenge
              </label>
              <textarea
                rows={3}
                value={ind.packagingChallenge || ""}
                onChange={(e) => {
                  const updated = [...industries];
                  updated[idx].packagingChallenge = e.target.value;
                  setIndustries(updated);
                }}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-900"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
