"use client";

import { apiFetch } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  ExternalLink,
  Image as ImageIcon,
  Table as TableIcon,
  Layers,
  Sliders,
  CheckCircle2,
  Grid,
  Tag,
  Package,
  ShieldCheck,
  Eye,
  Sparkles,
  X
} from "lucide-react";
import { initialProducts } from "@/lib/fallback-data";
import TiptapEditor from "@/components/TiptapEditor";
import OptimizedImage from '@/components/OptimizedImage';

export default function ProductDetailEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [editorMode, setEditorMode] = useState<"tiptap" | "markdown">("tiptap");
  const [splitPreview, setSplitPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "basic" | "applications" | "specs" | "yieldMatrix" | "options" | "subcategories" | "features"
  >("basic");

  // Form State
  const [formData, setFormData] = useState<any>({
    id: isNew ? "" : id,
    title: "",
    category: "film-products",
    tag: "Standard",
    longDesc: "",
    image: "/images/products/pof-shrink-rolls/image.png",
    gallery: [],
    specs: {},
    options: {
      widths: [],
      thicknesses: [],
      colors: []
    },
    thicknessLengthMatrix: [],
    subCategories: [],
    features: [],
    applications: []
  });

  // Application Slots (4 Slots)
  const [applicationSlots, setApplicationSlots] = useState<any[]>([
    {
      slotId: 1,
      title: "Application Slot 1: Primary Industrial Packaging",
      image: "/images/desktop/portfolio/product_app_pallet_wrapping.png",
      description: "High-speed automated packaging, bundling, and pallet wrapping."
    },
    {
      slotId: 2,
      title: "Application Slot 2: Retail & Consumer Goods",
      image: "/images/desktop/portfolio/product_app_warehouse_dispatch.png",
      description: "Crystal clear display packaging for retail products and multi-packs."
    },
    {
      slotId: 3,
      title: "Application Slot 3: Warehouse & Transport",
      image: "/images/desktop/portfolio/showcase_printed_custom_tapes.png",
      description: "Tamper-evident carton sealing and heavy load unitization during transit."
    },
    {
      slotId: 4,
      title: "Application Slot 4: Logistics & Export Bundling",
      image: "/images/desktop/portfolio/gallery_labels_stickers.png",
      description: "Weather-resistant protective bundling for overseas sea and air dispatch."
    }
  ]);

  // Technical Specs Key-Value array state for easy editing
  const [specsList, setSpecsList] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    if (isNew) return;

    setLoading(true);
    apiFetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        const fallback = initialProducts.find((p) => p.id === (data.id || id));
        if (!Array.isArray(data.thicknessLengthMatrix) || data.thicknessLengthMatrix.length === 0) {
          data.thicknessLengthMatrix = fallback?.thicknessLengthMatrix || [
            { micron: "12", gauge: "48", meters: "2,500", feet: "8,200" },
            { micron: "15", gauge: "60", meters: "2,000", feet: "6,560" },
            { micron: "19", gauge: "75", meters: "1,500", feet: "4,920" },
            { micron: "25", gauge: "100", meters: "1,000", feet: "3,280" }
          ];
        }

        if (!Array.isArray(data.subCategories) || data.subCategories.length === 0) {
          data.subCategories = fallback?.subCategories || [];
        }

        if (!Array.isArray(data.features) || data.features.length === 0) {
          data.features = (fallback as any)?.features || [
            "High tensile strength and puncture resistance",
            "Consistent thickness and gauge control across every roll",
            "100% recyclable prime grade polymer resin formulation",
            "ISO 9001:2015 quality certified batch manufacturing"
          ];
        }

        if (!data.options || (Object.keys(data.options).length === 0)) {
          data.options = fallback?.options || {
            widths: ["300 mm", "450 mm", "500 mm", "1000 mm"],
            thicknesses: ["15 Micron", "19 Micron", "25 Micron", "30 Micron"],
            colors: ["Ultra Clear Glass", "Opaque White", "Jet Black"]
          };
        }

        if (!Array.isArray(data.whatsIncluded) || data.whatsIncluded.length === 0) {
          data.whatsIncluded = (fallback as any)?.whatsIncluded || [
            "FDA & WHO-GMP Compliant",
            "Zero Downtime Tolerance",
            "Full Traceability COA",
            "High Tensile Guarantee",
            "Custom Gauge Options",
            "Engineering Support"
          ];
        }

        setFormData(data);

        // Convert specs object to array
        if (data.specs && typeof data.specs === "object") {
          const list = Object.entries(data.specs).map(([key, value]) => ({
            key,
            value: String(value)
          }));
          setSpecsList(list);
        } else {
          setSpecsList([]);
        }

        // Initialize application slots from data if present
        if (Array.isArray(data.applicationSlots) && data.applicationSlots.length > 0) {
          setApplicationSlots(data.applicationSlots);
        } else {
          setApplicationSlots([
            { slotId: 1, title: `${data.title || "Product"} Primary Application`, image: `/images/products/${data.id}/applications/app-1.png`, description: `Primary high-performance application for ${data.title || "this product"}.` },
            { slotId: 2, title: `${data.title || "Product"} Industrial Line`, image: `/images/products/${data.id}/applications/app-2.png`, description: `Automated line throughput and processing with ${data.title || "this product"}.` },
            { slotId: 3, title: `${data.title || "Product"} Warehouse & Transport`, image: `/images/products/${data.id}/applications/app-3.png`, description: `Pallet unitization and heavy load transit with ${data.title || "this product"}.` },
            { slotId: 4, title: `${data.title || "Product"} Export Packaging`, image: `/images/products/${data.id}/applications/app-4.png`, description: `Export weather protection and bundling for ${data.title || "this product"}.` },
          ]);
        }
      })
      .catch(() => {
        // Fallback to client initialProducts
        const fallback = initialProducts.find((p) => p.id === id);
        if (fallback) {
          if (!Array.isArray(fallback.thicknessLengthMatrix) || fallback.thicknessLengthMatrix.length === 0) {
            (fallback as any).thicknessLengthMatrix = [
              { micron: "12", gauge: "48", meters: "2,500", feet: "8,200" },
              { micron: "15", gauge: "60", meters: "2,000", feet: "6,560" },
              { micron: "19", gauge: "75", meters: "1,500", feet: "4,920" },
              { micron: "25", gauge: "100", meters: "1,000", feet: "3,280" }
            ];
          }
          setFormData(fallback);
          if (fallback.specs && typeof fallback.specs === "object") {
            const list = Object.entries(fallback.specs).map(([key, value]) => ({
              key,
              value: String(value)
            }));
            setSpecsList(list);
          }
          if (Array.isArray((fallback as any).subCategories)) {
            const derived = (fallback as any).subCategories.slice(0, 4).map((sub: any, idx: number) => ({
              slotId: idx + 1,
              title: sub.title || `Application Slot ${idx + 1}`,
              image: sub.image || `/images/products/${fallback.id}/applications/app-${idx + 1}.png`,
              description: sub.blurb || `Industrial application for ${sub.title}`
            }));
            setApplicationSlots(derived);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  // Handle Spec Array Update
  const handleSpecChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specsList];
    updated[index][field] = val;
    setSpecsList(updated);
  };

  const handleAddSpecRow = () => {
    setSpecsList((prev) => [...prev, { key: "New Property", value: "Standard Spec Value" }]);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecsList((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Application Slot Update
  const handleSlotChange = (index: number, field: string, val: string) => {
    const updated = [...applicationSlots];
    updated[index] = { ...updated[index], [field]: val };
    setApplicationSlots(updated);
  };

  // Save Product Changes
  const handleSave = async () => {
    setSaving(true);
    try {
      // Reconstruct specs object
      const specsObj: Record<string, string> = {};
      specsList.forEach((item) => {
        if (item.key.trim()) {
          specsObj[item.key.trim()] = item.value;
        }
      });

      const payload = {
        ...formData,
        specs: specsObj,
        applicationSlots: applicationSlots
      };

      const url = isNew ? "/api/products" : `/api/products/${formData.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`Product "${formData.title}" saved successfully!`);
        if (isNew) {
          router.push(`/admin/products/${formData.id || id}`);
        }
      } else {
        alert("Failed to save product changes.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while saving product.");
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
        Loading Product Specifications & Application Slots...
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full font-sans pb-16 text-[#0F1721]">
      
      {/* 1. TOP TOOLBAR & HEADER */}
      <div className="rounded-[32px] bg-white p-6 sm:p-8 border border-[#e5dfd2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="h-11 w-11 rounded-2xl border border-[#e5dfd2] bg-[#f8f7f4] flex items-center justify-center text-[#120a3b] hover:bg-[#fff5eb] hover:text-[#fe8220] transition shrink-0"
            title="Back to Product Catalog"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#fff5eb] text-[#fe8220] border border-[#fe8220]/30 px-2.5 py-0.5 rounded-full">
                {formData.category || "film-products"}
              </span>
              <span className="text-[10px] font-mono text-slate-400">ID: {formData.id}</span>
            </div>
            <h1 className="text-2xl font-black text-[#120a3b] font-display mt-0.5">
              {isNew ? "Create New Product SKU" : `Editing: ${formData.title}`}
            </h1>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {!isNew && (
            <a
              href={`/products/${formData.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-2xl bg-white border border-[#e5dfd2] flex items-center justify-center text-[#120a3b] hover:bg-[#fff5eb] hover:text-[#fe8220] transition shadow-2xs"
              title="Preview Public Page"
            >
              <ExternalLink className="h-4.5 w-4.5" />
            </a>
          )}

          <button
            onClick={() => setSplitPreview(!splitPreview)}
            className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-extrabold transition cursor-pointer ${
              splitPreview
                ? "bg-[#120a3b] text-amber-400 border-[#120a3b] shadow-md"
                : "bg-white text-slate-700 border-[#e5dfd2] hover:bg-[#fff5eb] hover:text-[#fe8220]"
            }`}
          >
            <Eye className="h-4 w-4 text-[#fe8220]" />
            <span>{splitPreview ? "Hide Split Live Inspector" : "Split Live Inspector"}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-[#fe8220] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-orange-500/25 hover:bg-[#d4630a] transition cursor-pointer"
          >
            <Save className="h-4 w-4 text-white" />
            <span>{saving ? "Saving Changes..." : "Save Product Data"}</span>
          </button>
        </div>
      </div>

      {/* 2. EDITOR NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[#e5dfd2]">
        {[
          { id: "basic", label: "Basic Info & Gallery", icon: ImageIcon },
          { id: "applications", label: "Application Image Slots (4 Slots)", icon: Layers },
          { id: "specs", label: "Technical Specs Table", icon: TableIcon },
          { id: "yieldMatrix", label: "Thickness Yield Matrix", icon: Grid },
          { id: "options", label: "Widths, Thickness & Colors", icon: Tag },
          { id: "subcategories", label: "Subcategory Variants", icon: Sliders },
          { id: "features", label: "Features & Applications", icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#120a3b] text-white shadow-md"
                  : "bg-white text-[#5A6473] border border-[#e5dfd2] hover:bg-[#fff5eb] hover:text-[#fe8220]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENT EDITORS */}
      <div className="w-full space-y-6">
          
          {/* TAB 1: BASIC DETAILS & MEDIA */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Fields (8/12) */}
            <div className="lg:col-span-8 space-y-6 rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs">
              <h2 className="text-base font-bold text-[#120a3b] font-display border-b border-[#e5dfd2] pb-3">
                General Product Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. POF Shrink Film Rolls"
                    className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-3 text-sm font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                      Product ID (Slug) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.id || ""}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g. pof-shrink-rolls"
                      className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category || "film-products"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    >
                      <option value="film-products">Film Products</option>
                      <option value="label-sticker-products">Labels & Stickers</option>
                      <option value="tapes">Industrial Tapes</option>
                      <option value="pp-strap">PP & PET Strap</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                      Tag / Grade
                    </label>
                    <input
                      type="text"
                      value={formData.tag || ""}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      placeholder="e.g. Premium Grade"
                      className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>
                </div>



                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                    Short Blurb / Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.blurb || ""}
                    onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                    placeholder="Brief overview summary of the product..."
                    className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-3 text-xs font-medium text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-[#e5dfd2]">
                    <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#fe8220]" />
                      Product Overview Description (Tiptap Rich-Text Editor)
                    </label>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditorMode("tiptap")}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                          editorMode === "tiptap"
                            ? "bg-[#120a3b] text-amber-400 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Tiptap Visual Editor
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditorMode("markdown")}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                          editorMode === "markdown"
                            ? "bg-[#120a3b] text-amber-400 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Raw Markdown
                      </button>
                    </div>
                  </div>

                  {editorMode === "tiptap" ? (
                    <TiptapEditor
                      content={formData.longDesc || ""}
                      onChange={(html) => setFormData((prev: any) => ({ ...prev, longDesc: html }))}
                    />
                  ) : (
                    <textarea
                      rows={10}
                      value={formData.longDesc || ""}
                      onChange={(e) => setFormData({ ...formData, longDesc: e.target.value })}
                      placeholder="Full detailed specifications, key features, and material composition..."
                      className="w-full rounded-2xl border border-[#e5dfd2] p-4 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none leading-relaxed"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Media & Image Thumbnails (4/12) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-[32px] bg-white p-7 border border-[#e5dfd2] shadow-xs space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase text-[#120a3b] flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-[#fe8220]" />
                  Main Product Hero Image
                </h3>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full rounded-2xl border border-[#e5dfd2] px-3 py-2 text-xs font-mono focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div className="relative aspect-[16/10] w-full rounded-2xl border border-[#e5dfd2] bg-[#f8f7f4] overflow-hidden p-3 flex items-center justify-center">
                  {formData.image ? (
                    <OptimizedImage
  src={formData.image}
  alt="Thumbnail Preview"
  className="h-full w-full object-contain"
/>
                  ) : (
                    <span className="text-xs text-slate-400 font-mono">No Image Provided</span>
                  )}
                </div>
              </div>

              {/* Multi-Image Gallery List */}
              <div className="rounded-[32px] bg-white p-7 border border-[#e5dfd2] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase text-[#120a3b]">
                    Gallery Images ({formData.gallery?.length || 0})
                  </h3>
                  <button
                    onClick={() => {
                      const updated = [...(formData.gallery || []), ""];
                      setFormData({ ...formData, gallery: updated });
                    }}
                    className="text-[10px] font-mono font-bold text-[#fe8220] hover:underline"
                  >
                    + Add Image
                  </button>
                </div>

                <div className="space-y-3">
                  {(formData.gallery || []).map((imgUrl: string, gIdx: number) => (
                    <div key={gIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...(formData.gallery || [])];
                          updated[gIdx] = e.target.value;
                          setFormData({ ...formData, gallery: updated });
                        }}
                        placeholder="/images/products/..."
                        className="flex-1 rounded-xl border border-[#e5dfd2] px-3 py-1.5 text-xs font-mono focus:border-[#fe8220] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = (formData.gallery || []).filter((_: any, i: number) => i !== gIdx);
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 2: APPLICATION IMAGE SLOTS (4 SLOTS) ── */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-2">
              <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#fe8220]" />
                Application Image Slots (4 Slot Architecture)
              </h2>
              <p className="text-xs text-[#5A6473] font-medium">
                Configure the 4 image slots and application descriptions displayed on the public product showcase page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applicationSlots.map((slot, idx) => (
                <div key={idx} className="rounded-[28px] bg-white p-7 border border-[#e5dfd2] shadow-xs space-y-4 hover:border-[#fe8220] transition duration-200">
                  <div className="flex items-center justify-between border-b border-[#e5dfd2] pb-3">
                    <span className="text-xs font-mono font-bold uppercase text-[#120a3b]">
                      Slot {idx + 1} Configuration
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-[#fff5eb] text-[#fe8220] px-2.5 py-0.5 rounded-full border border-[#fe8220]/30">
                      Slot #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#120a3b] mb-1">
                      Slot Title
                    </label>
                    <input
                      type="text"
                      value={slot.title || ""}
                      onChange={(e) => handleSlotChange(idx, "title", e.target.value)}
                      placeholder="e.g. High-Speed Pallet Wrapping"
                      className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#120a3b] mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={slot.image || ""}
                      onChange={(e) => handleSlotChange(idx, "image", e.target.value)}
                      placeholder="/images/desktop/portfolio/product_app_pallet_wrapping.png"
                      className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>

                  {/* Slot Image Preview */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl border border-[#e5dfd2] bg-[#f8f7f4] overflow-hidden p-3 flex items-center justify-center">
                    {slot.image ? (
                      <OptimizedImage
  src={slot.image}
  alt={slot.title}
  className="h-full w-full object-cover rounded-xl"
/>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">No Slot Image</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#120a3b] mb-1">
                      Application Description / Blurb
                    </label>
                    <textarea
                      rows={3}
                      value={slot.description || ""}
                      onChange={(e) => handleSlotChange(idx, "description", e.target.value)}
                      placeholder="Description of how this product is applied in industrial manufacturing..."
                      className="w-full rounded-2xl border border-[#e5dfd2] p-3 text-xs font-medium text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: TECHNICAL SPECIFICATIONS TABLE EDITOR ── */}
        {activeTab === "specs" && (
          <div className="space-y-6">
            <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                    <TableIcon className="h-5 w-5 text-[#fe8220]" />
                    Technical Specifications Table Editor
                  </h2>
                  <p className="text-xs text-[#5A6473] font-medium mt-0.5">
                    Define technical parameters (micron, tensile strength, roll width, temperature resistance) shown on website tables.
                  </p>
                </div>

                <button
                  onClick={handleAddSpecRow}
                  className="flex items-center gap-2 rounded-full bg-[#120a3b] px-4 py-2 text-xs font-extrabold text-white shadow-xs hover:bg-[#120a3b]/90 transition cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4 text-[#fe8220]" />
                  <span>Add Spec Row</span>
                </button>
              </div>

              {specsList.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-slate-400 rounded-2xl border border-dashed border-[#e5dfd2] bg-[#f8f7f4]">
                  No technical specification rows added yet. Click "Add Spec Row" above.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-[#e5dfd2]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#e5dfd2] bg-[#f8f7f4] font-mono text-[10px] uppercase text-[#5A6473]">
                        <th className="p-4 font-bold w-1/3">Property / Parameter Name</th>
                        <th className="p-4 font-bold">Standard Specification Value</th>
                        <th className="p-4 font-bold text-right w-20">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5dfd2]/60">
                      {specsList.map((item, index) => (
                        <tr key={index} className="hover:bg-[#fff5eb]/40 transition">
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.key}
                              onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                              placeholder="e.g. Tensile Strength"
                              className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-bold text-[#120a3b] focus:border-[#fe8220] focus:outline-none"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.value}
                              onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                              placeholder="e.g. ≥ 140 MPa (MD) / ≥ 130 MPa (TD)"
                              className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-mono text-slate-800 focus:border-[#fe8220] focus:outline-none"
                            />
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleRemoveSpecRow(index)}
                              className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                              title="Delete Row"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 4: THICKNESS YIELD MATRIX ── */}
        {activeTab === "yieldMatrix" && (
          <div className="space-y-6">
            <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                    <Grid className="h-5 w-5 text-[#fe8220]" />
                    Thickness & Length Standard Roll Yield Matrix
                  </h2>
                  <p className="text-xs text-[#5A6473] font-medium mt-0.5">
                    Standard roll conversion matrix for Micron (µm), Gauge, Meters, and Feet yield.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const current = formData.thicknessLengthMatrix || [];
                    setFormData({
                      ...formData,
                      thicknessLengthMatrix: [
                        ...current,
                        { micron: "15 µm", gauge: "60 Gauge", meters: "1,500 m", feet: "4,920 ft" }
                      ]
                    });
                  }}
                  className="flex items-center gap-2 rounded-full bg-[#120a3b] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#120a3b]/90 transition cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4 text-[#fe8220]" />
                  <span>Add Matrix Row</span>
                </button>
              </div>

              {(!formData.thicknessLengthMatrix || formData.thicknessLengthMatrix.length === 0) ? (
                <div className="py-12 text-center text-xs font-mono text-slate-400 rounded-2xl border border-dashed border-[#e5dfd2] bg-[#f8f7f4]">
                  No yield matrix configured. Click "Add Matrix Row" to add roll specifications.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-[#e5dfd2]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#e5dfd2] bg-[#f8f7f4] font-mono text-[10px] uppercase text-[#5A6473]">
                        <th className="p-4 font-bold">Micron (µm)</th>
                        <th className="p-4 font-bold">Gauge</th>
                        <th className="p-4 font-bold">Meters Yield</th>
                        <th className="p-4 font-bold">Feet Yield</th>
                        <th className="p-4 font-bold text-right w-20">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5dfd2]/60">
                      {formData.thicknessLengthMatrix.map((row: any, rIdx: number) => (
                        <tr key={rIdx} className="hover:bg-[#fff5eb]/40 transition">
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.micron || ""}
                              onChange={(e) => {
                                const updated = [...formData.thicknessLengthMatrix];
                                updated[rIdx].micron = e.target.value;
                                setFormData({ ...formData, thicknessLengthMatrix: updated });
                              }}
                              placeholder="15 µm"
                              className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-bold text-[#fe8220] font-mono"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.gauge || ""}
                              onChange={(e) => {
                                const updated = [...formData.thicknessLengthMatrix];
                                updated[rIdx].gauge = e.target.value;
                                setFormData({ ...formData, thicknessLengthMatrix: updated });
                              }}
                              placeholder="60 Gauge"
                              className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-mono"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.meters || ""}
                              onChange={(e) => {
                                const updated = [...formData.thicknessLengthMatrix];
                                updated[rIdx].meters = e.target.value;
                                setFormData({ ...formData, thicknessLengthMatrix: updated });
                              }}
                              placeholder="1,500 m"
                              className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-bold text-[#120a3b] font-mono"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={row.feet || ""}
                              onChange={(e) => {
                                const updated = [...formData.thicknessLengthMatrix];
                                updated[rIdx].feet = e.target.value;
                                setFormData({ ...formData, thicknessLengthMatrix: updated });
                              }}
                              placeholder="4,920 ft"
                              className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-mono"
                            />
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                const updated = formData.thicknessLengthMatrix.filter((_: any, i: number) => i !== rIdx);
                                setFormData({ ...formData, thicknessLengthMatrix: updated });
                              }}
                              className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 5: OPTIONS (WIDTHS, THICKNESSES, COLORS) ── */}
        {activeTab === "options" && (
          <div className="space-y-6">
            <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-6">
              <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                <Tag className="h-5 w-5 text-[#fe8220]" />
                Product Specification Option Arrays
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Available Widths */}
                <div className="rounded-2xl border border-[#e5dfd2] p-5 bg-[#f8f7f4] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase text-[#120a3b]">Widths</h3>
                    <button
                      onClick={() => {
                        const current = formData.options?.widths || [];
                        setFormData({
                          ...formData,
                          options: { ...formData.options, widths: [...current, "12mm"] }
                        });
                      }}
                      className="text-[10px] font-mono font-bold text-[#fe8220] hover:underline"
                    >
                      + Add Width
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(formData.options?.widths || []).map((w: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={w}
                          onChange={(e) => {
                            const updated = [...(formData.options?.widths || [])];
                            updated[idx] = e.target.value;
                            setFormData({
                              ...formData,
                              options: { ...formData.options, widths: updated }
                            });
                          }}
                          className="flex-1 rounded-xl border border-[#e5dfd2] px-3 py-1.5 text-xs font-semibold"
                        />
                        <button
                          onClick={() => {
                            const updated = (formData.options?.widths || []).filter((_: any, i: number) => i !== idx);
                            setFormData({
                              ...formData,
                              options: { ...formData.options, widths: updated }
                            });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Thicknesses */}
                <div className="rounded-2xl border border-[#e5dfd2] p-5 bg-[#f8f7f4] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase text-[#120a3b]">Thicknesses</h3>
                    <button
                      onClick={() => {
                        const current = formData.options?.thicknesses || [];
                        setFormData({
                          ...formData,
                          options: { ...formData.options, thicknesses: [...current, "15 Micron"] }
                        });
                      }}
                      className="text-[10px] font-mono font-bold text-[#fe8220] hover:underline"
                    >
                      + Add Thickness
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(formData.options?.thicknesses || []).map((t: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={t}
                          onChange={(e) => {
                            const updated = [...(formData.options?.thicknesses || [])];
                            updated[idx] = e.target.value;
                            setFormData({
                              ...formData,
                              options: { ...formData.options, thicknesses: updated }
                            });
                          }}
                          className="flex-1 rounded-xl border border-[#e5dfd2] px-3 py-1.5 text-xs font-semibold"
                        />
                        <button
                          onClick={() => {
                            const updated = (formData.options?.thicknesses || []).filter((_: any, i: number) => i !== idx);
                            setFormData({
                              ...formData,
                              options: { ...formData.options, thicknesses: updated }
                            });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Colors */}
                <div className="rounded-2xl border border-[#e5dfd2] p-5 bg-[#f8f7f4] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase text-[#120a3b]">Colors</h3>
                    <button
                      onClick={() => {
                        const current = formData.options?.colors || [];
                        setFormData({
                          ...formData,
                          options: { ...formData.options, colors: [...current, "Transparent"] }
                        });
                      }}
                      className="text-[10px] font-mono font-bold text-[#fe8220] hover:underline"
                    >
                      + Add Color
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(formData.options?.colors || []).map((c: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={c}
                          onChange={(e) => {
                            const updated = [...(formData.options?.colors || [])];
                            updated[idx] = e.target.value;
                            setFormData({
                              ...formData,
                              options: { ...formData.options, colors: updated }
                            });
                          }}
                          className="flex-1 rounded-xl border border-[#e5dfd2] px-3 py-1.5 text-xs font-semibold"
                        />
                        <button
                          onClick={() => {
                            const updated = (formData.options?.colors || []).filter((_: any, i: number) => i !== idx);
                            setFormData({
                              ...formData,
                              options: { ...formData.options, colors: updated }
                            });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: SUBCATEGORY VARIANTS FULL EDITOR ── */}
        {activeTab === "subcategories" && (
          <div className="space-y-6">
            <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-[#fe8220]" />
                    Subcategory Grade Variants ({formData.subCategories?.length || 0} Defined)
                  </h2>
                  <p className="text-xs text-[#5A6473] font-medium mt-0.5">
                    Define dedicated sub-products, material grades, or specialized variants under this main SKU.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const current = formData.subCategories || [];
                    const newSub = {
                      id: `sub-${Date.now()}`,
                      title: "New Sub-Variant Grade",
                      subtitle: "Specialized Grade",
                      blurb: "Detailed description of this sub-category variant...",
                      image: "/images/products/pof-shrink-rolls/image.png",
                      specs: {
                        "Material Grade": "High Grade Polyolefin",
                        "Application": "Industrial Packaging"
                      },
                      applications: ["Pallet Wrapping", "Carton Sealing"]
                    };
                    setFormData({ ...formData, subCategories: [...current, newSub] });
                  }}
                  className="flex items-center gap-2 rounded-full bg-[#120a3b] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#120a3b]/90 transition cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4 text-[#fe8220]" />
                  <span>Add Subcategory Variant</span>
                </button>
              </div>

              {(!formData.subCategories || formData.subCategories.length === 0) ? (
                <div className="py-12 text-center text-xs font-mono text-slate-400 rounded-2xl border border-dashed border-[#e5dfd2] bg-[#f8f7f4]">
                  Standard standalone SKU without subcategories. Click "Add Subcategory Variant" above to define variants.
                </div>
              ) : (
                <div className="space-y-6">
                  {formData.subCategories.map((sub: any, subIdx: number) => (
                    <div key={subIdx} className="rounded-3xl border border-[#e5dfd2] p-6 bg-white space-y-4 hover:border-[#fe8220] transition">
                      <div className="flex items-center justify-between border-b border-[#e5dfd2] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold uppercase bg-[#120a3b] text-white px-3 py-1 rounded-full">
                            Variant #{subIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={sub.title || ""}
                            onChange={(e) => {
                              const updated = [...formData.subCategories];
                              updated[subIdx].title = e.target.value;
                              setFormData({ ...formData, subCategories: updated });
                            }}
                            placeholder="Variant Title"
                            className="text-sm font-bold text-[#120a3b] rounded-xl border border-[#e5dfd2] px-3 py-1 font-display"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const updated = formData.subCategories.filter((_: any, i: number) => i !== subIdx);
                            setFormData({ ...formData, subCategories: updated });
                          }}
                          className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                        {/* Left Column: Subcategory Image Preview (4/12) */}
                        <div className="md:col-span-4 space-y-1.5">
                          <label className="block text-[10px] font-mono font-bold uppercase text-slate-500">
                            Variant Image Preview
                          </label>
                          <div className="relative aspect-[16/10] w-full rounded-2xl border border-[#e5dfd2] bg-slate-900 overflow-hidden shadow-xs group flex items-center justify-center">
                            {sub.image ? (
                              <OptimizedImage
  src={sub.image}
  alt={sub.title || "Subcategory Preview"}
  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
/>
                            ) : (
                              <span className="text-[10px] font-mono text-slate-400">No Image Provided</span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-2">
                              <span className="text-[9px] font-mono text-white font-bold truncate">{sub.image || "No Path"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Subtitle, Image URL Input & Summary Blurb (8/12) */}
                        <div className="md:col-span-8 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Subtitle / Grade Tag</label>
                              <input
                                type="text"
                                value={sub.subtitle || ""}
                                onChange={(e) => {
                                  const updated = [...formData.subCategories];
                                  updated[subIdx].subtitle = e.target.value;
                                  setFormData({ ...formData, subCategories: updated });
                                }}
                                placeholder="e.g. Premium Grade"
                                className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Variant Image URL</label>
                              <input
                                type="text"
                                value={sub.image || ""}
                                onChange={(e) => {
                                  const updated = [...formData.subCategories];
                                  updated[subIdx].image = e.target.value;
                                  setFormData({ ...formData, subCategories: updated });
                                }}
                                placeholder="/images/products/..."
                                className="w-full rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">Variant Summary Blurb</label>
                            <textarea
                              rows={2}
                              value={sub.blurb || ""}
                              onChange={(e) => {
                                const updated = [...formData.subCategories];
                                updated[subIdx].blurb = e.target.value;
                                setFormData({ ...formData, subCategories: updated });
                              }}
                              placeholder="Brief summary of variant properties..."
                              className="w-full rounded-xl border border-[#e5dfd2] p-3 text-xs text-slate-900 focus:border-[#fe8220] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: FEATURES, GUARANTEES & APPLICATIONS */}
        {activeTab === "features" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Features / USPs */}
              <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-6">
                <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#fe8220]" />
                  Key Product Highlights & USPs
                </h2>
                
                <div className="space-y-3">
                  {(formData.features || []).map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...(formData.features || [])];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, features: updated });
                        }}
                        className="flex-1 rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-[#fe8220] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = (formData.features || []).filter((_: any, i: number) => i !== idx);
                          setFormData({ ...formData, features: updated });
                        }}
                        className="p-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => setFormData({ ...formData, features: [...(formData.features || []), "New Key Feature USP Point"] })}
                    className="flex items-center gap-2 rounded-full bg-[#120a3b] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#120a3b]/90 transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4 text-[#fe8220]" />
                    <span>Add Feature Point</span>
                  </button>
                </div>
              </div>

              {/* Target Industry Applications */}
              <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-6">
                <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#fe8220]" />
                  Target Industry Applications
                </h2>
                
                <div className="space-y-3">
                  {(formData.applications || []).map((app: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={app}
                        onChange={(e) => {
                          const updated = [...(formData.applications || [])];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, applications: updated });
                        }}
                        className="flex-1 rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-[#fe8220] focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = (formData.applications || []).filter((_: any, i: number) => i !== idx);
                          setFormData({ ...formData, applications: updated });
                        }}
                        className="p-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => setFormData({ ...formData, applications: [...(formData.applications || []), "E-Commerce Fulfillment"] })}
                    className="flex items-center gap-2 rounded-full bg-[#120a3b] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#120a3b]/90 transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4 text-[#fe8220]" />
                    <span>Add Application Tag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* What's Included & Quality Guarantees Badges Card */}
            <div className="rounded-[32px] bg-white p-8 border border-[#e5dfd2] shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#e5dfd2] pb-4">
                <div>
                  <h2 className="text-xl font-black text-[#120a3b] font-display flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[#fe8220]" />
                    What's Included & Quality Guarantees ({formData.whatsIncluded?.length || 0} Badges)
                  </h2>
                  <p className="text-xs text-[#5A6473] font-medium mt-0.5">
                    Define quality assurance badges and included guarantees shown on the product detail page.
                  </p>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#fe8220] bg-[#fff5eb] border border-[#fe8220]/30 px-3 py-1 rounded-full shrink-0">
                  ISO Verified
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.whatsIncluded || []).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#f8f7f4] p-3 rounded-2xl border border-[#e5dfd2]">
                    <ShieldCheck className="h-4 w-4 text-[#fe8220] shrink-0" />
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...(formData.whatsIncluded || [])];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, whatsIncluded: updated });
                      }}
                      placeholder="e.g. FDA & WHO-GMP Compliant"
                      className="flex-1 bg-white rounded-xl border border-[#e5dfd2] px-3 py-2 text-xs font-bold text-[#120a3b] focus:border-[#fe8220] focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const updated = (formData.whatsIncluded || []).filter((_: any, i: number) => i !== idx);
                        setFormData({ ...formData, whatsIncluded: updated });
                      }}
                      className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setFormData({ ...formData, whatsIncluded: [...(formData.whatsIncluded || []), "New ISO Quality Guarantee"] })}
                className="flex items-center gap-2 rounded-full bg-[#120a3b] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#120a3b]/90 transition cursor-pointer"
              >
                <Plus className="h-4 w-4 text-[#fe8220]" />
                <span>Add Guarantee Badge</span>
              </button>
            </div>
          </div>
        )}
        {/* End Left Editor Column */}

      {/* ── FLOATING SLIDE-OVER SIDE WINDOW INSPECTOR ── */}
      {splitPreview && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setSplitPreview(false)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs z-0 cursor-pointer"
          />

          {/* Centered Modal Dialog Content Panel */}
          <div className="relative w-full max-w-3xl bg-white border border-[#e5dfd2] rounded-[32px] h-full max-h-[85vh] shadow-2xl z-10 flex flex-col font-sans overflow-hidden">
            
            {/* Inspector Top Bar */}
            <div className="flex items-center justify-between border-b border-[#e5dfd2] p-5 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-[#120a3b] text-amber-400 shadow-md">
                  <Eye className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#120a3b] font-display">
                    Live Component Inspector
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Real-Time Side Window Preview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full animate-pulse">
                  LIVE SYNC
                </span>
                <button
                  onClick={() => setSplitPreview(false)}
                  className="p-2 rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
                  title="Close Inspector Window"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Inspector Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50/50">
              
              {/* 1. Header & Quick Metrics Component */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-700">
                    {formData.tag || formData.category || "GRADE"}
                  </span>
                  <span>•</span>
                  <span>SKU: WP-{(formData.id || "SKU").toUpperCase()}</span>
                </div>

                <h2 className="text-xl font-black text-[#120a3b] font-display leading-snug">
                  {formData.title || "Product Title"}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {formData.blurb || "Product summary description blurb..."}
                </p>

                {/* 4 Metric Badges */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center">
                    <div className="text-[8px] font-mono font-bold uppercase text-slate-400">DISPATCH</div>
                    <div className="text-[9px] font-extrabold text-[#120a3b]">24-48 HR</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center">
                    <div className="text-[8px] font-mono font-bold uppercase text-slate-400">QC</div>
                    <div className="text-[9px] font-extrabold text-[#120a3b]">ISO 9001</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center">
                    <div className="text-[8px] font-mono font-bold uppercase text-slate-400">PLANT</div>
                    <div className="text-[9px] font-extrabold text-[#120a3b]">100% In-House</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center">
                    <div className="text-[8px] font-mono font-bold uppercase text-slate-400">BATCH</div>
                    <div className="text-[9px] font-extrabold text-[#120a3b]">COA Batch</div>
                  </div>
                </div>
              </div>

              {/* 2. Hero Image & Gallery Component */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase text-slate-500 flex items-center justify-between">
                  <span>Hero & Gallery Preview</span>
                  <span>{formData.gallery?.length || 0} Gallery Photos</span>
                </div>
                <div className="aspect-[16/10] rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden relative flex items-center justify-center">
                  {formData.image ? (
                    <OptimizedImage
  src={formData.image}
  alt={formData.title}
  className="h-full w-full object-cover"
/>
                  ) : (
                    <span className="text-xs font-mono text-slate-400">No Image</span>
                  )}
                </div>
              </div>

              {/* 3. Tiptap Product Overview Description Component */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[10px] font-mono font-bold uppercase text-[#120a3b] flex items-center justify-between">
                  <span>Product Overview (Tiptap Rich Text)</span>
                  <span className="text-[#fe8220]">LIVE HTML</span>
                </div>
                <div
                  className="prose rounded-2xl border border-slate-200 bg-white p-4 max-h-60 overflow-y-auto w-full text-slate-800 text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formData.longDesc || "<p class='text-slate-400 font-mono'>No overview text entered.</p>" }}
                />
              </div>

              {/* 4. What's Included & Quality Guarantees Component */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[10px] font-mono font-bold uppercase text-[#120a3b] flex items-center justify-between">
                  <span>What's Included & Quality Guarantees</span>
                  <span>{formData.whatsIncluded?.length || 0} Badges</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(formData.whatsIncluded || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-[11px] font-bold text-[#120a3b]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#fe8220] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Specifications Table Component */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[10px] font-mono font-bold uppercase text-[#120a3b]">
                  Technical Specs Table ({specsList.length} Rows)
                </div>
                {specsList.length === 0 ? (
                  <div className="text-[10px] font-mono text-slate-400 italic">No specs entered.</div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-200 text-[10px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 font-mono text-slate-600">
                        <tr>
                          <th className="p-2 border-b">Specification</th>
                          <th className="p-2 border-b">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-800">
                        {specsList.map((s, idx) => (
                          <tr key={idx}>
                            <td className="p-2 text-slate-500 font-mono">{s.key}</td>
                            <td className="p-2 font-bold">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 6. Yield Matrix Table Component */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[10px] font-mono font-bold uppercase text-[#120a3b]">
                  Yield Matrix Table ({formData.thicknessLengthMatrix?.length || 0} Rows)
                </div>
                {(formData.thicknessLengthMatrix || []).length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-slate-200 text-[10px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 font-mono text-slate-600">
                        <tr>
                          <th className="p-1.5 border-b">Micron</th>
                          <th className="p-1.5 border-b">Gauge</th>
                          <th className="p-1.5 border-b">Meters</th>
                          <th className="p-1.5 border-b">Feet</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-800">
                        {(formData.thicknessLengthMatrix || []).slice(0, 4).map((row: any, idx: number) => (
                          <tr key={idx}>
                            <td className="p-1.5 font-bold">{row.micron}</td>
                            <td className="p-1.5 text-slate-500">{row.gauge}</td>
                            <td className="p-1.5 text-slate-500">{row.meters}</td>
                            <td className="p-1.5 text-slate-500">{row.feet}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 7. Application Image Slots Component */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[10px] font-mono font-bold uppercase text-[#120a3b]">
                  Application Slots (4 Slots)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {applicationSlots.slice(0, 4).map((slot: any, idx: number) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-white p-2 space-y-1">
                      <div className="aspect-[4/3] rounded-lg bg-slate-900 overflow-hidden">
                        {slot.image ? (
                          <OptimizedImage
  src={slot.image}
  alt={slot.title}
  className="h-full w-full object-cover"
/>
                        ) : (
                          <span className="text-[9px] font-mono text-slate-500 flex items-center justify-center h-full">No Slot</span>
                        )}
                      </div>
                      <div className="text-[9px] font-bold text-[#120a3b] truncate">{slot.title}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Inspector Bottom Footer Bar */}
            <div className="border-t border-[#e5dfd2] p-4 bg-white flex items-center justify-between shrink-0 text-xs">
              <span className="font-mono text-slate-500 text-[11px]">Real-time preview synchronized with editor</span>
              <button
                onClick={() => setSplitPreview(false)}
                className="rounded-xl bg-[#120a3b] px-4 py-2 text-xs font-bold text-white hover:bg-[#fe8220] transition cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  );
}
