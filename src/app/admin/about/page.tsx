"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<any>({ tagline: "", para1: "", para2: "", stats: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content?key=homepage");
      const data = await res.json();
      if (data) {
        setAbout(data.about || { tagline: "", para1: "", para2: "", stats: [] });
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
          about,
        },
      };

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("About configurations saved successfully!");
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
          <h1 className="text-xl font-bold tracking-tight text-slate-900">About &amp; Statistics Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Configure about tagline, descriptive text paragraphs, and key dynamic metrics counters</p>
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
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Homepage About Strip</h3>
          <p className="text-xs text-slate-500 mt-1">Edit the main headlines and introductory description.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">About Section Tagline</label>
            <input
              type="text"
              value={about.tagline || ""}
              onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none font-bold"
              placeholder="e.g. Pioneering Industrial Packaging & Labeling Solutions"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Introductory Paragraph 1</label>
            <textarea
              value={about.para1 || ""}
              onChange={(e) => setAbout({ ...about, para1: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              placeholder="First text segment..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Introductory Paragraph 2</label>
            <textarea
              value={about.para2 || ""}
              onChange={(e) => setAbout({ ...about, para2: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              placeholder="Second text segment..."
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 mt-4">Stats & Metrics Indicators</h3>
          <p className="text-xs text-slate-500 mt-1">Dynamic metrics boxes rendered next to the about descriptions.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {about.stats &&
            about.stats.map((stat: any, idx: number) => (
              <div key={idx} className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono">Metric 0{idx + 1}</span>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-505">Value</label>
                  <input
                    type="text"
                    value={stat.value || ""}
                    onChange={(e) => {
                      const updatedStats = [...about.stats];
                      updatedStats[idx] = { ...updatedStats[idx], value: e.target.value };
                      setAbout({ ...about, stats: updatedStats });
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-indigo-600 focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. 8+"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-505">Label</label>
                  <input
                    type="text"
                    value={stat.label || ""}
                    onChange={(e) => {
                      const updatedStats = [...about.stats];
                      updatedStats[idx] = { ...updatedStats[idx], label: e.target.value };
                      setAbout({ ...about, stats: updatedStats });
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Years in business"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
