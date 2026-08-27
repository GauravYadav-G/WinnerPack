"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Route, Save, Check, RefreshCw, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from '@/components/OptimizedImage';

const defaultJourneySolutions = [
  {
    slot: "01",
    question: "Custom Dimensions",
    solution: "Tailored Sizes & Gauges",
    appImage: "/images/desktop/journey/solution_dispatch_manager.png",
    impact: "CUSTOM SIZES",
    spec: "Tailored Specs",
    challenge: "Custom widths, thicknesses, and roll lengths manufactured to match your exact manual or automated wrapping machinery."
  },
  {
    slot: "02",
    question: "Reliable Strength",
    solution: "Tear & Puncture Resistance",
    appImage: "/images/desktop/journey/solution_buffer_stock.png",
    impact: "HIGH STRENGTH",
    spec: "Load Security",
    challenge: "Engineered multi-layer films that deliver high load containment and secure pallets during warehouse storage and transit."
  },
  {
    slot: "03",
    question: "High Volume Output",
    solution: "Bulk Manufacturing Capacity",
    appImage: "/images/desktop/journey/solution_quality_testing.png",
    impact: "BULK SUPPLY",
    spec: "High Output",
    challenge: "Modern high-speed extrusion lines equipped to consistently fulfill large-scale recurring factory and distributor orders."
  },
  {
    slot: "04",
    question: "Direct Manufacturer",
    solution: "Factory-Direct Competitive Pricing",
    appImage: "/images/desktop/journey/solution_pallet_wrapping.png",
    impact: "COST EFFICIENCY",
    spec: "Factory Direct",
    challenge: "Transparent pricing directly from the manufacturing unit, helping you reduce overall packaging costs per unit."
  },
  {
    slot: "05",
    question: "On-Time Dispatch",
    solution: "Reliable Delivery & Ready Stock",
    appImage: "/images/desktop/journey/solution_scheduled_dispatch.png",
    impact: "FAST DISPATCH",
    spec: "On-Time Delivery",
    challenge: "Maintained safety stock and planned dispatch schedules to ensure your packaging materials arrive without factory downtime."
  },
  {
    slot: "06",
    question: "Brand Visibility",
    solution: "Custom Printing & Branded Tapes",
    appImage: "/images/desktop/journey/solution_contract_pricing.png",
    impact: "BRANDING",
    spec: "Custom Print",
    challenge: "Custom logo printing, colored tapes, and barcode labels to elevate product presentation and protect against tampering."
  },
  {
    slot: "07",
    question: "Sustainable Solutions",
    solution: "100% Recyclable Materials",
    appImage: "/images/desktop/journey/solution_pcr_eco_film.png",
    impact: "SUSTAINABLE",
    spec: "100% Recyclable",
    challenge: "Environmentally conscious polyethylene formulations and down-gauged films that minimize overall plastic usage."
  },
  {
    slot: "08",
    question: "Expert Guidance",
    solution: "Packaging Consultation & Samples",
    appImage: "/images/desktop/journey/solution_precision_gauge.png",
    impact: "TECHNICAL DESK",
    spec: "Sample Trials",
    challenge: "Dedicated packaging assistance and trial samples to help you choose the right film, strap, or tape grade for your goods."
  }
];

