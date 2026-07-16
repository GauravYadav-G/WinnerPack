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
  };

  const handleCancelEdit = () => {
    setEditingModel(null);
    clearForm();
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
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Machinery Catalog Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage the end-of-line packaging machines catalog and specs</p>
        </div>
        <button
          onClick={fetchMachines}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#161923] hover:bg-white/5 transition"
        >
          <RefreshCw className={`h-4 w-4 text-slate-400 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Machinery Table List */}
        <div className="lg:col-span-8 rounded-xl border border-white/5 bg-[#161923] p-6 space-y-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-white">Catalog Machines</h3>

          {loading ? (
            <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
              Syncing Machinery Database...
            </div>
          ) : machines.length === 0 ? (
            <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500 flex flex-col items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6 text-slate-600" />
              <span>No machines in database</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-white/5 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    <th className="py-3 pr-4">Image</th>
                    <th className="py-3 px-4">Model Code</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Tagline</th>
                    <th className="py-3 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {machines.map((mach) => (
                    <tr key={mach.model} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 pr-4">
                        <div className="h-10 w-12 rounded bg-[#0F1117] border border-white/10 overflow-hidden flex items-center justify-center">
                          {mach.image ? (
                            <img src={mach.image} alt={mach.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-[8px] text-slate-600 font-mono">NO IMG</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">{mach.model}</td>
                      <td className="py-3 px-4 font-semibold text-white">{mach.name}</td>
                      <td className="py-3 px-4 text-slate-400 truncate max-w-xs">{mach.tagline || "N/A"}</td>
                      <td className="py-3 pl-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditInit(mach)}
                            className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-[#0F1117] hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                            title="Edit Machine"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(mach.model)}
                            className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-[#0F1117] hover:bg-red-500/10 hover:text-red-400 transition"
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

        {/* Creator / Editor Form */}
        <div className="lg:col-span-4">
          <div className="rounded-xl border border-white/5 bg-[#161923] p-6 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-cyan-400" />
              {editingModel ? "Edit Machine" : "Add New Machine"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Model Code
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!!editingModel}
                    placeholder="e.g. WP-S500"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Machine Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Case Taping Machine"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Tagline / Hook
                </label>
                <input
                  type="text"
                  placeholder="e.g. High-speed automatic strapping head"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Description (Rich Text Editor)
                </label>
                <TiptapInlineEditor
                  value={formData.desc}
                  onChange={(val) => setFormData({ ...formData, desc: val })}
                />
              </div>

              {/* Image upload handler */}
              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Machine Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/images/example.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
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
                    className="flex h-9 w-9 items-center justify-center rounded border border-white/10 bg-[#161923] hover:bg-white/5 text-slate-400 transition"
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.image && (
                  <div className="mt-2 h-20 w-32 border border-white/10 rounded overflow-hidden">
                    <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Technical Specifications (Label: Value lines)
                </label>
                <textarea
                  rows={4}
                  placeholder="Throughput Speed: 35 packs/min&#10;Max Sealer Size: 500 x 400 mm&#10;Electrical Load: 3.8 kW, 3-Phase"
                  value={formData.specsText}
                  onChange={(e) => setFormData({ ...formData, specsText: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Highlights (Comma separated list)
                </label>
                <input
                  type="text"
                  placeholder="Conveyor integrated, PLC Touchscreen, CE Certified"
                  value={formData.highlightsText}
                  onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex justify-center items-center gap-1.5 rounded bg-cyan-500 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 transition"
                >
                  {submitting && <Loader2 className="h-3 w-3 animate-spin" />}
                  {editingModel ? "Save Changes" : "Publish Machine"}
                </button>
                {editingModel && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded border border-white/10 bg-[#0F1117] px-3 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
