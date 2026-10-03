'use client';

import { EditorSection, TextInput, TextareaInput, ToggleSwitch, UrlInput } from './shared';

export function GlobalTickerEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const ticker = data.ticker || data || {};
  const set = (k: string, v: any) => {
    if (data.ticker !== undefined) onChange({ ...data, ticker: { ...ticker, [k]: v } });
    else onChange({ ...data, [k]: v });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Top Announcement Ticker">
        <ToggleSwitch
          label="Enable Top Announcement Ticker"
          hint="Shows high-priority banner at the very top of all pages"
          value={ticker.enabled !== false}
          onChange={(v) => set('enabled', v)}
        />
        <TextInput
          label="Business Hours"
          hint="Short operating-hours message displayed on the right"
          value={ticker.text ?? ''}
          onChange={(v) => set('text', v)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TextInput
            label="Primary Phone"
            value={ticker.phone ?? ''}
            onChange={(v) => set('phone', v)}
            mono
          />
          <TextInput
            label="Secondary Phone"
            value={ticker.phone2 ?? ''}
            onChange={(v) => set('phone2', v)}
            mono
          />
          <TextInput
            label="Contact Email"
            value={ticker.email ?? ''}
            onChange={(v) => set('email', v)}
            mono
          />
        </div>
      </EditorSection>
    </div>
  );
}

export function GlobalFooterEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const footer = data.footer || data || {};
  const set = (k: string, v: any) => {
    if (data.footer !== undefined) onChange({ ...data, footer: { ...footer, [k]: v } });
    else onChange({ ...data, [k]: v });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Company Profile & Legal Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Brand Name"
            value={footer.name ?? ''}
            onChange={(v) => set('name', v)}
          />
          <TextInput
            label="Registered Legal Entity Name"
            value={footer.legalName ?? ''}
            onChange={(v) => set('legalName', v)}
          />
        </div>

        <TextareaInput
          label="Footer Company Mission Description"
          hint="Displayed in Column 1 under the Winner Pack logo"
          value={footer.description || ''}
          onChange={(v) => set('description', v)}
          rows={3}
        />

        <TextareaInput
          label="Registered Factory & Office Address"
          value={footer.address || ''}
          onChange={(v) => set('address', v)}
          rows={2}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TextInput
            label="Primary Phone"
            value={footer.phone ?? ''}
            onChange={(v) => set('phone', v)}
            mono
          />
          <TextInput
            label="Secondary Phone"
            value={footer.phone2 ?? ''}
            onChange={(v) => set('phone2', v)}
            mono
          />
          <TextInput
            label="Official Contact Email"
            value={footer.email ?? ''}
            onChange={(v) => set('email', v)}
            mono
          />
        </div>
      </EditorSection>

      <EditorSection title="Social Media Channels & Handles">
        <div className="space-y-2">
          <UrlInput
            label="LinkedIn Company Page URL"
            value={footer.linkedin || ''}
            onChange={(v) => set('linkedin', v)}
          />
          <UrlInput
            label="Instagram Profile URL"
            value={footer.instagram || ''}
            onChange={(v) => set('instagram', v)}
          />
          <UrlInput
            label="Facebook Profile URL"
            value={footer.facebook || ''}
            onChange={(v) => set('facebook', v)}
          />
          <TextInput
            label="WhatsApp Official Number (Digits only)"
            value={footer.whatsapp ?? ''}
            onChange={(v) => set('whatsapp', v)}
            mono
          />
        </div>
      </EditorSection>
    </div>
  );
}

export function GlobalFloatingEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  const floating = data.floating || data || {};
  const set = (k: string, v: any) => {
    if (data.floating !== undefined) onChange({ ...data, floating: { ...floating, [k]: v } });
    else onChange({ ...data, [k]: v });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Floating Action Buttons">
        <p className="text-[11px] text-gray-500 -mt-1 mb-2">
          Configure the four actions shown in the expandable floating menu.
        </p>
        <UrlInput
          label="LinkedIn Profile URL"
          value={floating.linkedin ?? ''}
          onChange={(v) => set('linkedin', v)}
        />
        <UrlInput
          label="Facebook Page URL"
          value={floating.facebook ?? ''}
          onChange={(v) => set('facebook', v)}
        />
        <UrlInput
          label="Instagram Profile URL"
          value={floating.instagram ?? ''}
          onChange={(v) => set('instagram', v)}
        />
        <ToggleSwitch
          label="Show WhatsApp Floating Widget"
          value={floating.showWhatsApp !== false}
          onChange={(v) => set('showWhatsApp', v)}
        />
        <TextInput
          label="WhatsApp Phone Number"
          hint="International format without + or spaces (e.g. 918595072187)"
          value={floating.whatsapp ?? floating.whatsappNumber ?? ''}
          onChange={(v) => set('whatsapp', v)}
          mono
        />
        <TextareaInput
          label="Prefilled WhatsApp Greeting Message"
          hint="Initial message that opens when a client clicks the WhatsApp button"
          value={floating.prompt ?? floating.whatsappPrompt ?? ''}
          onChange={(v) => set('prompt', v)}
          rows={2}
        />
      </EditorSection>
    </div>
  );
}

export default function GlobalMasterEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-6">
      <GlobalTickerEditor data={data} onChange={onChange} />
      <GlobalFooterEditor data={data} onChange={onChange} />
      <GlobalFloatingEditor data={data} onChange={onChange} />
    </div>
  );
}
