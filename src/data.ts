import {
  Disc3, CircleDashed, Sparkles, Shield,
  Layers, Tag
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProductCategory = {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  tag: string;
  gradient: string;
  items: string[];
};

export const productCategories: ProductCategory[] = [
  {
    id: "labels",
    title: "Labels",
    blurb: "Plain, printed, barcode, and adhesive labels for product branding and shipping.",
    icon: Tag,
    tag: "Adhesive · Thermal",
    gradient: "from-amber-400/20 to-orange-500/10",
    items: ["Plain Labels", "Printed Labels", "Barcode Labels", "Product Labels", "Self Adhesive Labels", "Thermal Labels"],
  },
  {
    id: "films-bags-tubes",
    title: "Films, Bags & Tubes",
    blurb: "Shrink films, courier bags, and specialty packaging pouches.",
    icon: Layers,
    tag: "POF · LDPE · PVC",
    gradient: "from-sky-400/20 to-blue-500/10",
    items: ["POF Shrink Rolls & Pouches", "LDPE Shrink Rolls & Pouches", "PVC Shrink Rolls, Pouches & Tubes", "Poly Courier Bags", "Paper Courier Bags", "PETG Rolls & Pouches / BOPP Pouches / ESD Pouches"],
  },
  {
    id: "strapping",
    title: "Strapping",
    blurb: "PP strap, printed strap, colored strap, and high-tensile PET strap.",
    icon: Disc3,
    tag: "PP · PET",
    gradient: "from-emerald-400/20 to-teal-500/10",
    items: ["PP Strap", "Printed PP Strap", "Colored PP Strap", "PET Strap"],
  },
  {
    id: "protective",
    title: "Protective Packaging",
    blurb: "Bubble wrap, EPE foam, air bags, and corrugated boxes/rolls.",
    icon: Shield,
    tag: "Bubble · Foam · Boxes",
    gradient: "from-rose-400/20 to-pink-500/10",
    items: ["Bubble Roll & Pouches", "EPE Foam Rolls", "Air Bags", "Corrugated Boxes", "Corrugated Rolls", "Edge Protector"],
  },
  {
    id: "tapes",
    title: "Tapes",
    blurb: "High-cling BOPP, printed, colored, and silicon tapes.",
    icon: Sparkles,
    tag: "BOPP · Silicon",
    gradient: "from-violet-400/20 to-fuchsia-500/10",
    items: ["BOPP Tapes", "Printed BOPP Tapes", "Coloured BOPP Tapes", "Silicon Tapes"],
  },
  {
    id: "pallet-wrapping",
    title: "Pallet Wrapping",
    blurb: "Manual and machine stretch films, pallet covers and liners.",
    icon: CircleDashed,
    tag: "Manual · Machine",
    gradient: "from-yellow-400/20 to-amber-500/10",
    items: ["Manual Stretch Film", "Machine Stretch Film", "Pallet Cover", "Pallet Liner"],
  }
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
}