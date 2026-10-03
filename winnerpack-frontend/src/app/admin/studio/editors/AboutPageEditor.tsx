'use client';

import { EditorSection, TextInput, TextareaInput, ImageUpload, Repeater, StringList } from './shared';

export function AboutHeaderEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const header = data.header || data || {};
  const set = (k: string, v: any) => {
    if (data.header !== undefined) onChange({ ...data, header: { ...header, [k]: v } });
    else onChange({ ...data, [k]: v });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="About Us Page Header">
        <TextInput
          label="Page Title"
          value={header.title ?? ''}
          onChange={(v) => set('title', v)}
          placeholder="About Us"
        />
        <TextInput
          label="Eyebrow Subtitle"
          value={header.eyebrow ?? ''}
          onChange={(v) => set('eyebrow', v)}
          placeholder="Built to Hold Industry Together."
        />
      </EditorSection>
    </div>
  );
}

export function AboutWhoWeAreEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const whoWeAre = data.whoWeAre || data || {};
  const set = (k: string, v: any) => {
    if (data.whoWeAre !== undefined) onChange({ ...data, whoWeAre: { ...whoWeAre, [k]: v } });
    else onChange({ ...data, [k]: v });
  };
  const checkpoints: string[] = Array.isArray(whoWeAre.checkpoints) ? whoWeAre.checkpoints : [];

  return (
    <div className="space-y-4">
      <EditorSection title="Who We Are Section">
        <TextInput
          label="Eyebrow Tag"
          value={whoWeAre.tag ?? ''}
          onChange={(v) => set('tag', v)}
          placeholder="Who We Are"
        />
        <TextInput
          label="Main Heading"
          value={whoWeAre.heading ?? ''}
          onChange={(v) => set('heading', v)}
          placeholder="Practical Packaging Solutions..."
        />
        <TextareaInput
          label="Story Paragraph 1"
          value={whoWeAre.para1 || ''}
          onChange={(v) => set('para1', v)}
          rows={3}
          placeholder="Company background and operations..."
        />
        <TextareaInput
          label="Story Paragraph 2"
          value={whoWeAre.para2 || ''}
          onChange={(v) => set('para2', v)}
          rows={3}
          placeholder="Product range and coordination..."
        />
      </EditorSection>

      <EditorSection title="Factory Floor Showcase">
        <ImageUpload
          label="Plant Floor Photo"
          value={whoWeAre.image ?? ''}
          onChange={(v) => set('image', v)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <TextInput
            label="Photo Badge Brand Tag"
            value={whoWeAre.badgeTag ?? ''}
            onChange={(v) => set('badgeTag', v)}
          />
          <TextInput
            label="Photo Badge Callout Title"
            value={whoWeAre.badgeTitle ?? ''}
            onChange={(v) => set('badgeTitle', v)}
          />
        </div>
      </EditorSection>

      <EditorSection title="Key Capability Checkpoints">
        <StringList
          label="Checkpoints"
          hint="Key operational strengths listed with green checkmarks"
          items={checkpoints}
          onChange={(items) => set('checkpoints', items)}
          placeholder="e.g. Material selection support"
        />
      </EditorSection>
    </div>
  );
}

