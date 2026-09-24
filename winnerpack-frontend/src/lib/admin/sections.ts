import { fallbackData } from '@/lib/fallback-data';
import { defaultAbout, defaultApplications, defaultCertifications, defaultFooter, defaultIndustries, defaultPartners, defaultSolutions } from '@/lib/site-defaults';

export type ContentSection = { id: string; title: string; description: string; key: string; preview: string; defaults: Record<string, any>; home?: boolean };
export const contentSections: ContentSection[] = [
  { id: 'hero', title: 'Hero banners', description: 'Opening carousel, calls to action and desktop showcase.', key: 'homepage', preview: '/', defaults: { slides: fallbackData.slides.slice(0, 4), rightBanner: fallbackData.rightBanner }, home: true },
  { id: 'about', title: 'About Winner Pack', description: 'Company introduction, plant images and key figures.', key: 'homepage', preview: '/#about', defaults: { about: defaultAbout }, home: true },
  { id: 'industries', title: 'Industries we serve', description: 'Industry cards shown on the homepage.', key: 'industries', preview: '/#industries', defaults: { industries: defaultIndustries }, home: true },
  { id: 'why', title: 'Why choose us', description: 'The benefits and strengths customers see on your homepage.', key: 'homepage', preview: '/#why', defaults: { usps: fallbackData.usps }, home: true },
  { id: 'applications', title: 'Real-world applications', description: 'The current packaging and manufacturing image carousel.', key: 'applications', preview: '/#applications', defaults: { slides: defaultApplications }, home: true },
  { id: 'partners', title: 'Trusted partners', description: 'Partner heading and customer logos.', key: 'partners_materials_certs', preview: '/#clients', defaults: { partnerHeader: { tag: 'OUR PARTNERS', title: 'We work with the best partners' }, partners: defaultPartners }, home: true },
  { id: 'solutions', title: 'Engineered solutions', description: 'The eight packaging capabilities and service benefits.', key: 'homepage', preview: '/#solutions', defaults: { solutionsData: defaultSolutions }, home: true },
  { id: 'certifications', title: 'Certifications', description: 'Quality standards, authorities and certification artwork.', key: 'certifications', preview: '/#certifications', defaults: { certifications: defaultCertifications }, home: true },
  { id: 'gallery', title: 'Gallery page', description: 'Team photographs, plant views and manufacturing facilities.', key: 'gallery', preview: '/gallery', defaults: { mainHero: { image: '/images/gallery/team_office_celebration.jpg', title: 'Winner Pack Team Celebration' }, portraits: [{id: 1, title:'Team Rafting Expedition', image:'/images/gallery/team_rafting_expedition.jpg'}, {id:2,title:'Team River Beach Gathering',image:'/images/gallery/team_river_beach.jpg'}, {id:3,title:'Winner Pack Team Tour',image:'/images/gallery/new_gallery_2.png'}], landscapes: [{id:1,title:'Pouch Converting & Slitting Hall',image:'/images/gallery/gallery_plant_converting.jpg'}, {id:2,title:'Corporate Reception',image:'/images/gallery/gallery_office_reception.jpg'}, {id:3,title:'Blown Film Extrusion Tower',image:'/images/gallery/gallery_extrusion_tower.jpg'}, {id:4,title:'Manufacturing Hall',image:'/images/gallery/gallery_factory_hall.jpg'}, {id:5,title:'Slitting Machine',image:'/images/gallery/gallery_slitting_machine.jpg'}, {id:6,title:'Team on Tour',image:'/images/gallery/new_gallery_1.png'}, {id:7,title:'Factory Headquarters',image:'/images/gallery/factory_building_facade.jpg'}] } },
  { id: 'footer', title: 'Footer & contact details', description: 'Company description, phone numbers, address and social links.', key: 'footer', preview: '/#footer', defaults: defaultFooter },
];
export const homepageSections = [
  {id:'hero',title:'Hero banners'}, {id:'about',title:'About Winner Pack'}, {id:'products',title:'Product categories'}, {id:'industries',title:'Industries we serve'}, {id:'why',title:'Why choose us'}, {id:'applications',title:'Real-world applications'}, {id:'partners',title:'Trusted partners'}, {id:'solutions',title:'Engineered solutions'}, {id:'certifications',title:'Certifications'}, {id:'inquiry',title:'Product inquiry form'},
];
export type SectionVisibility = { id: string; visible: boolean };
export const defaultLayout: SectionVisibility[] = homepageSections.map(({id}) => ({id,visible:true}));
export function normalizeLayout(value: unknown): SectionVisibility[] {
  const stored = Array.isArray(value) ? value : [];
  return defaultLayout.map(item => ({ ...item, visible: stored.find(entry => entry?.id === item.id)?.visible !== false }));
}
export function findSection(id: string) { return contentSections.find(section => section.id === id); }
