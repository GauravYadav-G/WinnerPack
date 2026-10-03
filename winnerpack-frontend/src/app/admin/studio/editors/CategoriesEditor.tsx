'use client';

import Link from 'next/link';
import { EditorSection, TextInput, TextareaInput } from './shared';
import { ExternalLink, Layers } from 'lucide-react';

export default function CategoriesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const eyebrow = data.eyebrow ?? data.categoriesHeader?.tag ?? '';
  const title = data.title ?? data.categoriesHeader?.title ?? '';
  const description = data.description ?? data.categoriesHeader?.description ?? '';
  const categories: any[] = Array.isArray(data.cards) ? data.cards : [];

  const updateHeader = (nextEyebrow: string, nextTitle: string) => {
    onChange({
      ...data,
      eyebrow: nextEyebrow,
      title: nextTitle,
      categoriesHeader: { tag: nextEyebrow, title: nextTitle, description },
    });
  };

  return (
    <div className="space-y-4">
      {/* ─── SECTION HEADER ─── */}
      <EditorSection title="Section Header">
        <TextInput
          label="Eyebrow Badge Tag"
          hint="Small uppercase tag above the heading"
          value={eyebrow}
          onChange={(v) => updateHeader(v, title)}
          placeholder="e.g. Industrial Range & Showcase"
        />
        <TextareaInput
          label="Section Description"
          hint="Optional supporting copy shown below the heading"
          value={description}
          onChange={(value) => onChange({
            ...data,
            description: value,
            categoriesHeader: { tag: eyebrow, title, description: value },
          })}
          rows={2}
          placeholder="Briefly introduce the product catalog."
        />
        <TextInput
          label="Section Title"
          hint="Main heading for the 4-card catalog showcase"
          value={title}
          onChange={(v) => updateHeader(eyebrow, v)}
          placeholder="e.g. Product Gallery"
        />
      </EditorSection>

      {/* ─── CATALOG FAMILIES QUICK NAV ─── */}
      <EditorSection title="Product Families Showcase">
        <p className="text-xs text-gray-400 mb-3">
          These category collections come directly from the catalog database. Use the category manager to change their names, images, descriptions, and products.
        </p>

        <div className="space-y-2 mb-4">
          {categories.map((category, index) => {
            const productCount = Array.isArray(category.subcategories)
              ? category.subcategories.reduce((total: number, group: any) => total + (Array.isArray(group.items) ? group.items.length : 0), 0)
              : 0;
            return (
              <div key={category.id ?? category.catSlug ?? index} className="cms-source-record">
                <span className="cms-source-record-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <strong>{category.title ?? 'Untitled category'}</strong>
                  <span>{category.tag ?? category.blurb ?? 'No description saved'}</span>
                </div>
                <small>{productCount} products</small>
              </div>
            );
          })}
          {categories.length === 0 && (
            <div className="cms-empty-source">No category records are currently available.</div>
          )}
        </div>

        <Link
          href="/admin/categories"
          className="studio-btn primary w-full flex items-center justify-center gap-2 !py-2.5 !text-xs font-semibold"
        >
          <Layers className="w-4 h-4" /> Open Full Category Collections Studio
          <ExternalLink className="w-3.5 h-3.5 ml-1" />
        </Link>
      </EditorSection>
    </div>
  );
}
