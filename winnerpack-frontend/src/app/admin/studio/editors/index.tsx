'use client';

import type { StudioSectionDef } from '@/lib/admin/studio-registry';
import { RotateCcw } from 'lucide-react';

// Import all dedicated editors
import HeroEditor from './HeroEditor';
import AboutEditor from './AboutEditor';
import CategoriesEditor from './CategoriesEditor';
import IndustriesEditor from './IndustriesEditor';
import WhyChooseUsEditor from './WhyChooseUsEditor';
import ApplicationsEditor from './ApplicationsEditor';
import PartnersEditor from './PartnersEditor';
import SolutionsEditor from './SolutionsEditor';
import CertificationsEditor from './CertificationsEditor';
import InquiryEditor from './InquiryEditor';

import {
  AboutHeaderEditor,
  AboutWhoWeAreEditor,
  AboutMetricsEditor,
  AboutGuidesEditor,
  AboutCapabilitiesEditor,
  default as AboutPageMasterEditor,
} from './AboutPageEditor';

import { ContactHeaderEditor, ContactChannelsEditor, ContactFaqsEditor } from './ContactEditor';

import {
  GalleryHeroEditor, GalleryItemsEditor,
} from './MiscEditors';

import { GlobalTickerEditor, GlobalFooterEditor, GlobalFloatingEditor } from './GlobalEditor';

// ─── Editor Registry ──────────────────────────────────────────────────────────
const EDITOR_MAP: Record<string, React.ComponentType<{ data: any; onChange: (d: any) => void }>> = {
  // Homepage
  'hero': HeroEditor,
  'about': AboutEditor,
  'categories': CategoriesEditor,
  'industries': IndustriesEditor,
  'why': WhyChooseUsEditor,
  'applications': ApplicationsEditor,
  'partners': PartnersEditor,
  'solutions': SolutionsEditor,
  'certifications': CertificationsEditor,
  'inquiry': InquiryEditor,

  // About Us Page
  'about-header': AboutHeaderEditor,
  'about-who-we-are': AboutWhoWeAreEditor,
  'about-metrics': AboutMetricsEditor,
  'about-guides': AboutGuidesEditor,
  'about-capabilities': AboutCapabilitiesEditor,
  'about-us': AboutPageMasterEditor,

  // Contact Page
  'contact-header': ContactHeaderEditor,
  'contact-channels': ContactChannelsEditor,
  'contact-faqs': ContactFaqsEditor,

  // Gallery
  'gallery-hero': GalleryHeroEditor,
  'gallery-items': GalleryItemsEditor,

  // Global
  'global-ticker': GlobalTickerEditor,
  'global-footer': GlobalFooterEditor,
  'global-floating': GlobalFloatingEditor,
};

import StudioInspector from '../StudioInspector';

// ─── Main Editor Panel (uses dedicated editor or generic StudioInspector) ─────
interface EditorPanelProps {
  section: StudioSectionDef;
  data: Record<string, any>;
  onChange: (updatedData: Record<string, any>) => void;
  onResetSection: () => void;
}

export default function EditorPanel({ section, data, onChange, onResetSection }: EditorPanelProps) {
  const DedicatedEditor = EDITOR_MAP[section.id];

  if (!DedicatedEditor) {
    return (
      <StudioInspector
        section={section}
        data={data}
        onChange={onChange}
        onResetSection={onResetSection}
      />
    );
  }

  return (
    <div className="studio-dock-body">
      {/* Section Header */}
      <div className="cms-inspector-intro flex items-start justify-between mb-5 pb-3">
        <div>
          <span className="cms-inspector-kicker">Content inspector</span>
          <h3 className="cms-inspector-title">{section.title}</h3>
          <p className="cms-inspector-description">{section.description}</p>
        </div>
        <button
          type="button"
          onClick={onResetSection}
          className="studio-mini-btn text-[10px] text-gray-400 hover:text-red-400 flex items-center gap-1 shrink-0 ml-4 mt-1"
          title="Reset this component to factory defaults"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <DedicatedEditor data={data} onChange={onChange} />
    </div>
  );
}
