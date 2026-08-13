import fs from "fs";
import path from "path";
import { jsPDF } from "jspdf";

// Initialize jsPDF document (A4 Portrait, mm units)
const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
});

const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
const margin = 14;
const contentWidth = pageWidth - margin * 2; // 182mm

// WinnerPack Brand Palette
const COLOR_PRIMARY = "#170d49"; // Deep Purple Ink
const COLOR_ACCENT = "#fe8220";  // Vibrant Orange
const COLOR_TEXT = "#1e293b";    // Slate 800
const COLOR_MUTED = "#64748b";   // Slate 500
const COLOR_BG_LIGHT = "#f8fafc";// Slate 50
const COLOR_LINE = "#e2e8f0";    // Slate 200

// Helper: Add Standard Header & Footer on Inner Pages
function addPageHeaderFooter(doc, pageNum, totalPages, pageTitle = "") {
  doc.saveGraphicsState();

  // Header Bar
  doc.setFillColor(COLOR_PRIMARY);
  doc.rect(0, 0, pageWidth, 12, "F");

  doc.setFillColor(COLOR_ACCENT);
  doc.rect(0, 12, pageWidth, 1, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("WINNERPACK TECHNOLOGIES PVT. LTD. | OFFICIAL PRODUCT CATALOG", margin, 8);

  if (pageTitle) {
    doc.setFont("helvetica", "normal");
    doc.text(pageTitle.toUpperCase(), pageWidth - margin, 8, { align: "right" });
  }

  // Footer Bar
  doc.setFillColor(COLOR_BG_LIGHT);
  doc.rect(0, pageHeight - 12, pageWidth, 12, "F");

  doc.setDrawColor(COLOR_LINE);
  doc.setLineWidth(0.3);
  doc.line(0, pageHeight - 12, pageWidth, pageHeight - 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("www.winnerpack.in  |  info@winnerpack.in  |  +91 98188 88484", margin, pageHeight - 5);

  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: "right" });

  doc.restoreGraphicsState();
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 1: COVER PAGE
// ─────────────────────────────────────────────────────────────────────────────

// Top Hero Banner (Deep Purple background with Accent bar)
doc.setFillColor(COLOR_PRIMARY);
doc.rect(0, 0, pageWidth, 115, "F");

doc.setFillColor(COLOR_ACCENT);
doc.rect(0, 115, pageWidth, 4, "F");

// Company Title & Tagline
doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.setFontSize(26);
doc.text("WINNERPACK", margin, 35);

doc.setFontSize(12);
doc.setTextColor(254, 130, 32); // Accent Orange
doc.text("TECHNOLOGIES PVT. LTD.", margin, 43);

doc.setFontSize(9);
doc.setTextColor(226, 232, 240);
doc.setFont("helvetica", "italic");
doc.text('"We Serve To Deserve"', margin, 50);

// Catalog Main Heading
doc.setFont("helvetica", "bold");
doc.setFontSize(24);
doc.setTextColor(255, 255, 255);
doc.text("OFFICIAL B2B PRODUCT CATALOG", margin, 75);

doc.setFontSize(11);
doc.setFont("helvetica", "normal");
doc.setTextColor(203, 213, 225);
doc.text("Comprehensive Technical Specifications & Industrial Product Guide", margin, 84);

doc.setFontSize(9);
doc.setTextColor(254, 130, 32);
doc.setFont("helvetica", "bold");
doc.text("ISO 9001:2015 CERTIFIED MANUFACTURER", margin, 98);

// Company Info Block on Cover
let yPos = 135;

doc.setTextColor(COLOR_PRIMARY);
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("ABOUT WINNERPACK", margin, yPos);
yPos += 7;

doc.setDrawColor(COLOR_ACCENT);
doc.setLineWidth(1);
doc.line(margin, yPos, margin + 40, yPos);
yPos += 8;

doc.setFont("helvetica", "normal");
doc.setFontSize(9.5);
doc.setTextColor(COLOR_TEXT);
const aboutText =
  "WinnerPack Technologies Pvt. Ltd. is a premier B2B manufacturer and distributor of high-performance packaging materials and industrial labelling solutions. Guided by our founding motto \"We Serve To Deserve\", we deliver custom-engineered shrink films, self-adhesive labels, high-tack tapes, and heavy-duty strapping designed for zero-downtime automated packaging lines across India.";

const splitAbout = doc.splitTextToSize(aboutText, contentWidth);
doc.text(splitAbout, margin, yPos);
yPos += splitAbout.length * 5 + 8;

// Core Product Categories Grid on Cover
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(COLOR_PRIMARY);
doc.text("OUR 4 CORE PRODUCT DIVISIONS", margin, yPos);
yPos += 6;

const categories = [
  { name: "1. FILM PRODUCTS", items: "POF, LDPE, BOPP, PVC Shrink, Stretch, Lamination & Compostable" },
  { name: "2. LABELS & STICKERS", items: "Plain, Printed, Barcode, Product, Self-Adhesive & Thermal Labels" },
  { name: "3. TAPES DIVISION", items: "BOPP Packaging Tapes, Custom Printed Tapes, Coloured & Silicone Tapes" },
  { name: "4. STRAPPING DIVISION", items: "PP Strap, Printed PP Strap, Coloured PP Strap & Heavy-Duty PET Strap" },
];

categories.forEach((cat, idx) => {
  const boxX = margin + (idx % 2) * 94;
  const boxY = yPos + Math.floor(idx / 2) * 22;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.roundedRect(boxX, boxY, 88, 18, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(cat.name, boxX + 4, boxY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED);
  const splitCat = doc.splitTextToSize(cat.items, 80);
  doc.text(splitCat[0], boxX + 4, boxY + 12);
});

yPos += 50;

// Corporate Contact & Factory Address Box
doc.setFillColor(23, 13, 73);
doc.rect(margin, yPos, contentWidth, 38, "F");

doc.setTextColor(254, 130, 32);
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("CORPORATE HEADQUARTERS & MANUFACTURING PLANT", margin + 6, yPos + 8);

doc.setFontSize(8.5);
doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "normal");
doc.text("Plant Address: Plot No. B-34, Site-C, Surajpur Industrial Area, Greater Noida / Ghaziabad, UP, India", margin + 6, yPos + 16);
doc.text("Sales Desk: +91 98188 88484 | Direct Line: +91 99100 00000 | Email: info@winnerpack.in", margin + 6, yPos + 23);
doc.text("Website: www.winnerpack.in | Quality Certifications: ISO 9001:2015 · FDA · WHO-GMP · BRCGS", margin + 6, yPos + 30);


// ─────────────────────────────────────────────────────────────────────────────
// PAGE 2: FILM PRODUCTS DIVISION
// ─────────────────────────────────────────────────────────────────────────────
doc.addPage();

yPos = 20;
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(COLOR_PRIMARY);
doc.text("DIVISION 1: INDUSTRIAL FILM PRODUCTS", margin, yPos);
yPos += 6;

doc.setDrawColor(COLOR_ACCENT);
doc.setLineWidth(1);
doc.line(margin, yPos, margin + 50, yPos);
yPos += 8;

const filmProducts = [
  {
    name: "POF Shrink Film",
    sku: "WP-POF-SHRINK-FILM",
    specs: "Caliper: 12µm - 25µm | Width: 150mm - 1200mm | Shrink: 65% MD / 60% TD",
    desc: "5-layer co-extruded polyolefin shrink film with exceptional optical clarity, puncture resistance, and food-grade FDA compliance for high-speed automatic L-sealers.",
    sub: "1. Centerfolded POF Rolls  2. Pre-cut POF Shrink Bags"
  },
  {
    name: "LDPE Shrink Film",
    sku: "WP-LDPE-SHRINK-FILM",
    specs: "Caliper: 30µm - 150µm | Width: 200mm - 2400mm | Tensile: > 22 MPa",
    desc: "Heavy-duty low-density polyethylene shrink wrap engineered for bundling beverages, canned goods, building materials, and heavy industrial pallet loads.",
    sub: "1. Industrial LDPE Pallet Wrap  2. Heavy-Duty Gusseted LDPE Bags"
  },
  {
    name: "Coloured Shrink Film & Pouches",
    sku: "WP-COLOURED-SHRINK-FILM",
    specs: "Caliper: 15µm - 100µm | Colors: Opaque Blue, Red, Black, Green, Amber",
    desc: "UV-stabilized opaque and tinted color shrink films designed for tamper-proof security, UV light barrier protection, and instant inventory batch identification.",
    sub: "1. Opaque Security Color Rolls  2. Custom Tinted Shrink Pouches"
  },
  {
    name: "BOPP Film & Pouches",
    sku: "WP-BOPP-FILM",
    specs: "Caliper: 15µm - 50µm | Clarity: > 98% Gloss | Seal Range: 105°C - 140°C",
    desc: "Biaxially Oriented Polypropylene film providing barrier against moisture and aroma. Ideal for food packaging, confectionery, and printed overwrapping.",
    sub: "1. High-Clarity BOPP Rolls  2. Heat-Sealable BOPP Pouches"
  },
  {
    name: "PVC Shrink Rolls & Pouches",
    sku: "WP-PVC-SHRINK-FILM",
    specs: "Caliper: 25µm - 60µm | Shrink Temp: 100°C - 140°C | Gloss: High Sparkle",
    desc: "Low-temperature quick-shrink PVC film delivering crisp contour fitting for retail cosmetic bottles, stationery sets, and tamper-evident cap seals.",
    sub: "1. PVC Shrink Sleeves & Tubing  2. Pre-Formed PVC Cut Shrink Pouches"
  },
  {
    name: "Pallet Stretch Wrap Film",
    sku: "WP-STRETCH-FILM",
    specs: "Caliper: 12µm - 35µm | Pre-Stretch: Up to 300% | Tack: Single/Double Sided",
    desc: "High-yield cast stretch wrap with silent unwind and extreme load retention strength for manual hand wrapping or fully automated high-speed turntable machines.",
    sub: "1. Manual Hand-Wrap Rolls  2. High-Speed Machine Stretch Rolls"
  },
  {
    name: "Lamination Film",
    sku: "WP-LAMINATION-FILM",
    specs: "Caliper: 12µm - 75µm | Finish: High Gloss / Velvet Matt | Bond: Superior",
    desc: "Thermal and cold lamination films engineered for flexible packaging laminates, printed carton board protection, and high-end luxury box finishing.",
    sub: "1. Gloss Lamination Rolls  2. Matt Finish Lamination Rolls"
  },
  {
    name: "Compostable Packaging Film",
    sku: "WP-COMPOSTABLE-PACKAGING",
    specs: "Caliper: 15µm - 60µm | Material: PBAT + PLA Blend | Cert: EN 13432",
    desc: "100% biodegradable and compostable biopolymer film breaking down naturally within 180 days. Food-contact safe and eco-friendly sustainable alternative.",
    sub: "1. Compostable Shrink & Wrap Rolls  2. Bio-Degradable Packaging Bags"
  }
];

filmProducts.forEach((prod, pIdx) => {
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 27, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(prod.name, margin + 4, yPos + 5.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_ACCENT);
  doc.text(`SKU: ${prod.sku}`, margin + 110, yPos + 5.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLOR_TEXT);
  doc.text(`Specs: ${prod.specs}`, margin + 4, yPos + 10.5);

  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED);
  const splitDesc = doc.splitTextToSize(prod.desc, contentWidth - 8);
  doc.text(splitDesc[0], margin + 4, yPos + 15.5);

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(`Sub-Categories: ${prod.sub}`, margin + 4, yPos + 21.5);

  yPos += 30;
});