export default function JourneyClient() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [existingData, setExistingData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadJourneyContent() {
      try {
        const res = await apiFetch("/api/content?key=homepage");
        if (res.ok) {
          const data = await res.json();
          const contentObj = data?.data || data;
          if (contentObj) {
            setExistingData(contentObj);
            if (Array.isArray(contentObj.solutionsData) && contentObj.solutionsData.length > 0) {
              setSolutions(contentObj.solutionsData);
            } else {
              setSolutions(defaultJourneySolutions);
            }
          } else {
            setSolutions(defaultJourneySolutions);
          }
        } else {
          setSolutions(defaultJourneySolutions);
        }
      } catch (err) {
        console.error(err);
        setSolutions(defaultJourneySolutions);
      } finally {
        setLoading(false);
      }
    }
    loadJourneyContent();
  }, []);

  const handleAddSolution = () => {
    const nextIdx = (solutions.length + 1).toString().padStart(2, "0");
    const newCard = {
      slot: nextIdx,
      question: "Need custom technical support or fast sample dispatch?",
      solution: "Engineered material recommendations tailored to your packaging line.",
      appImage: "/images/desktop/journey/solution_dispatch_manager.png",
      impact: "CUSTOM SUPPORT",
      spec: "Tailored Spec",
      challenge: "Expert technical guidance and sample rolls sent to your plant."
    };
    setSolutions((prev) => [...prev, newCard]);
  };

  const handleDeleteSolution = (index: number) => {
    if (confirm("Delete this engineered solution card?")) {
      setSolutions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payloadData = { ...existingData, solutionsData: solutions };
      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "homepage", data: payloadData }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save engineered solutions.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save engineered solutions data");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5 w-full font-sans">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#120a3b] text-amber-400">
              <Route className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-[#120a3b] font-display tracking-tight">
              Engineered Solutions 8-Slot Grid Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage the 8 packaging challenges, engineered solutions, background images, impact badges, and specs for the homepage grid.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAddSolution}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-[#120a3b] hover:bg-slate-100 transition cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#fe8220]" />
            <span>Add Solution Card</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#fe8220] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saving ? "Publishing Grid..." : success ? "Published!" : "Publish Grid Changes"}</span>
          </button>
        </div>
      </div>

      {/* 8-Slot Grid Cards */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
          Loading Solutions 8-Slot Grid Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:border-[#fe8220] transition duration-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#120a3b] text-amber-400">
                    CARD #{item.slot || (idx + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {item.impact || "ENGINEERED SOLUTION"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    LIVE ON HOMEPAGE
                  </span>
                  <button
                    onClick={() => handleDeleteSolution(idx)}
                    className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    title="Delete Solution Card"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Media Preview & Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">

                {/* Image Thumbnail */}
                <div className="sm:col-span-4 aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center p-1">
                  {item.appImage ? (
                    <OptimizedImage
  src={item.appImage}
  alt={item.solution}
  className="h-full w-full object-cover rounded-xl"
/>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">No Image</span>
                  )}
                </div>

                {/* Text Fields */}
                <div className="sm:col-span-8 space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                      Engineered Solution (Headline)
                    </label>
                    <textarea
                      rows={2}
                      value={item.solution || ""}
                      onChange={(e) => {
                        const updated = [...solutions];
                        updated[idx].solution = e.target.value;
                        setSolutions(updated);
                      }}
                      className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                      Packaging Challenge (Customer Pain Point)
                    </label>
                    <input
                      type="text"
                      value={item.question || ""}
                      onChange={(e) => {
                        const updated = [...solutions];
                        updated[idx].question = e.target.value;
                        setSolutions(updated);
                      }}
                      className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>
                </div>

              </div>

              {/* Additional Fields */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                      Impact Category Tag
                    </label>
                    <input
                      type="text"
                      value={item.impact || ""}
                      onChange={(e) => {
                        const updated = [...solutions];
                        updated[idx].impact = e.target.value;
                        setSolutions(updated);
                      }}
                      className="w-full rounded-2xl border border-slate-200 px-3 py-1.5 text-xs font-mono font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                      Spec / Feature Badge
                    </label>
                    <input
                      type="text"
                      value={item.spec || ""}
                      onChange={(e) => {
                        const updated = [...solutions];
                        updated[idx].spec = e.target.value;
                        setSolutions(updated);
                      }}
                      className="w-full rounded-2xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                    Challenge Subtext Explanation
                  </label>
                  <input
                    type="text"
                    value={item.challenge || ""}
                    onChange={(e) => {
                      const updated = [...solutions];
                      updated[idx].challenge = e.target.value;
                      setSolutions(updated);
                    }}
                    className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-800 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1 flex items-center gap-1">
                    <ImageIcon className="h-3 w-3 text-slate-400" /> Background Card Image Path / URL
                  </label>
                  <input
                    type="text"
                    value={item.appImage || ""}
                    onChange={(e) => {
                      const updated = [...solutions];
                      updated[idx].appImage = e.target.value;
                      setSolutions(updated);
                    }}
                    className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
