"use client";

import { apiFetch } from "@/lib/api";
import React, { useEffect, useState, useMemo } from "react";
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
  Package,
  Eye,
  Sparkles,
  HelpCircle,
  Globe,
  Truck,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import TiptapEditor from "@/components/TiptapEditor";
import OptimizedImage from "@/components/OptimizedImage";

import SpecsMapEditor from "@/components/admin/SpecsMapEditor";
import FaqListEditor from "@/components/admin/FaqListEditor";
import SubVariantsEditor from "@/components/admin/SubVariantsEditor";
import { productHierarchy, plasticStretchFilmItems } from "@/components/Navbar";
import { extractProductFaqsFromContent, stripStructuredProductSections } from "@/utils/product-content";

// Helper to resolve 3-tier hierarchy path from Navbar
function resolveNavbarHierarchy(productId: string, currentCategory?: string, currentSubId?: string) {
  // If subCategoryId already provided, check if it matches in productHierarchy
  if (currentSubId) {
    for (const cat of productHierarchy) {
      const sub = cat.subcategories.find((s) => s.id === currentSubId || s.slug === currentSubId);
      if (sub) {
        const item = sub.items?.find((itm) => itm.slug === productId);
        return {
          category: cat.id === "pp-strap" ? "others" : cat.id,
          subCategoryId: sub.id,
          distributionItemId: item?.slug || "",
          distributionItemTitle: item?.name || "",
        };
      }
    }
  }

  // Check matching Tier 3 items
  for (const cat of productHierarchy) {
    for (const sub of cat.subcategories) {
      const item = sub.items?.find((itm) => itm.slug === productId);
      if (item) {
        return {
          category: cat.id === "pp-strap" ? "others" : cat.id,
          subCategoryId: sub.id,
          distributionItemId: item.slug,
          distributionItemTitle: item.name,
        };
      }
    }
  }

  // Check stretch film varieties (part of Packaging Films -> Plastic Stretch Film)
  const stretchItem = plasticStretchFilmItems.find((itm) => itm.slug === productId);
  if (stretchItem) {
    return {
      category: "film-products",
      subCategoryId: "packaging-films",
      distributionItemId: stretchItem.slug,
      distributionItemTitle: stretchItem.name,
    };
  }

  // Check matching Tier 2 subcategories
  for (const cat of productHierarchy) {
    const sub = cat.subcategories.find((s) => s.id === productId || s.slug === productId);
    if (sub) {
      return {
        category: cat.id === "pp-strap" ? "others" : cat.id,
        subCategoryId: sub.id,
        distributionItemId: "",
        distributionItemTitle: "",
      };
    }
  }

  // Fallback based on category
  const targetCatId = currentCategory === "others" ? "pp-strap" : (currentCategory || "film-products");
  const cat = productHierarchy.find((c) => c.id === targetCatId || c.catSlug === targetCatId) || productHierarchy[0];
  return {
    category: cat.id === "pp-strap" ? "others" : cat.id,
    subCategoryId: cat.subcategories[0]?.id || "",
    distributionItemId: "",
    distributionItemTitle: "",
  };
}

type TabKey =
  | "general"
  | "overview"
  | "media"
  | "specs"
  | "subvariants"
  | "faqs"
  | "seo";

