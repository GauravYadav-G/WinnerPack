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

export type ViewportMode = 'desktop' | 'mobile';

export interface StudioSectionDef {
  id: string;
  title: string;
  description: string;
  icon?: string;
  defaults: Record<string, any>;
}

export interface StudioPageDef {
  id: string;
  title: string;
  icon: string;
  route: string;
  description: string;
  sections: StudioSectionDef[];
}

export const STUDIO_PAGES: StudioPageDef[] = [
  {
    id: 'home',
    title: 'Homepage',
    icon: 'Home',
    route: '/',
    description: 'WinnerPack landing page, primary value propositions, and core catalog showcase.',
    sections: [
      {
        id: 'hero',
        title: 'Hero Banner Slider',
        description: 'Opening interactive slider, main callout badges, primary CTAs, and showcase card.',
        icon: 'Sparkles',
        defaults: {
          slides: fallbackData.slides.slice(0, 4),
          rightBanner: fallbackData.rightBanner,
          autoplayInterval: 5,
        },
      },
      {
        id: 'about',
        title: 'About Winner Pack Strip',
        description: 'Executive intro, factory floor photos, key operational statistics, and sustainability badge.',
        icon: 'Building2',
        defaults: { about: defaultAbout },
      },
      {
        id: 'categories',
        title: 'Product Categories Grid',
        description: 'Four primary product categories: Film Products, Labels & Stickers, Tapes, PP Strap.',
        icon: 'LayoutGrid',
        defaults: {
          eyebrow: 'Industrial Range & Showcase',
          title: 'Product Gallery',
          description: '',
          cards: [
            {
              id: 'film-products',
              title: 'Film Products',
              tag: 'Shrink Films · Stretch Wrap',
              blurb: 'High-clarity barrier and load containment films with up to 500% pre-stretch retention.',
              image: '/images/categories/film-products-v2.webp',
              slug: '/product-category/film-products',
            },
            {
              id: 'label-sticker-products',
              title: 'Labels & Stickers',
              tag: 'Roll Form · Barcode & Security',
              blurb: 'Precision die-cut adhesive labels, thermal transfer ribbons, and tamper-evident materials.',
              image: '/images/categories/labels-stickers-v2.webp',
              slug: '/product-category/label-sticker-products',
            },
            {
              id: 'tapes',
              title: 'Tapes & Adhesives',
              tag: 'BOPP Packaging · Reinforced',
              blurb: 'Industrial carton sealing tapes, reinforced filament, and custom branded security tapes.',
              image: '/images/categories/tapes-v2.webp',
              slug: '/product-category/tapes',
            },
            {
              id: 'pp-strap',
              title: 'PP Strap & Bundling',
              tag: 'Semi & Fully Automatic',
              blurb: 'High tensile strength polypropylene and PET strapping engineered for automated arch bundlers.',
              image: '/images/categories/pp-pet-strapping-v2.webp',
              slug: '/product-category/pp-strap',
            },
          ],
        },
      },
      {
        id: 'industries',
        title: 'Industries We Serve',
        description: 'Sector cards for Pharma, Food & Beverage, Agriculture, Logistics, Chemicals, Electronics.',
        icon: 'Factory',
        defaults: {
          eyebrow: 'Target Applications',
          title: 'Industries We Serve',
          industries: defaultIndustries,
        },
      },
      {
        id: 'why',
        title: 'Why Choose Us (6 USPs)',
        description: 'Six core differentiators: custom specs, zero tears, technical testing, direct dispatch.',
        icon: 'CheckCircle2',
        defaults: {
          eyebrow: 'Why WinnerPack',
          title: 'Six Reasons Procurement Teams Renew Our Contract Every Year',
          usps: fallbackData.usps,
        },
      },
      {
        id: 'applications',
        title: 'Real-World Applications',
        description: 'Packaging applications carousel showcasing technical stretch wrapping and collation.',
        icon: 'Layers',
        defaults: {
          eyebrow: 'Real-World Applications',
          title: 'Materials in Industrial Action',
          slides: defaultApplications,
        },
      },
      {
        id: 'partners',
        title: 'Trusted Partners & Logos',
        description: 'Infinite marquee logo strip of certified client organizations and polymer suppliers.',
        icon: 'Handshake',
        defaults: {
          partnerHeader: { tag: 'OUR PARTNERS', title: 'We work with the best partners' },
          partners: defaultPartners,
        },
      },
      {
        id: 'solutions',
        title: 'Engineered Journey',
        description: 'Eight step manufacturing journey: load containment force, micron calibration, clean slitting.',
        icon: 'GitFork',
        defaults: {
          eyebrow: 'Packaging Solutions & Capabilities',
          title: 'Reliable Packaging Solutions Built for Your Business',
          solutionsData: defaultSolutions,
        },
      },
      {
        id: 'certifications',
        title: 'Certifications & Standards',
        description: 'ISO 9001:2015, US FDA compliance, European CE mark, and GMP quality accreditations.',
        icon: 'ShieldCheck',
        defaults: {
          eyebrow: 'Government & Quality Compliance',
          title: 'Certified Standards You Can Trust',
          certifications: defaultCertifications,
        },
      },
      {
        id: 'inquiry',
        title: 'Product Inquiry & Lead Form',
        description: 'Direct consultation contact card, telephone hotline numbers, and lead capture form.',
        icon: 'MessageSquare',
        defaults: {
          headline: 'The inquiry.',
          description: 'Tell us where you are now and where you want the work to go. Share your packaging specifications, payload requirements, or custom consignment volume.',
          phone1: '+91 85950 72187',
          email: 'info@winnerpack.in',
        },
      },
    ],
  },
  {
    id: 'about-us',
    title: 'About Us Page',
    icon: 'Building2',
    route: '/about-us',
    description: 'Corporate overview, company background, factory floor capabilities, mission, vision, and operations.',
    sections: [
      {
        id: 'about-header',
        title: 'Page Header & Hero',
        description: 'Title, eyebrow banner, breadcrumb settings, and cover visuals.',
        icon: 'Type',
        defaults: defaultAboutUs.header,
      },
      {
        id: 'about-who-we-are',
        title: 'Who We Are Overview',
        description: 'Company story, core narrative paragraphs, 4 key capability checkpoints, and plant photo.',
        icon: 'Users',
        defaults: defaultAboutUs.whoWeAre,
      },
      {
        id: 'about-metrics',
        title: 'Company Metrics & Milestones',
        description: 'Milestone numbers, establishment year, and capacity counters.',
        icon: 'BarChart3',
        defaults: { metrics: defaultAboutUs.metrics },
      },
      {
        id: 'about-guides',
        title: 'What Guides Us (Mission & Vision)',
        description: 'Corporate mission statement, company vision, and operational purpose headlines.',
        icon: 'Compass',
        defaults: defaultAboutUs.guides,
      },
      {
        id: 'about-capabilities',
        title: 'Operational Capabilities & Slitting',
        description: 'End-to-end capability narrative, conversion line photo, and operational strengths.',
        icon: 'Wrench',
        defaults: defaultAboutUs.capabilities,
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact & Quote Page',
    icon: 'PhoneCall',
    route: '/contact',
    description: 'Inquiry forms, direct contact channels, facility addresses, and FAQ management.',
    sections: [
      {
        id: 'contact-header',
        title: 'Header & Intro',
        description: 'Contact page title, tagline, and introduction copy.',
        icon: 'Type',
        defaults: defaultContactPage.header,
      },
      {
        id: 'contact-channels',
        title: 'Direct Contact Details',
        description: 'Office address, manufacturing plant location, phone hotlines, and emails.',
        icon: 'MapPin',
        defaults: defaultContactPage.details,
      },
      {
        id: 'contact-faqs',
        title: 'Frequently Asked Questions (FAQs)',
        description: 'Accordion of common procurement, sample dispatch, and delivery questions.',
        icon: 'HelpCircle',
        defaults: { faqs: defaultContactPage.faqs },
      },
    ],
  },
  {
    id: 'gallery',
    title: 'Organization Gallery',
    icon: 'Images',
    route: '/gallery',
    description: 'Plant infrastructure photography, machinery hall, quality labs, and team events.',
    sections: [
      {
        id: 'gallery-hero',
        title: 'Featured Main Showcase',
        description: 'High-res main showcase photo with focal point alignment and caption.',
        icon: 'Image',
        defaults: defaultGallery.mainHero,
      },
      {
        id: 'gallery-items',
        title: 'Photo Grid (Portraits & Landscapes)',
        description: 'All factory and culture photo slots with captions and display order.',
        icon: 'LayoutGrid',
        defaults: {
          portraits: defaultGallery.portraits,
          landscapes: defaultGallery.landscapes,
        },
      },
    ],
  },
  {
    id: 'global',
    title: 'Global Header, Footer & Widgets',
    icon: 'Settings',
    route: '/',
    description: 'Elements that appear on every page: navigation ticker, global footer, and four floating social actions.',
    sections: [
      {
        id: 'global-ticker',
        title: 'Top Announcement Ticker',
        description: 'Top utility bar text, hotline phone, and catalog download link.',
        icon: 'Megaphone',
        defaults: defaultGlobal.ticker,
      },
      {
        id: 'global-footer',
        title: 'Global Footer & Legal',
        description: 'Company description, 4-column link tree, copyright, and social media links.',
        icon: 'PanelBottom',
        defaults: defaultFooter,
      },
      {
        id: 'global-floating',
        title: 'Floating Social & WhatsApp Widgets',
        description: 'LinkedIn, Facebook, Instagram, and WhatsApp quick actions with editable live destinations.',
        icon: 'MessageCircle',
        defaults: defaultGlobal.floating,
      },
    ],
  },
];
