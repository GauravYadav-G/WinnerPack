"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";

export default function AdminJourneyPage() {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content?key=homepage");
      const data = await res.json();
      if (data) {
        setSteps(data.steps || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const fetchRes = await fetch("/api/content?key=homepage");
      const current = await fetchRes.json();

      const payload = {
        key: "homepage",
        data: {
          ...current,
          steps,
        },
      };

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Buyer journey saved successfully!");
      } else {
        alert("Failed to save configuration.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving configuration.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-xs text-slate-400">Loading configurations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Buyer-to-Partner Journey</h1>
          <p className="text-xs text-slate-500 mt-1">Configure step descriptions, timeline markers, and milestone objectives</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-bold shadow-sm transition disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
          <button
            onClick={fetchContent}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Buyer-to-Partner Journey</h3>
          <p className="text-xs text-slate-500 mt-1">Configure step descriptions, timeline markers, and milestone objectives.</p>
        </div>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="p-5 border border-slate-200 bg-slate-50 rounded-xl space-y-4 relative animate-fade-in">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-xs font-bold text-slate-800 font-mono">Step #{step.n || `0${idx + 1}`}</span>
                <input
                  type="text"
                  value={step.phase || ""}
                  onChange={(e) => {
                    const updated = [...steps];
                    updated[idx] = { ...updated[idx], phase: e.target.value };
                    setSteps(updated);
                  }}
                  className="rounded border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-indigo-600 focus:border-indigo-500 focus:outline-none bg-white"
                  placeholder="e.g. Discovery"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Step Heading</label>
                  <input
                    type="text"
                    value={step.title || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setSteps(updated);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-600 mb-1">Primary Milestone Deliverable</label>
                  <input
                    type="text"
                    value={step.deliverable || ""}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx] = { ...updated[idx], deliverable: e.target.value };
                      setSteps(updated);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600 mb-1">Detailed Description Body</label>
                <textarea
                  value={step.body || ""}
                  onChange={(e) => {
                    const updated = [...steps];
                    updated[idx] = { ...updated[idx], body: e.target.value };
                    setSteps(updated);
                  }}
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
