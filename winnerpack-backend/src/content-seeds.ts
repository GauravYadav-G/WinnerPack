import { fallbackData } from "./fallback-data";
import {
  defaultAboutUs,
  defaultApplications,
  defaultCertifications,
  defaultContactPage,
  defaultFooter,
  defaultGallery,
  defaultGlobal,
  defaultIndustries,
  defaultPartners,
} from "./site-defaults";

export const contentSeeds = [
  {
    key: "homepage",
    data: fallbackData,
  },
  {
    key: "industries",
    data: { industries: defaultIndustries },
  },
  {
    key: "applications",
    data: { slides: defaultApplications },
  },
  {
    key: "partners_materials_certs",
    data: {
      partners: defaultPartners,
      certs: defaultCertifications,
    },
  },
  {
    key: "certifications",
    data: { certifications: defaultCertifications },
  },
  { key: "about_us", data: defaultAboutUs },
  { key: "page_about-us", data: defaultAboutUs },
  { key: "contact_page", data: defaultContactPage },
  { key: "page_contact", data: defaultContactPage },
  { key: "gallery", data: defaultGallery },
  { key: "page_gallery", data: defaultGallery },
  { key: "footer", data: defaultFooter },
  { key: "global", data: defaultGlobal },
  { key: "page_global", data: defaultGlobal },
] as const;
