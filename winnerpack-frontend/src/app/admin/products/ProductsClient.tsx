"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, CircleDot, ExternalLink, FilePenLine, FolderTree, Layers3, Package, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { plasticStretchFilmItems, productHierarchy } from "@/components/Navbar";

interface SubVariant {
  id?: string; slug?: string; title: string; subtitle?: string; blurb?: string;
  longDesc?: string; image?: string; gallery?: string[]; specs?: Record<string, string>;
  applications?: string[]; features?: string[]; faqs?: Array<{ question: string; answer: string }>;
}
interface Product {
  _id?: string; id: string; title: string; category: string; subCategoryId?: string;
  distributionItemId?: string; distributionItemTitle?: string; tag?: string; blurb?: string;
  specs?: Record<string, string>; subCategories?: SubVariant[]; status?: "published" | "draft" | "archived";
}
type CatalogNode = Product & { depth: number; path: string[]; parentId?: string };

const CATEGORY_OPTIONS = [
  { id: "all", label: "Complete catalog" },
  { id: "film-products", label: "Film products" },
  { id: "label-sticker-products", label: "Labels & stickers" },
  { id: "tapes", label: "Industrial tapes" },
  { id: "others", label: "Strapping & others" },
] as const;

const categoryKey = (category?: string) =>
  category === "pp-strap" || category === "others" ? "others" : category || "film-products";

function getTaxonomyPath(product: Product) {
  const normalizedCategory = categoryKey(product.category);
  const navCategoryId = normalizedCategory === "others" ? "pp-strap" : normalizedCategory;
  const navCategory = productHierarchy.find((category) => category.id === navCategoryId);
  const explicitSubcategory = navCategory?.subcategories.find(
    (subcategory) => subcategory.id === product.subCategoryId || subcategory.slug === product.subCategoryId,
  );
  const itemMatch = navCategory?.subcategories
    .map((subcategory) => ({
      subcategory,
      item: subcategory.items?.find((item) => item.slug === product.id || item.slug === product.distributionItemId),
    }))
    .find((match) => match.item);
  const selfSubcategory = navCategory?.subcategories.find(
    (subcategory) => subcategory.id === product.id || subcategory.slug === product.id,
  );
  const subcategory = explicitSubcategory || itemMatch?.subcategory || selfSubcategory;
  const item = itemMatch?.item;
  const stretchVariant = plasticStretchFilmItems.find(
    (variant) => variant.slug === product.id || variant.slug === product.distributionItemId,
  );
  const path = [navCategory?.title || normalizedCategory.replace(/-/g, " ")];
  if (subcategory) path.push(subcategory.title);
  if (stretchVariant) {
    if (!subcategory) path.push("Packaging Films");
    path.push("Plastic Stretch Film", stretchVariant.name);
  } else if (item && item.slug !== subcategory?.slug) {
    path.push(item.name);
  }
  return { path, subcategoryId: subcategory?.id || "" };
}

