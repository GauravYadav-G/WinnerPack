"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Save, RefreshCw, Trash, Plus } from "lucide-react";
import { triggerRevalidate } from "@/lib/revalidate";


export default function AdminPartnersPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/content?key=homepage");
      const data = await res.json();
      if (data) {
        setClients(data.clients || []);
        setIndustries(data.industries || []);
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
      const fetchRes = await apiFetch("/api/content?key=homepage");
      const current = await fetchRes.json();

      const payload = {
        key: "homepage",
        data: {
          ...current,
          clients,
          industries,
        },
      };

      const res = await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await triggerRevalidate("/");
        alert("Partners & Industries saved successfully!");
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

  function ImageUploader({
    value,
    onChange,
    label,
  }: {
    value: string;
    onChange: (url: string) => void;
    label?: string;
  }) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await apiFetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
        } else {
          alert("Upload failed: " + data.error);
        }
      } catch (err) {
        console.error(err);
        alert("Error uploading image");
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="space-y-1.5">
        {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
        <div className="flex flex-wrap items-center gap-3">
          {value && (
            <img
              src={value}
              alt="Preview"
              className="h-12 w-20 object-contain rounded border border-slate-200 bg-slate-50 shadow-sm"
            />
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none w-56"
              placeholder="Image path or URL"
            />
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 text-xs font-bold transition">
              {uploading ? "Uploading..." : "Upload File"}
              <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="py-24 text-center text-xs text-slate-400">Loading configurations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Partners &amp; Industries</h1>
          <p className="text-xs text-slate-500 mt-1">Configure client partner logos and industries served on WPT homepage</p>
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

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Trusted Partners (Brand Logos)</h3>
          <p className="text-xs text-slate-500 mt-1">Manage brand names and logos shown in the rolling banner.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {clients.map((client, idx) => (
            <div key={idx} className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-3 relative animate-fade-in">
              <button
                type="button"
                onClick={() => setClients(clients.filter((_, i) => i !== idx))}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Partner Brand Name</label>
                <input
                  type="text"
                  value={client.name || ""}
                  onChange={(e) => {
                    const updated = [...clients];
                    updated[idx] = { ...updated[idx], name: e.target.value };
                    setClients(updated);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <ImageUploader
                value={client.logo || ""}
                onChange={(url) => {
                  const updated = [...clients];
                  updated[idx] = { ...updated[idx], logo: url };
                  setClients(updated);
                }}
                label="Brand Logo Asset"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setClients([...clients, { name: "New Client", logo: "" }])}
          className="border border-dashed border-slate-200 rounded-lg py-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold hover:border-indigo-600 hover:text-indigo-600 w-48 transition"
        >
          <Plus className="h-3.5 w-3.5" /> Add Partner Logo
        </button>

        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2 mt-4">Industries Served</h3>
          <p className="text-xs text-slate-500 mt-1">Configure industry segments and background imagery displayed on the homepage.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {industries.map((ind, idx) => (
            <div key={idx} className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-3 relative animate-fade-in">
              <button
                type="button"
                onClick={() => setIndustries(industries.filter((_, i) => i !== idx))}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
              >
                <Trash className="h-4 w-4" />
              </button>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Title</label>
                <input
                  type="text"
                  value={ind.name || ""}
                  onChange={(e) => {
                    const updated = [...industries];
                    updated[idx] = { ...updated[idx], name: e.target.value };
                    setIndustries(updated);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none font-bold"
                />
              </div>

              <ImageUploader
                value={ind.image || ""}
                onChange={(url) => {
                  const updated = [...industries];
                  updated[idx] = { ...updated[idx], image: url };
                  setIndustries(updated);
                }}
                label="Segment Background Image"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndustries([...industries, { name: "New Industry", image: "" }])}
          className="border border-dashed border-slate-200 rounded-lg py-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold hover:border-indigo-600 hover:text-indigo-600 w-48 transition"
        >
          <Plus className="h-3.5 w-3.5" /> Add Industry served
        </button>
      </div>
    </div>
  );
}
