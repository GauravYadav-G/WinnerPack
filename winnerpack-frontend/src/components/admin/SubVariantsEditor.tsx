"use client";

import { useState } from "react";
import { Plus, Trash2, Layers, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

export interface SubVariant {
  id: string;
  title: string;
  subtitle?: string;
  blurb?: string;
  image?: string;
  gallery?: string[];
  specs?: Record<string, string>;
  applications?: string[];
}

interface SubVariantsEditorProps {
  value: SubVariant[];
  onChange: (variants: SubVariant[]) => void;
}

export default function SubVariantsEditor({ value = [], onChange }: SubVariantsEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const updated = [
      ...value,
      {
        id: `variant-${Date.now().toString(36)}`,
        title: "New Sub-Variant",
        subtitle: "",
        blurb: "",
        image: "",
        specs: {},
        applications: [],
      },
    ];
    onChange(updated);
    setExpandedIndex(updated.length - 1);
  };

  const handleUpdate = (index: number, field: keyof SubVariant, val: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/50">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Sub-Products / Child Variants ({value.length})
            </h4>
            <p className="text-[11px] text-slate-500">
              Nested variants with individual specifications and images (e.g., Plain Chromo vs Plain Thermal).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-98 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Variant
        </button>
      </div>

      {value.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
          <Layers className="mx-auto h-7 w-7 text-slate-300 mb-1.5" />
          <p className="text-xs font-medium text-slate-600">No child variants defined for this product.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Most single-SKU products do not require sub-variants. Add variants only if this product groups multiple sub-items.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {value.map((v, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/40 transition-all"
              >
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100/50">
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="flex flex-1 items-center gap-2.5 text-left cursor-pointer"
                  >
                    {v.image ? (
                      <div className="h-6 w-6 rounded-md overflow-hidden bg-white shrink-0 border border-slate-200">
                        <OptimizedImage src={v.image} alt={v.title} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-md bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <ImageIcon className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {v.title || "Untitled Variant"}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">({v.id})</span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-slate-400 ml-auto mr-2" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-auto mr-2" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="h-6 w-6 flex items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                    title="Delete variant"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3.5 bg-white border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Variant Title
                      </label>
                      <input
                        type="text"
                        value={v.title}
                        onChange={(e) => handleUpdate(idx, "title", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Variant ID / Slug
                      </label>
                      <input
                        type="text"
                        value={v.id}
                        onChange={(e) => handleUpdate(idx, "id", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-900 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Subtitle / Tag
                      </label>
                      <input
                        type="text"
                        value={v.subtitle || ""}
                        onChange={(e) => handleUpdate(idx, "subtitle", e.target.value)}
                        placeholder="e.g. Permanent Hot-Melt Adhesive"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={v.image || ""}
                        onChange={(e) => handleUpdate(idx, "image", e.target.value)}
                        placeholder="/images/products/..."
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-mono text-slate-900 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="col-span-full">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Variant Summary / Blurb
                      </label>
                      <textarea
                        rows={2}
                        value={v.blurb || ""}
                        onChange={(e) => handleUpdate(idx, "blurb", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
