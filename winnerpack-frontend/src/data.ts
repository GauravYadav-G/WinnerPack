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
  basePrice: string;
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
    tagline: "High-Volume Sealing & Tamper-Proof Parcel Security",
    heroHeadline: "High-Speed Fulfillment Packaging That Eliminates Return Losses & Damage",
    packagingChallenge: "High-throughput fulfillment centers face frequent tape peeling, package tampering, and moisture damage during multi-city transit.",
    buyerOutcomes: [
      { title: "Zero Tamper Theft", desc: "High-tack acrylic BOPP tapes & tamper-evident poly courier bags with permanent adhesive closure." },
      { title: "18% Lower Material Cost", desc: "High-yield stretch films & lightweight mailers optimized for dimensional weight charges." },
      { title: "Fast Line Speed", desc: "Smooth-unwind tapes compatible with automatic carton sealing lines." }
    ],
    recommendedProductIds: ["bopp-tapes", "poly-courier-bags", "manual-stretch-film", "corrugated-boxes"],
    image: "/images/desktop/industries/ecommerce_logistics_industry.png"
  },
  {
    id: "automotive-engineering",
    name: "Automotive & Heavy Engineering",
    tagline: "Heavy Metal & Component Export Unitization",
    heroHeadline: "High-Tensile Strapping & Protection for Heavy Industrial Cargo",
    packagingChallenge: "Heavy engine components, metal coils, and spare parts risk strap snapping, corrosion, and pallet shifting over ocean & road freight.",
    buyerOutcomes: [
      { title: "High Breaking Strength", desc: "Friction-weld PET & PP straps extruded for heavy load retention and zero elongation." },
      { title: "Zero Surface Scratches", desc: "Heavy-gauge EPE foam rolls & edge protectors absorbing shocks on export crates." },
      { title: "ISO Batch Traceability", desc: "100% batch-tested tensile strength with Certificate of Analysis (COA) per dispatch." }
    ],
    recommendedProductIds: ["pet-strap", "pp-strap", "epe-foam-rolls", "edge-protector"],
    image: "/images/desktop/industries/automobile_industry.png"
  },
  {
    id: "food-fmcg",
    name: "Food, Beverage & FMCG",
    tagline: "Hygiene, Moisture Barrier & Multi-Pack Heat Shrink",
    heroHeadline: "360° Clean Multi-Pack Bundling & Moisture-Proof Primary Seals",
    packagingChallenge: "High-speed bottling and food lines require crystal-clear shrink bundling with zero burn-through and FDA food-grade compliance.",
    buyerOutcomes: [
      { title: "FDA Grade Compliance", desc: "Non-toxic, odor-free POF & LDPE shrink rolls manufactured under strict ISO controls." },
      { title: "High Optical Clarity", desc: "360-degree glass-clear product display with high shrink retention force." },
      { title: "Zero Pallet Shift", desc: "Machine stretch film with 300% pre-stretch yield securing heavy beverage crates." }
    ],
    recommendedProductIds: ["pof-shrink-rolls", "ldpe-shrink-rolls", "machine-stretch-film", "printed-bopp-tapes"],
    image: "/images/desktop/industries/food_fmcg_industry.png"
  },
  {
    id: "pharma-healthcare",
    name: "Pharmaceuticals & Healthcare",
    tagline: "Cleanroom Compliance, Lot Traceability & Barrier Protection",
    heroHeadline: "Precision Heat Shrink & Direct Thermal Lot Barcode Labels",
    packagingChallenge: "Strict regulatory audits demand cleanroom-grade shrink wrapping, moisture-proof barrier pouches, and barcode label legibility.",
    buyerOutcomes: [
      { title: "100% Barcode Legibility", desc: "Direct thermal & self-adhesive labels tested against smudging and chemical exposure." },
      { title: "Tamper-Evident Security", desc: "PVC shrink sleeves & POF pouches providing visible anti-tamper seals on medicine bottles." },
      { title: "Cleanroom Safe", desc: "Dust-free, medical-grade film extrusion adhering to WHO-GMP standards." }
    ],
    recommendedProductIds: ["thermal-labels", "barcode-labels", "pvc-shrink-rolls", "specialty-pouches"],
    image: "/images/desktop/industries/pharma_industry.png"
  },
  {
    id: "electronics-electricals",
    name: "Electronics & Electrical Appliances",
    tagline: "Anti-Static Cushioning & Surface Scratch Protection",
    heroHeadline: "ESD Protective Packaging & Impact-Absorbing Cushioning",
    packagingChallenge: "Sensitive PCBs, home appliances, and LED panels require electro-static discharge (ESD) safety and shock absorption.",
    buyerOutcomes: [
      { title: "Anti-Static ESD Shielding", desc: "Specialty ESD barrier pouches protecting micro-electronics from static charge." },
      { title: "Impact Cushioning", desc: "Multi-layer bubble rolls & corrugated edge protectors absorbing transit drops." },
      { title: "High-Cling Pallet Wrap", desc: "Cast & blown stretch films locking heavy appliance pallets without shifting." }
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