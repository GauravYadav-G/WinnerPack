'use client';

import { useState, useRef } from 'react';
import { Upload, Trash2, Plus, ArrowUp, ArrowDown, Eye, EyeOff, Link2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-1">
      <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-widest">{label}</label>
      {hint && <p className="text-[10px] text-gray-500 mt-0.5">{hint}</p>}
    </div>
  );
}

export function EditorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#fe8220] font-mono shrink-0">{title}</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function TextInput({ label, hint, value, onChange, placeholder, mono }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean;
}) {
  return (
    <div>
      <FieldLabel label={label} hint={hint} />
      <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`studio-input ${mono ? 'font-mono text-xs' : ''}`} />
    </div>
  );
}

export function TextareaInput({ label, hint, value, onChange, rows = 3, placeholder }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} hint={hint} />
      <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className="studio-textarea" />
    </div>
  );
}

export function ToggleSwitch({ label, hint, value, onChange }: {
  label: string; hint?: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 border border-white/10">
      <div>
        <p className="text-xs font-semibold text-gray-200">{label}</p>
        {hint && <p className="text-[10px] text-gray-500">{hint}</p>}
      </div>
      <button type="button" role="switch" aria-checked={value} onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-[#fe8220]' : 'bg-white/20'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

export function UrlInput({ label, hint, value, onChange }: {
  label: string; hint?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} hint={hint} />
      <div className="flex items-center gap-1.5">
        <Link2 className="w-3.5 h-3.5 text-gray-500 shrink-0" />
        <input type="url" value={value ?? ''} onChange={(e) => onChange(e.target.value)}
          className="studio-input flex-1 !font-mono !text-xs" placeholder="https://..." />
      </div>
    </div>
  );
}

export function ImageUpload({ label, hint, value, onChange }: {
  label: string; hint?: string; value: string; onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await apiFetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (res.ok && json.url) onChange(json.url);
      else alert(json.error || 'Upload failed');
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <FieldLabel label={label} hint={hint} />
        {value && (
          <button type="button" onClick={() => setShowPreview((p) => !p)} className="text-[10px] text-gray-500 hover:text-white flex items-center gap-1">
            {showPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showPreview ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {value && showPreview && (
        <div className="relative mb-2 rounded-lg overflow-hidden border border-white/10 aspect-video bg-black/30">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 p-1 bg-red-600/80 hover:bg-red-600 rounded text-white" title="Remove">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
      <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)}
        placeholder="Paste image URL or upload…" className="studio-input mb-1.5 !font-mono !text-xs" />
      <button type="button" disabled={uploading} onClick={() => fileRef.current?.click()}
        className="studio-btn secondary !py-1.5 !px-3 !text-xs w-full">
        <Upload className="w-3.5 h-3.5 mr-1" />
        {uploading ? 'Uploading…' : 'Upload from Computer'}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
    </div>
  );
}

export function Repeater<T extends Record<string, any>>({
  label, hint, items, onChange, newItem, renderItem, getTitle,
}: {
  label: string; hint?: string; items: T[]; onChange: (items: T[]) => void;
  newItem: T | (() => T);
  renderItem: (item: T, index: number, update: (updated: T) => void) => React.ReactNode;
  getTitle?: (item: T, index: number) => string;
}) {
  const move = (from: number, to: number) => {
    const next = [...items];
    [next[from], next[to]] = [next[to], next[from]];
    onChange(next);
  };
  const remove = (index: number) => { if (confirm('Remove this item?')) onChange(items.filter((_, i) => i !== index)); };
  const add = () => { const item = typeof newItem === 'function' ? (newItem as () => T)() : { ...newItem }; onChange([...items, item]); };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FieldLabel label={`${label} (${items.length})`} hint={hint} />
        <button type="button" onClick={add} className="studio-mini-btn flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="studio-repeater-item">
            <div className="studio-repeater-item-head">
              <strong className="text-xs text-gray-200 truncate max-w-[180px]">
                #{idx + 1} · {getTitle ? getTitle(item, idx) : (item?.title || item?.name || item?.label || `Item ${idx + 1}`)}
              </strong>
              <div className="studio-repeater-actions">
                <button type="button" className="studio-mini-btn" disabled={idx === 0} onClick={() => move(idx, idx - 1)}><ArrowUp className="w-3 h-3" /></button>
                <button type="button" className="studio-mini-btn" disabled={idx === items.length - 1} onClick={() => move(idx, idx + 1)}><ArrowDown className="w-3 h-3" /></button>
                <button type="button" className="studio-mini-btn danger" onClick={() => remove(idx)}><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
            {renderItem(item, idx, (updated) => {
              const next = [...items];
              next[idx] = updated;
              onChange(next);
            })}
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-xs border border-dashed border-white/10 rounded-lg">
            No items yet. Click "+ Add" to begin.
          </div>
        )}
      </div>
    </div>
  );
}

export function StringList({ label, hint, items, onChange, placeholder }: {
  label: string; hint?: string; items: string[]; onChange: (items: string[]) => void; placeholder?: string;
}) {
  return (
    <Repeater
      label={label} hint={hint}
      items={items.map((s) => ({ value: s }))}
      onChange={(objs) => onChange(objs.map((o) => o.value))}
      newItem={{ value: '' }}
      getTitle={(item) => item.value || 'New item'}
      renderItem={(item, _, update) => (
        <input type="text" value={item.value} onChange={(e) => update({ value: e.target.value })}
          placeholder={placeholder} className="studio-input" />
      )}
    />
  );
}

export function SpecsTable({ label, hint, specs, onChange }: {
  label: string; hint?: string; specs: Record<string, string>; onChange: (specs: Record<string, string>) => void;
}) {
  const entries = Object.entries(specs);
  const updateKey = (oldKey: string, newKey: string) => {
    const next: Record<string, string> = {};
    for (const [k, v] of entries) next[k === oldKey ? newKey : k] = v;
    onChange(next);
  };
  const updateVal = (key: string, val: string) => onChange({ ...specs, [key]: val });
  const addRow = () => onChange({ ...specs, 'New Property': '' });
  const removeRow = (key: string) => { const next = { ...specs }; delete next[key]; onChange(next); };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FieldLabel label={label} hint={hint} />
        <button type="button" onClick={addRow} className="studio-mini-btn flex items-center gap-1"><Plus className="w-3 h-3" /> Add Row</button>
      </div>
      <div className="rounded-lg overflow-hidden border border-white/10">
        {entries.map(([key, val], idx) => (
          <div key={idx} className={`flex items-center gap-2 px-3 py-2 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}>
            <input type="text" value={key} onChange={(e) => updateKey(key, e.target.value)}
              className="studio-input !py-1 !text-xs w-[38%] shrink-0 font-semibold text-gray-300" />
            <input type="text" value={String(val ?? '')} onChange={(e) => updateVal(key, e.target.value)}
              className="studio-input !py-1 !text-xs flex-1" />
            <button type="button" onClick={() => removeRow(key)} className="shrink-0 p-1 text-red-400 hover:text-red-300">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {entries.length === 0 && <p className="text-xs text-gray-500 text-center py-4">No rows. Click + Add Row.</p>}
      </div>
    </div>
  );
}