// ─────────────────────────────────────────────────────────────────────────────
// PAGE 3: LABELS & STICKERS DIVISION
// ─────────────────────────────────────────────────────────────────────────────
doc.addPage();

yPos = 20;
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(COLOR_PRIMARY);
doc.text("DIVISION 2: LABELS & STICKERS", margin, yPos);
yPos += 6;

doc.setDrawColor(COLOR_ACCENT);
doc.setLineWidth(1);
doc.line(margin, yPos, margin + 50, yPos);
yPos += 8;

const labelProducts = [
  {
    name: "Plain Paper Labels",
    sku: "WP-PLAIN-LABELS",
    specs: "GSM Range: 60 - 90 GSM | Adhesive: Water-based Acrylic / Hotmelt | Form: Rolls & Sheets",
    desc: "High-whiteness plain paper labels suitable for variable data printing, shipping tags, retail box identification, and container labeling.",
    sub: "1. Sheeted Plain Paper Labels  2. Continuous Roll Paper Labels"
  },
  {
    name: "Custom Printed Labels",
    sku: "WP-PRINTED-LABELS",
    specs: "Colors: Up to 8 Colors Flexo / Digital | Finish: UV Varnish / Foil Stamping | Format: Roll",
    desc: "Custom printed labels manufactured using digital, flexographic, and wide-format printing for vibrant brand representation and product shelf appeal.",
    sub: "1. Multi-Color Flexo Printed Labels  2. High-Definition Digital Roll Labels"
  },
  {
    name: "Barcode & Logistics Labels",
    sku: "WP-BARCODE-LABELS",
    specs: "Scan Rate: 100% Grade A Barcode Verification | Symbology: Code 128, QR, EAN-13, GS1 DataMatrix",
    desc: "Regulatory compliance barcode labels engineered for full supply chain visibility, incoming/outgoing product tracking, and automated warehouse scanning.",
    sub: "1. Warehouse Location Barcode Labels  2. Thermal Transfer Barcode Rolls"
  },
  {
    name: "Prime Product Labels",
    sku: "WP-PRODUCT-LABELS",
    specs: "Substrates: Chromo Paper, Clear PP, Metallic PET | Resistance: Oil, Water & Chemical Proof",
    desc: "Premium product labels tailored for cosmetics, food jars, beverage bottles, and pharma containers with high tack and moisture resistance.",
    sub: "1. Metallic Foil Product Labels  2. Clear 'No-Label-Look' Film Labels"
  },
  {
    name: "Self-Adhesive Pressure Sensitive Labels",
    sku: "WP-SELF-ADHESIVE-LABELS",
    specs: "Adhesive Types: Permanent, Removable, Deep-Freeze Grade | Release Liner: Glassine / PET",
    desc: "Versatile pressure-sensitive adhesive labels offering immediate adhesion to glass, plastic, corrugated cartons, and stainless steel surfaces.",
    sub: "1. Permanent Acrylic Self-Adhesive Rolls  2. Removable Non-Residue Sheets"
  },
  {
    name: "Direct Thermal & Thermal Transfer Labels",
    sku: "WP-THERMAL-LABELS",
    specs: "Top-coat: Smudge & Heat Proof | Compatibility: Zebra, TSC, Godex, SATO, Citizen Printers",
    desc: "Direct thermal paper labels and thermal transfer ribbon-compatible synthetic labels for courier shipping labels, pharma vials, and cold storage tracking.",
    sub: "1. Direct Thermal (DT) Paper Labels  2. Thermal Transfer (TT) Synthetic Labels"
  }
];

