'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  ExternalLink,
  PanelsTopLeft,
  RotateCcw,
  Save,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import {
  defaultLayout,
  findSection,
  homepageSections,
  normalizeLayout,
  type SectionVisibility,
} from '@/lib/admin/sections';
import { invalidateContent } from '@/lib/content-cache';
import { useUnsavedWarning } from '@/components/admin/ContentEditor';

export default function WebsiteSettings() {
  const [layout, setLayout] = useState<SectionVisibility[]>(defaultLayout);
  const [original, setOriginal] = useState('');
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const dirty = ready && JSON.stringify(layout) !== original;
  const visibleCount = layout.filter((item) => item.visible).length;
  useUnsavedWarning(dirty);

  async function load() {
    setError('');
    try {
      const response = await apiFetch('/api/content?key=site_layout', { cache: 'no-store' });
      if (response.status === 404) {
        const next = defaultLayout.map((item) => ({ ...item }));
        setLayout(next);
        setOriginal(JSON.stringify(next));
        setReady(true);
        return;
      }
      if (!response.ok) throw new Error('Could not load website settings.');
      const data = await response.json();
      const next = normalizeLayout(data.sections);
      setLayout(next);
      setOriginal(JSON.stringify(next));
      setReady(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not connect to the website service.');
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function toggle(id: string) {
    setLayout((current) =>
      current.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)),
    );
    setMessage('');
  }

  function restoreDefaults() {
    setLayout(defaultLayout);
    setMessage('');
  }

  async function save() {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const response = await apiFetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'site_layout', data: { sections: layout } }),
      });
      if (!response.ok) throw new Error('Could not publish website settings.');
      invalidateContent('site_layout');
      setOriginal(JSON.stringify(layout));
      setMessage('Website visibility settings published.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not publish the changes.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-v3-settings">
      <section className="admin-v3-settings-head">
        <div>
          <p className="admin-v3-kicker">Homepage configuration</p>
          <h2>Section visibility</h2>
          <p>Choose which homepage sections are visible. Content is preserved when a section is hidden.</p>
        </div>
        <div className="admin-v3-settings-actions">
          <Link href="/admin/studio/home" className="admin-button">
            <PanelsTopLeft size={14} /> Edit homepage content
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="admin-button">
            <ExternalLink size={14} /> Preview
          </a>
        </div>
      </section>

      {error && (
        <div className="admin-v3-alert" role="alert">
          <span>{error}</span>
          {!ready && <button type="button" onClick={() => void load()}>Try again</button>}
        </div>
      )}
      {message && (
        <div className="admin-v3-success" role="status">
          <CheckCircle2 size={16} /> {message}
        </div>
      )}

      <section className="admin-v3-settings-card">
        <header>
          <div>
            <h3>Homepage sections</h3>
            <p>{ready ? `${visibleCount} of ${layout.length} sections visible` : 'Loading settings…'}</p>
          </div>
          <span className="admin-v3-visibility-summary">
            <Eye size={14} /> {visibleCount} visible
          </span>
        </header>

        <div className="admin-v3-settings-list">
          {homepageSections.map((item, index) => {
            const enabled = layout.find((entry) => entry.id === item.id)?.visible !== false;
            const section = findSection(item.id);
            return (
              <div className="admin-v3-setting-row" key={item.id}>
                <span className="admin-v3-setting-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="admin-v3-setting-copy">
                  <strong>{item.title}</strong>
                  <span>{section?.description || 'Homepage content section'}</span>
                </div>
                <Link href={`/admin/studio/home?section=${item.id}`} className="admin-v3-setting-edit">
                  Edit content
                </Link>
                <button
                  type="button"
                  className={`admin-v3-toggle ${enabled ? 'is-on' : ''}`}
                  onClick={() => toggle(item.id)}
                  disabled={!ready}
                  aria-pressed={enabled}
                  aria-label={`${enabled ? 'Hide' : 'Show'} ${item.title}`}
                >
                  <span>{enabled ? <Eye size={13} /> : <EyeOff size={13} />}</span>
                  {enabled ? 'Visible' : 'Hidden'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className="admin-v3-savebar">
        <div>
          <strong>{dirty ? 'You have unpublished changes' : 'All changes are published'}</strong>
          <span>Visibility updates take effect on the live homepage after publishing.</span>
        </div>
        <div>
          <button type="button" className="admin-button" onClick={restoreDefaults} disabled={!ready || saving}>
            <RotateCcw size={14} /> Show all
          </button>
          <button type="button" className="admin-primary-button" onClick={() => void save()} disabled={!ready || saving || !dirty}>
            <Save size={14} /> {saving ? 'Publishing…' : 'Publish changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
