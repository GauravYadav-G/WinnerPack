'use client';

import { EditorSection, TextInput, TextareaInput, Repeater } from './shared';

export default function SolutionsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const solutionsData: any[] = Array.isArray(data.solutionsData) ? data.solutionsData : [];

  return (
    <div className="space-y-4">
      {/* ─── HEADER ─── */}
      <EditorSection title="Section Header">
        <TextInput
          label="Eyebrow Tag"
          value={data.eyebrow || ''}
          onChange={(v) => onChange({ ...data, eyebrow: v })}
          placeholder="e.g. TECHNICAL ADVANTAGE"
        />
        <TextInput
          label="Section Title"
          value={data.title || ''}
          onChange={(v) => onChange({ ...data, title: v })}
          placeholder="e.g. From Polymer Pellet to High-Speed Dispatch"
        />
      </EditorSection>

      {/* ─── SOLUTIONS REPEATER ─── */}
      <EditorSection title="Manufacturing Journey & Capability Stages">
        <p className="text-xs text-gray-400 mb-2">
          Manage the 8 capability stages. Each step features an index number (slot), stage title (question), solution headline, and technical challenge blurb.
        </p>
        <Repeater
          label="Journey Stages"
          items={solutionsData}
          onChange={(newSolutions) => onChange({ ...data, solutionsData: newSolutions })}
          newItem={{
            slot: `0${solutionsData.length + 1}`,
            question: 'Custom Dimensions',
            solution: 'Tailored Sizes & Gauges',
            challenge: 'Custom widths, thicknesses, and roll lengths manufactured to match your exact automated wrapping machinery.',
          }}
          getTitle={(item) => `${item.slot || 'Step'} · ${item.question || item.solution || 'Stage'}`}
          renderItem={(step, idx, update) => (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div className="sm:col-span-1">
                  <TextInput
                    label="Slot Number"
                    hint="e.g. 01, 02"
                    value={step.slot || String(idx + 1).padStart(2, '0')}
                    onChange={(v) => update({ ...step, slot: v })}
                    mono
                  />
                </div>
                <div className="sm:col-span-3">
                  <TextInput
                    label="Stage Title / Capability Question"
                    hint="e.g. Custom Dimensions, Reliable Strength"
                    value={step.question || ''}
                    onChange={(v) => update({ ...step, question: v })}
                    placeholder="Capability Title"
                  />
                </div>
              </div>

              <TextInput
                label="Solution Headline"
                hint="e.g. Tailored Sizes & Gauges, Bulk Manufacturing Capacity"
                value={step.solution || ''}
                onChange={(v) => update({ ...step, solution: v })}
                placeholder="Solution Headline"
              />

              <TextareaInput
                label="Technical Description / Challenge Solution"
                hint="Describe how WinnerPack engineers solve this operational requirement"
                value={step.challenge || ''}
                onChange={(v) => update({ ...step, challenge: v })}
                rows={2}
                placeholder="Detailed capability explanation..."
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}
