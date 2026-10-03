'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Save,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Monitor,
  Smartphone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { invalidateContent } from '@/lib/content-cache';
import type { ContentSection } from '@/lib/admin/sections';
import SectionLivePreview, { type PreviewViewport } from './SectionLivePreview';

// Dedicated Component Editors
import HeroEditor from '@/app/admin/studio/editors/HeroEditor';
import AboutEditor from '@/app/admin/studio/editors/AboutEditor';
import CategoriesEditor from '@/app/admin/studio/editors/CategoriesEditor';
import IndustriesEditor from '@/app/admin/studio/editors/IndustriesEditor';
import WhyChooseUsEditor from '@/app/admin/studio/editors/WhyChooseUsEditor';
import ApplicationsEditor from '@/app/admin/studio/editors/ApplicationsEditor';
import PartnersEditor from '@/app/admin/studio/editors/PartnersEditor';
import SolutionsEditor from '@/app/admin/studio/editors/SolutionsEditor';
import CertificationsEditor from '@/app/admin/studio/editors/CertificationsEditor';
import InquiryEditor from '@/app/admin/studio/editors/InquiryEditor';
import AboutPageMasterEditor from '@/app/admin/studio/editors/AboutPageEditor';
import ContactPageMasterEditor from '@/app/admin/studio/editors/ContactEditor';
import GlobalMasterEditor, { GlobalFooterEditor } from '@/app/admin/studio/editors/GlobalEditor';
import { GalleryHeroEditor, GalleryItemsEditor } from '@/app/admin/studio/editors/MiscEditors';

export function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const unload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    const click = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a');
      if (anchor && anchor.target !== '_blank' && anchor.href !== window.location.href && !window.confirm('Leave this page and discard unpublished changes?')) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener('beforeunload', unload);
    document.addEventListener('click', click, true);
    return () => {
      window.removeEventListener('beforeunload', unload);
      document.removeEventListener('click', click, true);
    };
  }, [dirty]);
}

function GalleryMasterEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
  return (
    <div className="space-y-6">
      <GalleryHeroEditor data={data.mainHero || {}} onChange={(hero) => onChange({ ...data, mainHero: hero })} />
      <GalleryItemsEditor data={data} onChange={onChange} />
    </div>
  );
}

