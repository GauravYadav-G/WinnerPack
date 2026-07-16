import {
  Disc3, CircleDashed, Sparkles, Shield, Truck,
  Layers, Factory, Zap, Leaf, Award, Globe2, Phone, Mail, MapPin, ArrowUpRight,
  Tag
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * ============================================================================
 * VERIFICATION NOTE (read before publishing)
 * ============================================================================
 * This file was audited against the live site https://www.winnerpack.in on
 * 15 Jul 2026. Real company: Winner Pack Technologies Pvt. Ltd., est. 2018,
 * Phone: +91-8595072187, Email: info@winnerpack.in.
 *
 * ADDRESS NOTE: As of this audit, every public record (MCA/Zaubacorp
 * company filings, Tofler, IndiaMART, TradeIndia, and the live website
 * itself) lists the address as "Plot No. 104, Anand Industrial Estate,
 * Mohan Nagar, Ghaziabad - 201007." The company has since indicated the
 * current address is:
 *   Plot No. 8, B.S.T. Industrial Park (Bhoor Garhi), Khasra No. 2667,
 *   Village Dasna, Ghaziabad, Uttar Pradesh, 201015
 * B.S.T. Industrial Park in Dasna is a real industrial plot development
 * (confirmed via real-estate listings), but no independent public record
 * (MCA, GST, directories) has been updated to reflect this yet as of this
 * audit — likely just filing lag. Using the new address below on the
 * company's OWN word; if you have a GST certificate, MCA change-of-address
 * filing, or letterhead confirming it, keep that on file as backup.
 *
 * Everywhere you see a "// VERIFIED" comment, the content is paraphrased
 * from an actual page on winnerpack.in. Everywhere you see a "// TODO:
 * UNVERIFIED" comment, the original file contained a number, claim, or
 * quote that does NOT appear anywhere on the real site (or in any public
 * business listing) and could not be confirmed. Do not publish those
 * fields until you've supplied real figures/approvals — I did not invent
 * replacement numbers, since that would just swap one hallucination for
 * another.
 * ============================================================================
 */

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
    // VERIFIED: matches winnerpack.in/labels/ nav exactly
    items: ["Plain Labels", "Printed Labels", "Barcode Labels", "Product Labels", "Self Adhesive Labels", "Thermal Labels"],
  },
  {
    id: "films-bags-tubes",
    title: "Films, Bags & Tubes",
    blurb: "Shrink films, courier bags, and specialty packaging pouches.",
    icon: Layers,
    tag: "POF · LDPE · PVC",
    gradient: "from-sky-400/20 to-blue-500/10",
    // VERIFIED against site nav — FIX: real site's 6th item is "PET G Rolls &
    // Pouches / BOPP Pouches / ESD Pouches", not the vague "Specialty Pouches"
    // that was in the original file.
    items: ["POF Shrink Rolls & Pouches", "LDPE Shrink Rolls & Pouches", "PVC Shrink Rolls, Pouches & Tubes", "Poly Courier Bags", "Paper Courier Bags", "PETG Rolls & Pouches / BOPP Pouches / ESD Pouches"],
  },
  {
    id: "strapping",
    title: "Strapping",
    blurb: "PP strap, printed strap, colored strap, and high-tensile PET strap.",
    icon: Disc3,
    tag: "PP · PET",
    gradient: "from-emerald-400/20 to-teal-500/10",
    // VERIFIED
    items: ["PP Strap", "Printed PP Strap", "Colored PP Strap", "PET Strap"],
  },
  {
    id: "protective",
    title: "Protective Packaging",
    blurb: "Bubble wrap, EPE foam, air bags, and corrugated boxes/rolls.",
    icon: Shield,
    tag: "Bubble · Foam · Boxes",
    gradient: "from-rose-400/20 to-pink-500/10",
    // VERIFIED
    items: ["Bubble Roll & Pouches", "EPE Foam Rolls", "Air Bags", "Corrugated Boxes", "Corrugated Rolls", "Edge Protector"],
  },
  {
    id: "tapes",
    title: "Tapes",
    blurb: "High-cling BOPP, printed, colored, and silicon tapes.",
    icon: Sparkles,
    tag: "BOPP · Silicon",
    gradient: "from-violet-400/20 to-fuchsia-500/10",
    // VERIFIED
    items: ["BOPP Tapes", "Printed BOPP Tapes", "Coloured BOPP Tapes", "Silicon Tapes"],
  },
  {
    id: "pallet-wrapping",
    title: "Pallet Wrapping",
    blurb: "Manual and machine stretch films, pallet covers and liners.",
    icon: CircleDashed,
    tag: "Manual · Machine",
    gradient: "from-yellow-400/20 to-amber-500/10",
    // VERIFIED
    items: ["Manual Stretch Film", "Machine Stretch Film", "Pallet Cover", "Pallet Liner"],
  }
];

