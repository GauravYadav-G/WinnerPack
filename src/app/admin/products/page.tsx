"use client";

import { useEffect, useState, useRef } from "react";
import { PlusCircle, AlertCircle, RefreshCw, Trash2, Edit2, Upload, Loader2 } from "lucide-react";
import TiptapInlineEditor from "@/components/admin/TiptapInlineEditor";

type Product = {
  _id?: string;
  id: string;
  title: string;
  category: string;
  tag: string;
  blurb: string;
  longDesc?: string;
  basePrice?: string;
  image?: string;
  gallery?: string[];
  specs?: Record<string, string>;
  options?: {
    widths: string[];
    thicknesses: string[];
    colors: string[];
  };
  applications?: string[];
  visualGradients?: string;
};

const CATEGORIES = [
  { id: "labels", title: "Labels" },
  { id: "films-bags-tubes", title: "Films, Bags & Tubes" },
  { id: "strapping", title: "Strapping" },
  { id: "protective", title: "Protective Packaging" },
  { id: "tapes", title: "Tapes" },
  { id: "pallet-wrapping", title: "Pallet Wrapping" }
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "labels",
    tag: "",
    blurb: "",
    longDesc: "",
    basePrice: "",
    image: "",
    specsText: "", // Key: Value lines
    widthsText: "", // Comma separated
    thicknessesText: "", // Comma separated
    colorsText: "", // Comma separated
    applicationsText: "", // Comma separated
    visualGradients: "from-emerald-400 to-teal-500",
  });

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
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

  // Convert Specs Record to Text lines
  const recordToText = (record?: Record<string, string>) => {
    if (!record) return "";
    return Object.entries(record)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  };

  // Parse Text lines to Specs Record
  const textToRecord = (text: string): Record<string, string> => {
    const record: Record<string, string> = {};
    text.split("\n").forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(":").trim();
        if (key && val) {
          record[key] = val;
        }
      }
    });
    return record;
  };

  const handleEditInit = (prod: Product) => {
    setEditingId(prod.id);
    setFormData({
      title: prod.title,
      category: prod.category,
      tag: prod.tag,
      blurb: prod.blurb,
      longDesc: prod.longDesc || "",
      basePrice: prod.basePrice || "",
      image: prod.image || "",
      specsText: recordToText(prod.specs),
      widthsText: prod.options?.widths?.join(", ") || "",
      thicknessesText: prod.options?.thicknesses?.join(", ") || "",
      colorsText: prod.options?.colors?.join(", ") || "",
      applicationsText: prod.applications?.join(", ") || "",
      visualGradients: prod.visualGradients || "from-emerald-400 to-teal-500",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      title: "",
      category: "labels",
      tag: "",
      blurb: "",
      longDesc: "",
      basePrice: "",
      image: "",
      specsText: "",
      widthsText: "",
      thicknessesText: "",
      colorsText: "",
      applicationsText: "",
      visualGradients: "from-emerald-400 to-teal-500",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: Product = {
      id: editingId || "",
      title: formData.title,
      category: formData.category,
      tag: formData.tag,
      blurb: formData.blurb,
      longDesc: formData.longDesc,
      basePrice: formData.basePrice,
      image: formData.image,
      gallery: formData.image ? [formData.image] : [],
      specs: textToRecord(formData.specsText),
      options: {
        widths: formData.widthsText.split(",").map((s) => s.trim()).filter(Boolean),
        thicknesses: formData.thicknessesText.split(",").map((s) => s.trim()).filter(Boolean),
        colors: formData.colorsText.split(",").map((s) => s.trim()).filter(Boolean),
      },
      applications: formData.applicationsText.split(",").map((s) => s.trim()).filter(Boolean),
      visualGradients: formData.visualGradients,
    };

    try {
      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(editingId ? "Product updated successfully!" : "Product created successfully!");
        handleCancelEdit();
        fetchProducts();
      } else {
        const errorData = await res.json();
        alert("Failed to save product: " + errorData.error);
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to save product: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
        if (editingId === id) handleCancelEdit();
      } else {
        alert("Failed to delete product.");
      }
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Product Catalog Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Add, edit, or remove packaging materials from the live catalog</p>
        </div>
        <button
          onClick={fetchProducts}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#161923] hover:bg-white/5 transition"
        >
          <RefreshCw className={`h-4 w-4 text-slate-400 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Products Table List */}
        <div className="lg:col-span-8 rounded-xl border border-white/5 bg-[#161923] p-6 space-y-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-white">Catalog Products</h3>

          {loading ? (
            <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
              Syncing Catalog Database...
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500 flex flex-col items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6 text-slate-600" />
              <span>No products in database</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-white/5 font-mono text-[9px] uppercase tracking-wider text-slate-400">
                    <th className="py-3 pr-4">Image</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Base Price</th>
                    <th className="py-3 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 pr-4">
                        <div className="h-10 w-12 rounded bg-[#0F1117] border border-white/10 overflow-hidden flex items-center justify-center">
                          {prod.image ? (
                            <img src={prod.image} alt={prod.title} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-[8px] text-slate-600 font-mono">NO IMG</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        <div>{prod.title}</div>
                        <div className="text-[10px] font-mono text-cyan-400 mt-0.5">{prod.tag}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-400 uppercase">
                          {prod.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold">{prod.basePrice || "N/A"}</td>
                      <td className="py-3 pl-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditInit(prod)}
                            className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-[#0F1117] hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                            title="Edit Product"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-[#0F1117] hover:bg-red-500/10 hover:text-red-400 transition"
                            title="Delete Product"
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
              {editingId ? "Edit Product" : "Add New Product"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Polypropylene Strap Rolls"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Tag / Material
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PET, PP, Acrylic"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Short Blurb
                </label>
                <input
                  type="text"
                  required
                  placeholder="One sentence product hook description"
                  value={formData.blurb}
                  onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Long Description (Rich Text Editor)
                </label>
                <TiptapInlineEditor
                  value={formData.longDesc}
                  onChange={(val) => setFormData({ ...formData, longDesc: val })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Base Price (Text)
                  </label>
                  <input
                    type="text"
                    placeholder="₹2,450 / Roll"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Color Theme Gradient
                  </label>
                  <input
                    type="text"
                    placeholder="from-emerald-400 to-teal-500"
                    value={formData.visualGradients}
                    onChange={(e) => setFormData({ ...formData, visualGradients: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Image upload handler */}
              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Product Image
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
                  Technical Specifications (Key: Value lines)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tensile Strength: 460 kg average&#10;Elongation Rate: 12% - 18%&#10;Core Size: 406mm ID x 150mm Width"
                  value={formData.specsText}
                  onChange={(e) => setFormData({ ...formData, specsText: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Applications (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Pallet stabilization, Export packing"
                  value={formData.applicationsText}
                  onChange={(e) => setFormData({ ...formData, applicationsText: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  Customization Options
                </span>
                <div>
                  <input
                    type="text"
                    placeholder="Widths (e.g. 12 mm, 15 mm)"
                    value={formData.widthsText}
                    onChange={(e) => setFormData({ ...formData, widthsText: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Thicknesses (e.g. 0.6 mm, 0.8 mm)"
                    value={formData.thicknessesText}
                    onChange={(e) => setFormData({ ...formData, thicknessesText: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Colors (e.g. Emerald Green, Jet Black)"
                    value={formData.colorsText}
                    onChange={(e) => setFormData({ ...formData, colorsText: e.target.value })}
                    className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex justify-center items-center gap-1.5 rounded bg-cyan-500 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 transition"
                >
                  {submitting && <Loader2 className="h-3 w-3 animate-spin" />}
                  {editingId ? "Save Changes" : "Publish Product"}
                </button>
                {editingId && (
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
