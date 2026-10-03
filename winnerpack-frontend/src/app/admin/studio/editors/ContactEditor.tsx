'use client';

import { EditorSection, TextInput, TextareaInput, Repeater } from './shared';

export function ContactHeaderEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const header = data.header || data || {};
  const set = (k: string, v: any) => {
    if (data.header !== undefined) onChange({ ...data, header: { ...header, [k]: v } });
    else onChange({ ...data, [k]: v });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Contact Page Header">
        <TextInput
          label="Badge Tag"
          value={header.tag ?? ''}
          onChange={(v) => set('tag', v)}
          placeholder="Contact"
        />
        <TextInput
          label="Page Headline"
          value={header.title ?? ''}
          onChange={(v) => set('title', v)}
          placeholder="Request specifications & indicative pricing."
        />
        <TextareaInput
          label="Subheading / SLA Narrative"
          value={header.description || ''}
          onChange={(v) => set('description', v)}
          rows={2}
          placeholder="Send us your load, line speed and deadline..."
        />
      </EditorSection>
    </div>
  );
}

export function ContactChannelsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const details = data.details || data || {};
  const set = (k: string, v: any) => {
    if (data.details !== undefined) onChange({ ...data, details: { ...details, [k]: v } });
    else onChange({ ...data, [k]: v });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Direct Contact Channels & Hotlines">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Primary Hotline Phone"
            value={details.phone ?? ''}
            onChange={(v) => set('phone', v)}
            mono
          />
          <TextInput
            label="Secondary Hotline Phone"
            value={details.phone2 ?? ''}
            onChange={(v) => set('phone2', v)}
            mono
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Sales Inquiries Email"
            value={details.salesEmail ?? ''}
            onChange={(v) => set('salesEmail', v)}
            mono
          />
          <TextInput
            label="General Support Email"
            value={details.email ?? ''}
            onChange={(v) => set('email', v)}
            mono
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="WhatsApp Direct Hotline (Digits Only)"
            value={details.whatsapp ?? ''}
            onChange={(v) => set('whatsapp', v)}
            mono
          />
          <TextInput
            label="Operating Hours"
            value={details.hours ?? ''}
            onChange={(v) => set('hours', v)}
          />
        </div>

        <TextareaInput
          label="Corporate Office & Plant Address"
          value={details.address ?? ''}
          onChange={(v) => set('address', v)}
          rows={2}
        />

        <TextInput
          label="Google Maps Embed URL"
          hint="iframe src from Google Maps Embed code"
          value={details.mapsUrl || ''}
          onChange={(v) => set('mapsUrl', v)}
          mono
        />
      </EditorSection>
    </div>
  );
}

export function ContactFaqsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const faqs: any[] = Array.isArray(data.faqs) ? data.faqs : Array.isArray(data) ? data : [];
  const updateFaqs = (next: any[]) => {
    if (data.faqs !== undefined) onChange({ ...data, faqs: next });
    else onChange({ ...data, faqs: next });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Frequently Asked Questions (FAQ Accordion)">
        <p className="text-xs text-gray-400 mb-2">
          Manage procurement and technical FAQs displayed on the contact page.
        </p>
        <Repeater
          label="FAQs"
          items={faqs}
          onChange={updateFaqs}
          newItem={{
            question: 'What is your typical turnaround time for sample rolls?',
            answer: 'We dispatch sample rolls of our standard specifications within 24 to 48 hours for immediate line trial evaluation.',
          }}
          getTitle={(item) => item.question || 'FAQ'}
          renderItem={(faq, _, update) => (
            <div className="space-y-2 pt-1">
              <TextInput
                label="Question"
                value={faq.question || ''}
                onChange={(v) => update({ ...faq, question: v })}
                placeholder="FAQ Question"
              />
              <TextareaInput
                label="Answer"
                value={faq.answer || ''}
                onChange={(v) => update({ ...faq, answer: v })}
                rows={3}
                placeholder="Comprehensive technical answer..."
              />
            </div>
          )}
        />
      </EditorSection>
    </div>
  );
}

export default function ContactPageMasterEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-6">
      <ContactHeaderEditor data={data} onChange={onChange} />
      <ContactChannelsEditor data={data} onChange={onChange} />
      <ContactFaqsEditor data={data} onChange={onChange} />
    </div>
  );
}
