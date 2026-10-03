"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Layers,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Globe,
  Sliders,
  Sparkles,
  ChevronRight,
  Eye,
  RefreshCw
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import OptimizedImage from "@/components/OptimizedImage";

interface SubcategoryItem {
  id: string;
  title: string;
  slug: string;
  image?: string;
  blurb?: string;
  items?: { name: string; slug: string }[];
}

interface CategoryCollection {
  _id?: string;
  id: string;
  title: string;
  catSlug: string;
  tag: string;
  blurb: string;
  image: string;
  gradient: string;
  sortOrder: number;
  subcategories: SubcategoryItem[];
  items?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

const GRADIENT_PRESETS = [
  { label: "Sky Blue (Films)", value: "from-sky-400/20 to-blue-500/10", border: "border-sky-300" },
  { label: "Warm Amber (Labels)", value: "from-amber-400/20 to-orange-500/10", border: "border-amber-300" },
  { label: "Emerald Teal (Tapes)", value: "from-emerald-400/20 to-teal-500/10", border: "border-emerald-300" },
  { label: "Royal Violet (Others / Straps)", value: "from-violet-400/20 to-purple-500/10", border: "border-violet-300" },
  { label: "Slate Industrial", value: "from-slate-400/20 to-zinc-500/10", border: "border-slate-300" },
];

export default function CategoriesClient() {
  const [categories, setCategories] = useState<CategoryCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCatId, setSelectedCatId] = useState<string>("film-products");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "subcategories" | "seo" | "preview">("overview");

  // Editable copy of selected category
  const [editData, setEditData] = useState<CategoryCollection | null>(null);
  const [originalJson, setOriginalJson] = useState<string>("");

