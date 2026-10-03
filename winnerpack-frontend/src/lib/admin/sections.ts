import { fallbackData } from '@/lib/fallback-data';
import {
  defaultAbout,
  defaultAboutUs,
  defaultApplications,
  defaultCertifications,
  defaultContactPage,
  defaultFooter,
  defaultGallery,
  defaultGlobal,
  defaultIndustries,
  defaultPartners,
  defaultSolutions,
} from '@/lib/site-defaults';

export type ContentSection = {
  id: string;
  title: string;
  description: string;
  key: string;
  preview: string;
  defaults: Record<string, any>;
  home?: boolean;
};

export const contentSections: ContentSection[] = [
  // Homepage components
  { id: 'hero', title: 'Hero banners & slides', description: 'Opening carousel, calls to action and desktop showcase banner.', key: 'homepage', preview: '/', defaults: { slides: fallbackData.slides.slice(0, 4), rightBanner: fallbackData.rightBanner }, home: true },
  { id: 'about', title: 'About Winner Pack strip', description: 'Executive intro, factory floor photos, key operational statistics, and commitment.', key: 'homepage', preview: '/#about', defaults: { about: defaultAbout }, home: true },
  { id: 'products', title: 'Product categories showcase', description: 'Primary product divisions: Film, Labels, Tapes, Strapping.', key: 'homepage', preview: '/#products', defaults: { categoriesHeader: { tag: 'PACKAGING CATALOG', title: 'Engineered For Industrial Performance' } }, home: true },
  { id: 'industries', title: 'Industries we serve', description: 'Industry cards shown on the homepage with custom photography.', key: 'industries', preview: '/#industries', defaults: { industries: defaultIndustries }, home: true },
  { id: 'why', title: 'Why choose us (6 USPs)', description: 'Six core differentiators, procurement advantages, icons, and hover textures.', key: 'homepage', preview: '/#why', defaults: { usps: fallbackData.usps }, home: true },
  { id: 'applications', title: 'Real-world applications', description: 'Industrial packaging and machine action carousel images.', key: 'applications', preview: '/#applications', defaults: { slides: defaultApplications }, home: true },
  { id: 'partners', title: 'Trusted partners & logos', description: 'Client brand logos and marquee heading.', key: 'partners_materials_certs', preview: '/#clients', defaults: { partnerHeader: { tag: 'OUR PARTNERS', title: 'We work with the best partners' }, partners: defaultPartners }, home: true },
  { id: 'solutions', title: 'Engineered journey & solutions', description: 'Eight engineering stages, custom gauges, and technical advantages.', key: 'homepage', preview: '/#solutions', defaults: { solutionsData: defaultSolutions }, home: true },
  { id: 'certifications', title: 'Certifications & compliance', description: 'ISO 9001:2015, MSME, GST, RoHS and pollution compliance accreditations.', key: 'certifications', preview: '/#certifications', defaults: { certifications: defaultCertifications }, home: true },
  { id: 'inquiry', title: 'Product inquiry & hotline CTA', description: 'Direct contact phone numbers, desk emails, plant address, and inquiry form card.', key: 'homepage', preview: '/#inquiry-form', defaults: { inquiryContact: { phone1: '+91 85950 72187', phone2: '+91 74287 70999', email: 'info@winnerpack.in', address: 'Plot No. 8, B.S.T. Industrial Park, Village Dasna, Ghaziabad, Uttar Pradesh, 201015', hours: 'Mon – Sat: 9:00 AM – 7:00 PM IST' } }, home: true },

  // Dedicated Pages
  { id: 'about-us', title: 'About Us page', description: 'Full corporate background, capability checkpoints, milestones, mission & vision.', key: 'about_us', preview: '/about-us', defaults: defaultAboutUs },
  { id: 'contact', title: 'Contact & Quote page', description: 'Inquiry routing, hotlines, factory address, maps embed, and dynamic FAQs.', key: 'contact_page', preview: '/contact', defaults: defaultContactPage },
  { id: 'gallery', title: 'Organization gallery page', description: 'Featured plant showcase, portrait photography, and factory machinery halls.', key: 'gallery', preview: '/gallery', defaults: defaultGallery },
  { id: 'footer', title: 'Footer & contact details', description: 'Company description, legal entity, address, phone numbers, and social channels.', key: 'footer', preview: '/#footer', defaults: defaultFooter },
  { id: 'global', title: 'Global header, footer & widgets', description: 'Announcement ticker, footer link trees, legal disclaimer, and WhatsApp floating widgets.', key: 'global', preview: '/', defaults: defaultGlobal },
];

export const homepageSections = [
  { id: 'hero', title: 'Hero banners & slides' },
  { id: 'about', title: 'About Winner Pack strip' },
  { id: 'products', title: 'Product categories showcase' },
  { id: 'industries', title: 'Industries we serve' },
  { id: 'why', title: 'Why choose us (6 USPs)' },
  { id: 'applications', title: 'Real-world applications' },
  { id: 'partners', title: 'Trusted partners & logos' },
  { id: 'solutions', title: 'Engineered journey & solutions' },
  { id: 'certifications', title: 'Certifications & compliance' },
  { id: 'inquiry', title: 'Product inquiry & hotline CTA' },
];

export type SectionVisibility = { id: string; visible: boolean };
export const defaultLayout: SectionVisibility[] = homepageSections.map(({ id }) => ({ id, visible: true }));

export function normalizeLayout(value: unknown): SectionVisibility[] {
  const stored = Array.isArray(value) ? value : [];
  return defaultLayout.map((item) => ({
    ...item,
    visible: stored.find((entry) => entry?.id === item.id)?.visible !== false,
  }));
}

export function findSection(id: string): ContentSection | undefined {
  const aliases: Record<string, string> = {
    reasons: 'why',
    journey: 'solutions',
    'industrial-action': 'applications',
    clients: 'partners',
    'about-strip': 'about',
  };
  const targetId = aliases[id] || id;
  return contentSections.find((section) => section.id === targetId);
}