labelProducts.forEach((prod) => {
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 34, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(prod.name, margin + 4, yPos + 6.5);

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_ACCENT);
  doc.text(`SKU: ${prod.sku}`, margin + 110, yPos + 6.5);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLOR_TEXT);
  doc.text(`Specs: ${prod.specs}`, margin + 4, yPos + 12.5);

  doc.setFontSize(8);
  doc.setTextColor(COLOR_MUTED);
  const splitDesc = doc.splitTextToSize(prod.desc, contentWidth - 8);
  doc.text(splitDesc[0], margin + 4, yPos + 18.5);
  if (splitDesc[1]) {
    doc.text(splitDesc[1], margin + 4, yPos + 23.5);
  }

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(`Sub-Categories: ${prod.sub}`, margin + 4, yPos + 29.5);

  yPos += 38;
});


// ─────────────────────────────────────────────────────────────────────────────
// PAGE 4: TAPES & STRAPPING DIVISIONS
// ─────────────────────────────────────────────────────────────────────────────
doc.addPage();

yPos = 20;
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(COLOR_PRIMARY);
doc.text("DIVISION 3: TAPES DIVISION", margin, yPos);
yPos += 5;

doc.setDrawColor(COLOR_ACCENT);
doc.setLineWidth(1);
doc.line(margin, yPos, margin + 40, yPos);
yPos += 7;

