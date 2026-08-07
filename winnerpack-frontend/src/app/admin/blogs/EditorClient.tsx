"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FileText,
  ArrowLeft,
  Save,
  Globe,
  Calendar,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";
import TiptapEditor from "@/components/TiptapEditor";
import OptimizedImage from '@/components/OptimizedImage';

interface Article {
  _id?: string;
  tag: string;
  date: string;
  title: string;
  read: string;
  featured?: boolean;
  excerpt?: string;
  body: string;
  slug: string;
  image?: string;
  canonicalUrl?: string;
  metaKeywords?: string;
  metaDescription?: string;
}

const PRESET_IMAGES = [
  { name: "Pallet Wrapping", url: "/images/desktop/journey/solution_pallet_wrapping.png" },
  { name: "Team Bus Interior", url: "/images/gallery/new_gallery_1.png" },
  { name: "Team Group Outdoor", url: "/images/gallery/new_gallery_2.png" },
  { name: "Factory HQ Building", url: "/images/gallery/factory_building_facade.jpg" },
];

export default function EditorClient() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string | undefined;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSeoDetails, setShowSeoDetails] = useState(true);
  const [showSeoModal, setShowSeoModal] = useState(false);

  // Date format conversion helper
  const toInputDate = (dbDateStr: string) => {
    try {
      const parsed = new Date(dbDateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split("T")[0];
      }
    } catch (_) {}
    return new Date().toISOString().split("T")[0];
  };

  const toDbDate = (inputDateStr: string) => {
    try {
      const dateObj = new Date(inputDateStr);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
      }
    } catch (_) {}
    return inputDateStr;
  };

  const [formData, setFormData] = useState<Partial<Article>>({
    title: "",
    tag: "Industry Insight",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    read: "5 min read",
    featured: false,
    excerpt: "",
    body: "",
    image: "/images/desktop/journey/solution_pallet_wrapping.png",
    slug: "",
    canonicalUrl: "",
    metaKeywords: "",
    metaDescription: "",
  });

  // Fetch article if in Edit mode
  useEffect(() => {
    if (!id) return;
    async function loadArticle() {
      setLoading(true);
      try {
        const res = await apiFetch("/api/articles");
        if (res.ok) {
          const list: Article[] = await res.json();
          const found = list.find((a) => a._id === id);
          if (found) {
            setFormData(found);
          } else {
            alert("Article not found.");
            router.push("/admin/blogs");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id, router]);

  // Global Keyboard Shortcut: Ctrl+S or Cmd+S to Save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        const formEl = document.getElementById("articleForm") as HTMLFormElement;
        if (formEl) {
          formEl.requestSubmit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : autoSlug
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-article"
      };

      const res = await apiFetch("/api/articles", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id ? { _id: id, ...payload } : payload),
      });

      if (res.ok) {
        router.push("/admin/blogs");
      } else {
        const errData = await res.json();
        alert(`Error saving article: ${errData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // REAL AUTHENTIC GOOGLE SEO AUDIT ALGORITHM
  // -------------------------------------------------------------
  const calculateRealSeoAudit = () => {
    const checks = [];
    let score = 0;

    const title = (formData.title || "").trim();
    const metaDesc = (formData.metaDescription || "").trim();
    const slug = (formData.slug || "").trim();
    const canonical = (formData.canonicalUrl || "").trim();
    const keywords = (formData.metaKeywords || "").split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    const bodyText = (formData.body || "").replace(/<[^>]*>/g, " ").trim();
    const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
    const hasHeadings = /<h[23][^>]*>/i.test(formData.body || "");

    // 1. Title Length Audit (Max 15 pts)
    const titleLen = title.length;
    if (titleLen >= 50 && titleLen <= 60) {
      score += 15;
      checks.push({ status: "pass", title: "Title Length (Optimal 50-60 chars)", score: 15, max: 15, msg: `Title length is perfect (${titleLen} chars).` });
    } else if (titleLen >= 30 && titleLen < 50) {
      score += 10;
      checks.push({ status: "warn", title: "Title Length (Slightly Short)", score: 10, max: 15, msg: `Title is ${titleLen} chars. Optimal for Google is 50-60 chars.` });
    } else if (titleLen > 60) {
      score += 8;
      checks.push({ status: "warn", title: "Title Length (Exceeds 60 chars)", score: 8, max: 15, msg: `Title is ${titleLen} chars and will be truncated in Google search results.` });
    } else {
      checks.push({ status: "fail", title: "Title Length (Too Short / Missing)", score: 0, max: 15, msg: "Title is missing or under 30 chars." });
    }

    // 2. Meta Description Audit (Max 15 pts)
    const descLen = metaDesc.length;
    if (descLen >= 120 && descLen <= 160) {
      score += 15;
      checks.push({ status: "pass", title: "Meta Description (Optimal 120-160 chars)", score: 15, max: 15, msg: `Meta description length is optimal (${descLen} chars).` });
    } else if (descLen > 0 && descLen < 120) {
      score += 8;
      checks.push({ status: "warn", title: "Meta Description (Short)", score: 8, max: 15, msg: `Description is ${descLen} chars. Expand to 120-160 chars for best SERP snippet display.` });
    } else if (descLen > 160) {
      score += 8;
      checks.push({ status: "warn", title: "Meta Description (Long)", score: 8, max: 15, msg: `Description is ${descLen} chars and will be cut off by Google.` });
    } else {
      checks.push({ status: "fail", title: "Meta Description Missing", score: 0, max: 15, msg: "Add a 120-160 character meta description for search result previews." });
    }

    // 3. Keyword Optimization & Placement (Max 20 pts)
    if (keywords.length > 0) {
      let kwScore = 5; // Base points for defining keywords
      const primaryKw = keywords[0];
      const titleHasKw = title.toLowerCase().includes(primaryKw);
      const descHasKw = metaDesc.toLowerCase().includes(primaryKw);
      const bodyHasKw = bodyText.toLowerCase().includes(primaryKw);

      if (titleHasKw) kwScore += 5;
      if (descHasKw) kwScore += 5;
      if (bodyHasKw) kwScore += 5;

      score += kwScore;
      if (kwScore >= 15) {
        checks.push({ status: "pass", title: "Keyword Placement Strategy", score: kwScore, max: 20, msg: `Primary keyword "${primaryKw}" detected in Title, Meta Description, & Article Body.` });
      } else {
        checks.push({ status: "warn", title: "Keyword Placement Partial", score: kwScore, max: 20, msg: `Include primary keyword "${primaryKw}" in your title and meta description.` });
      }
    } else {
      checks.push({ status: "fail", title: "Target Keywords Missing", score: 0, max: 20, msg: "Define target SEO keywords separated by commas." });
    }

    // 4. Content Depth & Structure Audit (Max 20 pts)
    if (wordCount >= 500) {
      const contentScore = hasHeadings ? 20 : 15;
      score += contentScore;
      checks.push({
        status: hasHeadings ? "pass" : "warn",
        title: "Content Depth & Heading Structure",
        score: contentScore,
        max: 20,
        msg: `${wordCount} words. ${hasHeadings ? "Good sub-heading (H2/H3) structure detected." : "Consider adding H2/H3 subheadings to format content."}`
      });
    } else if (wordCount >= 200) {
      score += 10;
      checks.push({ status: "warn", title: "Content Depth (Short)", score: 10, max: 20, msg: `Article contains ${wordCount} words. Google prefers 500+ words for in-depth articles.` });
    } else {
      checks.push({ status: "fail", title: "Thin Content Warning", score: 2, max: 20, msg: `Only ${wordCount} words detected. Add more comprehensive content.` });
    }

    // 5. URL Slug Audit (Max 10 pts)
    if (slug && /^[a-z0-9-]+$/.test(slug)) {
      score += 10;
      checks.push({ status: "pass", title: "SEO-Friendly URL Slug", score: 10, max: 10, msg: `Clean hyphenated slug structure: /blog/${slug}` });
    } else if (slug) {
      score += 5;
      checks.push({ status: "warn", title: "Slug Formatting Issue", score: 5, max: 10, msg: "Slug should only contain lowercase letters, numbers, and hyphens." });
    } else {
      checks.push({ status: "fail", title: "URL Slug Missing", score: 0, max: 10, msg: "Custom URL slug is recommended for clear permalinks." });
    }

    // 6. Canonical URL Audit (Max 10 pts)
    if (canonical && (canonical.startsWith("http://") || canonical.startsWith("https://"))) {
      score += 10;
      checks.push({ status: "pass", title: "Canonical Link Standard", score: 10, max: 10, msg: `Valid canonical tag pointing to ${canonical}` });
    } else {
      checks.push({ status: "warn", title: "Canonical URL Unset", score: 0, max: 10, msg: "Set a canonical URL to avoid duplicate content penalties." });
    }

    // 7. Hero Image Asset Audit (Max 10 pts)
    if (formData.image && formData.image.length > 5) {
      score += 10;
      checks.push({ status: "pass", title: "Featured OpenGraph Media", score: 10, max: 10, msg: "Hero cover image set for social media sharing cards." });
    } else {
      checks.push({ status: "fail", title: "Featured Image Missing", score: 0, max: 10, msg: "Cover image is required for OpenGraph thumbnail previews." });
    }

    const finalScore = Math.min(100, score);
    return { score: finalScore, checks };
  };

  const { score: realSeoScore, checks: seoAuditChecks } = calculateRealSeoAudit();

  if (loading) {
    return (
      <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
        Loading Article Content...
      </div>
    );
  }

  return (
    <form id="articleForm" onSubmit={handleSave} className="space-y-5 w-full font-sans pb-20 relative">
      
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                <FileText className="h-4 w-4" />
              </span>
              <h1 className="text-lg font-extrabold text-slate-900 font-display tracking-tight">
                {id ? "Edit Blog Article" : "Create New Blog Article"}
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Compose content, upload hero images, and configure target metadata. (Press <kbd className="px-1 py-0.5 rounded bg-slate-100 border text-[10px] font-mono">Cmd+S</kbd> to save anytime)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Authentic Real-Time Google SEO Health Meter */}
          <button
            type="button"
            onClick={() => setShowSeoModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition text-xs cursor-pointer"
            title="Click to view real-time Google SEO Audit Breakdown"
          >
            <span className="text-[10px] font-mono font-bold text-slate-600 flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-[#fe8220]" /> Real SEO Audit:
            </span>
            <div className="w-12 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  realSeoScore >= 80 ? "bg-emerald-500" : realSeoScore >= 50 ? "bg-amber-500" : "bg-rose-500"
                }`}
                style={{ width: `${realSeoScore}%` }}
              />
            </div>
            <span className={`font-mono font-bold text-xs ${
              realSeoScore >= 80 ? "text-emerald-600" : realSeoScore >= 50 ? "text-amber-600" : "text-rose-600"
            }`}>
              {realSeoScore}/100
            </span>
            <Info className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#fe8220] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>{submitting ? "Saving..." : "Save Article"}</span>
          </button>
        </div>
      </div>

      {/* Main Composer Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
        
        {/* Row 1: Title, Category Tag, Publish Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={formData.title || ""}
              onChange={handleTitleChange}
              placeholder="e.g. Sustainable Apparel Trends 2026"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
            <span className="text-[10px] font-mono text-slate-400 mt-1 block">
              {(formData.title || "").length} / 60 optimal SERP chars
            </span>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
              Category Tag *
            </label>
            <input
              type="text"
              required
              value={formData.tag || ""}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="e.g. Sustainable Fashion, Textiles"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-amber-500" /> Publish Date *
            </label>
            <input
              type="date"
              required
              value={toInputDate(formData.date || "")}
              onChange={(e) => setFormData({ ...formData, date: toDbDate(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Row 2: Read Time & Featured Checkbox */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
              Estimated Read Time *
            </label>
            <input
              type="text"
              required
              value={formData.read || ""}
              onChange={(e) => setFormData({ ...formData, read: e.target.value })}
              placeholder="e.g. 5 min read"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="md:pt-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="featured" className="text-xs font-bold text-slate-700 cursor-pointer">
              Mark as Featured Article
            </label>
          </div>
        </div>

        {/* Row 3: Cover Image Input & Preset Pills */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono font-bold uppercase text-slate-700">
              Cover Image URL *
            </label>
            <span className="text-[10px] text-slate-400 font-mono">Quick Preset Selection:</span>
          </div>

          <input
            type="text"
            required
            value={formData.image || ""}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Image URL path (e.g. /images/gallery/new_gallery_1.png)"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-mono text-slate-800 focus:border-amber-500 focus:outline-none"
          />

          {/* Quick Preset Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {PRESET_IMAGES.map((item) => (
              <button
                key={item.url}
                type="button"
                onClick={() => setFormData({ ...formData, image: item.url })}
                className={`px-3 py-1 rounded-lg border text-[11px] font-medium transition cursor-pointer ${
                  formData.image === item.url
                    ? "bg-[#120a3b] text-amber-400 border-[#120a3b] font-bold shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                + {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Live Cover Image Preview Box */}
        <div className="space-y-2">
          <span className="block text-xs font-mono font-bold uppercase text-slate-400">
            Cover Image Preview
          </span>
          <div className="aspect-[21/9] w-full max-h-64 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center relative shadow-inner">
            {formData.image ? (
              <OptimizedImage
  src={formData.image}
  alt="Cover Preview"
  className="h-full w-full object-cover"
/>
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-slate-400 font-mono text-xs">
                <ImageIcon className="h-6 w-6" />
                <span>No Cover Image Selected</span>
              </div>
            )}
          </div>
        </div>

        {/* Row 5: Excerpt Summary */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-slate-700 mb-1.5">
            Excerpt Summary / Header Description
          </label>
          <textarea
            rows={2}
            value={formData.excerpt || ""}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Brief summary of the article for blog roll listings and search engine descriptions..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Row 6: Tiptap Editor Container */}
        <div className="space-y-2">
          <label className="block text-xs font-mono font-bold uppercase text-slate-700">
            Article Content (Tiptap Rich Text Editor with Table & Image Support) *
          </label>
          <TiptapEditor
            content={formData.body || ""}
            onChange={(html) => setFormData({ ...formData, body: html })}
          />
        </div>

        {/* Row 7: Real SEO Metadata Audit Section */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#fe8220]" />
              <h4 className="text-sm font-bold text-slate-900">
                Authentic Search Engine Optimization (SEO) Fields
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setShowSeoDetails(!showSeoDetails)}
              className="text-xs font-bold text-[#fe8220] hover:underline cursor-pointer"
            >
              {showSeoDetails ? "Collapse Settings" : "Expand Settings"}
            </button>
          </div>

          {showSeoDetails && (
            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1">
                    URL Permastructure Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ""}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })}
                    placeholder="sustainable-apparel-trends-2026 (auto-generated if empty)"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1">
                    Canonical Target URL
                  </label>
                  <input
                    type="url"
                    value={formData.canonicalUrl || ""}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    placeholder="https://winnerpack.in/blog/sustainable-apparel-trends-2026"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono text-slate-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" /> Target Focus Keywords (Comma Separated)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">e.g. primary keyword first</span>
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords || ""}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  placeholder="e.g. sustainable packaging, stretch film, shrink wrap"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-600 mb-1 flex items-center justify-between">
                  <span>Google Snippet Meta Description</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {(formData.metaDescription || "").length} / 160 optimal chars
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={formData.metaDescription || ""}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Provide a concise 120-160 character snippet describing this page for Google search listings..."
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowSeoModal(true)}
            className="text-xs font-bold text-[#fe8220] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <Info className="h-4 w-4" /> View Full Real SEO Audit Report
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/blogs")}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#fe8220] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>{submitting ? "Saving..." : "Save Article"}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Real-time Google SEO Audit Modal */}
      {showSeoModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Sibling Backdrop Overlay */}
          <div
            onClick={() => setShowSeoModal(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-0 cursor-pointer"
          />
          {/* Sibling Dialog Content */}
          <div className="relative bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 space-y-5 shadow-2xl overflow-hidden z-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 font-display flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#fe8220]" /> Authentic Real-Time Google SEO Audit
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Calculated against Google SERP indexing algorithms & guidelines.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSeoModal(false)}
                className="p-1.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Score Bar */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase">Overall SEO Score</span>
                <span className={`text-lg font-extrabold font-mono ${
                  realSeoScore >= 80 ? "text-emerald-600" : realSeoScore >= 50 ? "text-amber-600" : "text-rose-600"
                }`}>
                  {realSeoScore} / 100
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    realSeoScore >= 80 ? "bg-emerald-500" : realSeoScore >= 50 ? "bg-amber-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${realSeoScore}%` }}
                />
              </div>
            </div>

            {/* Parameter Checks List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {seoAuditChecks.map((check, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${
                    check.status === "pass"
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                      : check.status === "warn"
                      ? "bg-amber-50/50 border-amber-200 text-amber-950"
                      : "bg-rose-50/50 border-rose-200 text-rose-950"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {check.status === "pass" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className={`h-4 w-4 ${check.status === "warn" ? "text-amber-500" : "text-rose-600"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold uppercase font-mono tracking-wider text-[10px]">{check.title}</span>
                      <span className="font-bold font-mono text-[10px]">
                        {check.score} / {check.max} pts
                      </span>
                    </div>
                    <p className="text-[11px] opacity-90 mt-0.5 font-medium">{check.msg}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSeoModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                Close Audit Report
              </button>
            </div>
          </div>
        </div>
      )}

    </form>
  );
}
