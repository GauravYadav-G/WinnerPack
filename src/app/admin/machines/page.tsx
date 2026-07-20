"use client";

import { useEffect, useState, useRef } from "react";
import { PlusCircle, AlertCircle, RefreshCw, Trash2, Edit2, Upload, Loader2 } from "lucide-react";
import TiptapInlineEditor from "@/components/admin/TiptapInlineEditor";

type SpecItem = {
  label: string;
  value: string;
};

type Machine = {
  _id?: string;
  model: string;
  name: string;
  tagline?: string;
  desc?: string;
  image?: string;
  specs?: SpecItem[];
  highlights?: string[];
};

export default function AdminMachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingModel, setEditingModel] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    model: "",
    name: "",
    tagline: "",
    desc: "",
    image: "",
    specsText: "", // Label: Value lines
    highlightsText: "", // Comma separated
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMachines = () => {
    setLoading(true);
    fetch("/api/machines")
      .then((res) => res.json())
      .then((data) => {
        setMachines(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  // Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Convert Specs Array to Text lines
  const specsToText = (specs?: SpecItem[]) => {
    if (!specs) return "";
    return specs
      .map((item) => `${item.label}: ${item.value}`)
      .join("\n");
  };

  // Parse Text lines to Specs Array
  const textToSpecs = (text: string): SpecItem[] => {
    const specs: SpecItem[] = [];
    text.split("\n").forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const label = parts[0].trim();
        const value = parts.slice(1).join(":").trim();
        if (label && value) {
          specs.push({ label, value });
        }
      }
    });
    return specs;
  };

  const handleEditInit = (mach: Machine) => {
    setEditingModel(mach.model);
    setFormData({
      model: mach.model,
      name: mach.name,
      tagline: mach.tagline || "",
      desc: mach.desc || "",
      image: mach.image || "",
      specsText: specsToText(mach.specs),
      highlightsText: mach.highlights?.join(", ") || "",
    });
    setIsFormOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingModel(null);
    clearForm();
    setIsFormOpen(false);
  };

  const clearForm = () => {
    setFormData({
      model: "",
      name: "",
      tagline: "",
      desc: "",
      image: "",
      specsText: "",
      highlightsText: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: Machine = {
      model: formData.model,
      name: formData.name,
      tagline: formData.tagline,
      desc: formData.desc,
      image: formData.image,
      specs: textToSpecs(formData.specsText),
      highlights: formData.highlightsText.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const url = editingModel ? `/api/machines/${editingModel}` : "/api/machines";
      const method = editingModel ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editingModel ? "Machine updated successfully!" : "Machine added successfully!");
        handleCancelEdit();
        fetchMachines();
      } else {
        const errorData = await res.json();
        alert("Failed to save machine: " + errorData.error);
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to save machine: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (model: string) => {
    if (!confirm(`Are you sure you want to delete machinery model ${model}?`)) return;

    try {
      const res = await fetch(`/api/machines/${model}`, { method: "DELETE" });
      if (res.ok) {
        alert("Machine deleted successfully!");
        fetchMachines();
        if (editingModel === model) handleCancelEdit();
      } else {
        alert("Failed to delete machine.");
      }
    } catch (err: any) {
      alert("Error deleting machine: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {isFormOpen ? (
        /* Full-Width Inline Editor Form */
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-3 mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-[var(--color-amber)]" />
              {editingModel ? "Edit Machine Specs" : "Add New Machine"}
            </h3>
            <button
              onClick={handleCancelEdit}
              className="text-sm text-[var(--color-amber)] hover:text-[var(--color-amber-dark)] font-semibold transition"
            >
              &larr; Back to Catalog List
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Model Code
                </label>
                <input
                  type="text"
                  required
                  disabled={!!editingModel}
                  placeholder="e.g. WP-S500"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:border-[var(--color-amber)] disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Machine Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Case Taping Machine"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Tagline / Hook
              </label>
              <input
                type="text"
                placeholder="e.g. High-speed automatic strapping head"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Description (Tiptap Block Editor)
              </label>
              <TiptapInlineEditor
                value={formData.desc}
                onChange={(val) => setFormData({ ...formData, desc: val })}
              />
            </div>

            {/* Image upload handler */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Machine Image
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="/images/example.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition shadow-sm"
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[var(--color-amber)]" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                </button>
              </div>
              {formData.image && (
                <div className="mt-2 h-20 w-32 border border-slate-200 rounded overflow-hidden shadow-sm">
                  <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Technical Specifications (Label: Value lines)
              </label>
              <textarea
                rows={4}
                placeholder="Throughput Speed: 35 packs/min&#10;Max Sealer Size: 500 x 400 mm&#10;Electrical Load: 3.8 kW, 3-Phase"
                value={formData.specsText}
                onChange={(e) => setFormData({ ...formData, specsText: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-mono text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Highlights (Comma separated list)
              </label>
              <input
                type="text"
                placeholder="Conveyor integrated, PLC Touchscreen, CE Certified"
                value={formData.highlightsText}
                onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
              />
            </div>

            <div className="flex gap-2 pt-2 justify-end border-t border-slate-100 pt-4 mt-6">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex justify-center items-center gap-1.5 rounded-lg bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] px-6 py-2 text-sm font-bold text-white shadow-sm transition disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {editingModel ? "Save Changes" : "Publish Machine"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List View */
        <>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 bg-white p-6 rounded-2xl border shadow-sm">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Machinery Catalog Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage the end-of-line packaging machines catalog and specs</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingModel(null);
                  clearForm();
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] text-white font-semibold text-sm transition shadow-sm"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add New Machine</span>
              </button>
              <button
                onClick={fetchMachines}
                disabled={loading}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition shadow-sm"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Machinery Table List */}
          <div className="w-full rounded-xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2">Catalog Machines</h3>

            {loading ? (
              <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
                Syncing Machinery Database...
              </div>
            ) : machines.length === 0 ? (
              <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-400 flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-6 w-6 text-slate-300" />
                <span>No machines in database</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-slate-800">
                  <thead>
                    <tr className="border-b border-slate-200 font-mono text-xs uppercase tracking-wider text-slate-400">
                      <th className="py-3 pr-4">Image</th>
                      <th className="py-3 px-4">Model Code</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Tagline</th>
                      <th className="py-3 pl-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {machines.map((mach) => (
                      <tr key={mach.model} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 pr-4">
                          <div className="h-10 w-12 rounded bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
                            {mach.image ? (
                              <img src={mach.image} alt={mach.name} className="h-full w-full object-cover" />
                            ) : (
                              <span className="text-[8px] text-slate-400 font-mono">NO IMG</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[var(--color-amber-dark)]">{mach.model}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{mach.name}</td>
                        <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{mach.tagline || "N/A"}</td>
                        <td className="py-3 pl-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditInit(mach)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white hover:bg-[var(--color-amber)]/10 hover:text-[var(--color-amber-dark)] text-slate-500 transition shadow-sm"
                              title="Edit Machine"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(mach.model)}
                              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 text-slate-500 transition shadow-sm"
                              title="Delete Machine"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