const tapeProducts = [
  { name: "BOPP Packaging Tapes", sku: "WP-BOPP-TAPES", specs: "Caliper: 38µm - 60µm | Widths: 12mm - 72mm | Tack: Heavy Acrylic", desc: "High-tack carton sealing tapes for manual hand dispensers and automatic taping machines.", sub: "1. Manual Hand-Dispenser Tapes  2. Automated Machine-Roll Tapes" },
  { name: "Printed BOPP Tapes", sku: "WP-PRINTED-BOPP-TAPES", specs: "Caliper: 40µm - 65µm | Colors: Up to 4 Colors | Print: Corona Treated", desc: "Custom corporate logo and tamper-evident warning security printed tapes for brand promotion.", sub: "1. Custom Corporate Logo Tapes  2. Pre-Printed Security Warning Tapes" },
  { name: "Coloured BOPP Tapes", sku: "WP-COLOURED-BOPP-TAPES", specs: "Caliper: 40µm - 60µm | Colors: Red, Blue, Green, Yellow, White, Black", desc: "Vibrant color-coded inventory management and quick security identification BOPP tapes.", sub: "1. Primary Color Identification Tapes  2. Secondary Security Colored Tapes" },
  { name: "Silicone Bag & Repair Tapes", sku: "WP-SILICON-TAPES", specs: "Thickness: 0.5mm - 1.5mm | Temp: -50°C to +260°C | Self-Fusing", desc: "Self-fusing silicone rubber leak repair tapes and high-tack bag closing tapes.", sub: "1. Self-Fusing Silicone Repair Tapes  2. High-Tack Silicone Bag Sealing Tapes" }
];

