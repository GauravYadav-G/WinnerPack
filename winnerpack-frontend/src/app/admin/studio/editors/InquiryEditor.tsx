'use client';

import { EditorSection, TextInput, TextareaInput } from './shared';

export default function InquiryEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const contact = data.inquiryContact || data || {};
  const set = (key: string, value: any) => {
    if (data.inquiryContact !== undefined) {
      onChange({ ...data, inquiryContact: { ...contact, [key]: value } });
    } else {
      onChange({ ...data, [key]: value });
    }
  };

  return (
    <div className="space-y-4">
      {/* ─── NARRATIVE & HEADLINE ─── */}
      <EditorSection title="Inquiry Card Narrative">
        <TextInput
          label="Display Headline"
          hint="Large brand statement above the inquiry form"
          value={contact.headline ?? ''}
          onChange={(v) => set('headline', v)}
          placeholder="e.g. The inquiry."
        />
        <TextareaInput
          label="Narrative Subtext"
          hint="Prompting the client to share payload specs or order volume"
          value={contact.description || ''}
          onChange={(v) => set('description', v)}
          rows={2}
          placeholder="Tell us where you are now and where you want the work to go..."
        />
      </EditorSection>

      {/* ─── HOTLINES & DESK CHANNELS ─── */}
      <EditorSection title="Direct Technical Desk Channels">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Primary Hotline Phone"
            hint="Format: +91 85950 72187"
            value={contact.phone1 ?? ''}
            onChange={(v) => set('phone1', v)}
            mono
          />
          <TextInput
            label="Secondary Hotline Phone"
            hint="Format: +91 74287 70999"
            value={contact.phone2 ?? ''}
            onChange={(v) => set('phone2', v)}
            mono
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Direct Sales Email"
            value={contact.email ?? ''}
            onChange={(v) => set('email', v)}
            placeholder="info@winnerpack.in"
            mono
          />
          <TextInput
            label="Operating Hours SLA"
            value={contact.hours ?? ''}
            onChange={(v) => set('hours', v)}
            placeholder="Mon – Sat: 9:00 AM – 7:00 PM"
          />
        </div>

        <TextareaInput
          label="Corporate Office & Manufacturing Unit Address"
          value={contact.address ?? ''}
          onChange={(v) => set('address', v)}
          rows={2}
          placeholder="Complete factory address..."
        />
      </EditorSection>
    </div>
  );
}
