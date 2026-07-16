"use client";

import { useEffect, useState } from "react";
import { Send, PlusCircle, AlertCircle, RefreshCw, Calendar, Clock } from "lucide-react";

type Article = {
  _id: string;
  tag: string;
  title: string;
  read: string;
  excerpt: string;
  body: string;
  date: string;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Article form state
  const [newArticle, setNewArticle] = useState({
    tag: "Engineering",
    title: "",
    excerpt: "",
    body: "",
    read: "5 min read",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchArticles = () => {
    setLoading(true);
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newArticle,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
        }),
      });
      if (res.ok) {
        setNewArticle({
          tag: "Engineering",
          title: "",
          excerpt: "",
          body: "",
          read: "5 min read",
        });
        fetchArticles();
        alert("Article published successfully to MongoDB!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to publish article.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Floor Notes & Resources</h1>
          <p className="text-xs text-slate-400 mt-0.5">Publish articles, playbooks, and research updates to the resources feed</p>
        </div>
        <button
          onClick={fetchArticles}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#161923] hover:bg-white/5 transition"
        >
          <RefreshCw className={`h-4 w-4 text-slate-400 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* List of articles */}
        <div className="lg:col-span-8 rounded-xl border border-white/5 bg-[#161923] p-6 space-y-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-white">Published Articles</h3>

          {loading ? (
            <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500">
              Loading resources...
            </div>
          ) : articles.length === 0 ? (
            <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-500 flex flex-col items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6 text-slate-600" />
              <span>No articles found</span>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((art) => (
                <div
                  key={art._id}
                  className="rounded-lg border border-white/5 bg-[#0F1117]/50 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                      {art.tag}
                    </span>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {art.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {art.read}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-sans text-sm font-bold text-white leading-snug">{art.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{art.excerpt}</p>
                  <div className="text-xs leading-relaxed text-slate-500 italic pt-2 border-t border-white/5 max-h-24 overflow-y-auto">
                    {art.body}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Creator Form */}
        <div className="lg:col-span-4">
          <div className="rounded-xl border border-white/5 bg-[#161923] p-6 space-y-4 sticky top-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-cyan-400" />
              Publish Article
            </h3>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Category Tag
                </label>
                <select
                  value={newArticle.tag}
                  onChange={(e) => setNewArticle({ ...newArticle, tag: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Engineering</option>
                  <option>Sustainability</option>
                  <option>Operations</option>
                  <option>Procurement</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  placeholder="PP strap tensile thresholds..."
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Read Duration
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.read}
                  onChange={(e) => setNewArticle({ ...newArticle, read: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  placeholder="5 min read"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Short summary of findings..."
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Article Content
                </label>
                <textarea
                  rows={6}
                  required
                  value={newArticle.body}
                  onChange={(e) => setNewArticle({ ...newArticle, body: e.target.value })}
                  className="w-full rounded border border-white/10 bg-[#0F1117] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Detailed findings and technical specifications..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group relative flex w-full items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-3 text-xs font-bold text-black transition hover:bg-cyan-400 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {submitting ? "Publishing..." : "Publish to Resources"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
