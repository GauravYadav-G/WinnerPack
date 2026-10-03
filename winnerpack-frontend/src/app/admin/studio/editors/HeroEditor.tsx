'use client';

import { EditorSection, TextInput, TextareaInput, ImageUpload, Repeater } from './shared';

export default function HeroEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const slides: any[] = Array.isArray(data.slides) ? data.slides : [];
  const rightBanner = typeof data.rightBanner === 'string' ? data.rightBanner : data.rightBanner?.image || '';

  return (
    <div className="space-y-4">
      {/* ─── SLIDES REPEATER ─── */}
      <EditorSection title="Hero Carousel Slides">
        <p className="text-xs text-gray-400 mb-2">
          Add, reorder, or update slides shown in the main opening banner. The live homepage cycles through the first 4 active slides.
        </p>
        <Repeater
          label="Slides"
          hint="Desktop 16:9 or 21:9 image recommended. Mobile 375x600 recommended."
          items={slides}
          onChange={(newSlides) => onChange({ ...data, slides: newSlides })}
          newItem={{
            id: `slide-${Date.now()}`,
            tag: 'INDUSTRIAL PACKAGING',
            heading: 'Engineered For Industrial Performance',
            description: 'Direct manufacturer of precision stretch films, strapping rolls, and high-barrier barrier films.',
            desktopMediaUrl: '/images/desktop/hero-slider/slide-1.webp',
            mobileMediaUrl: '/images/mobile/hero-slider/slide-1.avif',
          }}
          getTitle={(item) => item.heading || item.tag || 'Slide'}
          renderItem={(slide, _, update) => (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-1">
                  <TextInput
                    label="Badge / Tag"
                    hint="e.g. FILM DIVISION"
                    value={slide.tag || ''}
                    onChange={(v) => update({ ...slide, tag: v })}
                    placeholder="TAG / CATEGORY"
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextInput
                    label="Main Headline"
                    hint="Large bold slide title"
                    value={slide.heading || slide.title || ''}
                    onChange={(v) => update({ ...slide, heading: v, title: v })}
                    placeholder="e.g. High Performance Metallocene Stretch Film"
                  />
                </div>
              </div>

              <TextareaInput
                label="Slide Subtitle / Description"
                hint="Supporting technical narrative"
                value={slide.description || ''}
                onChange={(v) => update({ ...slide, description: v })}
                rows={2}
                placeholder="Describe key benefits, load containment, or machine compatibility..."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-white/5">
                <ImageUpload
                  label="Desktop Background (Wide)"
                  hint="Optimized for large screens (1920x1080)"
                  value={slide.desktopMediaUrl || slide.image || ''}
                  onChange={(v) => update({ ...slide, desktopMediaUrl: v, image: v })}
                />
                <ImageUpload
                  label="Mobile Background (Portrait)"
                  hint="Optimized for smartphones (375x600)"
                  value={slide.mobileMediaUrl || ''}
                  onChange={(v) => update({ ...slide, mobileMediaUrl: v })}
                />
              </div>
            </div>
          )}
        />
      </EditorSection>

      {/* ─── DESKTOP RIGHT SHOWCASE BANNER ─── */}
      <EditorSection title="Desktop Showcase Banner">
        <p className="text-xs text-gray-400 mb-2">
          The prominent callout image displayed on the right edge of the hero viewport on desktop screens.
        </p>
        <ImageUpload
          label="Showcase Banner Image"
          hint="Portrait or square industrial product showcase photograph"
          value={rightBanner}
          onChange={(v) => onChange({ ...data, rightBanner: v })}
        />
      </EditorSection>
    </div>
  );
}