/**
 * Swapped the unverifiable business metrics (tonnage/clients/on-time %)
 * for facts that are actually countable from Winner Pack's own verified
 * catalog — true without needing third-party confirmation. Kept in sync
 * with the STATS block in the blog/company data file. If real
 * tonnage/client/delivery figures become available later, these can be
 * swapped back in.
 */
export const stats = [
  { value: "8+", label: "Years in business", sub: "since 2018", trending: true }, // VERIFIED (founding year only)
  { value: "6", label: "Product categories", sub: "Labels to pallet wrapping", trending: false }, // VERIFIED — matches winnerpack.in nav (Labels, Films/Bags/Tubes, Strapping, Protective Packaging, Tapes, Pallet Wrapping)
  { value: "20+", label: "Product lines", sub: "consumables & machines", trending: false }, // VERIFIED — counted from footerCols: 11 consumable lines + 4 machine categories + variants (plain/printed/coloured strap & tape)
];

/**
 * TODO: UNVERIFIED CLAIMS REMOVED — the original list included "ISO
 * 9001:2015 certified" and an "FDA Food Grade" style claim elsewhere in the
 * file. I could not find any certification evidence for Winner Pack, and
 * false certification claims carry real legal risk — don't restore these
 * without an actual certificate to point to. I've replaced the USP list
 * with the company's own stated Core Values / positioning, paraphrased from
 * winnerpack.in/about/, which IS verifiable.
 */
export const usps = [
  {
    icon: Factory,
    title: "Ghaziabad-based operations",
    // Company-provided address (Plot No. 8, B.S.T. Industrial Park, Bhoor
    // Garhi, Village Dasna, Ghaziabad - 201015) — see file header note.
    // Public filings still show the older Mohan Nagar address as of this
    // audit, so this reflects the company's own current statement.
    text: "Winner Pack Technologies Pvt. Ltd. has run its packaging materials business from Ghaziabad since 2018, currently operating from B.S.T. Industrial Park, Dasna.",
  },
  {
    icon: Award,
    title: "Customer commitment",
    text: "The company states its core values as customer commitment, quality, integrity, personal accountability, respect for people, and teamwork.", // VERIFIED (paraphrased from About page)
  },
  {
    icon: Truck,
    title: "Wide product range",
    text: "One supplier across labels, shrink films, strap, tapes, protective packaging, pallet wrapping, and packaging machines.", // VERIFIED (matches actual nav breadth)
  },
  {
    icon: Zap,
    title: "Custom sizing on request",
    text: "Widths, thicknesses, and colors across strap, film, and tape lines can be customized to order.", // VERIFIED (stated on PP/PET strap and stretch film pages)
  },
  {
    icon: Leaf,
    title: "Tamper-evident packaging",
    text: "Courier bags use a hot-melt adhesive strip that shows visible signs of tampering if opened in transit.", // VERIFIED (paraphrased from courier bags page)
  },
  {
    icon: Globe2,
    title: "Serve To Deserve",
    text: "The company's stated motto: service and satisfaction come before profit maximization.", // VERIFIED (About page)
  },
];

/**
 * TODO: UNVERIFIED / CORRECTED — the original "WP-SWM / WP-BM / WP-FPM /
 * WP-VM" model codes do not exist anywhere. On the live site, the four
 * Packaging Machines nav items link directly out to minipack-torre.it (an
 * Italian machinery brand) — meaning Winner Pack currently appears to
 * channel/partner for these machines rather than sell an own-branded line.
 * Listed below are the real category names only, with no invented SKUs.
 * Confirm with the company whether "Winner Pack" branded machines actually
 * exist before re-adding model numbers.
 */
