'use client';

import { EditorSection, TextInput, ImageUpload, Repeater } from './shared';

export default function CertificationsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const certifications: any[] = Array.isArray(data.certifications) ? data.certifications : [];

  return (
    <div className="space-y-4">
      {/* ─── HEADER ─── */}
      <EditorSection title="Section Header">
        <TextInput
          label="Eyebrow Tag"
          value={data.eyebrow || ''}
          onChange={(v) => onChange({ ...data, eyebrow: v })}
          placeholder="e.g. Government & Quality Compliance"
        />
        <TextInput
          label="Section Title"
          value={data.title || ''}
          onChange={(v) => onChange({ ...data, title: v })}
          placeholder="e.g. Certified Standards You Can Trust"
        />
      </EditorSection>

      {/* ─── CERTIFICATIONS REPEATER ─── */}
      <EditorSection title="Certificates & Regulatory Badges">
        <p className="text-xs text-gray-400 mb-2">
          Manage the 6 quality compliance and government accreditation badges (ISO, MSME, GST, RoHS, CTE, CTO).
        </p>
        <Repeater
          label="Certificates"
          items={certifications}
          onChange={(newCerts) => onChange({ ...data, certifications: newCerts })}
          newItem={{
            id: `cert-${Date.now()}`,
            name: 'ISO 9001:2015',
            authority: 'Quality Management Certified',
            imageSrc: '/certifications/iso_official.svg',
          }}
          getTitle={(item) => item.name || 'Certificate'}
          renderItem={(cert, _, update) => (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <TextInput
                  label="Standard / Certificate Name"
                  hint="e.g. ISO 9001:2015, MSME Certified"
                  value={cert.name || ''}
                  onChange={(v) => update({ ...cert, name: v })}
                  placeholder="Certificate Name"
                />
                <TextInput
                  label="Issuing Authority / Subtitle"
                  hint="e.g. Ministry of MSME, Govt. of India"
                  value={cert.authority || ''}
                  onChange={(v) => update({ ...cert, authority: v })}
                  placeholder="Authority / Standard"
                />
              </div>

              <ImageUpload
                label="Certificate Emblem / Seal Artwork"
                hint="SVG or high-contrast PNG emblem image"
                value={cert.imageSrc || ''}
                onChange={(v) => update({ ...cert, imageSrc: v })}
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}
