'use client';

import { EditorSection, TextInput, TextareaInput, ImageUpload, Repeater } from './shared';

export default function AboutEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const about = data.about || data || {};
  const set = (key: string, value: any) => {
    if (data.about !== undefined) {
      onChange({ ...data, about: { ...about, [key]: value } });
    } else {
      onChange({ ...data, [key]: value });
    }
  };

  const stats: any[] = Array.isArray(about.stats) ? about.stats : [];

  return (
    <div className="space-y-4">
      {/* ─── HEADLINE & COPY ─── */}
      <EditorSection title="Section Heading & Narrative">
        <TextInput
          label="Main Section Tagline / Heading"
          hint="Prominent H2 heading on the homepage"
          value={about.tagline || about.heading || ''}
          onChange={(v) => {
            set('tagline', v);
            set('heading', v);
          }}
          placeholder="e.g. Pioneering B2B Industrial Packaging & Labeling Solutions"
        />

        <TextareaInput
          label="Opening Introduction Paragraph"
          hint="Company foundation and manufacturing overview"
          value={about.para1 || ''}
          onChange={(v) => set('para1', v)}
          rows={3}
          placeholder="Winner Pack Technologies Pvt. Ltd. supplies environment-friendly secondary and tertiary packaging materials..."
        />

        <TextareaInput
          label="Supporting Value Proposition Paragraph"
          hint="Motto explanation, specialization, and customer commitment"
          value={about.para2 || ''}
          onChange={(v) => set('para2', v)}
          rows={3}
          placeholder="We specialize in BOPP tapes, strapping rolls, shrink films, and protective packaging, serving key industrial sectors..."
        />
      </EditorSection>

      {/* ─── PLANT PHOTOGRAPHY ─── */}
      <EditorSection title="Plant & Manufacturing Photography">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ImageUpload
            label="Primary Plant Image (Main Feature)"
            hint="Wide factory hall / production floor view"
            value={about.image1 || about.image || ''}
            onChange={(v) => {
              set('image1', v);
              set('image', v);
            }}
          />
          <ImageUpload
            label="Secondary Plant Image"
            hint="Close-up machine conversion or extrusion tower"
            value={about.image2 || ''}
            onChange={(v) => set('image2', v)}
          />
        </div>
      </EditorSection>

      {/* ─── OPERATIONAL STATS ─── */}
      <EditorSection title="Operational Statistics Bar">
        <p className="text-xs text-gray-400 mb-2">
          Key performance milestones displayed in the statistics counter strip.
        </p>
        <Repeater
          label="Statistics"
          items={stats}
          onChange={(newStats) => set('stats', newStats)}
          newItem={{ value: '100%', label: 'Quality Assurance' }}
          getTitle={(item) => `${item.value} · ${item.label}`}
          renderItem={(stat, _, update) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <TextInput
                label="Statistic Metric / Value"
                hint="e.g. 8+, 10,000 MT, 99.8%"
                value={stat.value || ''}
                onChange={(v) => update({ ...stat, value: v })}
                placeholder="Value"
              />
              <TextInput
                label="Metric Description / Label"
                hint="e.g. Years of manufacturing excellence"
                value={stat.label || ''}
                onChange={(v) => update({ ...stat, label: v })}
                placeholder="Label"
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}