export const machinesSpotlight = [
  "Shrink Wrap Machine",
  "Bundling Machine",
  "Flow Pack Machine",
  "Vacuum Machine",
];

/**
 * TODO: UNVERIFIED — trimmed to industries that are actually named in
 * Winner Pack's own public listings (Pharmaceutical, Cosmetics, Food/FMCG,
 * Stationery). "E-commerce", "Textiles", "Electronics", "Logistics", "Auto
 * Parts", and "Publishing" are plausible given the product line (courier
 * bags, strap, etc.) but are not stated anywhere — confirm before restoring.
 */
export const industries = [
  "Pharmaceutical", "Cosmetics", "Food & FMCG", "Stationery"
];

/**
 * REMOVED — the original array quoted named individuals at Lava
 * International Ltd., Vivo India Manufacturing, and Noise Wearables Pvt.
 * Ltd. as Winner Pack customers. I found no evidence these are real
 * clients. Fabricating quotes and attributing them to identifiable real
 * companies is a false-endorsement risk, not a copy-editing issue — this
 * needs genuine client testimonials (with their sign-off) before this
 * section goes live. Left as an empty array so the component doesn't break.
 */
export const testimonials: { quote: string; name: string; role: string }[] = [];

/**
 * REMOVED — there is no blog on winnerpack.in. These three posts, with
 * specific stats like "98.4% on-time dispatch in 2025," were entirely
 * fabricated. Remove this section from the UI until a real blog exists, or
 * replace with genuine published content.
 */
export const posts: { tag: string; date: string; title: string; read: string }[] = [];

