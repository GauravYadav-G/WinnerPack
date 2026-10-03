'use client';

import { EditorSection, TextInput, ImageUpload, Repeater } from './shared';

export default function PartnersEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const partnerHeader = data.partnerHeader ?? {};
  const partners: any[] = Array.isArray(data.partners) ? data.partners : [];

  const updateHeader = (tag: string, title: string) => {
    onChange({
      ...data,
      partnerHeader: { tag, title },
    });
  };

  return (
    <div className="space-y-4">
      {/* ─── HEADER ─── */}
      <EditorSection title="Section Header">
        <TextInput
          label="Eyebrow Tag"
          value={partnerHeader.tag || ''}
          onChange={(v) => updateHeader(v, partnerHeader.title)}
          placeholder="e.g. OUR PARTNERS"
        />
        <TextInput
          label="Section Title"
          value={partnerHeader.title || ''}
          onChange={(v) => updateHeader(partnerHeader.tag, v)}
          placeholder="e.g. Trusted By Industry Leaders Nationwide"
        />
      </EditorSection>

      {/* ─── PARTNERS REPEATER ─── */}
      <EditorSection title="Client & Enterprise Partner Logos">
        <p className="text-xs text-gray-400 mb-2">
          Add or edit logos that appear in the infinite scrolling brand marquee. Transparent PNG or SVG logos work best.
        </p>
        <Repeater
          label="Partner Logos"
          items={partners}
          onChange={(newPartners) => onChange({ ...data, partners: newPartners })}
          newItem={{
            name: 'New Client Enterprise',
            logo: '/Brand_logo/bosch.svg',
          }}
          getTitle={(item) => item.name || 'Partner Brand'}
          renderItem={(partner, _, update) => (
            <div className="space-y-3 pt-1">
              <TextInput
                label="Partner / Organization Name"
                value={partner.name || ''}
                onChange={(v) => update({ ...partner, name: v })}
                placeholder="e.g. Milton, boAt, Bosch, Vivo"
              />
              <ImageUpload
                label="Brand Logo Asset"
                hint="Transparent PNG or crisp SVG vector file"
                value={partner.logo || ''}
                onChange={(v) => update({ ...partner, logo: v })}
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}