const PRESET_PRODUCT_IMAGES = [
  { name: "POF Shrink Rolls", url: "/images/products/pof-shrink-rolls/image.webp" },
  { name: "LDPE Bottle Wrap", url: "/images/products/ldpe-shrink-film/ldpe-bottle-wrap.webp" },
  { name: "Cross-Linked POF", url: "/images/products/cross-linked-pof/cross-linked-pof.webp" },
  { name: "Non-Cross-Linked POF", url: "/images/products/non-cross-linked-pof-film/non-cross-linked-pof-film.webp" },
  { name: "Adhesive Lamination", url: "/images/products/adhesive-lamination-film/adhesive-lamination-film.webp" },
  { name: "Plain Standup Pouches", url: "/images/products/plain-standup-pouches/plain-standup-pouches.webp" },
  { name: "Manual Stretch Film", url: "/images/products/stretch-film/image.webp" },
  { name: "Plain Chromo Labels", url: "/images/products/plain-labels/plain-labels.webp" },
  { name: "Flexo Printed Labels", url: "/images/products/printed-labels/flexo-digital-printed-labels.webp" },
  { name: "Barcode Labels", url: "/images/products/thermal-transfer-barcode-labels/thermal-transfer-barcode-labels.webp" },
  { name: "Security Hologram", url: "/images/products/hologram-stickers/hologram-stickers.webp" },
  { name: "BOPP Sealing Tape", url: "/images/products/bopp-tapes/bopp-tapes.webp" },
  { name: "Custom Logo Tape", url: "/images/products/printed-bopp-tapes/preprinted-warning-security-tapes.webp" },
  { name: "PP Strapping Roll", url: "/images/products/pp-strap/image.webp" },
  { name: "PET Pallet Strap", url: "/images/products/pet-strap/image.webp" },
];

