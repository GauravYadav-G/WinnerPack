"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { CheckCircle, Save, Check, RefreshCw, Plus, Trash2 } from "lucide-react";

export default function ReasonsClient() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [reasons, setReasons] = useState([
    { title: "Direct Factory Pricing", desc: "No middleman markups with direct plant dispatch." },
    { title: "100% Batch Traceability", desc: "COA quality test certificates per dispatch batch." },
    { title: "High-Yield Formats", desc: "Up to 300% pre-stretch yield lowering cost per pack." },
    { title: "Buffer Stock Guarantee", desc: "Dedicated safety inventory maintained at our plant." },
    { title: "Custom Gauge & Widths", desc: "Precision slitting and custom core dimensions." },
    { title: "Dedicated KAM Support", desc: "Single point of contact for plant supply coordination." },
  ]);

  useEffect(() => {
    async function loadReasons() {
      try {
        const res = await apiFetch("/api/content?key=reasons");
        if (res.ok) {
          const data = await res.json();
          if (data && data.data && Array.isArray(data.data.reasons)) {
            setReasons(data.data.reasons);
          }
        }
      } catch (err) {
        console.error("Failed to load reasons content:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReasons();
  }, []);

  const handleAddReason = () => {
    setReasons((prev) => [...prev, { title: "New Core Advantage", desc: "Description of corporate value proposition..." }]);
  };

  const handleDeleteReason = (idx: number) => {
    if (confirm("Delete this USP reason?")) {
      setReasons((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "reasons", data: { reasons } })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save core reasons.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving core reasons.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Core Reasons Data...
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full font-sans">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-[#120a3b] text-amber-400">
              <CheckCircle className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-black text-[#120a3b] font-display tracking-tight">
              Engineered Solutions & Core Reasons (USP) Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage corporate value propositions, competitive advantages, and core USP points.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAddReason}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-[#120a3b] hover:bg-slate-100 transition cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#fe8220]" />
            <span>Add USP Point</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#fe8220] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : success ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{saving ? "Saving Changes..." : success ? "Saved Successfully!" : "Save USP Points"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, idx) => (
          <div key={idx} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:border-[#fe8220] transition duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#120a3b] text-amber-400">
                USP #{idx + 1}
              </span>
              <button
                onClick={() => handleDeleteReason(idx)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-500 mb-1">Title</label>
              <input
                type="text"
                value={r.title}
                onChange={(e) => {
                  const updated = [...reasons];
                  updated[idx].title = e.target.value;
                  setReasons(updated);
                }}
                className="w-full rounded-2xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-[#120a3b]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-500 mb-1">Description</label>
              <textarea
                rows={3}
                value={r.desc}
                onChange={(e) => {
                  const updated = [...reasons];
                  updated[idx].desc = e.target.value;
                  setReasons(updated);
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