function buildCatalogTree(products: Product[]): CatalogNode[] {
  const expandedProducts: Product[] = [...products];
  const knownIds = new Set(products.map((product) => product.id));

  products.forEach((parent) => {
    parent.subCategories?.forEach((variant) => {
      const variantId = variant.id || variant.slug;
      if (!variantId || knownIds.has(variantId)) return;
      knownIds.add(variantId);
      expandedProducts.push({
        ...variant,
        id: variantId,
        title: variant.title,
        category: parent.category,
        subCategoryId: parent.id,
        tag: variant.subtitle || parent.tag,
        status: parent.status || "published",
        subCategories: [],
      });
    });
  });

  const byId = new Map(expandedProducts.map((product) => [product.id, product]));
  const embeddedParents = new Map<string, string[]>();
  expandedProducts.forEach((parent) => {
    parent.subCategories?.forEach((child) => {
      const childId = child.id || child.slug;
      if (!childId || !byId.has(childId) || childId === parent.id) return;
      embeddedParents.set(childId, [...(embeddedParents.get(childId) || []), parent.id]);
    });
  });

  const parentFor = (product: Product) => {
    if (plasticStretchFilmItems.some((variant) => variant.slug === product.id) && byId.has("plastic-stretch-film")) {
      return "plastic-stretch-film";
    }
    const navCategoryId = categoryKey(product.category) === "others" ? "pp-strap" : categoryKey(product.category);
    const navCategory = productHierarchy.find((category) => category.id === navCategoryId);
    for (const subcategory of navCategory?.subcategories || []) {
      if (subcategory.items?.some((item) => item.slug === product.id) && byId.has(subcategory.id)) return subcategory.id;
    }
    const candidates = embeddedParents.get(product.id) || [];
    return candidates.find((candidate) => candidate !== product.id);
  };

  const children = new Map<string, Product[]>();
  const roots: Product[] = [];
  expandedProducts.forEach((product) => {
    const parentId = parentFor(product);
    if (parentId && byId.has(parentId)) children.set(parentId, [...(children.get(parentId) || []), product]);
    else roots.push(product);
  });

  const result: CatalogNode[] = [];
  const visited = new Set<string>();
  const visit = (product: Product, depth: number, parentId?: string) => {
    if (visited.has(product.id)) return;
    visited.add(product.id);
    result.push({ ...product, depth, path: getTaxonomyPath(product).path, parentId });
    (children.get(product.id) || []).sort((a, b) => a.title.localeCompare(b.title)).forEach((child) => visit(child, Math.min(depth + 1, 3), product.id));
  };
  roots.sort((a, b) => a.title.localeCompare(b.title)).forEach((root) => visit(root, 0));
  expandedProducts.forEach((product) => visit(product, 0));
  return result;
}

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadProducts = async (manual = false) => {
    manual ? setRefreshing(true) : setLoading(true);
    try {
      const response = await apiFetch("/api/products", { cache: "no-store" });
      if (!response.ok) throw new Error("The product service did not return a valid catalog.");
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("The product response is not a list.");
      setProducts(data);
      setExpanded(new Set(data.filter((product: Product) => product.subCategories?.length).map((p: Product) => p.id)));
      if (manual) setNotice({ type: "success", text: `Catalog refreshed — ${data.length} records loaded.` });
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "Could not load the product catalog." });
    } finally {
      setLoading(false); setRefreshing(false);
    }
  };

  useEffect(() => { void loadProducts(); }, []);

  const tree = useMemo(() => buildCatalogTree(products), [products]);
  const childIds = useMemo(() => new Set(tree.filter((node) => node.parentId).map((node) => node.id)), [tree]);
  const directChildren = useMemo(() => {
    const counts = new Map<string, number>();
    tree.forEach((node) => { if (node.parentId) counts.set(node.parentId, (counts.get(node.parentId) || 0) + 1); });
    return counts;
  }, [tree]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const directMatches = new Set(tree.filter((product) => {
      const matchesCategory = category === "all" || categoryKey(product.category) === category;
      const matchesStatus = status === "all" || (product.status || "published") === status;
      const haystack = [product.title, product.id, product.tag, product.blurb, ...product.path].filter(Boolean).join(" ").toLowerCase();
      return matchesCategory && matchesStatus && (!normalizedQuery || haystack.includes(normalizedQuery));
    }).map((product) => product.id));
    if (normalizedQuery) {
      tree.forEach((node) => {
        if (!directMatches.has(node.id)) return;
        let parentId = node.parentId;
        while (parentId) {
          directMatches.add(parentId);
          parentId = tree.find((candidate) => candidate.id === parentId)?.parentId;
        }
      });
    }
    return tree.filter((product) => {
      if (!directMatches.has(product.id)) return false;
      if (normalizedQuery) return true;
      let parentId = product.parentId;
      while (parentId) {
        if (!expanded.has(parentId)) return false;
        parentId = tree.find((candidate) => candidate.id === parentId)?.parentId;
      }
      return true;
    });
  }, [tree, query, category, status, expanded]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tree.length };
    tree.forEach((product) => { const key = categoryKey(product.category); counts[key] = (counts[key] || 0) + 1; });
    return counts;
  }, [tree]);
  const published = products.filter((product) => (product.status || "published") === "published").length;
  const variants = products.reduce((total, product) => total + (product.subCategories?.length || 0), 0);
  const orphaned = tree.filter((node) => node.depth === 0 && getTaxonomyPath(node).path.length === 1).length;

  const toggle = (id: string) => setExpanded((current) => {
    const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next;
  });

  const removeProduct = async (product: Product) => {
    if (!window.confirm(`Delete “${product.title}”? This permanently removes the catalog record.`)) return;
    try {
      const response = await apiFetch(`/api/products/${product.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("The product could not be deleted.");
      setProducts((current) => current
        .filter((item) => item.id !== product.id)
        .map((item) => ({
          ...item,
          subCategories: item.subCategories?.filter((variant) => (variant.id || variant.slug) !== product.id),
        })));
      setNotice({ type: "success", text: `Deleted “${product.title}”.` });
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "Delete failed." });
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-5 pb-16">
      <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange-700">Catalog command center</span><span className="text-xs font-medium text-slate-500">Live hierarchy · database + hardcoded fallback</span></div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Products & catalog structure</h1>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">Manage every category, product family, SKU and nested variant without losing the structure used by the public product routes.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => void loadProducts(true)} disabled={refreshing} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"><RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Refresh</button>
          <Link href="/admin/products/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#fe8220] px-4 text-xs font-extrabold text-[#120a3b] shadow-sm transition hover:bg-[#ff9b4d]"><Plus className="h-4 w-4" /> New product</Link>
        </div>
      </header>

      {notice && <div className={`flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-semibold ${notice.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}><span className="flex items-center gap-2">{notice.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}{notice.text}</span><button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notification"><X className="h-4 w-4" /></button></div>}

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Catalog summary">
        {[
          { label: "Database records", value: products.length, icon: Package, color: "text-orange-700 bg-orange-50" },
          { label: "Published", value: published, icon: CheckCircle2, color: "text-emerald-700 bg-emerald-50" },
          { label: "Nested variants", value: variants, icon: Layers3, color: "text-violet-700 bg-violet-50" },
          { label: "Needs classification", value: orphaned, icon: AlertCircle, color: orphaned ? "text-amber-700 bg-amber-50" : "text-slate-600 bg-slate-100" },
        ].map(({ label, value, icon: Icon, color }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span><span className={`rounded-lg p-2 ${color}`}><Icon className="h-4 w-4" /></span></div><div className="mt-2 text-2xl font-extrabold text-slate-950">{loading ? "…" : value}</div></div>)}
      </section>

      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-20">
          <div className="px-2 pb-2 pt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Catalog sections</div>
          <nav className="space-y-1" aria-label="Product categories">
            {CATEGORY_OPTIONS.map((option) => <button key={option.id} type="button" onClick={() => setCategory(option.id)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${category === option.id ? "bg-[#120a3b] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}><span>{option.label}</span><span className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${category === option.id ? "bg-white/15 text-orange-200" : "bg-slate-100 text-slate-500"}`}>{categoryCounts[option.id] || 0}</span></button>)}
          </nav>
          <div className="mt-3 border-t border-slate-100 px-2 pt-3 text-[11px] leading-relaxed text-slate-500"><FolderTree className="mb-2 h-4 w-4 text-orange-500" />Rows are nested from the catalog table: family → product → sub-product → variant.</div>
        </aside>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product, SKU, tag or catalog path…" className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-9 text-xs text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100" />{query && <button type="button" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" aria-label="Clear search"><X className="h-4 w-4" /></button>}</div>
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none focus:border-orange-400"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select>
          </div>

          <div className="admin-product-grid border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500"><span>Product / SKU</span><span>Catalog route</span><span>Status</span><span className="text-right">Actions</span></div>
          {loading ? <div className="flex min-h-72 items-center justify-center gap-2 text-xs font-semibold text-slate-500"><RefreshCw className="h-4 w-4 animate-spin text-orange-500" /> Loading product table…</div> : visibleProducts.length === 0 ? <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center"><Package className="h-9 w-9 text-slate-300" /><h2 className="mt-3 text-sm font-bold text-slate-900">No matching products</h2><p className="mt-1 text-xs text-slate-500">Clear the search or select another catalog section.</p></div> : (
            <div className="divide-y divide-slate-100">
              {visibleProducts.map((product) => {
                const childCount = directChildren.get(product.id) || 0;
                const isExpanded = expanded.has(product.id);
                const productStatus = product.status || "published";
                return <div key={product.id} className="admin-product-grid px-4 py-3 text-xs transition hover:bg-slate-50/80">
                  <div className="flex min-w-0 items-start gap-2" style={{ paddingLeft: `${product.depth * 18}px` }}>
                    {childCount ? <button type="button" onClick={() => toggle(product.id)} className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:border-orange-300 hover:text-orange-600" aria-label={`${isExpanded ? "Collapse" : "Expand"} ${product.title}`}>{isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}</button> : <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />}
                    <div className="min-w-0"><Link href={`/admin/products/${product.id}`} className="block truncate font-bold text-slate-950 hover:text-orange-600">{product.title}</Link><div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400"><span className="truncate font-mono">{product.id}</span>{childCount > 0 && <span className="shrink-0 rounded bg-violet-50 px-1.5 py-0.5 font-bold text-violet-700">{childCount} child {childCount === 1 ? "item" : "items"}</span>}</div></div>
                  </div>
                  <div className="min-w-0 self-center"><div className="flex min-w-0 items-center gap-1 text-[10px] font-semibold text-slate-500">{product.path.slice(0, 3).map((segment, index) => <span key={`${segment}-${index}`} className="contents"><span className="truncate">{segment}</span>{index < Math.min(product.path.length, 3) - 1 && <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />}</span>)}</div><span className="mt-1 block truncate text-[10px] text-slate-400">{product.tag || `${Object.keys(product.specs || {}).length} technical specifications`}</span></div>
                  <div className="self-center"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold capitalize ${productStatus === "published" ? "bg-emerald-50 text-emerald-700" : productStatus === "draft" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}><CircleDot className="h-2.5 w-2.5" />{productStatus}</span></div>
                  <div className="flex items-center justify-end gap-1 self-center"><Link href={`/products/${product.id}`} target="_blank" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-800 hover:shadow-sm" title="Open live product"><ExternalLink className="h-3.5 w-3.5" /></Link><Link href={`/admin/products/${product.id}`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200" title="Edit product"><FilePenLine className="h-3.5 w-3.5" /></Link><button type="button" onClick={() => void removeProduct(product)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600" title="Delete product"><Trash2 className="h-3.5 w-3.5" /></button></div>
                </div>;
              })}
            </div>
          )}
          {!loading && <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[10px] font-medium text-slate-500"><span>Showing {visibleProducts.length} of {tree.length} catalog entries</span><span>{childIds.size} entries nested under a parent</span></div>}
        </section>
      </div>
    </div>
  );
}
