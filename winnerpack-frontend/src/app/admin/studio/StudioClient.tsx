'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  RotateCcw, ChevronLeft, ChevronRight,
  Layers, Sparkles, CheckCircle2, AlertCircle, Info, ArrowLeft, ExternalLink, Save,
  Home, Building2, PhoneCall, Images, Globe, ChevronDown, Hash, Monitor,
  Smartphone, Eye, Focus, ZoomIn, ZoomOut, Maximize2, Minimize2,
  Undo2, Redo2, PanelRightClose, PanelRightOpen,
} from 'lucide-react';
import { STUDIO_PAGES, type StudioPageDef, type ViewportMode } from '@/lib/admin/studio-registry';
import {
  defaultAboutUs, defaultContactPage, defaultFooter, defaultGallery, defaultGlobal, defaultCertifications,
} from '@/lib/site-defaults';
import EditorPanel from './editors/index';
import StudioPreviewCanvas from './StudioPreviewCanvas';
import { apiFetch } from '@/lib/api';
import { invalidateContent } from '@/lib/content-cache';
import './studio.css';

interface StudioClientProps { initialPageId?: string; }

const PAGE_ICONS: Record<string, React.ComponentType<any>> = {
  home: Home, 'about-us': Building2, contact: PhoneCall, gallery: Images,
  global: Globe,
};

