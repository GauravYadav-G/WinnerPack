"use client";

import { useState } from "react";
import { Plus, Trash2, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListEditorProps {
  value: FaqItem[];
  onChange: (faqs: FaqItem[]) => void;
}

export default function FaqListEditor({ value = [], onChange }: FaqListEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAdd = () => {
    const updated = [...value, { question: "", answer: "" }];
    onChange(updated);
    setExpandedIndex(updated.length - 1);
  };

  const handleUpdate = (index: number, field: "question" | "answer", val: string) => {
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
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Product Technical FAQs ({value.length})
            </h4>
            <p className="text-[11px] text-slate-500">
              Questions and answers displayed in the product accordion on the live website.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-98 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add FAQ
        </button>
      </div>

      {value.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
          <HelpCircle className="mx-auto h-7 w-7 text-slate-300 mb-1.5" />
          <p className="text-xs font-medium text-slate-600">No product FAQs defined.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Click "Add FAQ" to provide answers to common questions about this product.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {value.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 transition-all"
              >
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100/50">
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="flex flex-1 items-center gap-2 text-left cursor-pointer"
                  >
                    <span className="font-mono text-[10px] font-bold text-slate-400">Q{idx + 1}</span>
                    <span className="text-xs font-bold text-slate-800 truncate max-w-md">
                      {faq.question || "Untitled Question (Click to edit)"}
                    </span>
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
                    title="Delete FAQ"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {isExpanded && (
                  <div className="space-y-2.5 p-3.5 bg-white border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleUpdate(idx, "question", e.target.value)}
                        placeholder="e.g. Can this film be used on high-speed flow wrappers?"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-emerald-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Answer (Supports plain text or Markdown)
                      </label>
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => handleUpdate(idx, "answer", e.target.value)}
                        placeholder="e.g. Yes, formulated for sealing up to 120 packs per minute..."
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-hidden"
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