export default function ProductDetailEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [editorMode, setEditorMode] = useState<"tiptap" | "markdown">("tiptap");
  const [splitPreview, setSplitPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  // The public slug is editable; the persisted id remains the update lookup key.
  const [persistedId, setPersistedId] = useState(isNew ? "" : id);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<any>({
    id: isNew ? "" : id,
    title: "",
    category: "film-products",
    subCategoryId: "packaging-films",
    distributionItemId: "",
    distributionItemTitle: "",
    tag: "Standard Grade",
    blurb: "",
    longDesc: "",
    image: "/images/products/pof-shrink-rolls/image.webp",
    gallery: [],
    specs: {},
    subCategories: [],
    features: [],
    applications: [],
    faqs: [],
    status: "published",
    moq: "10 Rolls / 500 Kg",
    leadTime: "24–48 Hours",
    lineSpeed: "Up to 120 Packs/Min",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: []
    }
  });

  useEffect(() => {
    if (isNew) {
      const defaultHierarchy = resolveNavbarHierarchy("new", "film-products");
      setFormData((prev: any) => ({
        ...prev,
        category: defaultHierarchy.category,
        subCategoryId: defaultHierarchy.subCategoryId,
        distributionItemId: defaultHierarchy.distributionItemId,
        distributionItemTitle: defaultHierarchy.distributionItemTitle,
      }));
      return;
    }

    setLoading(true);
    apiFetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "This product no longer exists in the database." : "Could not load this product from the database.");
        return res.json();
      })
      .then((data) => {
        setPersistedId(data.id || id);
        const hierarchyInfo = resolveNavbarHierarchy(data.id || id, data.category, data.subCategoryId);

        const normalizedCategory = data.category === "pp-strap"
          ? "others"
          : data.category || hierarchyInfo.category || "film-products";

        const subCategoryId = data.subCategoryId || hierarchyInfo.subCategoryId;
        const distributionItemId = data.distributionItemId || hierarchyInfo.distributionItemId;
        const distributionItemTitle = data.distributionItemTitle || hierarchyInfo.distributionItemTitle;

        const subCategories = Array.isArray(data.subCategories) ? data.subCategories : [];

        const faqs = Array.isArray(data.faqs) && data.faqs.length > 0
          ? data.faqs
          : extractProductFaqsFromContent(data.longDesc);

        const seo = data.seo || {
          metaTitle: `${data.title || "Product"} | WinnerPack Technologies`,
          metaDescription: data.blurb || "Industrial packaging material with ISO certified batch quality.",
          keywords: [data.title, normalizedCategory, data.tag].filter(Boolean)
        };

        setFormData({
          ...data,
          longDesc: stripStructuredProductSections(data.longDesc),
          category: normalizedCategory,
          subCategoryId,
          distributionItemId,
          distributionItemTitle,
          subCategories,
          faqs,
          seo,
          status: data.status || "published",
          moq: data.moq || "10 Rolls / 500 Kg",
          leadTime: data.leadTime || "24–48 Hours",
          lineSpeed: data.lineSpeed || "Up to 120 Packs/Min"
        });

      })
      .catch((error) => {
        setNotice({ type: "error", text: error instanceof Error ? error.message : "Could not load this product." });
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  // ─── 3-TIER NAVBAR TAXONOMY COMPUTED HOOKS ──────────────────────────
  const activeCategoryObj = useMemo(() => {
    const catId = formData.category === "others" ? "pp-strap" : (formData.category || "film-products");
    return productHierarchy.find((c) => c.id === catId || c.catSlug === catId) || productHierarchy[0];
  }, [formData.category]);

  const availableSubcategories = useMemo(() => {
    return activeCategoryObj?.subcategories || [];
  }, [activeCategoryObj]);

  const activeSubcategoryObj = useMemo(() => {
    if (!activeCategoryObj) return null;
    return (
      activeCategoryObj.subcategories.find(
        (s) => s.id === formData.subCategoryId || s.slug === formData.subCategoryId
      ) || activeCategoryObj.subcategories[0]
    );
  }, [activeCategoryObj, formData.subCategoryId]);

  const availableDistributionItems = useMemo(() => {
    return activeSubcategoryObj?.items || [];
  }, [activeSubcategoryObj]);

  const activeDistributionItem = useMemo(() => {
    if (!formData.distributionItemId) return null;
    return availableDistributionItems.find(
      (itm) => itm.slug === formData.distributionItemId
    ) || null;
  }, [availableDistributionItems, formData.distributionItemId]);

  const handleCategoryChange = (newCat: string) => {
    const targetCatId = newCat === "others" ? "pp-strap" : newCat;
    const catObj = productHierarchy.find((c) => c.id === targetCatId || c.catSlug === targetCatId) || productHierarchy[0];
    const firstSub = catObj.subcategories[0];
    setFormData({
      ...formData,
      category: newCat,
      subCategoryId: firstSub?.id || "",
      distributionItemId: "",
      distributionItemTitle: "",
    });
  };

  const handleSubcategoryChange = (newSubId: string) => {
    setFormData({
      ...formData,
      subCategoryId: newSubId,
      distributionItemId: "",
      distributionItemTitle: "",
    });
  };

  const handleDistributionItemChange = (itemSlug: string) => {
    if (!itemSlug) {
      setFormData({
        ...formData,
        distributionItemId: "",
        distributionItemTitle: "",
      });
      return;
    }
    const itm = availableDistributionItems.find((i) => i.slug === itemSlug);
    if (itm) {
      setFormData({
        ...formData,
        distributionItemId: itm.slug,
        distributionItemTitle: itm.name,
        title: isNew || !formData.title || formData.title === "New SKU Draft" ? itm.name : formData.title,
        id: isNew || !formData.id ? itm.slug : formData.id,
      });
    }
  };

  const handleApplyDistributionItemIdentity = () => {
    if (!activeDistributionItem) return;
    setFormData({
      ...formData,
      title: activeDistributionItem.name,
      id: isNew ? activeDistributionItem.slug : formData.id,
    });
    setNotice({
      type: "success",
      text: `Applied "${activeDistributionItem.name}" to product title and slug.`,
    });
  };

  // Global Keyboard Shortcut: Cmd+S / Ctrl+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleSave = async () => {
    if (!formData.title?.trim()) {
      setNotice({ type: "error", text: "Product title is required." });
      return;
    }

    setSaving(true);
    setNotice(null);
    try {
      const {
        applicationSlots: _legacyApplicationSlots,
        thicknessLengthMatrix: _legacyMatrix,
        options: _legacyOptions,
        ...productData
      } = formData;
      const payload = {
        ...productData,
        longDesc: stripStructuredProductSections(productData.longDesc),
        category: formData.category === "others" ? "others" : formData.category,
      };

      const url = isNew ? "/api/products" : `/api/products/${persistedId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save product.");
      }

      const saved = await res.json();
      setPersistedId(saved.id || formData.id);
      setNotice({ type: "success", text: `Product "${saved.title || formData.title}" saved and published live!` });
      if (isNew && saved.id) {
        router.replace(`/admin/products/${saved.id}`);
      }
    } catch (err: any) {
      setNotice({ type: "error", text: err.message || "Failed to save product." });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General & Commercial", icon: Package },
    { id: "overview", label: "Overview & Description", icon: Sparkles },
    { id: "media", label: "Media & Gallery", icon: ImageIcon },
    { id: "specs", label: `Tech Specs (${Object.keys(formData.specs || {}).length})`, icon: TableIcon },
    { id: "subvariants", label: `Sub-Variants (${formData.subCategories?.length || 0})`, icon: Sliders },
    { id: "faqs", label: `FAQs (${formData.faqs?.length || 0})`, icon: HelpCircle },
    { id: "seo", label: "Search & SEO", icon: Globe },
  ];

  if (loading) {
    return (
      <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Detailed Product Specification Workspace...
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full font-sans pb-24 text-slate-900 max-w-7xl mx-auto">
      {/* ── 1. TOP STICKY TOOLBAR & HEADER ── */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="h-9 w-9 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition shrink-0"
            title="Back to Products Catalog"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  formData.category === "film-products"
                    ? "bg-sky-50 text-sky-700 border-sky-200"
                    : formData.category === "label-sticker-products"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : formData.category === "tapes"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-violet-50 text-violet-700 border-violet-200"
                }`}
              >
                {formData.category === "others" ? "Others (Strapping)" : formData.category}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {isNew ? "New SKU Draft" : `ID: ${formData.id}`}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display tracking-tight mt-0.5">
              {isNew ? "Create New Product SKU" : formData.title || "Product Editor"}
            </h1>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {/* Status selector */}
          <select
            value={formData.status || "published"}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:border-[#fe8220] focus:outline-none cursor-pointer"
          >
            <option value="published">Status: Published</option>
            <option value="draft">Status: Draft</option>
            <option value="archived">Status: Archived</option>
          </select>

          {!isNew && (
            <a
              href={`/products/${formData.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-2xs"
              title="Preview Live on Website"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          <button
            type="button"
            onClick={() => setSplitPreview(!splitPreview)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
              splitPreview
                ? "bg-[#120a3b] text-amber-300 border-[#120a3b] shadow-2xs"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-[#fe8220]" />
            <span className="hidden sm:inline">{splitPreview ? "Hide Preview" : "Split Live Preview"}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#fe8220] px-4 py-2 text-xs font-bold text-slate-950 shadow-xs hover:bg-[#ffa048] active:scale-98 transition cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {notice && (
        <div
          role="status"
          className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold ${
            notice.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {notice.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span>{notice.text}</span>
          </div>
          <button onClick={() => setNotice(null)} className="underline hover:opacity-80 cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* ── 2. WORKSPACE TABS STRIP ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#120a3b] text-white shadow-2xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. WORKSPACE EDITOR GRID WITH OPTIONAL SPLIT PREVIEW ── */}
      <div className={`grid grid-cols-1 ${splitPreview ? "lg:grid-cols-12" : ""} gap-6 items-start`}>

        {/* Main Editor Surface */}
        <div className={splitPreview ? "lg:col-span-8 space-y-6" : "space-y-6"}>

          {/* ── TAB 1: GENERAL & COMMERCIAL ── */}
          {activeTab === "general" && (
            <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-2xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900">General Product Information</h2>
                <p className="text-xs text-slate-500">Core identity, primary categorization, and commercial order specs.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. POF Shrink Film Rolls"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                {/* ── 3-TIER NAVBAR TAXONOMY & FURTHER DISTRIBUTION ── */}
                <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 p-5 space-y-4 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center text-amber-700">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                            Navbar Hierarchy & Further Distribution
                          </h3>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
                            Source: Navbar.tsx
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Directly connects this product SKU to Tier 1 (Pillar) → Tier 2 (Subcategory) → Tier 3 (Distribution Line).
                        </p>
                      </div>
                    </div>

                    {activeDistributionItem && (
                      <button
                        type="button"
                        onClick={handleApplyDistributionItemIdentity}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 text-[11px] font-bold shadow-2xs transition cursor-pointer self-start sm:self-auto shrink-0"
                        title="Auto-fill Title & Slug from the selected Navbar Distribution Item"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[#fe8220]" />
                        <span>Use Item Title & Slug</span>
                      </button>
                    )}
                  </div>

                  {/* 3 Dropdown Columns: Tier 1, Tier 2, Tier 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* Tier 1: Category */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>1. Category (Pillar) *</span>
                        <span className="text-[10px] font-mono text-slate-400">Tier 1</span>
                      </label>
                      <select
                        value={formData.category === "others" ? "others" : (formData.category || "film-products")}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#fe8220] focus:ring-1 focus:ring-[#fe8220] focus:outline-none cursor-pointer shadow-2xs"
                      >
                        <option value="film-products">Film Products</option>
                        <option value="label-sticker-products">Labels & Stickers</option>
                        <option value="tapes">Industrial Tapes</option>
                        <option value="others">Others (Strapping & Misc)</option>
                      </select>
                    </div>

                    {/* Tier 2: Subcategory */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>2. Subcategory ({availableSubcategories.length}) *</span>
                        <span className="text-[10px] font-mono text-slate-400">Tier 2</span>
                      </label>
                      <select
                        value={formData.subCategoryId || availableSubcategories[0]?.id || ""}
                        onChange={(e) => handleSubcategoryChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#fe8220] focus:ring-1 focus:ring-[#fe8220] focus:outline-none cursor-pointer shadow-2xs"
                      >
                        {availableSubcategories.map((sub) => (
                          <option key={sub.id} value={sub.id}>
                            {sub.title} ({sub.items?.length || 0} distribution items)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tier 3: Further Distribution Item */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span>3. Further Distribution Item</span>
                        <span className="text-[10px] font-mono text-amber-600 font-bold">
                          {availableDistributionItems.length} lines
                        </span>
                      </label>
                      <select
                        value={formData.distributionItemId || ""}
                        onChange={(e) => handleDistributionItemChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:ring-1 focus:ring-[#fe8220] focus:outline-none cursor-pointer shadow-2xs"
                      >
                        <option value="">-- General / Broad Subcategory SKU --</option>
                        {availableDistributionItems.map((itm) => (
                          <option key={itm.slug} value={itm.slug}>
                            {itm.name} ({itm.slug})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Visual Breadcrumb Navigation Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-amber-200/60 bg-white/70 rounded-xl px-3.5 py-2.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Navbar Breadcrumb:
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 font-bold text-[11px]">
                        {activeCategoryObj?.title}
                      </span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-bold text-[11px]">
                        {activeSubcategoryObj?.title || formData.subCategoryId}
                      </span>
                      {formData.distributionItemTitle ? (
                        <>
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#120a3b] text-amber-300 font-bold text-[11px] shadow-2xs">
                            <Sparkles className="h-2.5 w-2.5 text-[#fe8220]" />
                            {formData.distributionItemTitle}
                          </span>
                        </>
                      ) : (
                        <>
                          <ChevronRight className="h-3 w-3 text-slate-400" />
                          <span className="text-[11px] font-mono text-slate-500 italic">
                            (General Subcategory Level)
                          </span>
                        </>
                      )}
                    </div>

                    {formData.distributionItemId && (
                      <a
                        href={`/products/${formData.distributionItemId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#fe8220] hover:text-[#e06c10] hover:underline"
                      >
                        <span>Preview Distribution SKU Page</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Identification & Badge Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Product URL Slug / Unique ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.id || ""}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g. plastic-stretch-film"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-[#fe8220] focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Live route: <span className="font-mono text-slate-600">/products/{formData.id || "slug"}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tag / Grade Badge
                    </label>
                    <input
                      type="text"
                      value={formData.tag || ""}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      placeholder="e.g. Heavy Duty Virgin Resin"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#fe8220] focus:outline-none"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Prominently shown as an eyebrow pill on cards & live detail page.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Product Blurb / Excerpt *</label>
                  <textarea
                    rows={2}
                    value={formData.blurb || ""}
                    onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                    placeholder="Concise technical summary displayed on catalog cards..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-[#fe8220] focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Commercial Specifications */}
                <div className="pt-3 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-[#fe8220]" />
                    Commercial & Operational Parameters
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Minimum Order Qty (MOQ)</label>
                      <input
                        type="text"
                        value={formData.moq || ""}
                        onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                        placeholder="e.g. 10 Rolls / 500 Kg"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-[#fe8220] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Dispatch Lead Time</label>
                      <input
                        type="text"
                        value={formData.leadTime || ""}
                        onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                        placeholder="e.g. 24–48 Hours"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-[#fe8220] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Line Speed Suitability</label>
                      <input
                        type="text"
                        value={formData.lineSpeed || ""}
                        onChange={(e) => setFormData({ ...formData, lineSpeed: e.target.value })}
                        placeholder="e.g. Up to 120 Packs/Min"
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-[#fe8220] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: OVERVIEW & RICH DESCRIPTION ── */}
          {activeTab === "overview" && (
            <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#fe8220]" />
                    Product Overview & Detailed Engineering Specification
                  </h2>
                  <p className="text-xs text-slate-500">Rich formatted markdown/HTML displayed on the main product view.</p>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setEditorMode("tiptap")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      editorMode === "tiptap"
                        ? "bg-[#120a3b] text-amber-300 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    TipTap WYSIWYG
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode("markdown")}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      editorMode === "markdown"
                        ? "bg-[#120a3b] text-amber-300 shadow-2xs"
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
                  rows={14}
                  value={formData.longDesc || ""}
                  onChange={(e) => setFormData({ ...formData, longDesc: e.target.value })}
                  placeholder="Detailed technical specifications, processing capabilities, and material chemistry..."
                  className="w-full rounded-xl border border-slate-200 p-4 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none leading-relaxed"
                />
              )}
            </div>
          )}

          {/* ── TAB 3: MEDIA & GALLERY STUDIO ── */}
          {activeTab === "media" && (
            <div className="space-y-6">
              {/* Primary Image */}
              <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-[#fe8220]" />
                  Primary Product Hero Image
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Hero Image Path / URL</label>
                      <input
                        type="text"
                        value={formData.image || ""}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/images/products/..."
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono focus:border-[#fe8220] focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5 font-mono">
                        Instant Preset Selectors
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                        {PRESET_PRODUCT_IMAGES.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: preset.url })}
                            className={`px-2 py-0.5 rounded-md text-[10px] border transition cursor-pointer ${
                              formData.image === preset.url
                                ? "bg-amber-50 text-amber-800 border-amber-300 font-bold"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <div className="relative aspect-square rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center p-2">
                      {formData.image ? (
                        <OptimizedImage
                          src={formData.image}
                          alt="Primary Thumbnail"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-slate-400 font-mono">No Image</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Image Gallery */}
              <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Product Gallery ({formData.gallery?.length || 0} Images)
                    </h3>
                    <p className="text-xs text-slate-500">Additional detail shots and machine setup photos.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(formData.gallery || []), ""];
                      setFormData({ ...formData, gallery: updated });
                    }}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Gallery Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(formData.gallery || []).map((imgUrl: string, gIdx: number) => (
                    <div key={gIdx} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50">
                      <div className="h-10 w-10 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                        {imgUrl ? (
                          <OptimizedImage src={imgUrl} alt={`Gallery ${gIdx + 1}`} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] text-slate-300 font-mono">
                            N/A
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...(formData.gallery || [])];
                          updated[gIdx] = e.target.value;
                          setFormData({ ...formData, gallery: updated });
                        }}
                        placeholder="/images/products/..."
                        className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-mono focus:border-[#fe8220] focus:outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.gallery || []).filter((_: any, i: number) => i !== gIdx);
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 4: TECHNICAL SPECS MAP ── */}
          {activeTab === "specs" && (
            <SpecsMapEditor
              value={formData.specs || {}}
              onChange={(specs) => setFormData({ ...formData, specs })}
            />
          )}

          {/* ── TAB 5: SUB-VARIANTS MANAGER ── */}
          {activeTab === "subvariants" && (
            <SubVariantsEditor
              value={formData.subCategories || []}
              onChange={(subVariants) => setFormData({ ...formData, subCategories: subVariants })}
            />
          )}

          {/* ── TAB 8: PRODUCT FAQS ACCORDION ── */}
          {activeTab === "faqs" && (
            <FaqListEditor
              value={formData.faqs || []}
              onChange={(faqs) => setFormData({ ...formData, faqs })}
            />
          )}

          {/* ── TAB 9: GOOGLE SEO & METADATA ── */}
          {activeTab === "seo" && (
            <div className="rounded-2xl bg-white p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-[#fe8220]" />
                  Google Search Engine Optimization (SEO)
                </h2>
                <p className="text-xs text-slate-500">
                  Custom meta title, description snippet, and target search keywords for organic search indexing.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={formData.seo?.metaTitle || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...(formData.seo || {}), metaTitle: e.target.value },
                      })
                    }
                    placeholder="e.g. POF Shrink Film Rolls Manufacturer | WinnerPack"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Target length: 50–60 characters</span>
                    <span className="font-mono">{(formData.seo?.metaTitle || "").length} / 60</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={formData.seo?.metaDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: { ...(formData.seo || {}), metaDescription: e.target.value },
                      })
                    }
                    placeholder="Compelling search excerpt describing specifications and factory direct supply..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-[#fe8220] focus:outline-none leading-relaxed"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Target length: 140–160 characters</span>
                    <span className="font-mono">{(formData.seo?.metaDescription || "").length} / 160</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Keywords Tag Pills</label>
                  <input
                    type="text"
                    value={(formData.seo?.keywords || []).join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seo: {
                          ...(formData.seo || {}),
                          keywords: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean),
                        },
                      })
                    }
                    placeholder="e.g. shrink film, POF roll, industrial packaging"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                {/* Live Google Search Result Card */}
                <div className="pt-3 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-700 mb-2">Live Google SERP Card Preview</h3>
                  <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-1">
                    <div className="text-[11px] text-slate-600 flex items-center gap-1 font-mono">
                      <span>https://winnerpack.in</span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                      <span>products</span>
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                      <span className="text-slate-800 font-semibold">{formData.id}</span>
                    </div>
                    <div className="text-sm font-bold text-blue-800 hover:underline line-clamp-1">
                      {formData.seo?.metaTitle || `${formData.title} | WinnerPack Technologies`}
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {formData.seo?.metaDescription || formData.blurb || "Explore specifications and sample rolls..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 4. RIGHT COLUMN: SPLIT LIVE INSPECTOR PANEL ── */}
        {splitPreview && (
          <div className="lg:col-span-4 space-y-4 sticky top-6">
            <div className="rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-display">
                  <Eye className="h-3.5 w-3.5 text-[#fe8220]" />
                  Live Website Card Simulation
                </span>
                {!isNew && (
                  <a
                    href={`/products/${formData.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#fe8220] hover:underline flex items-center gap-1"
                  >
                    View Page <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Card visual mock */}
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  {formData.image && (
                    <OptimizedImage
                      src={formData.image}
                      alt={formData.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="rounded-md bg-slate-900/85 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      {formData.category}
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      {formData.status || "Published"}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-600 block">
                    {formData.tag || "Standard"}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{formData.title || "Product Title"}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {formData.blurb || "No short description provided."}
                  </p>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
                    <div>
                      <span className="text-slate-400 block">MOQ:</span>
                      <span className="font-bold text-slate-700">{formData.moq || "10 Rolls"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Lead Time:</span>
                      <span className="font-bold text-slate-700">{formData.leadTime || "24–48h"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product content stats */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subcategory Variants:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formData.subCategories?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Product FAQs:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formData.faqs?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