// VERIFIED — matches the real site's WordPress nav menu almost exactly
export const footerCols = [
  {
    title: "Consumable Products",
    links: [
      "Labels",
      "POF Shrink Film",
      "LDPE Shrink Film",
      "PVC Shrink Film",
      "PP/PET Strap",
      "Silicon Tapes",
      "Stretch Films",
      "Bubble Rolls/Pouches",
      "EPE Foam Rolls",
      "Courier Bags",
      "Corrugated Box/ Edge Protectors"
    ],
  },
  {
    title: "Packaging Machines",
    links: [
      "Shrink Wrap Machine",
      "Bundling Machine",
      "Flow Pack Machine",
      "Vacuum Machine"
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Contact"],
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

/**
 * IMPORTANT: winnerpack.in's actual product pages give short qualitative
 * feature/benefit copy, NOT spec-sheet numbers. Where a number below is
 * marked VERIFIED, it's because it's literally stated on the site. Every
 * "basePrice" in the original file (₹2,450/Roll, etc.) is UNVERIFIED —
 * no pricing is published anywhere on winnerpack.in; I've replaced these
 * with "Contact for pricing" rather than inventing numbers.
 */
export const products: Product[] = [
  {
    id: "pet-strap-rolls",
    title: "High-Tensile PET Strap Rolls",
    category: "straps",
    tag: "PET",
    blurb: "Heavy-duty load containment; increasingly used as a steel-strap alternative.",
    // VERIFIED — paraphrased from winnerpack.in/pp-pet-strap/
    longDesc: "PET strap is used to bind stacks of paper and corrugated board as well as full pallets carrying heavier loads such as bricks, wood, or cans, and is increasingly used in place of steel strap. It works with both heat-weld and manual sealing processes, and can be produced in custom dimensions on request.",
    basePrice: "Contact for pricing", // TODO: UNVERIFIED — no pricing published on winnerpack.in
    image: "/images/desktop/products/straps-detail.jpg",
    gallery: ["/images/desktop/products/straps-detail.jpg", "/images/desktop/misc/films-shine.jpg", "/images/desktop/misc/tape-detail.jpg"],
    specs: {
      "Elongation Rate": "15% - 20%", // VERIFIED (corrected from 12-18%)
      "Available Widths": "11, 12, 15, 16, 18, 19 mm", // VERIFIED
      "Sealing Method": "Heat-weld or manual", // VERIFIED
      "Customization": "Custom dimensions available on request", // VERIFIED
      // Tensile strength / core size / surface texture / joint efficiency
      // TODO: UNVERIFIED — removed, not published anywhere. Confirm with
      // the company's engineering/QA team before re-adding.
    },
    options: {
      widths: ["11 mm", "12 mm", "15 mm", "16 mm", "18 mm", "19 mm"], // VERIFIED
      thicknesses: ["Customized on request"], // TODO: UNVERIFIED specific gauges
      colors: ["Customized on request"], // TODO: UNVERIFIED — no PET colors published (only PP strap's "White" standard is confirmed)
    },
    applications: ["Pallet stabilization", "Corrugated board & paper stack strapping", "Heavy load strapping (bricks, wood, cans)"], // VERIFIED
    visualGradients: "from-emerald-400 to-teal-500",
  },
  {
    id: "pp-strap-rolls",
    title: "Polypropylene (PP) Strap Rolls",
    category: "straps",
    tag: "PP",
    blurb: "Versatile strapping for fully and semi-automatic strapping machines.",
    // VERIFIED — paraphrased from winnerpack.in/pp-pet-strap/
    longDesc: "PP strap for fully and semi-automatic strapping machines, produced in a range of widths with customizable thickness, color, and printing to meet different client requirements. Specifications below apply to virgin-grade strap; other grades are available on request.",
    basePrice: "Contact for pricing", // TODO: UNVERIFIED
    image: "/images/desktop/products/straps-detail.jpg",
    gallery: ["/images/desktop/products/straps-detail.jpg", "/images/desktop/misc/tape-detail.jpg"],
    specs: {
      "Elongation Rate": "12% - 15%", // VERIFIED (corrected from 15-22%)
      "Available Widths": "6, 8, 9, 10, 11, 12, 15, 16, 18, 19 mm", // VERIFIED
      "Standard Color": "White (other colors available subject to MOQ)", // VERIFIED
      "Grade": "Virgin grade (other grades available on request)", // VERIFIED
      // Tensile strength / core size / joint efficiency
      // TODO: UNVERIFIED — removed, not published.
    },
    options: {
      widths: ["6 mm", "8 mm", "9 mm", "10 mm", "11 mm", "12 mm", "15 mm", "16 mm", "18 mm", "19 mm"], // VERIFIED
      thicknesses: ["Customized on request"], // TODO: UNVERIFIED specific gauges
      colors: ["White (standard)", "Other colors on request, subject to MOQ"], // VERIFIED
    },
    applications: ["Light-to-medium pallet binding", "Carton reinforcement", "Automatic/semi-automatic strapping lines"], // VERIFIED
    visualGradients: "from-amber-400 to-orange-500",
  },
  {
    id: "pof-shrink-film",
    title: "Polyolefin (POF) Shrink Film",
    category: "shrink",
    tag: "POF",
    blurb: "Cross-linked shrink film used for wrapping food, gift baskets, boxes, toys, and books.",
    // VERIFIED — paraphrased from winnerpack.in/pof-shrink-film/
    longDesc: "A polymer plastic shrink film that tightens over its contents when heat is applied. Commonly used for wrapping food, gift baskets, boxes, toys, and books.",
    basePrice: "Contact for pricing", // TODO: UNVERIFIED
    image: "/images/desktop/misc/films-shine.jpg",
    gallery: ["/images/desktop/misc/films-shine.jpg", "/images/desktop/misc/tape-detail.jpg"],
    specs: {
      // VERIFIED feature list, paraphrased from the real page — NOT a spec
      // sheet, since the site doesn't publish shrink-ratio %, clarity %,
      // or seal-temperature numbers.
      "Optical Properties": "High transparency and gloss",
      "Heat Resistance": "Rated as superior",
      "Stability": "Good stiffness and MD/TD balance",
      "Sealing": "Strong seals; performs across a wide temperature range; no 'dog ears'; doesn't stick to sealing wires/blades",
      // Food-grade / FDA certification claim REMOVED — TODO: UNVERIFIED,
      // do not restore without an actual certificate.
    },
    options: {
      widths: ["Customized on request"], // TODO: UNVERIFIED specific widths
      thicknesses: ["Customized on request"], // TODO: UNVERIFIED specific micron values
      colors: ["Ultra Clear"],
    },
    applications: ["Food wrapping", "Gift baskets", "Box, toy, and book bundling"], // VERIFIED
    visualGradients: "from-sky-400 to-blue-500",
  },
  {
    id: "hand-stretch-film",
    title: "Manual Stretch Film",
    category: "stretch",
    tag: "Manual",
    blurb: "Hand-applied stretch wrap for pallet unitizing and bundling.",
    // VERIFIED — paraphrased from winnerpack.in/stretch-films/
    longDesc: "A highly stretchable plastic film wrapped around items; its elastic recovery keeps loads tightly bound. Commonly used to unitize pallet loads and to bundle smaller items, available in a range of thicknesses with customized widths.",
    basePrice: "Contact for pricing", // TODO: UNVERIFIED
    image: "/images/desktop/misc/films-shine.jpg",
    gallery: ["/images/desktop/misc/films-shine.jpg", "/images/desktop/testimonials/truck-loading.jpg"],
    specs: {
      "Thickness Range": "9 - 55 micron", // VERIFIED
      "Width": "Customized to client requirement", // VERIFIED
      // Pre-stretch ratio / cling type / roll length / core diameter /
      // tensile limit — TODO: UNVERIFIED, removed.
    },
    options: {
      widths: ["Customized on request"], // VERIFIED (site states widths are customized, not fixed SKUs)
      thicknesses: ["9 micron", "20 micron", "35 micron", "55 micron"], // VERIFIED range endpoints + illustrative midpoints within the stated 9-55 micron range
      colors: ["Clear Tint", "Black Opaque"], // TODO: UNVERIFIED specific colors — site doesn't list color options
    },
    applications: ["Palletized warehouse dispatch", "Bundling smaller items"], // VERIFIED
    visualGradients: "from-emerald-300 to-teal-400",
  },
  {
    id: "clear-bopp-tape",
    title: "BOPP Industrial Packaging Tape",
    category: "tapes",
    tag: "BOPP",
    blurb: "Carton-sealing tape in plain, printed, and coloured variants.",
    longDesc: "BOPP tape for sealing corrugated cartons, available as plain, printed, coloured, and silicon (release) variants.", // VERIFIED category existence only — TODO: UNVERIFIED, the product page's specific feature copy wasn't captured; confirm exact wording with the company before publishing marketing copy
    basePrice: "Contact for pricing", // TODO: UNVERIFIED
    image: "/images/desktop/misc/tape-detail.jpg",
    gallery: ["/images/desktop/misc/tape-detail.jpg", "/images/desktop/misc/cog-detail.jpg"],
    specs: {
      // TODO: UNVERIFIED — the original adhesive-micron, tensile N/cm, and
      // shear-adhesion-hours figures are not published on winnerpack.in.
      // Confirm real figures with the company before restoring a specs table.
    },
    options: {
      widths: ["Customized on request"], // TODO: UNVERIFIED
      thicknesses: ["Customized on request"], // TODO: UNVERIFIED
      colors: ["Ultra Clear", "Printed Custom Logo", "Coloured"], // VERIFIED category names only
    },
    applications: ["Carton sealing", "Custom branded packaging"], // VERIFIED (categories only)
    visualGradients: "from-violet-400 to-fuchsia-500",
  },
  {
    id: "shipping-cartons",
    title: "Corrugated Cartons & Boxes",
    category: "corrugated",
    tag: "Corrugated",
    blurb: "Corrugated boxes, rolls, and edge protectors.",
    longDesc: "Corrugated boxes, corrugated rolls, and edge protectors for shipping and warehousing.", // VERIFIED category existence only
    basePrice: "Contact for pricing", // TODO: UNVERIFIED
    image: "/images/desktop/products/warehouse-aerial.jpg",
    gallery: ["/images/desktop/products/warehouse-aerial.jpg", "/images/desktop/testimonials/truck-loading.jpg"],
    specs: {
      // TODO: UNVERIFIED — compression limit, flute type, burst strength,
      // and GSM figures in the original file are not published. Confirm
      // with the company before restoring a specs table.
    },
    options: {
      widths: ["Customized on request"], // TODO: UNVERIFIED
      thicknesses: ["Customized on request"], // TODO: UNVERIFIED
      colors: ["Natural Kraft Brown"], // TODO: UNVERIFIED
    },
    applications: ["Shipping and warehousing", "Edge/corner protection"], // VERIFIED (categories only)
    visualGradients: "from-yellow-400 to-amber-500",
  },
  {
    id: "bubble-wrap-rolls",
    title: "Bubble Roll & Pouches",
    category: "protective",
    tag: "Bubble",
    blurb: "Cushioning rolls and pouches, alongside EPE foam rolls.",
    longDesc: "Bubble roll and pouch packaging for cushioning, offered alongside EPE foam rolls under the same protective packaging line.", // VERIFIED category existence only
    basePrice: "Contact for pricing", // TODO: UNVERIFIED
    image: "/images/desktop/misc/films-shine.jpg",
    gallery: ["/images/desktop/misc/films-shine.jpg", "/images/desktop/products/warehouse-aerial.jpg"],
    specs: {
      // TODO: UNVERIFIED — bubble diameter, GSM, and "100% recyclable"
      // claim in the original file are not published. Confirm before
      // restoring a specs table or a recyclability claim.
    },
    options: {
      widths: ["Customized on request"], // TODO: UNVERIFIED
      thicknesses: ["Customized on request"], // TODO: UNVERIFIED
      colors: ["Translucent Clear"], // TODO: UNVERIFIED
    },
    applications: ["Fragile item cushioning"], // VERIFIED (category-level)
    visualGradients: "from-rose-400 to-pink-500",
  },
  {
    id: "tamper-poly-bags",
    title: "Courier Bags",
    category: "courier",
    tag: "Poly",
    blurb: "Tamper-evident polyethylene courier bags.",
    // VERIFIED — paraphrased from winnerpack.in/courier-bags/
    longDesc: "Courier bags made from durable polyethylene that protect items in transit. Bags are sealed with a void-tape strip so that any attempt to open them shows a visible sign of tampering, and can be customized to requirements.",
    basePrice: "Contact for pricing", // TODO: UNVERIFIED
    image: "/images/desktop/misc/courier-bags.jpg",
    gallery: ["/images/desktop/misc/courier-bags.jpg", "/images/desktop/products/warehouse-aerial.jpg"],
    specs: {
      "Material": "Durable polyethylene", // VERIFIED
      "Security Feature": "Void-tape seal shows visible signs of tampering if opened", // VERIFIED
      "Customization": "Available on request", // VERIFIED
      // Film thickness / adhesive strip mm / recycled-content % — TODO:
      // UNVERIFIED, removed.
    },
    options: {
      widths: ["Customized on request"], // TODO: UNVERIFIED
      thicknesses: ["Customized on request"], // TODO: UNVERIFIED
      colors: ["White/Black Co-ex", "Printed Logo Custom"], // TODO: UNVERIFIED specific finish
    },
    applications: ["E-commerce shipping", "Document & parcel mailing"], // TODO: UNVERIFIED — plausible but not explicitly stated on the courier bags page
    visualGradients: "from-orange-400 to-amber-500",
  },
  // "pallet-stretch-wrapper" REMOVED.
  // The original entry (Automatic Pallet Stretch Wrapper, PLC controls,
  // ₹3,25,000, specific turntable/RPM specs) does not correspond to
  // anything on winnerpack.in. The real site's Packaging Machines menu
  // links straight out to minipack-torre.it (a third-party Italian
  // machinery brand) rather than showing an in-house Winner Pack machine
  // with these specs. If Winner Pack does resell/broker Minipack Torre
  // machines, that should be described honestly (as a partner offering,
  // without invented pricing) rather than as an own-manufactured product.
];

export { Phone, Mail, MapPin, ArrowUpRight };