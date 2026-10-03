'use client';

import { EditorSection, TextInput, ImageUpload, Repeater } from './shared';

export default function IndustriesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const industries: any[] = Array.isArray(data.industries) ? data.industries : [];

  return (
    <div className="space-y-4">
      {/* ─── HEADER ─── */}
      <EditorSection title="Section Header">
        <TextInput
          label="Eyebrow Tag"
          hint="Small uppercase tag"
          value={data.eyebrow || ''}
          onChange={(v) => onChange({ ...data, eyebrow: v })}
          placeholder="e.g. SECTORS SERVED"
        />
        <TextInput
          label="Section Title"
          hint="Prominent heading on homepage"
          value={data.title || ''}
          onChange={(v) => onChange({ ...data, title: v })}
          placeholder="e.g. Specialized for High-Volume Industry Lines"
        />
      </EditorSection>

      {/* ─── INDUSTRIES LIST ─── */}
      <EditorSection title="Industry Sector Cards">
        <p className="text-xs text-gray-400 mb-2">
          Add or edit industry sectors served by WinnerPack. Each card displays the industry name and background photograph.
        </p>
        <Repeater
          label="Industries"
          items={industries}
          onChange={(newIndustries) => onChange({ ...data, industries: newIndustries })}
          newItem={{
            name: 'New Industry Sector',
            image: '/images/desktop/industries/food_fmcg_industry.webp',
          }}
          getTitle={(item) => item.name || 'Industry'}
          renderItem={(ind, _, update) => (
            <div className="space-y-3 pt-1">
              <TextInput
                label="Industry Name"
                hint="e.g. Food & FMCG, Pharma & Healthcare, E-Commerce & Logistics"
                value={ind.name || ''}
                onChange={(v) => update({ ...ind, name: v })}
                placeholder="Industry Title"
              />
              <ImageUpload
                label="Sector Cover Photograph"
                hint="Landscape packaging application photograph (16:9 recommended)"
                value={ind.image || ''}
                onChange={(v) => update({ ...ind, image: v })}
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}
