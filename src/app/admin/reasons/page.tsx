"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";

export default function AdminReasonsPage() {
  const [usps, setUsps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content?key=homepage");
      const data = await res.json();
      if (data) {
        setUsps(data.usps || []);
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
          usps,
        },
      };

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Six Reasons saved successfully!");
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
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Six Reasons Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Configure title card details and choose icons for WPT procurement advantages</p>
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
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Why Choose Us (Six Reasons)</h3>
          <p className="text-xs text-slate-500 mt-1">Configure title card details and choose icons for our 6 procurement advantages.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {usps.map((usp, idx) => (
            <div key={idx} className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-3">
              <div className="flex justify-between items-center border-b pb-1.5">
                <span className="text-xs font-bold text-slate-700">Reason 0{idx + 1}</span>
                <span className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 rounded">
                  Icon: {usp.icon}
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600">Advantage Title</label>
                <input
                  type="text"
                  value={usp.title || ""}
                  onChange={(e) => {
                    const updated = [...usps];
                    updated[idx] = { ...updated[idx], title: e.target.value };
                    setUsps(updated);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600">Description text</label>
                <textarea
                  value={usp.text || ""}
                  onChange={(e) => {
                    const updated = [...usps];
                    updated[idx] = { ...updated[idx], text: e.target.value };
                    setUsps(updated);
                  }}
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-600">Select Icon Theme</label>
                <select
                  value={usp.icon}
                  onChange={(e) => {
                    const updated = [...usps];
                    updated[idx] = { ...updated[idx], icon: e.target.value };
                    setUsps(updated);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Tag">Tag (Catalog forcing)</option>
                  <option value="Layers">Layers (Strap straightness)</option>
                  <option value="Disc3">Disc3 (High-cling stretch)</option>
                  <option value="Shield">Shield (Quality checking)</option>
                  <option value="Leaf">Leaf (Eco-friendly options)</option>
                  <option value="Globe2">Globe2 (Direct dispatch)</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
