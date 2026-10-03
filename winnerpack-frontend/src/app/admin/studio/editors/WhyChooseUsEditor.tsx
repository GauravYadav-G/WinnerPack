'use client';

import { EditorSection, TextInput, TextareaInput, ImageUpload, Repeater } from './shared';

const ICONS = ['Tag', 'Layers', 'Disc3', 'Shield', 'Leaf', 'Globe2'];

export default function WhyChooseUsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const usps: any[] = Array.isArray(data.usps) ? data.usps : [];

  return (
    <div className="space-y-4">
      {/* ─── HEADER ─── */}
      <EditorSection title="Section Header">
        <TextInput
          label="Eyebrow Tag"
          value={data.eyebrow || ''}
          onChange={(v) => onChange({ ...data, eyebrow: v })}
          placeholder="e.g. Why WinnerPack"
        />
        <TextInput
          label="Section Title"
          value={data.title || ''}
          onChange={(v) => onChange({ ...data, title: v })}
          placeholder="e.g. Six Reasons Procurement Teams Renew Our Contract Every Year"
        />
      </EditorSection>

      {/* ─── 6 USPS REPEATER ─── */}
      <EditorSection title="Core USPs & Operational Strengths">
        <p className="text-xs text-gray-400 mb-2">
          Manage the 6 value pillars. Each card features an icon, title, detailed text, and a hover-reveal background photo.
        </p>
        <Repeater
          label="USPs"
          items={usps}
          onChange={(newUsps) => onChange({ ...data, usps: newUsps })}
          newItem={{
            title: 'Direct Manufacturer Pricing',
            text: 'Transparent pricing directly from the manufacturing unit, helping you reduce overall packaging costs per pallet unit.',
            icon: 'Tag',
            bgImage: '/images/desktop/portfolio/action_extrusion_tower_blue.webp',
          }}
          getTitle={(item) => item.title || 'USP'}
          renderItem={(usp, _, update) => (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <TextInput
                    label="USP Headline / Title"
                    value={usp.title || ''}
                    onChange={(v) => update({ ...usp, title: v })}
                    placeholder="e.g. Zero Tear Guarantee"
                  />
                </div>
                <div className="sm:col-span-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-widest mb-1">
                      Vector Icon
                    </label>
                    <select
                      value={usp.icon ?? ''}
                      onChange={(e) => update({ ...usp, icon: e.target.value })}
                      className="studio-input !py-1.5"
                    >
                      {ICONS.map((ic) => (
                        <option key={ic} value={ic}>
                          {ic}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <TextareaInput
                label="Benefit Description Narrative"
                hint="Detail the exact operational or financial advantage for procurement teams"
                value={usp.text || usp.description || ''}
                onChange={(v) => update({ ...usp, text: v, description: v })}
                rows={2}
                placeholder="Explain the technical strength, delivery SLA, or cost savings..."
              />

              <ImageUpload
                label="Hover Background Image (Atmosphere Photo)"
                hint="Dark atmospheric manufacturing or pallet wrapping photo"
                value={usp.bgImage || ''}
                onChange={(v) => update({ ...usp, bgImage: v })}
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}
