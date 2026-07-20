"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw, Trash, Plus } from "lucide-react";

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [rightBanner, setRightBanner] = useState("");
  const [mobileRightBanner, setMobileRightBanner] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content?key=homepage");
      const data = await res.json();
      if (data) {
        setSlides(data.slides || []);
        setRightBanner(data.rightBanner || "");
        setMobileRightBanner(data.mobileRightBanner || "");
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
          slides,
          rightBanner,
          mobileRightBanner,
        },
      };

      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Hero configurations saved successfully!");
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
        const res = await fetch("/api/upload", {
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
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Hero Section Slider</h1>
          <p className="text-xs text-slate-500 mt-1">Configure and upload main slider slides and right hero graphic banner</p>
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
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Hero Image Slideshow</h3>
          <p className="text-xs text-slate-500 mt-1">Add, update, or remove images in the sliding hero section.</p>
        </div>

        <div className="space-y-6">
          {slides.map((slide, idx) => (
            <div key={idx} className="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-4 relative animate-fade-in">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 font-mono">Slide 0{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => setSlides(slides.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Slide Title / Tag</label>
                  <input
                    type="text"
                    value={slide.title || ""}
                    onChange={(e) => {
                      const updated = [...slides];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setSlides(updated);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Heavy-duty packaging for zero-transit damage."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle Description</label>
                  <input
                    type="text"
                    value={slide.subtitle || slide.heading || ""}
                    onChange={(e) => {
                      const updated = [...slides];
                      updated[idx] = { ...updated[idx], subtitle: e.target.value, heading: e.target.value };
                      setSlides(updated);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. High-cling stretch films..."
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ImageUploader
                  value={slide.desktopMediaUrl || slide.image || ""}
                  onChange={(url) => {
                    const updated = [...slides];
                    updated[idx] = {
                      ...updated[idx],
                      image: url,
                      desktopMediaUrl: url,
                    };
                    setSlides(updated);
                  }}
                  label="Desktop Image (landscape)"
                />
                <ImageUploader
                  value={slide.mobileMediaUrl || ""}
                  onChange={(url) => {
                    const updated = [...slides];
                    updated[idx] = {
                      ...updated[idx],
                      mobileMediaUrl: url,
                    };
                    setSlides(updated);
                  }}
                  label="Mobile Image (portrait)"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setSlides([
                ...slides,
                {
                  id: `slide-${Date.now()}`,
                  title: "New Slide Heading",
                  subtitle: "New Slide Description",
                  image: "/images/desktop/hero-slider/slide-1.png",
                },
              ])
            }
            className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3 flex items-center justify-center gap-2 text-xs text-slate-500 font-bold hover:border-indigo-600 hover:text-indigo-600 transition"
          >
            <Plus className="h-4 w-4" />
            Add Image Slide
          </button>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Right-side Hero Banner</h3>
          <p className="text-xs text-slate-500 mt-1">Static graphic banner shown on the right side of the main slider. Use different images for desktop (landscape) and mobile (portrait).</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 p-4 border border-slate-200 bg-slate-50 rounded-xl">
          <ImageUploader
            value={rightBanner}
            onChange={(url) => setRightBanner(url)}
            label="Desktop Right Banner (landscape)"
          />
          <ImageUploader
            value={mobileRightBanner}
            onChange={(url) => setMobileRightBanner(url)}
            label="Mobile Right Banner (portrait)"
          />
        </div>
      </div>
    </div>
  );
}
