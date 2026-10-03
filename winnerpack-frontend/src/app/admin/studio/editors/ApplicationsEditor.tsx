'use client';

import { EditorSection, TextInput, ImageUpload, Repeater } from './shared';

export default function ApplicationsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const slides: any[] = Array.isArray(data.slides) ? data.slides : [];

  return (
    <div className="space-y-4">
      {/* ─── HEADER ─── */}
      <EditorSection title="Section Header">
        <TextInput
          label="Eyebrow Tag"
          value={data.eyebrow || ''}
          onChange={(v) => onChange({ ...data, eyebrow: v })}
          placeholder="e.g. Real-World Applications"
        />
        <TextInput
          label="Section Title"
          value={data.title || ''}
          onChange={(v) => onChange({ ...data, title: v })}
          placeholder="e.g. Materials in Industrial Action"
        />
      </EditorSection>

      {/* ─── SLIDES REPEATER ─── */}
      <EditorSection title="Application Action Carousel Slides">
        <p className="text-xs text-gray-400 mb-2">
          High-impact borderless carousel photographs showing extrusion machinery, pellet feeding, automated wrapping, and pallet load containment.
        </p>
        <Repeater
          label="Application Slides"
          items={slides}
          onChange={(newSlides) => onChange({ ...data, slides: newSlides })}
          newItem={{
            id: `app-${Date.now()}`,
            image: '/images/desktop/portfolio/action_die_ring_bubble.webp',
          }}
          getTitle={(item) => item.id || 'Application Photo'}
          renderItem={(slide, idx, update) => (
            <div className="space-y-3 pt-1">
              <TextInput
                label="Action Title / Machine Slug"
                hint="Descriptive name for this machinery action"
                value={slide.id || `Slide ${idx + 1}`}
                onChange={(v) => update({ ...slide, id: v })}
                placeholder="e.g. stretch-pallet-wrapping"
              />
              <ImageUpload
                label="High-Definition Action Photo"
                hint="Clean industrial photography with vibrant lighting"
                value={slide.image || ''}
                onChange={(v) => update({ ...slide, image: v })}
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}
