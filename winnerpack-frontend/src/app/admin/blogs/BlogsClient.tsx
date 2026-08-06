"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { FileText, Plus, Search, Edit, Trash2, Globe, Calendar, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

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

export default function BlogsClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (art: Article) => {
    if (!confirm(`Delete article "${art.title}"?`)) return;
    try {
      const res = await apiFetch(`/api/articles?id=${art._id}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a._id !== art._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 w-full font-sans pb-12">

      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <FileText className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 font-display tracking-tight">
              Blog & Industry News Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Publish and manage industrial packaging articles, technical guides, and press updates.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#fe8220] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#d4630a] transition cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="relative sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles by title, tag..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-[#fe8220] focus:outline-none"
        />
      </div>

      {/* Structured Table Container (Celestial Inspired layout) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6 w-24">Cover Image</th>
                <th className="py-4 px-6">Title & Category</th>
                <th className="py-4 px-6 w-72">SEO Meta Status</th>
                <th className="py-4 px-6 w-36">Published Date</th>
                <th className="py-4 px-6 text-right w-44">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
                    Loading Articles...
                  </td>
                </tr>
              ) : filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-xs font-medium text-slate-400">
                    No articles found. Click "Write New Article" to compose your first post.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => (
                  <tr key={art._id || art.slug} className="hover:bg-slate-50/40 transition">
                    {/* Cover image thumbnail */}
                    <td className="py-4 px-6">
                      <div className="h-12 w-16 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={art.image || "/images/desktop/journey/solution_pallet_wrapping.png"}
                          alt={art.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/desktop/journey/solution_pallet_wrapping.png";
                          }}
                        />
                      </div>
                    </td>

                    {/* Title & Category tag */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-slate-900 line-clamp-1">
                          {art.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                            {art.tag}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {art.read}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* SEO Meta Status tags */}
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Slug Status */}
                        {art.slug ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold" title={art.slug}>
                            <Check className="h-2.5 w-2.5" /> Slug Set
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[9px] font-bold">
                            <AlertCircle className="h-2.5 w-2.5" /> No Slug
                          </span>
                        )}

                        {/* Canonical URL Status */}
                        {art.canonicalUrl ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold" title={art.canonicalUrl}>
                            <Check className="h-2.5 w-2.5" /> Canonical
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[9px] font-semibold">
                            No Canonical
                          </span>
                        )}

                        {/* Meta Keywords Status */}
                        {art.metaKeywords ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold" title={art.metaKeywords}>
                            <Check className="h-2.5 w-2.5" /> Keywords
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[9px] font-semibold">
                            No Keywords
                          </span>
                        )}

                        {/* Meta Description Status */}
                        {art.metaDescription ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold" title={art.metaDescription}>
                            <Check className="h-2.5 w-2.5" /> Description
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[9px] font-semibold">
                            No Meta Desc
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Published Date */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{art.date}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {art.slug && (
                          <a
                            href={`/blog/${art.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700 transition"
                            title="Preview live article"
                          >
                            <Globe className="h-3.5 w-3.5" />
                          </a>
                        )}

                        <Link
                          href={`/admin/blogs/edit/${art._id}`}
                          className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-[#fe8220] hover:text-[#fe8220] transition"
                          title="Edit article in full-screen Composer"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                        
                        <button
                          onClick={() => handleDelete(art)}
                          className="p-2 rounded-lg border border-slate-200 bg-white text-red-600 hover:border-red-300 hover:bg-red-50 transition cursor-pointer"
                          title="Delete article"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