export default function ContentEditor({ section }: { section: ContentSection }) {
  const [data, setData] = useState<Record<string, any>>(section.defaults);
  const [original, setOriginal] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [viewport, setViewport] = useState<PreviewViewport>('desktop');

  const dirty = loaded && JSON.stringify(data) !== original;
  useUnsavedWarning(dirty);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch(`/api/content?key=${encodeURIComponent(section.key)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Could not load this section data.');
      const json = await res.json();
      const content = json?.data ?? json;

      let next: Record<string, any> = { ...section.defaults };
      if (content && typeof content === 'object') {
        if (section.id === 'about' && content.about) {
          next = { about: { ...section.defaults.about, ...content.about } };
        } else if (section.id === 'why' && Array.isArray(content.usps)) {
          next = { usps: content.usps };
        } else if (section.id === 'solutions' && Array.isArray(content.solutionsData)) {
          next = { solutionsData: content.solutionsData };
        } else if (section.id === 'inquiry' && content.inquiryContact) {
          next = { inquiryContact: { ...section.defaults.inquiryContact, ...content.inquiryContact } };
        } else {
          next = { ...section.defaults, ...content };
        }
      }

      setData(next);
      setOriginal(JSON.stringify(next));
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load section data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [section.id, section.key]);

  async function save() {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      let payload = data;
      // If saving homepage sub-key, merge appropriately or save section root
      const res = await apiFetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: section.key, data: payload }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Could not publish changes.');
      }

      invalidateContent(section.key);
      setOriginal(JSON.stringify(data));
      setMessage(`"${section.title}" changes published live to website!`);
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not publish changes.');
    } finally {
      setSaving(false);
    }
  }

  const handleResetToDefaults = () => {
    if (window.confirm(`Reset "${section.title}" to factory defaults? Any unpublished edits will be replaced.`)) {
      setData(section.defaults);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Discard all unsaved edits?')) {
      setData(JSON.parse(original));
      setMessage('');
    }
  };

  // Render the tailored component editor
  const renderEditorComponent = () => {
    switch (section.id) {
      case 'hero':
        return <HeroEditor data={data} onChange={setData} />;
      case 'about':
        return <AboutEditor data={data} onChange={setData} />;
      case 'products':
        return <CategoriesEditor data={data} onChange={setData} />;
      case 'industries':
        return <IndustriesEditor data={data} onChange={setData} />;
      case 'why':
        return <WhyChooseUsEditor data={data} onChange={setData} />;
      case 'applications':
        return <ApplicationsEditor data={data} onChange={setData} />;
      case 'partners':
        return <PartnersEditor data={data} onChange={setData} />;
      case 'solutions':
        return <SolutionsEditor data={data} onChange={setData} />;
      case 'certifications':
        return <CertificationsEditor data={data} onChange={setData} />;
      case 'inquiry':
        return <InquiryEditor data={data} onChange={setData} />;
      case 'about-us':
        return <AboutPageMasterEditor data={data} onChange={setData} />;
      case 'contact':
        return <ContactPageMasterEditor data={data} onChange={setData} />;
      case 'gallery':
        return <GalleryMasterEditor data={data} onChange={setData} />;
      case 'footer':
        return <GlobalFooterEditor data={data} onChange={setData} />;
      case 'global':
        return <GlobalMasterEditor data={data} onChange={setData} />;
      default:
        return <HeroEditor data={data} onChange={setData} />;
    }
  };

  return (
    <div className="pb-24">
      {/* ─── BREADCRUMBS & TOP NAV ─── */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link href="/admin/website" className="admin-row-link text-xs font-semibold text-[#fe8220] hover:underline flex items-center gap-1.5">
          <ArrowLeft size={14} /> Back to All Website Pages & Sections
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={section.preview}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
          >
            <ExternalLink size={13} /> View on Website
          </a>
        </div>
      </div>

      {/* ─── PAGE HEADING & ACTIONS ─── */}
      <div className="admin-page-heading mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/90 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-300 font-mono">
              <Sparkles size={11} className="text-[#fe8220]" />
              Dedicated Component Editor
            </span>
            <span className={`admin-badge ${dirty ? 'orange' : 'gray'}`}>
              {dirty ? 'Unsaved edits' : 'Synced with live site'}
            </span>
          </div>
          <h1 className="admin-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {section.title}
          </h1>
          <p className="admin-description text-sm text-slate-600 mt-1 max-w-3xl">
            {section.description}
          </p>
        </div>

        {/* Viewport & Preview Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              viewport === 'desktop' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Desktop Browser View (1440px)"
          >
            <Monitor size={14} /> <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              viewport === 'mobile' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Mobile iPhone View (393px)"
          >
            <Smartphone size={14} /> <span>Mobile</span>
          </button>
          <div className="w-px h-4 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => setShowPreview((p) => !p)}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
              showPreview ? 'bg-amber-100/70 text-amber-900 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
            <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
        </div>
      </div>

      {/* ─── NOTICES ─── */}
      {error && (
        <div role="alert" className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <div className="flex-1">{error}</div>
          {!loaded && (
            <button onClick={load} className="underline text-xs font-bold font-mono">
              Retry
            </button>
          )}
        </div>
      )}
      {message && (
        <div role="status" className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span className="font-medium">{message}</span>
        </div>
      )}

      {/* ─── LOADING STATE ─── */}
      {loading ? (
        <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#fe8220] border-t-transparent mx-auto mb-3" />
          <p className="text-xs font-mono text-slate-500">Loading {section.title} component data from database…</p>
        </div>
      ) : loaded && (
        <div className="space-y-8">
          {/* Main Grid: Left Editor Controls, Right Live Preview */}
          <div className={`grid gap-8 items-start ${showPreview ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
            {/* Left: Dedicated Component Editor (Inside Dark Studio Container Theme for Maximum Contrast) */}
            <div className={showPreview ? 'lg:col-span-6 xl:col-span-5' : 'max-w-4xl mx-auto w-full'}>
              <div className="rounded-2xl bg-[#140e33] border border-white/10 shadow-xl overflow-hidden p-5 sm:p-7 text-white">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#fe8220]" />
                    <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                      Edit Controls & Content
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetToDefaults}
                    className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 transition"
                    title="Reset this component to factory defaults"
                  >
                    <RotateCcw size={12} /> Reset Defaults
                  </button>
                </div>

                {renderEditorComponent()}
              </div>
            </div>

            {/* Right: Live Real-time Component Preview */}
            {showPreview && (
              <div className="lg:col-span-6 xl:col-span-7 sticky top-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <strong className="text-xs font-bold text-slate-800 tracking-tight font-mono uppercase">
                        Live Component Canvas Preview
                      </strong>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Viewport: <strong className="text-slate-700 capitalize">{viewport}</strong>
                    </span>
                  </div>

                  {/* Section Render Preview */}
                  <div className="overflow-x-auto rounded-xl bg-white border border-slate-200/90 p-2 sm:p-4">
                    <SectionLivePreview
                      sectionId={section.id}
                      data={data}
                      viewport={viewport}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── STICKY BOTTOM SAVEBAR ─── */}
      <div className="admin-savebar shadow-2xl">
        <div className="flex items-center gap-3">
          <span className={`h-2.5 w-2.5 rounded-full ${dirty ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
          <span className="text-xs sm:text-sm font-medium text-slate-700">
            {dirty
              ? 'You have unpublished changes on this component.'
              : 'All component data is up to date and live.'}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="admin-button"
            disabled={!dirty || saving}
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            type="button"
            className="admin-button primary flex items-center gap-2"
            disabled={!dirty || saving}
            onClick={save}
          >
            <Save size={15} />
            {saving ? 'Publishing Changes…' : 'Publish Changes Live'}
          </button>
        </div>
      </div>
    </div>
  );
}
