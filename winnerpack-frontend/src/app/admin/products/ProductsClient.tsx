"use client";

import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  LayoutGrid,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from '@/components/OptimizedImage';

interface Product {
  _id?: string;
  id: string;
  title: string;
  category: string;
  tag: string;
  blurb?: string;
  longDesc?: string;
  image?: string;
  gallery?: string[];
  specs?: Record<string, string>;
  applications?: string[];
}

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal / Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    category: "film-products",
    tag: "",
    blurb: "",
    image: "",
    longDesc: "",
  });

  const primaryCategories = [
    { id: "all", label: "All Catalog" },
    { id: "film-products", label: "Film Products" },
    { id: "label-sticker-products", label: "Labels & Stickers" },
    { id: "tapes", label: "Industrial Tapes" },
    { id: "pp-strap", label: "Strap" },
  ];

  // Dynamically compute all categories including any arriving from DB
  const categories = useMemo(() => {
    const existingCatIds = new Set(primaryCategories.map((c) => c.id));
    const extraCats: { id: string; label: string }[] = [];

    products.forEach((p) => {
      if (p.category && !existingCatIds.has(p.category)) {
        existingCatIds.add(p.category);
        extraCats.push({
          id: p.category,
          label: p.category.replace(/-/g, " ").toUpperCase(),
        });
      }
    });

    return [...primaryCategories, ...extraCats];
  }, [products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      category: "film-products",
      tag: "Standard",
      blurb: "",
      image: "/images/products/pof-shrink-rolls/image.png",
      longDesc: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({ ...prod });
    setIsModalOpen(true);
  };

  const handleDelete = async (prod: Product) => {
    if (!confirm(`Are you sure you want to delete "${prod.title}"?`)) return;
    try {
      const res = await apiFetch(`/api/products/${prod.id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== prod.id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProduct) {
        const res = await apiFetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updated : p)));
          setIsModalOpen(false);
        }
      } else {
        const res = await apiFetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setProducts((prev) => [created, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.blurb?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5 w-full font-sans overflow-x-hidden">

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-[#e5dfd2] shadow-xs">

        {/* Category Tabs (Hides Horizontal Scrollbar) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const count = cat.id === "all" ? products.length : products.filter((p) => p.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition shrink-0 cursor-pointer ${isActive
                    ? "bg-[#120a3b] text-white shadow-xs"
                    : "bg-[#f8f7f4] text-[#5A6473] border border-[#e5dfd2] hover:bg-[#fff5eb] hover:text-[#fe8220]"
                  }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? "bg-[#fe8220] text-white" : "bg-white text-slate-600"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar, Action Button & View Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 rounded-full bg-[#fe8220] px-4 py-2 text-xs font-extrabold text-white shadow-xs hover:bg-[#d4630a] transition cursor-pointer"
          >
            <Plus className="h-4 w-4 text-white" />
            <span>Add Product</span>
          </button>

          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-2xl border border-[#e5dfd2] bg-[#f8f7f4] pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-[#fe8220] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 rounded-2xl border border-[#e5dfd2] bg-[#f8f7f4] p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-xl text-xs font-bold transition ${viewMode === "grid" ? "bg-[#120a3b] text-white" : "text-slate-500 hover:text-slate-900"}`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-xl text-xs font-bold transition ${viewMode === "table" ? "bg-[#120a3b] text-white" : "text-slate-500 hover:text-slate-900"}`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Catalog Listing */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-slate-400">
          Loading Catalog Items...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center rounded-[28px] border border-[#e5dfd2] bg-white p-8 space-y-3">
          <Package className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-800">No Products Matching Criteria</p>
        </div>
      ) : viewMode === "grid" ? (
        /* WIDE GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#e5dfd2] bg-white shadow-xs hover:shadow-md hover:border-[#fe8220] transition-all duration-300"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f8f7f4] border-b border-[#e5dfd2]/60 flex items-center justify-center p-4">
                <OptimizedImage
  src={prod.image || "/images/products/pof-shrink-rolls/image.png"}
  alt={prod.title}
  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
/>
                <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#fff5eb] text-[#fe8220] border border-[#fe8220]/30 shadow-2xs">
                  {prod.tag || "Standard"}
                </span>
              </div>

              {/* Info Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#482dbf]">
                    {prod.category}
                  </div>
                  <h3 className="text-base font-bold text-[#120a3b] font-display mt-0.5 line-clamp-1">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {prod.blurb}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e5dfd2]/60 flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-slate-500">
                    ID: {prod.id}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${prod.id}`}
                      className="p-2 rounded-xl border border-[#e5dfd2] bg-[#f8f7f4] text-slate-700 hover:border-[#fe8220] hover:text-[#fe8220] transition cursor-pointer"
                      title="Edit Full Product Detail & Applications"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(prod)}
                      className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="rounded-[28px] border border-[#e5dfd2] bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#e5dfd2] bg-[#f8f7f4] font-mono uppercase tracking-wider text-[#5A6473] text-[10px]">
                <th className="p-4 font-bold">Product</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Tag</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#fff5eb]/40 transition">
                  <td className="p-4 font-bold text-[#120a3b] flex items-center gap-3">
                    <OptimizedImage
  src={prod.image || "/images/products/pof-shrink-rolls/image.png"}
  alt=""
  className="h-9 w-9 rounded-lg border border-[#e5dfd2] object-contain bg-[#f8f7f4] p-1"
/>
                    <div>
                      <div>{prod.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-normal">ID: {prod.id}</div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-mono text-[11px]">{prod.category}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono font-bold bg-[#fff5eb] text-[#fe8220] border border-[#fe8220]/30 px-2 py-0.5 rounded-full">
                      {prod.tag}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 rounded-lg border border-[#e5dfd2] bg-[#f8f7f4] text-slate-700 hover:border-[#fe8220] cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod)}
                        className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
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

      {/* Editor Modal / Drawer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4 sm:p-6 text-slate-900">
            {/* Sibling Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-0 cursor-pointer"
            />
            {/* Sibling Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-white border border-[#e5dfd2] rounded-[32px] h-full max-h-[92vh] shadow-2xl flex flex-col overflow-hidden z-10"
            >
              <div className="p-6 border-b border-[#e5dfd2] flex items-center justify-between bg-[#f8f7f4]">
                <div>
                  <h2 className="text-lg font-bold text-[#120a3b] font-display">
                    {editingProduct ? "Edit Product" : "Create New Product"}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {editingProduct ? `Updating SKU ID: ${editingProduct.id}` : "Add a new product listing to catalog"}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full border border-[#e5dfd2] bg-white text-slate-500 hover:text-slate-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. POF Shrink Film Rolls"
                    className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                      Category Link Slug
                    </label>
                    <select
                      value={formData.category || "film-products"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    >
                      {categories.filter(c => c.id !== "all").map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                      Product Tag Line
                    </label>
                    <input
                      type="text"
                      value={formData.tag || ""}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      placeholder="e.g. High Cling"
                      className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/products/pof-shrink-rolls/image.png"
                    className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                    Brief Catchphrase (Blurb)
                  </label>
                  <input
                    type="text"
                    value={formData.blurb || ""}
                    onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                    placeholder="Brief 1-sentence product summary description..."
                    className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#120a3b] mb-1">
                    Long Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.longDesc || ""}
                    onChange={(e) => setFormData({ ...formData, longDesc: e.target.value })}
                    placeholder="Detailed specifications, features, and applications..."
                    className="w-full rounded-2xl border border-[#e5dfd2] px-4 py-2.5 text-xs font-mono text-slate-900 focus:border-[#fe8220] focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-[#e5dfd2] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-full bg-[#fe8220] text-white font-extrabold text-xs shadow-md hover:bg-[#d4630a]"
                  >
                    {submitting ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