tapeProducts.forEach((prod) => {
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 23, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(prod.name, margin + 4, yPos + 5.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_ACCENT);
  doc.text(`SKU: ${prod.sku}`, margin + 110, yPos + 5.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLOR_TEXT);
  doc.text(`Specs: ${prod.specs}`, margin + 4, yPos + 10.5);

  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED);
  doc.text(prod.desc, margin + 4, yPos + 15.5);

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(`Sub-Categories: ${prod.sub}`, margin + 4, yPos + 20);

  yPos += 26;
});

yPos += 4;
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(COLOR_PRIMARY);
doc.text("DIVISION 4: STRAPPING DIVISION", margin, yPos);
yPos += 5;

doc.setDrawColor(COLOR_ACCENT);
doc.setLineWidth(1);
doc.line(margin, yPos, margin + 40, yPos);
yPos += 7;

const strapProducts = [
  { name: "PP Strapping Rolls", sku: "WP-PP-STRAP", specs: "Width: 9mm - 19mm | Break Load: Up to 350 kg | Core: 200mm / 406mm", desc: "Virgin polypropylene strapping engineered for friction weld, heat seal, and metal seal strapping tools.", sub: "1. Automatic Machine PP Strap Rolls  2. Manual & Semi-Auto PP Strap Rolls" },
  { name: "Printed PP Strapping", sku: "WP-PRINTED-PP-STRAP", specs: "Width: 12mm - 16mm | Print: One/Two Side Brand Logo & Caution", desc: "Corporate logo printed PP strapping providing anti-theft security and brand visibility.", sub: "1. Corporate Branded Logo PP Strap  2. Security Warning Printed PP Strap" },
  { name: "Colored PP Strapping", sku: "WP-COLORED-PP-STRAP", specs: "Width: 9mm - 15mm | Colors: Yellow, Blue, Red, Green, Black", desc: "Color-coded strapping for quick pallet identification and warehouse batch sorting.", sub: "1. Primary Color Identification PP Straps  2. Heavy-Duty Colored Packaging Straps" },
  { name: "Heavy-Duty PET Strap", sku: "WP-PET-STRAP", specs: "Width: 12mm - 19mm | Break Load: Up to 900 kg | Finish: Embossed / Smooth", desc: "High-tensile Polyester strapping offering steel-like shock resistance for export pallets and heavy metal loads.", sub: "1. Standard Industrial PET Strap  2. Extra Heavy Export PET Strap" }
];