  const isDirty = useMemo(() => {
    if (!editData) return false;
    return JSON.stringify(editData) !== originalJson;
  }, [editData, originalJson]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/categories", { cache: "no-store" });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `Failed to load categories (${res.status}).`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("The category service returned an invalid response.");
      setCategories(data);
      const current = data.find((c: any) => c.id === selectedCatId) || data[0];
      if (current) {
        setEditData(JSON.parse(JSON.stringify(current)));
        setOriginalJson(JSON.stringify(current));
      }
    } catch (err: any) {
      setNotice({ type: "error", text: err.message || "Failed to load categories." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelectCategory = (cat: CategoryCollection) => {
    if (isDirty && !window.confirm("You have unsaved changes in this collection. Discard them?")) {
      return;
    }
    setSelectedCatId(cat.id);
    setEditData(JSON.parse(JSON.stringify(cat)));
    setOriginalJson(JSON.stringify(cat));
    setNotice(null);
  };

  const handleSave = async () => {
    if (!editData) return;
    setSaving(true);
    setNotice(null);
    try {
      const res = await apiFetch(`/api/categories/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save category.");
      }

      const updated = await res.json();
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditData(JSON.parse(JSON.stringify(updated)));
      setOriginalJson(JSON.stringify(updated));
      setNotice({ type: "success", text: `"${updated.title}" collection updated and published live!` });
    } catch (err: any) {
      setNotice({ type: "error", text: err.message || "Failed to publish changes." });
    } finally {
      setSaving(false);
    }
  };

  // Subcategory management handlers
  const handleAddSubcategory = () => {
    if (!editData) return;
    const newSub: SubcategoryItem = {
      id: `sub-${Date.now()}`,
      title: "New Subcategory Line",
      slug: "new-subcategory-line",
      image: "/images/categories/film-products-v2.webp",
      blurb: "Description of this subcategory product line.",
      items: [],
    };
    setEditData({
      ...editData,
      subcategories: [...(editData.subcategories || []), newSub],
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    if (!editData) return;
    if (!window.confirm("Remove this subcategory from the collection?")) return;
    const updated = editData.subcategories.filter((_, idx) => idx !== index);
    setEditData({ ...editData, subcategories: updated });
  };

  const handleMoveSubcategory = (index: number, direction: "up" | "down") => {
    if (!editData) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= editData.subcategories.length) return;
    const updated = [...editData.subcategories];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setEditData({ ...editData, subcategories: updated });
  };

  const handleSubcategoryChange = (index: number, field: keyof SubcategoryItem, value: any) => {
    if (!editData) return;
    const updated = [...editData.subcategories];
    updated[index] = { ...updated[index], [field]: value };
    setEditData({ ...editData, subcategories: updated });
  };

  const handleAddDistributionItem = (sIdx: number) => {
    if (!editData) return;
    const itemName = prompt("Enter product item name (e.g. Mini Stretch Wrap Rolls):");
    if (!itemName || !itemName.trim()) return;
    const defaultSlug = itemName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const itemSlug = prompt("Enter product item slug / URL ID:", defaultSlug) || defaultSlug;

    const updatedSubcats = [...editData.subcategories];
    const targetSub = { ...updatedSubcats[sIdx] };
    const currentItems = Array.isArray(targetSub.items) ? [...targetSub.items] : [];
    currentItems.push({ name: itemName.trim(), slug: itemSlug.trim() });
    targetSub.items = currentItems;
    updatedSubcats[sIdx] = targetSub;

    setEditData({ ...editData, subcategories: updatedSubcats });
  };

  const handleRemoveDistributionItem = (sIdx: number, itmIdx: number) => {
    if (!editData) return;
    const updatedSubcats = [...editData.subcategories];
    const targetSub = { ...updatedSubcats[sIdx] };
    const currentItems = Array.isArray(targetSub.items) ? [...targetSub.items] : [];
    currentItems.splice(itmIdx, 1);
    targetSub.items = currentItems;
    updatedSubcats[sIdx] = targetSub;

    setEditData({ ...editData, subcategories: updatedSubcats });
  };

  const handleSyncWithNavbar = async () => {
    if (!window.confirm("Sync all categories and subcategories from Navbar.tsx? This will refresh all 4 pillars and nested Tier 3 items from the master definitions.")) {
      return;
    }
    setSaving(true);
    try {
      const res = await apiFetch("/api/categories/reset-defaults", { method: "POST" });
      if (!res.ok) throw new Error("Sync failed");
      await fetchCategories();
      setNotice({
        type: "success",
        text: "Successfully synced all categories, subcategories, and distribution items from Navbar!",
      });
    } catch (err: any) {
      setNotice({ type: "error", text: err.message || "Failed to sync with Navbar." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Category Collections...
      </div>
    );
  }

  const activeCategory = editData;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 font-sans">
      {/* ── TOP HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/90 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-bold text-violet-700 ring-1 ring-violet-200/60 font-mono uppercase tracking-wider">
              <Layers className="h-3 w-3 text-violet-600" />
              Collections Studio
            </span>
            <span className="text-xs text-slate-500 font-medium">
              4 Primary Category Collections
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Main Category Page Collections
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Configure the public showcase pages, hero taglines, cover images, theme gradients, and subcategory hierarchies for each core product pillar.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {activeCategory && (
            <a
              href={`/product-category/${activeCategory.catSlug || activeCategory.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
            >
              <span>View Collection Live</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-xs transition cursor-pointer ${
              isDirty
                ? "bg-[#fe8220] text-slate-950 hover:bg-[#ffa048] active:scale-98"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
            }`}
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Publishing..." : isDirty ? "Publish Changes" : "Up to Date"}</span>
          </button>
        </div>
      </div>

      {notice && (
        <div
          className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold ${
            notice.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {notice.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span>{notice.text}</span>
          </div>
          <button onClick={() => setNotice(null)} className="underline hover:opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* ── 4 PRIMARY CATEGORY CARDS / TABS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isSelected = cat.id === selectedCatId;
          const subCount = cat.subcategories?.length || 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat)}
              className={`group relative text-left rounded-2xl p-4 border transition-all cursor-pointer ${
                isSelected
                  ? "bg-white border-[#fe8220] shadow-md ring-2 ring-[#fe8220]/20"
                  : "bg-white border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      cat.id === "film-products"
                        ? "bg-sky-500"
                        : cat.id === "label-sticker-products"
                        ? "bg-amber-500"
                        : cat.id === "tapes"
                        ? "bg-emerald-500"
                        : "bg-violet-500"
                    }`}
                  />
                  <span className="text-xs font-bold text-slate-900 font-display">
                    {cat.title}
                  </span>
                </div>
                {isSelected && (
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-800 font-mono">
                    Editing
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                {cat.tag || cat.blurb}
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-2">
                <span>{subCount} Subcategories</span>
                <span className="text-slate-600 font-medium">/{cat.catSlug || cat.id}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── SELECTED COLLECTION EDITOR ── */}
      {activeCategory && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Sub-Tabs Navigation */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3 bg-slate-50/50">
            <div className="flex items-center gap-1 sm:gap-2">
              {[
                { id: "overview", label: "Collection Overview & Hero", icon: Sparkles },
                { id: "subcategories", label: `Subcategories (${activeCategory.subcategories?.length || 0})`, icon: Sliders },
                { id: "seo", label: "Search & SEO Audit", icon: Globe },
                { id: "preview", label: "Public Page Preview", icon: Eye },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      active
                        ? "bg-[#120a3b] text-white shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Route: <span className="text-slate-700">/product-category/{activeCategory.catSlug || activeCategory.id}</span>
            </div>
          </div>

          <div className="p-6">
            {/* ── TAB 1: OVERVIEW & HERO ── */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Collection Display Title *
                      </label>
                      <input
                        type="text"
                        value={activeCategory.title}
                        onChange={(e) => setEditData({ ...activeCategory, title: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                        placeholder="e.g. Film Products"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        value={activeCategory.catSlug || activeCategory.id}
                        onChange={(e) => setEditData({ ...activeCategory, catSlug: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono text-slate-700 focus:border-[#fe8220] focus:outline-none"
                        placeholder="e.g. film-products"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Eyebrow Tagline / Badges
                    </label>
                    <input
                      type="text"
                      value={activeCategory.tag || ""}
                      onChange={(e) => setEditData({ ...activeCategory, tag: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-[#fe8220] focus:outline-none"
                      placeholder="e.g. Shrink Films · Stretch Wrap · Barrier Pouches"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Appears above the main headline on the public category page.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Detailed Collection Blurb / Overview *
                    </label>
                    <textarea
                      rows={4}
                      value={activeCategory.blurb || ""}
                      onChange={(e) => setEditData({ ...activeCategory, blurb: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-[#fe8220] focus:outline-none leading-relaxed"
                      placeholder="Comprehensive description of this industrial packaging pillar..."
                    />
                  </div>

                  {/* Gradient Theme Preset Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Visual Gradient Theme Preset
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {GRADIENT_PRESETS.map((preset) => {
                        const active = activeCategory.gradient === preset.value;
                        return (
                          <button
                            key={preset.value}
                            type="button"
                            onClick={() => setEditData({ ...activeCategory, gradient: preset.value })}
                            className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition cursor-pointer ${
                              active
                                ? `bg-slate-50 border-[#fe8220] ring-1 ring-[#fe8220]`
                                : "bg-white border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <span className={`h-4 w-4 rounded-full bg-gradient-to-r ${preset.value} border ${preset.border}`} />
                            <span className="font-semibold text-slate-800 truncate">{preset.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Cover Image Banner */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category Cover / Banner Image
                    </label>
                    <input
                      type="text"
                      value={activeCategory.image || ""}
                      onChange={(e) => setEditData({ ...activeCategory, image: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-mono mb-3 focus:border-[#fe8220] focus:outline-none bg-white"
                      placeholder="/images/categories/..."
                    />

                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                      {activeCategory.image ? (
                        <OptimizedImage
                          src={activeCategory.image}
                          alt={activeCategory.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400 font-mono">
                          No Cover Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                        <span className="text-white text-xs font-bold font-display">
                          {activeCategory.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights pills */}
                  <div className="rounded-xl border border-slate-200 p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-700">Quick Items Highlight</label>
                      <button
                        type="button"
                        onClick={() => {
                          const item = prompt("Enter new item bullet:");
                          if (item && item.trim()) {
                            setEditData({
                              ...activeCategory,
                              items: [...(activeCategory.items || []), item.trim()],
                            });
                          }
                        }}
                        className="text-[11px] font-bold text-[#fe8220] hover:underline"
                      >
                        + Add Item
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeCategory.items || []).map((itm, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]"
                        >
                          {itm}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (activeCategory.items || []).filter((_, i) => i !== idx);
                              setEditData({ ...activeCategory, items: updated });
                            }}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 2: SUBCATEGORIES MANAGEMENT ── */}
            {activeTab === "subcategories" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Subcategory Lines ({activeCategory.subcategories?.length || 0})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Each card represents a subcategory section on the live collection page. Reorder, edit thumbnails, or manage further distribution product lines.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleSyncWithNavbar}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs"
                      title="Sync all categories, subcategories, and Tier 3 items from Navbar.tsx"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 text-amber-600 ${saving ? "animate-spin" : ""}`} />
                      <span>Sync from Navbar Hierarchy</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddSubcategory}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Subcategory Line</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {(!activeCategory.subcategories || activeCategory.subcategories.length === 0) ? (
                    <div className="py-12 text-center text-xs text-slate-400">
                      No subcategories configured yet. Click "Add Subcategory Line" to start.
                    </div>
                  ) : (
                    activeCategory.subcategories.map((sub, sIdx) => (
                      <div
                        key={sub.id || sIdx}
                        className="flex flex-col gap-3 p-4 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-colors shadow-2xs"
                      >
                        {/* Subcategory Top Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span className="font-mono text-xs font-bold text-slate-400 w-6 shrink-0">
                              {String(sIdx + 1).padStart(2, "0")}
                            </span>

                            <div className="h-12 w-12 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shrink-0">
                              {sub.image ? (
                                <OptimizedImage
                                  src={sub.image}
                                  alt={sub.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400 font-mono">
                                  No Img
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 min-w-0">
                              <div>
                                <input
                                  type="text"
                                  value={sub.title}
                                  onChange={(e) => handleSubcategoryChange(sIdx, "title", e.target.value)}
                                  className="w-full text-xs font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-[#fe8220] focus:outline-none bg-transparent"
                                  placeholder="Subcategory Title"
                                />
                                <input
                                  type="text"
                                  value={sub.slug}
                                  onChange={(e) => handleSubcategoryChange(sIdx, "slug", e.target.value)}
                                  className="w-full text-[11px] font-mono text-slate-500 border-b border-transparent hover:border-slate-300 focus:border-[#fe8220] focus:outline-none bg-transparent"
                                  placeholder="slug"
                                />
                              </div>

                              <div>
                                <input
                                  type="text"
                                  value={sub.image || ""}
                                  onChange={(e) => handleSubcategoryChange(sIdx, "image", e.target.value)}
                                  className="w-full text-[11px] font-mono text-slate-600 border-b border-transparent hover:border-slate-300 focus:border-[#fe8220] focus:outline-none bg-transparent truncate"
                                  placeholder="Image URL: /images/products/..."
                                />
                                <input
                                  type="text"
                                  value={sub.blurb || ""}
                                  onChange={(e) => handleSubcategoryChange(sIdx, "blurb", e.target.value)}
                                  className="w-full text-[11px] text-slate-500 border-b border-transparent hover:border-slate-300 focus:border-[#fe8220] focus:outline-none bg-transparent truncate"
                                  placeholder="Short description"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Reorder and Delete controls */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                            <Link
                              href={`/products/${sub.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                              title="Preview Subcategory"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleMoveSubcategory(sIdx, "up")}
                              disabled={sIdx === 0}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveSubcategory(sIdx, "down")}
                              disabled={sIdx === activeCategory.subcategories.length - 1}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveSubcategory(sIdx)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                              title="Remove Subcategory"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* ── TIER 3: FURTHER DISTRIBUTION ITEMS MANAGER ── */}
                        <div className="pt-2.5 border-t border-slate-100/90 mt-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
                                Further Distribution Items ({sub.items?.length || 0})
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                Tier 3 SKUs
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleAddDistributionItem(sIdx)}
                              className="text-[11px] font-bold text-[#fe8220] hover:text-[#e06c10] hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <Plus className="h-3 w-3" />
                              <span>Add Item</span>
                            </button>
                          </div>

                          {/* Item Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {(!sub.items || sub.items.length === 0) ? (
                              <span className="text-[11px] text-slate-400 italic">
                                No specific further distribution items configured.
                              </span>
                            ) : (
                              sub.items.map((itm, itmIdx) => (
                                <span
                                  key={itm.slug || itmIdx}
                                  className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 text-slate-800 px-2 py-1 rounded-lg text-xs shadow-2xs group"
                                >
                                  <span className="font-semibold text-slate-900">{itm.name}</span>
                                  <span className="font-mono text-[10px] text-slate-400">({itm.slug})</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveDistributionItem(sIdx, itmIdx)}
                                    className="text-slate-400 hover:text-rose-600 transition ml-0.5 cursor-pointer"
                                    title="Remove this distribution item"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── TAB 3: SEO & SEARCH AUDIT ── */}
            {activeTab === "seo" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Meta Title (Title Tag)
                    </label>
                    <input
                      type="text"
                      value={activeCategory.seo?.metaTitle || ""}
                      onChange={(e) =>
                        setEditData({
                          ...activeCategory,
                          seo: { ...(activeCategory.seo || {}), metaTitle: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                      placeholder="e.g. Industrial Packaging Films | WinnerPack"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Google typically displays up to 60 characters.</span>
                      <span className="font-mono">{(activeCategory.seo?.metaTitle || "").length} / 60</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={activeCategory.seo?.metaDescription || ""}
                      onChange={(e) =>
                        setEditData({
                          ...activeCategory,
                          seo: { ...(activeCategory.seo || {}), metaDescription: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-[#fe8220] focus:outline-none leading-relaxed"
                      placeholder="High-converting search snippet description..."
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Optimal length: 140–160 characters.</span>
                      <span className="font-mono">{(activeCategory.seo?.metaDescription || "").length} / 160</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      SEO Keywords (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={(activeCategory.seo?.keywords || []).join(", ")}
                      onChange={(e) =>
                        setEditData({
                          ...activeCategory,
                          seo: {
                            ...(activeCategory.seo || {}),
                            keywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          },
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-[#fe8220] focus:outline-none"
                      placeholder="e.g. shrink film, stretch wrap, barrier pouches"
                    />
                  </div>
                </div>

                {/* Google SERP Live Simulation */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl border border-slate-200 p-5 bg-white shadow-2xs space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 font-mono">
                      <Globe className="h-3.5 w-3.5 text-blue-600" />
                      <span>Google Search Result Snippet</span>
                    </div>

                    <div className="border border-slate-100 rounded-lg p-4 bg-slate-50/50 space-y-1">
                      <div className="text-[11px] text-slate-600 flex items-center gap-1">
                        <span>https://winnerpack.in</span>
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                        <span>product-category</span>
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                        <span className="text-slate-800 font-semibold">{activeCategory.catSlug || activeCategory.id}</span>
                      </div>
                      <div className="text-sm font-bold text-blue-800 hover:underline line-clamp-1">
                        {activeCategory.seo?.metaTitle || `${activeCategory.title} | WinnerPack Technologies`}
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {activeCategory.seo?.metaDescription || activeCategory.blurb || "Explore our industrial packaging collection..."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 4: LIVE PUBLIC PREVIEW ── */}
            {activeTab === "preview" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-700">Live Collection Preview Simulation</span>
                  <a
                    href={`/product-category/${activeCategory.catSlug || activeCategory.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#fe8220] hover:underline flex items-center gap-1"
                  >
                    Open Full Page <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Simulated Hero Header */}
                <div className={`p-8 rounded-2xl bg-gradient-to-r ${activeCategory.gradient} border border-slate-200/80`}>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#fe8220] block mb-1">
                    {activeCategory.tag || "Product Collection"}
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                    {activeCategory.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-2xl leading-relaxed">
                    {activeCategory.blurb}
                  </p>
                </div>

                {/* Subcategory Grid Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                  {(activeCategory.subcategories || []).map((sub) => (
                    <div
                      key={sub.id}
                      className="rounded-xl border border-slate-200 bg-white overflow-hidden p-3 shadow-2xs text-center"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-2">
                        {sub.image && (
                          <OptimizedImage
                            src={sub.image}
                            alt={sub.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{sub.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">/{sub.slug}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Save Bar */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {isDirty ? (
                <span className="text-amber-700 font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  Unpublished changes in "{activeCategory.title}"
                </span>
              ) : (
                "All collection settings published and live on website."
              )}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!isDirty || saving}
                onClick={() => {
                  if (window.confirm("Discard unsaved changes?")) {
                    setEditData(JSON.parse(originalJson));
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Discard
              </button>
              <button
                type="button"
                disabled={!isDirty || saving}
                onClick={handleSave}
                className="px-4 py-1.5 rounded-xl bg-[#fe8220] text-xs font-bold text-slate-950 shadow-xs hover:bg-[#ffa048] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? "Saving..." : "Save Collection"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