export function AboutMetricsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const metrics: any[] = Array.isArray(data.metrics) ? data.metrics : Array.isArray(data) ? data : [];
  const updateMetrics = (next: any[]) => {
    if (data.metrics !== undefined) onChange({ ...data, metrics: next });
    else onChange({ ...data, metrics: next });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Company Metrics & Milestones">
        <p className="text-xs text-gray-400 mb-2">
          Four milestone counters displayed prominently across the About Us page.
        </p>
        <Repeater
          label="Milestone Counters"
          items={metrics}
          onChange={updateMetrics}
          newItem={{ value: '10,000+ MT', label: 'Annual Converting Capacity' }}
          getTitle={(m) => `${m.value} · ${m.label}`}
          renderItem={(metric, _, update) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <TextInput
                label="Metric Value"
                hint="e.g. 2018, 20+, 10,000+ MT, 500+"
                value={metric.value || ''}
                onChange={(v) => update({ ...metric, value: v })}
                placeholder="2018"
              />
              <TextInput
                label="Metric Description / Subtitle"
                hint="e.g. Our journey began, Specialized product lines"
                value={metric.label || ''}
                onChange={(v) => update({ ...metric, label: v })}
                placeholder="Label"
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}

export function AboutGuidesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const guides = data.guides || data || {};
  const mission = guides.mission || { tag: 'Our Mission', title: 'Deliver Precision Packaging Materials With Transparent Specifications and Responsive Customer Support.' };
  const vision = guides.vision || { tag: 'Our Vision', title: 'Be the Trusted Packaging Partner Behind Efficient, Reliable, and Sustainable Supply Chains.' };

  const updateMission = (k: string, v: string) => {
    const nextGuides = { ...guides, mission: { ...mission, [k]: v } };
    if (data.guides !== undefined) onChange({ ...data, guides: nextGuides });
    else onChange({ ...data, guides: nextGuides });
  };

  const updateVision = (k: string, v: string) => {
    const nextGuides = { ...guides, vision: { ...vision, [k]: v } };
    if (data.guides !== undefined) onChange({ ...data, guides: nextGuides });
    else onChange({ ...data, guides: nextGuides });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Our Mission">
        <TextInput
          label="Mission Tag"
          value={mission.tag ?? ''}
          onChange={(v) => updateMission('tag', v)}
        />
        <TextareaInput
          label="Mission Manifesto Headline"
          value={mission.title || ''}
          onChange={(v) => updateMission('title', v)}
          rows={2}
        />
      </EditorSection>

      <EditorSection title="Our Vision">
        <TextInput
          label="Vision Tag"
          value={vision.tag ?? ''}
          onChange={(v) => updateVision('tag', v)}
        />
        <TextareaInput
          label="Vision Manifesto Headline"
          value={vision.title || ''}
          onChange={(v) => updateVision('title', v)}
          rows={2}
        />
      </EditorSection>
    </div>
  );
}

export function AboutCapabilitiesEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const capabilities = data.capabilities || data || {};
  const set = (k: string, v: any) => {
    if (data.capabilities !== undefined) onChange({ ...data, capabilities: { ...capabilities, [k]: v } });
    else onChange({ ...data, [k]: v });
  };
  const items: string[] = Array.isArray(capabilities.items) ? capabilities.items : [];

  return (
    <div className="space-y-4">
      <EditorSection title="Operational Capabilities">
        <TextInput
          label="Eyebrow Tag"
          value={capabilities.tag ?? ''}
          onChange={(v) => set('tag', v)}
          placeholder="Operational Capability"
        />
        <TextInput
          label="Section Heading"
          value={capabilities.heading ?? ''}
          onChange={(v) => set('heading', v)}
          placeholder="From Requirement to Reliable Dispatch."
        />
        <TextareaInput
          label="Operational Narrative"
          value={capabilities.description || ''}
          onChange={(v) => set('description', v)}
          rows={3}
          placeholder="We connect material selection, converting, quality oversight, and supply coordination..."
        />
        <ImageUpload
          label="Converting & Slitting Line Photo"
          value={capabilities.image ?? ''}
          onChange={(v) => set('image', v)}
        />
        <StringList
          label="Capability Strengths"
          hint="Key points with icons"
          items={items}
          onChange={(newItems) => set('items', newItems)}
          placeholder="e.g. Application-led material guidance"
        />
      </EditorSection>
    </div>
  );
}

export default function AboutPageMasterEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-6">
      <AboutHeaderEditor data={data} onChange={onChange} />
      <AboutWhoWeAreEditor data={data} onChange={onChange} />
      <AboutMetricsEditor data={data} onChange={onChange} />
      <AboutGuidesEditor data={data} onChange={onChange} />
      <AboutCapabilitiesEditor data={data} onChange={onChange} />
    </div>
  );
}