export default function StudioClient({ initialPageId = 'home' }: StudioClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');

  const [selectedPageId, setSelectedPageId] = useState<string>(initialPageId);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadRevision, setReloadRevision] = useState(0);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [previewMode, setPreviewMode] = useState<'focus' | 'full'>('focus');
  const [zoom, setZoom] = useState(0.78);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [editorCollapsed, setEditorCollapsed] = useState(false);
  const historyRef = useRef<{ past: Record<string, any>[]; future: Record<string, any>[] }>({ past: [], future: [] });
  const [, setHistoryRevision] = useState(0);

  useEffect(() => {
    if (initialPageId && initialPageId !== selectedPageId) setSelectedPageId(initialPageId);
  }, [initialPageId, selectedPageId]);

  const activePage: StudioPageDef = useMemo(
    () => STUDIO_PAGES.find((p) => p.id === selectedPageId) || STUDIO_PAGES[0],
    [selectedPageId]
  );

  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    if (sectionParam && activePage.sections.some((s) => s.id === sectionParam)) {
      return sectionParam;
    }
    return activePage.sections[0].id;
  });

  useEffect(() => {
    if (sectionParam && activePage.sections.some((s) => s.id === sectionParam)) {
      setActiveSectionId(sectionParam);
    } else {
      setActiveSectionId(activePage.sections[0].id);
    }
  }, [selectedPageId, activePage, sectionParam]);

  const [pageData, setPageData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    activePage.sections.forEach((sec) => { initial[sec.id] = sec.defaults; });
    return initial;
  });

  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Keep unpublished work recoverable if the tab closes or the connection drops.
  useEffect(() => {
    if (!isDirty || isLoading) return;
    const timeout = window.setTimeout(() => {
      try {
        localStorage.setItem(
          `wp_studio_draft_${selectedPageId}`,
          JSON.stringify({ data: pageData, savedAt: new Date().toISOString() }),
        );
      } catch {
        /* local draft storage is a safety net, not a publishing dependency */
      }
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [isDirty, isLoading, pageData, selectedPageId]);

  useEffect(() => {
    if (!isDirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [isDirty]);

  // ── LOAD LIVE CONTENT FROM DATABASE ──────────────────────────────────────────
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setLoadError(null);

    const initial: Record<string, any> = {};
    activePage.sections.forEach((sec) => { initial[sec.id] = sec.defaults; });

    async function fetchLiveData() {
      try {
        const loaded: Record<string, any> = { ...initial };
        const readJson = async (url: string) => {
          const response = await apiFetch(url, { cache: 'no-store' });
          if (!response.ok) throw new Error(`Live content request failed (${response.status}).`);
          return response.json();
        };

        if (selectedPageId === 'home') {
          const [hpData, indData, appData, partData, certData, categoryData] = await Promise.all([
            readJson('/api/content?key=homepage'),
            readJson('/api/content?key=industries'),
            readJson('/api/content?key=applications'),
            readJson('/api/content?key=partners_materials_certs'),
            readJson('/api/content?key=certifications'),
            readJson('/api/categories'),
          ]);

          // 1. Hero
          loaded['hero'] = {
            slides: Array.isArray(hpData.slides) ? hpData.slides : initial['hero'].slides,
            rightBanner: hpData.rightBanner ?? initial['hero'].rightBanner,
          };
          // 2. About Strip
          loaded['about'] = {
            about: hpData.about ?? initial['about'].about,
          };
          // 3. Product Categories Grid Header
          const categoriesHeader = hpData.categoriesHeader ?? {};
          loaded['categories'] = {
            categoriesHeader,
            eyebrow: categoriesHeader.tag ?? initial['categories'].eyebrow ?? '',
            title: categoriesHeader.title ?? initial['categories'].title ?? '',
            description: categoriesHeader.description ?? initial['categories'].description ?? '',
            cards: Array.isArray(categoryData) ? categoryData : [],
          };
          // 4. Industries
          loaded['industries'] = {
            eyebrow: indData.eyebrow ?? initial['industries'].eyebrow ?? '',
            title: indData.title ?? initial['industries'].title ?? '',
            industries: Array.isArray(indData.industries) ? indData.industries : initial['industries'].industries,
          };
          // 5. Why Choose Us (USPs)
          loaded['why'] = {
            eyebrow: hpData.whyHeader?.eyebrow ?? initial['why'].eyebrow ?? '',
            title: hpData.whyHeader?.title ?? initial['why'].title ?? '',
            usps: Array.isArray(hpData.usps) ? hpData.usps : initial['why'].usps,
          };
          // 6. Real-World Applications
          loaded['applications'] = {
            eyebrow: appData.eyebrow ?? initial['applications'].eyebrow ?? '',
            title: appData.title ?? initial['applications'].title ?? '',
            slides: Array.isArray(appData.slides) ? appData.slides : initial['applications'].slides,
          };
          // 7. Partners
          loaded['partners'] = {
            partnerHeader: partData.partnerHeader ?? initial['partners'].partnerHeader,
            partners: Array.isArray(partData.partners) ? partData.partners : initial['partners'].partners,
          };
          // 8. Engineered Solutions (Journey)
          loaded['solutions'] = {
            eyebrow: hpData.solutionsHeader?.eyebrow ?? initial['solutions'].eyebrow ?? '',
            title: hpData.solutionsHeader?.title ?? initial['solutions'].title ?? '',
            solutionsData: Array.isArray(hpData.solutionsData) ? hpData.solutionsData : initial['solutions'].solutionsData,
          };
          // 9. Certifications
          loaded['certifications'] = {
            eyebrow: certData.eyebrow ?? initial['certifications'].eyebrow ?? '',
            title: certData.title ?? initial['certifications'].title ?? '',
            certifications: Array.isArray(certData.certifications) ? certData.certifications : initial['certifications'].certifications,
          };
          // 10. Inquiry
          loaded['inquiry'] = {
            ...initial['inquiry'],
            ...(hpData.inquiryContact ?? {}),
          };
        } else if (selectedPageId === 'about-us') {
          const data = await readJson('/api/content?key=about_us');

          loaded['about-header'] = data.header ?? initial['about-header'];
          loaded['about-who-we-are'] = data.whoWeAre ?? initial['about-who-we-are'];
          const rawMetrics = Array.isArray(data.metrics) ? data.metrics : Array.isArray(data['about-metrics']?.metrics) ? data['about-metrics'].metrics : initial['about-metrics'].metrics;
          loaded['about-metrics'] = { metrics: rawMetrics };
          loaded['about-guides'] = data.guides ?? initial['about-guides'];
          loaded['about-capabilities'] = data.capabilities ?? initial['about-capabilities'];
        } else if (selectedPageId === 'contact') {
          const data = await readJson('/api/content?key=contact_page');

          loaded['contact-header'] = data.header ?? initial['contact-header'];
          loaded['contact-channels'] = data.details ?? initial['contact-channels'];
          loaded['contact-faqs'] = { faqs: Array.isArray(data.faqs) ? data.faqs : initial['contact-faqs'].faqs };
        } else if (selectedPageId === 'gallery') {
          const data = await readJson('/api/content?key=gallery');

          loaded['gallery-hero'] = data.mainHero ?? initial['gallery-hero'];
          loaded['gallery-items'] = {
            portraits: Array.isArray(data.portraits) ? data.portraits : initial['gallery-items'].portraits,
            landscapes: Array.isArray(data.landscapes) ? data.landscapes : initial['gallery-items'].landscapes,
          };
        } else if (selectedPageId === 'global') {
          const [dataGlobal, dataFooter] = await Promise.all([
            readJson('/api/content?key=global'),
            readJson('/api/content?key=footer'),
          ]);

          loaded['global-ticker'] = dataGlobal.ticker ?? initial['global-ticker'];
          loaded['global-footer'] = dataFooter ?? dataGlobal.footer ?? initial['global-footer'];
          loaded['global-floating'] = {
            ...initial['global-floating'],
            ...(dataGlobal.floating ?? {}),
          };
        } else {
          const data = await readJson(`/api/content?key=page_${selectedPageId}`);
          Object.assign(loaded, data);
        }

        if (active) {
          let nextData = loaded;
          let recoveredDraft = false;
          try {
            const rawDraft = localStorage.getItem(`wp_studio_draft_${selectedPageId}`);
            const parsedDraft = rawDraft ? JSON.parse(rawDraft) : null;
            if (parsedDraft?.data && typeof parsedDraft.data === 'object') {
              nextData = parsedDraft.data;
              recoveredDraft = true;
            }
          } catch {
            /* ignore an invalid or unavailable local draft */
          }

          setPageData(nextData);
          setIsDirty(recoveredDraft);
          if (recoveredDraft) {
            setStatusMessage({ text: 'Recovered an unpublished draft from this browser.', type: 'info' });
            window.setTimeout(() => setStatusMessage(null), 4000);
          }
          historyRef.current = { past: [], future: [] };
          setHistoryRevision((value) => value + 1);
        }
      } catch (err) {
        console.error('Failed to load page content from server:', err);
        if (active) {
          const message = err instanceof Error ? err.message : 'Live content could not be loaded.';
          setPageData({});
          setLoadError(message);
          setIsDirty(false);
          setStatusMessage({ text: 'Live content could not be loaded. Editing is paused.', type: 'error' });
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void fetchLiveData();
    return () => { active = false; };
  }, [selectedPageId, activePage, reloadRevision]);

  const handleUpdateSectionData = useCallback((updatedSectionData: Record<string, any>) => {
    setPageData((prev) => {
      historyRef.current.past = [...historyRef.current.past.slice(-39), prev];
      historyRef.current.future = [];
      setHistoryRevision((value) => value + 1);
      return {
        ...prev,
        [activeSectionId]: updatedSectionData,
      };
    });
    setIsDirty(true);
  }, [activeSectionId]);

  const handleUndo = useCallback(() => {
    const previous = historyRef.current.past.at(-1);
    if (!previous) return;
    setPageData((current) => {
      historyRef.current.past = historyRef.current.past.slice(0, -1);
      historyRef.current.future = [current, ...historyRef.current.future.slice(0, 39)];
      return previous;
    });
    setIsDirty(true);
    setHistoryRevision((value) => value + 1);
  }, []);

  const handleRedo = useCallback(() => {
    const next = historyRef.current.future[0];
    if (!next) return;
    setPageData((current) => {
      historyRef.current.future = historyRef.current.future.slice(1);
      historyRef.current.past = [...historyRef.current.past.slice(-39), current];
      return next;
    });
    setIsDirty(true);
    setHistoryRevision((value) => value + 1);
  }, []);

  const handleResetSection = useCallback(() => {
    const secDef = activePage.sections.find((s) => s.id === activeSectionId);
    if (!secDef) return;
    if (confirm(`Reset "${secDef.title}" to factory defaults?`)) {
      handleUpdateSectionData(secDef.defaults);
    }
  }, [activePage.sections, activeSectionId, handleUpdateSectionData]);

  const handleResetEntirePage = () => {
    if (confirm(`Reset ALL components of "${activePage.title}" to factory defaults?`)) {
      const initial: Record<string, any> = {};
      activePage.sections.forEach((sec) => { initial[sec.id] = sec.defaults; });
      historyRef.current.past = [...historyRef.current.past.slice(-39), pageData];
      historyRef.current.future = [];
      setHistoryRevision((value) => value + 1);
      setPageData(initial);
      setIsDirty(true);
      setStatusMessage({ text: 'Page reset to factory defaults. Click Publish to save.', type: 'info' });
      setTimeout(() => setStatusMessage(null), 3500);
    }
  };

  const handlePageChange = useCallback((nextPageId: string) => {
    if (nextPageId === selectedPageId) return;
    if (typeof window !== 'undefined' && isDirty) {
      localStorage.setItem(
        `wp_studio_draft_${selectedPageId}`,
        JSON.stringify({ data: pageData, savedAt: new Date().toISOString() })
      );
    }
    setIsDirty(false);
    setSelectedPageId(nextPageId);
    router.push(`/admin/studio/${nextPageId}`, { scroll: false });
  }, [isDirty, pageData, router, selectedPageId]);

  const persistContents = useCallback(async (entries: Array<{ key: string; data: any }>) => {
    const response = await apiFetch('/api/content/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload?.databasePersisted !== true) {
      throw new Error(payload?.error || 'The page could not be published.');
    }
    return payload;
  }, []);

  const handlePublishLive = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      if (selectedPageId === 'home') {
        await persistContents([
          {
            key: 'homepage',
            data: {
              slides: pageData['hero']?.slides,
              rightBanner: pageData['hero']?.rightBanner,
              about: pageData['about']?.about,
              categoriesHeader: {
                tag: pageData['categories']?.eyebrow || pageData['categories']?.categoriesHeader?.tag,
                title: pageData['categories']?.title || pageData['categories']?.categoriesHeader?.title,
                description: pageData['categories']?.description || '',
              },
              whyHeader: {
                eyebrow: pageData['why']?.eyebrow,
                title: pageData['why']?.title,
              },
              usps: pageData['why']?.usps,
              solutionsHeader: {
                eyebrow: pageData['solutions']?.eyebrow,
                title: pageData['solutions']?.title,
              },
              solutionsData: pageData['solutions']?.solutionsData,
              inquiryContact: pageData['inquiry'],
            },
          },
          {
            key: 'industries',
            data: {
              eyebrow: pageData['industries']?.eyebrow,
              title: pageData['industries']?.title,
              industries: pageData['industries']?.industries,
            },
          },
          {
            key: 'applications',
            data: {
              eyebrow: pageData['applications']?.eyebrow,
              title: pageData['applications']?.title,
              slides: pageData['applications']?.slides,
            },
          },
          {
            key: 'partners_materials_certs',
            data: {
              partnerHeader: pageData['partners']?.partnerHeader,
              partners: pageData['partners']?.partners,
              certs: pageData['certifications']?.certifications || defaultCertifications,
            },
          },
          {
            key: 'certifications',
            data: {
              eyebrow: pageData['certifications']?.eyebrow || 'Government & Quality Compliance',
              title: pageData['certifications']?.title || 'Certified Standards You Can Trust',
              certifications: pageData['certifications']?.certifications,
            },
          },
        ]);

        invalidateContent('homepage');
        invalidateContent('industries');
        invalidateContent('applications');
        invalidateContent('partners_materials_certs');
        invalidateContent('certifications');
      } else if (selectedPageId === 'about-us') {
        const rawMetrics = Array.isArray(pageData['about-metrics']?.metrics)
          ? pageData['about-metrics'].metrics
          : Array.isArray(pageData['about-metrics'])
          ? pageData['about-metrics']
          : defaultAboutUs.metrics;

        const aboutUsPayload = {
          header: pageData['about-header'] || defaultAboutUs.header,
          whoWeAre: pageData['about-who-we-are'] || defaultAboutUs.whoWeAre,
          metrics: rawMetrics,
          guides: pageData['about-guides'] || defaultAboutUs.guides,
          capabilities: pageData['about-capabilities'] || defaultAboutUs.capabilities,
        };

        await persistContents([
          { key: 'about_us', data: aboutUsPayload },
          { key: 'page_about-us', data: aboutUsPayload },
        ]);

        invalidateContent('about_us');
        invalidateContent('page_about-us');
      } else if (selectedPageId === 'contact') {
        const contactPayload = {
          header: pageData['contact-header'] || defaultContactPage.header,
          details: pageData['contact-channels'] || defaultContactPage.details,
          faqs: pageData['contact-faqs']?.faqs || defaultContactPage.faqs,
        };

        await persistContents([
          { key: 'contact_page', data: contactPayload },
          { key: 'page_contact', data: contactPayload },
        ]);

        invalidateContent('contact_page');
        invalidateContent('page_contact');
      } else if (selectedPageId === 'gallery') {
        const galleryPayload = {
          mainHero: pageData['gallery-hero'] || defaultGallery.mainHero,
          portraits: pageData['gallery-items']?.portraits || defaultGallery.portraits,
          landscapes: pageData['gallery-items']?.landscapes || defaultGallery.landscapes,
        };

        await persistContents([
          { key: 'gallery', data: galleryPayload },
          { key: 'page_gallery', data: galleryPayload },
        ]);

        invalidateContent('gallery');
        invalidateContent('page_gallery');
      } else if (selectedPageId === 'global') {
        const globalPayload = {
          ticker: pageData['global-ticker'] || defaultGlobal.ticker,
          footer: pageData['global-footer'] || defaultFooter,
          floating: pageData['global-floating'] || defaultGlobal.floating,
        };

        await persistContents([
          { key: 'global', data: globalPayload },
          { key: 'footer', data: pageData['global-footer'] || defaultFooter },
        ]);

        invalidateContent('global');
        invalidateContent('footer');
      } else {
        await persistContents([{ key: `page_${selectedPageId}`, data: pageData }]);
        invalidateContent(`page_${selectedPageId}`);
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem(`wp_studio_draft_${selectedPageId}`);
      }

      setIsDirty(false);
      setStatusMessage({ text: 'Changes published to the live website.', type: 'success' });
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      console.error('Publishing failed:', err);
      setStatusMessage({ text: err?.message || 'Publishing failed. Check connection.', type: 'error' });
      setTimeout(() => setStatusMessage(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  const activeSection = useMemo(
    () => activePage.sections.find((s) => s.id === activeSectionId) || activePage.sections[0],
    [activePage.sections, activeSectionId]
  );

  return (
    <div className={`cms-root ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {/* ── TOPBAR ──────────────────────────────────────────────────────── */}
      <header className="cms-topbar">
        <div className="cms-topbar-left">
          <Link href="/admin" className="cms-back-btn" title="Back to admin overview">
            <ArrowLeft className="w-4 h-4" />
            <span>Admin</span>
          </Link>
          <div className="cms-topbar-divider" />
          <div className="cms-brand">
            <Sparkles className="w-4 h-4 text-[#fe8220]" />
            <span>Page Editor</span>
            <small>Live website content</small>
          </div>
          <div className="cms-topbar-divider" />
          <div className="cms-page-select-wrap">
            <span className="cms-page-select-label">Page:</span>
            <select
              value={selectedPageId}
              onChange={(e) => handlePageChange(e.target.value)}
              className="cms-page-select"
              aria-label="Select page"
            >
              {STUDIO_PAGES.map((page) => (
                <option key={page.id} value={page.id}>{page.title}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 cms-select-chevron" />
          </div>
        </div>

        <div className="cms-topbar-right">
          <div className="cms-history-actions" aria-label="Editing history">
            <button type="button" onClick={handleUndo} disabled={historyRef.current.past.length === 0} title="Undo last change">
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button type="button" onClick={handleRedo} disabled={historyRef.current.future.length === 0} title="Redo change">
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className={`cms-status-badge ${isDirty ? 'dirty' : 'clean'}`}>
            <span className="cms-status-dot" />
            {isDirty ? 'Unpublished changes' : 'Published'}
          </span>
          <a href={activePage.route} target="_blank" rel="noreferrer" className="cms-action-btn secondary">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">View page</span>
          </a>
          <button
            type="button"
            className="cms-action-btn ghost"
            onClick={() => setIsFullscreen((value) => !value)}
            title={isFullscreen ? 'Return to the admin shell' : 'Expand editor'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button type="button" className="cms-action-btn primary" onClick={handlePublishLive} disabled={saving || !isDirty || Boolean(loadError)}>
            <Save className="w-3.5 h-3.5" /><span>{saving ? 'Publishing…' : 'Publish'}</span>
          </button>
        </div>
      </header>

      {/* ── TOAST ───────────────────────────────────────────────────────── */}
      {statusMessage && (
        <div className={`cms-toast cms-toast-${statusMessage.type}`}>
          {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
          {statusMessage.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
          {statusMessage.type === 'info' && <Info className="w-4 h-4 shrink-0 text-sky-400" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* ── WORKSPACE ───────────────────────────────────────────────────── */}
      <div className="cms-workspace">
        {/* LEFT SIDEBAR */}
        <aside className={`cms-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="cms-sidebar-header">
            {!sidebarCollapsed && (
              <div className="cms-sidebar-page-info">
                {(() => {
                  const Icon = PAGE_ICONS[selectedPageId] || Layers;
                  return <Icon className="w-4 h-4 cms-page-icon shrink-0 text-[#fe8220]" />;
                })()}
                <div className="min-w-0">
                  <p className="cms-sidebar-eyebrow">Page Components</p>
                  <h2 className="cms-sidebar-page-title">{activePage.title}</h2>
                </div>
              </div>
            )}
            <button
              type="button"
              className="cms-collapse-btn"
              onClick={() => setSidebarCollapsed((p) => !p)}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {!sidebarCollapsed && (
            <nav className="cms-section-nav">
              {activePage.sections.map((sec, idx) => {
                const isActive = sec.id === activeSectionId;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    className={`cms-section-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveSectionId(sec.id)}
                  >
                    <span className="cms-section-num">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="cms-section-info">
                      <strong className="cms-section-title">{sec.title}</strong>
                      <p className="cms-section-desc">{sec.description}</p>
                    </div>
                    {isActive && <span className="cms-section-active-dot" />}
                  </button>
                );
              })}
            </nav>
          )}

          {!sidebarCollapsed && (
            <div className="cms-sidebar-footer-new">
              <span>{activePage.sections.length} sections</span>
              <button type="button" onClick={handleResetEntirePage}>
                <RotateCcw className="w-3 h-3" /> Reset page
              </button>
            </div>
          )}

          {sidebarCollapsed && (
            <nav className="cms-section-nav-collapsed">
              {activePage.sections.map((sec, idx) => {
                const isActive = sec.id === activeSectionId;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    className={`cms-section-icon-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSectionId(sec.id);
                      setSidebarCollapsed(false);
                    }}
                    title={sec.title}
                  >
                    <Hash className="w-3.5 h-3.5" />
                    <span className="cms-section-icon-num">{idx + 1}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </aside>

        {/* EMBEDDED LIVE PREVIEW */}
        <section className="cms-preview-panel" aria-label="Live website preview">
          <div className="cms-preview-toolbar">
            <div>
              <span className="cms-preview-eyebrow">Live preview</span>
              <strong>{activeSection.title}</strong>
            </div>
            <div className="cms-preview-controls">
              <button
                type="button"
                className={viewport === 'desktop' ? 'active' : ''}
                onClick={() => setViewport('desktop')}
                title="Desktop preview"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className={viewport === 'mobile' ? 'active' : ''}
                onClick={() => setViewport('mobile')}
                title="Mobile preview"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <span className="cms-preview-control-divider" />
              <button
                type="button"
                className={previewMode === 'focus' ? 'active' : ''}
                onClick={() => setPreviewMode(previewMode === 'focus' ? 'full' : 'focus')}
                title={previewMode === 'focus' ? 'Show full page' : 'Focus active section'}
              >
                {previewMode === 'focus' ? <Focus className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button type="button" onClick={() => setZoom((value) => Math.max(0.45, value - 0.05))} title="Zoom out">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="cms-preview-zoom">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(1, value + 0.05))} title="Zoom in">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <span className="cms-preview-control-divider" />
              <button
                type="button"
                className={editorCollapsed ? 'active' : ''}
                onClick={() => setEditorCollapsed((value) => !value)}
                title={editorCollapsed ? 'Show content inspector' : 'Hide content inspector for a wider canvas'}
              >
                {editorCollapsed ? <PanelRightOpen className="w-3.5 h-3.5" /> : <PanelRightClose className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <div className="cms-preview-stage">
            {isLoading ? (
              <div className="cms-loading-state">
                <div className="cms-spinner" />
                <p>Loading page preview…</p>
              </div>
            ) : loadError ? (
              <div className="cms-loading-state cms-load-error" role="alert">
                <AlertCircle className="w-5 h-5" />
                <strong>Live preview unavailable</strong>
                <p>{loadError}</p>
                <button type="button" className="cms-action-btn secondary" onClick={() => setReloadRevision((value) => value + 1)}>
                  Try again
                </button>
              </div>
            ) : (
              <StudioPreviewCanvas
                pageId={selectedPageId}
                activeSectionId={activeSectionId}
                pageData={pageData}
                viewport={viewport}
                previewMode={previewMode}
                zoom={zoom}
                onSelectSection={setActiveSectionId}
              />
            )}
          </div>
        </section>

        {/* MAIN EDITOR */}
        <main className={`cms-editor-main ${editorCollapsed ? 'is-collapsed' : ''}`}>
          {isLoading ? (
            <div className="cms-loading-state">
              <div className="cms-spinner" />
              <p>Loading content fields…</p>
            </div>
          ) : loadError ? (
            <div className="cms-loading-state cms-load-error" role="alert">
              <AlertCircle className="w-5 h-5" />
              <strong>Editing paused</strong>
              <p>No fallback values are shown because the live source could not be verified.</p>
              <button type="button" className="cms-action-btn secondary" onClick={() => setReloadRevision((value) => value + 1)}>
                Reload live data
              </button>
            </div>
          ) : (
            <div className="cms-editor-body">
              <EditorPanel
                section={activeSection}
                data={pageData[activeSectionId] ?? {}}
                onChange={handleUpdateSectionData}
                onResetSection={handleResetSection}
              />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