strapProducts.forEach((prod) => {
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 23, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(prod.name, margin + 4, yPos + 5.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_ACCENT);
  doc.text(`SKU: ${prod.sku}`, margin + 110, yPos + 5.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLOR_TEXT);
  doc.text(`Specs: ${prod.specs}`, margin + 4, yPos + 10.5);

  doc.setFontSize(7.5);
  doc.setTextColor(COLOR_MUTED);
  doc.text(prod.desc, margin + 4, yPos + 15.5);

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(`Sub-Categories: ${prod.sub}`, margin + 4, yPos + 20);

  yPos += 26;
});


// ─────────────────────────────────────────────────────────────────────────────
// PAGE 5: QUALITY GUARANTEES & CONTACT BACK COVER
// ─────────────────────────────────────────────────────────────────────────────
doc.addPage();

yPos = 20;
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.setTextColor(COLOR_PRIMARY);
doc.text("QUALITY ASSURANCE & COMPLIANCE STANDARDS", margin, yPos);
yPos += 6;

doc.setDrawColor(COLOR_ACCENT);
doc.setLineWidth(1);
doc.line(margin, yPos, margin + 60, yPos);
yPos += 10;

const qaItems = [
  { title: "ISO 9001:2015 Quality Management", desc: "Every manufacturing batch undergoes calibrated tensile, elongation, gauge thickness, and adhesive tack testing in our internal QA lab." },
  { title: "FDA & WHO-GMP Polymer Compliance", desc: "100% virgin food & pharma grade raw polymer resins ensuring zero toxic migration for food, cosmetic, and medical primary packaging." },
  { title: "Batch Traceability & COA Issuance", desc: "A Certificate of Analysis (COA) with complete raw material lot numbers and lab test metrics is dispatched with every customer shipment." },
  { title: "Zero Downtime Tolerance Guarantee", desc: "Calibrated width tolerances (±1mm) and caliper accuracy (±2 micron) guarantee seamless high-speed operation on automatic packaging lines." }
];

qaItems.forEach((qa) => {
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, yPos, contentWidth, 22, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(COLOR_PRIMARY);
  doc.text(qa.title, margin + 4, yPos + 6);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(COLOR_MUTED);
  const splitQA = doc.splitTextToSize(qa.desc, contentWidth - 8);
  doc.text(splitQA, margin + 4, yPos + 12);

  yPos += 27;
});

yPos += 10;

// Final CTA Back Cover Box
doc.setFillColor(23, 13, 73);
doc.rect(margin, yPos, contentWidth, 80, "F");

doc.setTextColor(254, 130, 32);
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("REQUEST A CUSTOM QUOTE OR TECHNICAL SAMPLE KIT", margin + 10, yPos + 14);

doc.setTextColor(255, 255, 255);
doc.setFontSize(9.5);
doc.setFont("helvetica", "normal");
doc.text("Need custom roll width slitting, specific micron calipers, or branded pre-printed tapes?", margin + 10, yPos + 23);
doc.text("Our packaging engineers provide on-site line audits, free sample roll kits, and volume quotes within 2 hours.", margin + 10, yPos + 30);

doc.setDrawColor(254, 130, 32);
doc.setLineWidth(0.5);
doc.line(margin + 10, yPos + 37, margin + contentWidth - 10, yPos + 37);

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(254, 130, 32);
doc.text("CONTACT OUR PACKAGING SALES TEAM:", margin + 10, yPos + 46);

doc.setFontSize(9);
doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "normal");
doc.text("Phone / WhatsApp: +91 98188 88484  |  Landline: +91 99100 00000", margin + 10, yPos + 54);
doc.text("Email Inquiries: info@winnerpack.in", margin + 10, yPos + 61);
doc.text("Official Website: www.winnerpack.in", margin + 10, yPos + 68);


// Add page header & footer to all 5 pages
const totalPages = doc.internal.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  if (i > 1) {
    let title = "";
    if (i === 2) title = "Film Products Division";
    if (i === 3) title = "Labels & Stickers Division";
    if (i === 4) title = "Tapes & Strapping Division";
    if (i === 5) title = "Quality Compliance & Contact";
    addPageHeaderFooter(doc, i, totalPages, title);
  }
}

// Write generated PDF to public directory
const outputDir = path.join(process.cwd(), "public");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, "WinnerPack_Product_Catalog_2026.pdf");
const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
fs.writeFileSync(outputPath, pdfBuffer);

console.log(`✅ WinnerPack Product Catalog PDF generated successfully at: ${outputPath}`);
