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
    blurb: "POF shrink rolls, LDPE, PVC, stretch films, and specialty protective barrier pouches.",
    icon: Layers,
    tag: "POF · LDPE · PVC · Stretch",
    gradient: "from-sky-400/20 to-blue-500/10",
    image: "/images/products/pof-shrink-rolls/image.png",
    items: [
      "POF Shrink Rolls & Pouches",
      "LDPE Shrink Rolls & Pouches",
      "PVC Shrink Rolls, Pouches & Tubes",
      "PETG Rolls & Pouches / BOPP Pouches / ESD Pouches",
      "Manual Stretch Film",
      "Machine Stretch Film",
    ],
  },
  {
    id: "label-sticker-products",
    title: "Label and Sticker's Products",
    blurb: "Plain, printed, barcode, product, self-adhesive, and direct thermal sticker labels.",
    icon: Tag,
    tag: "Adhesive · Thermal · Printed",
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
    id: "other-products",
    title: "Other Products",
    blurb: "Courier bags, PP & PET straps, bubble wrap, EPE foam, tapes, corrugated boxes, and pallet liners.",
    icon: Disc3,
    tag: "Strapping · Tapes · Protective",
    gradient: "from-emerald-400/20 to-teal-500/10",
    image: "/images/products/pp-strap/image.png",
    items: [
      "Poly Courier Bags",
      "Paper Courier Bags",
      "PP Strap",
      "Printed PP Strap",
      "Colored PP Strap",
      "PET Strap",
      "Bubble Roll & Pouches",
      "EPE Foam Rolls",
      "Air Bags",
      "Corrugated Boxes",
      "Corrugated Rolls",
      "Edge Protector",
      "BOPP Tapes",
      "Printed BOPP Tapes",
      "Coloured BOPP Tapes",
      "Silicon Tapes",
      "Pallet Cover",
      "Pallet Liner",
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
}