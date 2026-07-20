"use client";

import { useEffect, useState, useRef } from "react";
import { Send, PlusCircle, AlertCircle, RefreshCw, Calendar, Clock, Trash, Edit2, Upload, Loader2 } from "lucide-react";
import TiptapInlineEditor from "@/components/admin/TiptapInlineEditor";

type Article = {
  _id: string;
  tag: string;
  title: string;
  read: string;
  excerpt: string;
  body: string;
  date: string;
  image?: string;
};

export default function AdminBlogsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Article form state
  const [newArticle, setNewArticle] = useState({
    tag: "Engineering",
    title: "",
    excerpt: "",
    body: "",
    read: "5 min read",
    date: "",
    image: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getTodayInputFormat = () => {
    return new Date().toISOString().split("T")[0];
  };

  const convertToInputDateFormat = (dateStr: string) => {
    if (!dateStr) return getTodayInputFormat();
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return getTodayInputFormat();
    }
    return d.toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
        setNewArticle((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err: any) {
      alert("Upload error: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleEditInit = (art: Article) => {
    setEditingId(art._id);
    setNewArticle({
      tag: art.tag,
      title: art.title,
      excerpt: art.excerpt,
      body: art.body,
      read: art.read,
      date: convertToInputDateFormat(art.date),
      image: art.image || "",
    });
    setIsFormOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewArticle({
      tag: "Engineering",
      title: "",
      excerpt: "",
      body: "",
      read: "5 min read",
      date: "",
      image: "",
    });
    setIsFormOpen(false);
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.body.trim()) {
      alert("Blog content body cannot be empty.");
      return;
    }
    setSubmitting(true);
    try {
      const url = "/api/articles";
      const method = editingId ? "PUT" : "POST";
      const payload = {
        ...newArticle,
        _id: editingId || undefined,
        date: newArticle.date || getTodayInputFormat(),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNewArticle({
          tag: "Engineering",
          title: "",
          excerpt: "",
          body: "",
          read: "5 min read",
          date: "",
          image: "",
        });
        setEditingId(null);
        setIsFormOpen(false);
        fetchArticles();
        alert(editingId ? "Blog post updated successfully!" : "Blog post published successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to publish blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/articles?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchArticles();
        alert("Blog post deleted successfully.");
        if (editingId === id) handleCancelEdit();
      } else {
        alert("Failed to delete blog post.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog post.");
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
              {editingId ? "Edit Blog Post" : "Publish Blog Post"}
            </h3>
            <button
              onClick={handleCancelEdit}
              className="text-sm text-[var(--color-amber)] hover:text-[var(--color-amber-dark)] font-semibold transition"
            >
              &larr; Back to Catalog List
            </button>
          </div>

          <form onSubmit={handleCreateArticle} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Category Tag
              </label>
              <select
                value={newArticle.tag}
                onChange={(e) => setNewArticle({ ...newArticle, tag: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
              >
                <option>Engineering</option>
                <option>Sustainability</option>
                <option>Operations</option>
                <option>Procurement</option>
              </select>
            </div>

            {/* Image upload handler */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Blog Cover Image
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="/images/example.jpg"
                  value={newArticle.image}
                  onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
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
              {newArticle.image && (
                <div className="mt-2 h-20 w-32 border border-slate-200 rounded overflow-hidden shadow-sm">
                  <img src={newArticle.image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
                  placeholder="PP strap tensile thresholds..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Read Duration
                </label>
                <input
                  type="text"
                  required
                  value={newArticle.read}
                  onChange={(e) => setNewArticle({ ...newArticle, read: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
                  placeholder="5 min read"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Publication Date
                </label>
                <input
                  type="date"
                  required
                  value={newArticle.date}
                  onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Excerpt / Summary
              </label>
              <textarea
                rows={2}
                required
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[var(--color-amber)]"
                placeholder="Short summary of findings..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Blog Content (Tiptap Block Editor)
              </label>
              <TiptapInlineEditor
                value={newArticle.body}
                onChange={(val) => setNewArticle({ ...newArticle, body: val })}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-slate-100 mt-6 justify-end">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-amber)] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--color-amber-dark)] disabled:opacity-50 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                {submitting ? "Saving..." : editingId ? "Save Changes" : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* List View */
        <>
          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 bg-white p-6 rounded-2xl border shadow-sm">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Blog &amp; Floor Notes</h1>
              <p className="text-xs text-slate-500 mt-0.5 font-sans">Publish technical playbooks, operations logs, and packaging articles</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingId(null);
                  setNewArticle({
                    tag: "Engineering",
                    title: "",
                    excerpt: "",
                    body: "",
                    read: "5 min read",
                    date: getTodayInputFormat(),
                    image: "",
                  });
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-amber)] hover:bg-[var(--color-amber-dark)] text-white font-semibold text-sm transition shadow-sm"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Write New Post</span>
              </button>
              <button
                onClick={fetchArticles}
                disabled={loading}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition shadow-sm"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="w-full rounded-xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 border-b pb-2">Published Blogs</h3>

            {loading ? (
              <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
                Loading resources...
              </div>
            ) : articles.length === 0 ? (
              <div className="py-24 text-center text-xs font-mono uppercase tracking-widest text-slate-400 flex flex-col items-center justify-center gap-2">
                <AlertCircle className="h-6 w-6 text-slate-300" />
                <span>No articles found</span>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((art, idx) => (
                  <div
                    key={art._id || art.title || idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-3 relative group"
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent">
                      <button
                        type="button"
                        onClick={() => handleEditInit(art)}
                        className="text-slate-500 hover:text-[var(--color-amber-dark)] hover:bg-white border border-slate-200 p-1.5 rounded shadow-sm bg-white"
                        title="Edit Blog"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(art._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-white border border-slate-200 p-1.5 rounded shadow-sm bg-white"
                        title="Delete Blog"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="rounded bg-[var(--color-amber)]/10 text-[var(--color-amber-dark)] border border-[var(--color-amber)]/20 px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider">
                        {art.tag}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mr-16">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDisplayDate(art.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {art.read}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {art.image && (
                        <div className="h-24 w-36 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <img src={art.image} alt={art.title} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0 space-y-2">
                        <h4 className="font-sans text-base font-bold text-slate-900 leading-snug pr-12">{art.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed pr-12">{art.excerpt}</p>
                      </div>
                    </div>

                    <div className="text-sm leading-relaxed text-slate-500 pt-3 border-t border-slate-100 max-h-36 overflow-y-auto prose max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: art.body }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
