import {
  Disc3, Layers, Tag
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductCategory = {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  tag: string;
  gradient: string;
  image: string;
  items: string[];
};

export const productCategories: ProductCategory[] = [
  {
    id: "film-products",
    title: "Film Products",
    blurb: "High-cling POF shrink wrap, collation LDPE, and machine-grade stretch films designed to secure loads and protect products.",
    icon: Layers,
    tag: "Shrink Films · Stretch Wrap · Barrier Pouches",
    gradient: "from-sky-400/20 to-blue-500/10",
    image: "/images/products/pof-shrink-rolls/image.png",
    items: [
      "LDPE Films & Pouches",
      "POF Films & Pouches",
      "Coloured Films & Pouches",
      "BOPP Films & Pouches",
      "PVC Shrink Rolls & Pouches",
      "Stretch Film",
      "Lamination Films & Pouches",
      "Compostable Films & Pouches",
    ],
  },
  {
    id: "label-sticker-products",
    title: "Labels & Stickers",
    blurb: "High-density thermal transfer barcode labels, printed product labels, and self-adhesive labels for retail and shipping.",
    icon: Tag,
    tag: "Thermal Labels · Product Stickers · Barcodes",
    gradient: "from-amber-400/20 to-orange-500/10",
    image: "/images/products/product-labels/image.png",
    items: [
      "Plain Labels",
      "Printed Labels",
      "Barcode Labels",
      "Product Labels",
      "Self Adhesive Labels",
      "Thermal Labels",
    ],
  },
  {
    id: "tapes",
    title: "Tapes",
    blurb: "High-tack BOPP sealing tapes, custom printed brand tapes, and specialty silicon tapes for secure industrial box closure.",
    icon: Disc3,
    tag: "BOPP Tapes · Custom Printed · Silicon Sealing",
    gradient: "from-emerald-400/20 to-teal-500/10",
    image: "/images/products/printed-bopp-tapes/image.png",
    items: [
      "BOPP Tapes",
      "Printed BOPP Tapes",
      "Coloured BOPP Tapes",
      "Silicon Tapes",
    ],
  },
  {
    id: "pp-strap",
    title: "PP Strap",
    blurb: "High-tensile virgin polypropylene and PET strapping rolls engineered for heavy pallet unitization and zero feed jams.",
    icon: Layers,
    tag: "Virgin PP Strap · PET Strapping · Custom Printed Strap",
    gradient: "from-violet-400/20 to-purple-500/10",
    image: "/images/products/pp-strap/image.png",
    items: [
      "PP Strap",
      "Printed PP Strap",
      "Colored PP Strap",
      "PET Strap",
    ],
  },
];

export interface Product {
  id: string;
  title: string;
  category: string;
  tag: string;
  blurb: string;
  longDesc: string;
  image: string;
  gallery: string[];
  specs: Record<string, string>;
  options: {
    widths: string[];
    thicknesses: string[];
    colors: string[];
  };
  applications: string[];
  visualGradients: string;
  industryApplications?: string[];
  applicationOutcomes?: string[];
}

export interface IndustryVertical {
  id: string;
  name: string;
  tagline: string;
  heroHeadline: string;
  packagingChallenge: string;
  buyerOutcomes: { title: string; desc: string }[];
  recommendedProductIds: string[];
  image: string;
}

export const industryVerticals: IndustryVertical[] = [
  {
    id: "ecommerce-logistics",
    name: "E-Commerce & Express Logistics",
    tagline: "High-Volume Sealing & Secure Parcel Packaging",
    heroHeadline: "Reliable Packaging Solutions for High-Speed Fulfillment Operations",
    packagingChallenge: "High-throughput fulfillment centers require reliable sealing, tamper-resistant closures, and moisture protection during multi-city transit.",
    buyerOutcomes: [
      { title: "Tamper-Resistant Closures", desc: "BOPP tapes and poly courier bags with strong adhesive closure for reliable parcel security." },
      { title: "Optimized Material Cost", desc: "High-yield stretch films and lightweight mailers optimized for dimensional weight efficiency." },
      { title: "Compatible with Automated Lines", desc: "Smooth-unwind tapes and films designed for compatibility with carton sealing lines." }
    ],
    recommendedProductIds: ["bopp-tapes", "poly-courier-bags", "manual-stretch-film", "corrugated-boxes"],
    image: "/images/desktop/industries/ecommerce_logistics_industry.png"
  },
  {
    id: "automotive-engineering",
    name: "Automotive & Heavy Engineering",
    tagline: "Heavy Cargo & Component Export Unitization",
    heroHeadline: "High-Tensile Strapping & Protection for Heavy Industrial Cargo",
    packagingChallenge: "Heavy engine components, metal coils, and spare parts require strong strapping, surface protection, and pallet stability over long-distance freight.",
    buyerOutcomes: [
      { title: "High Load Retention", desc: "PET and PP straps manufactured for heavy load retention and reliable performance in export conditions." },
      { title: "Surface Protection", desc: "EPE foam rolls and edge protectors providing cushioning and surface protection on export crates." },
      { title: "Batch Traceability", desc: "Batch-tested tensile strength with Certificate of Analysis (COA) per dispatch." }
    ],
    recommendedProductIds: ["pet-strap", "pp-strap", "epe-foam-rolls", "edge-protector"],
    image: "/images/desktop/industries/automobile_industry.png"
  },
  {
    id: "food-fmcg",
    name: "Food, Beverage & FMCG",
    tagline: "Hygiene, Moisture Barrier & Multi-Pack Shrink Solutions",
    heroHeadline: "Multi-Pack Bundling & Moisture-Resistant Packaging for Food Lines",
    packagingChallenge: "High-speed food and beverage lines require clear shrink bundling with consistent sealing and food-safe material compliance.",
    buyerOutcomes: [
      { title: "Food-Safe Materials", desc: "Non-toxic, odor-free POF and LDPE shrink rolls manufactured under controlled quality conditions." },
      { title: "High Optical Clarity", desc: "Clear product display with strong shrink retention across a range of packaging formats." },
      { title: "Pallet Load Stability", desc: "Machine stretch film delivering reliable load containment for palletised beverage and FMCG products." }
    ],
    recommendedProductIds: ["pof-shrink-rolls", "ldpe-shrink-rolls", "machine-stretch-film", "printed-bopp-tapes"],
    image: "/images/desktop/industries/food_fmcg_industry.png"
  },
  {
    id: "pharma-healthcare",
    name: "Pharmaceuticals & Healthcare",
    tagline: "Quality Compliance, Lot Traceability & Barrier Protection",
    heroHeadline: "Heat Shrink & Direct Thermal Labels for Pharmaceutical Packaging",
    packagingChallenge: "Regulatory audits demand precise shrink wrapping, moisture-resistant barrier pouches, and legible barcode labels for pharmaceutical products.",
    buyerOutcomes: [
      { title: "High Barcode Legibility", desc: "Direct thermal and self-adhesive labels tested for durability against smudging and chemical exposure." },
      { title: "Tamper-Evident Packaging", desc: "PVC shrink sleeves and POF pouches providing visible tamper-evident seals on medicine bottles." },
      { title: "Hygiene-Safe Materials", desc: "Packaging materials manufactured under controlled, dust-free production conditions." }
    ],
    recommendedProductIds: ["thermal-labels", "barcode-labels", "pvc-shrink-rolls", "specialty-pouches"],
    image: "/images/desktop/industries/pharma_industry.png"
  },
  {
    id: "electronics-electricals",
    name: "Electronics & Electrical Appliances",
    tagline: "Anti-Static Protection & Surface Scratch Prevention",
    heroHeadline: "Protective Packaging & Cushioning for Electronics & Appliances",
    packagingChallenge: "Sensitive PCBs, home appliances, and LED panels require electrostatic discharge protection and adequate shock absorption during transit.",
    buyerOutcomes: [
      { title: "Anti-Static Protection", desc: "Specialty barrier pouches protecting electronics from electrostatic discharge during storage and transit." },
      { title: "Impact Cushioning", desc: "Bubble rolls and corrugated edge protectors providing shock absorption for fragile goods." },
      { title: "Secure Pallet Wrap", desc: "Cast and blown stretch films providing reliable load containment for heavy appliance pallets." }
    ],
    recommendedProductIds: ["specialty-pouches", "bubble-roll", "edge-protector", "machine-stretch-film"],
    image: "/images/desktop/industries/electronics_industry.png"
  },
  {
    id: "stationery-corporate",
    name: "Stationery & Corporate Packaging",
    tagline: "Custom Brand Printed Tapes & Bulk Distribution Boxes",
    heroHeadline: "Branded Packaging Solutions for Bulk Paper & Corporate Goods",
    packagingChallenge: "High-volume paper mills and stationery distributors need custom-printed sealing tapes and heavy burst-strength corrugated boxes.",
    buyerOutcomes: [
      { title: "Custom Brand Printing", desc: "High-resolution printed BOPP tapes & printed PP straps carrying brand logos." },
      { title: "High Burst Factor Boxes", desc: "Heavy-duty 3-ply and 5-ply corrugated boxes preventing box crush under stacking." },
      { title: "Moisture Protection", desc: "POF shrink wrap bundling paper reams against ambient humidity." }
    ],
    recommendedProductIds: ["printed-bopp-tapes", "corrugated-boxes", "printed-pp-strap", "pof-shrink-rolls"],
    image: "/images/desktop/industries/stationery_industry.png"
  }
];