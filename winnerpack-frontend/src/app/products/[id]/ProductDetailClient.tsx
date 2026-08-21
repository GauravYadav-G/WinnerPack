"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, CheckCircle2, HelpCircle, ChevronDown } from "lucide-react";
import { productCategories } from "../../../data";
import { Eyebrow } from "@/components/ui/primitives";
import { Button } from "@/components/ui/Button";
import CTABanner from "@/components/CTABanner";

// Layout components
import Navbar, { productHierarchy } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageWrapper from "@/components/PageWrapper";
import { PageHeader } from "@/components/ui/PageHeader";

import { apiFetch } from "@/lib/api";
import { marked } from "marked";
import { initialProducts } from "@/lib/fallback-data";
import OptimizedImage from '@/components/OptimizedImage';
import ProductInquiryModal from "@/components/ProductInquiryModal";
import { PRODUCT_IMAGE_MAP } from "@/components/ProductCard";

function extractFaqs(longDesc?: string) {
  if (!longDesc) return [];
  const faqPatterns = [
    "### Frequently Asked Questions",
    "### FAQ",
    "#### 1. What",
    "#### 1. "
  ];
  let startIdx = -1;
  for (const pattern of faqPatterns) {
    const idx = longDesc.indexOf(pattern);
    if (idx !== -1 && (startIdx === -1 || idx < startIdx)) {
      startIdx = idx;
    }
  }
  if (startIdx === -1) return [];

  const faqText = longDesc.substring(startIdx);
  const regex = /####\s*(\d+\.\s*[^?\n]+\??)\n+([\s\S]*?)(?=(####\s*\d+\.|$))/g;
  const faqs: { question: string; answer: string }[] = [];
  let match;
  while ((match = regex.exec(faqText)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }
  return faqs;
}

function getLongDescWithoutFaq(longDesc?: string) {
  if (!longDesc) return "";
  const faqPatterns = [
    "### Frequently Asked Questions",
    "### FAQ",
    "#### 1. What",
    "#### 1. "
  ];
  let earliestIdx = -1;
  for (const pattern of faqPatterns) {
    const idx = longDesc.indexOf(pattern);
    if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
      earliestIdx = idx;
    }
  }
  if (earliestIdx === -1) return longDesc;
  return longDesc.substring(0, earliestIdx).trim();
}

type ProductFaq = { question: string; answer: string };

const LABEL_PRODUCT_FAQS: Record<string, ProductFaq[]> = {
  "plain-labels": [
    { question: "Which surfaces can plain labels be used on?", answer: "Suitability depends on the face material, adhesive, surface energy, application temperature, and service conditions. A sample test on the final container is recommended before production." },
    { question: "Can plain labels be thermal-transfer printed?", answer: "Yes, when a thermal-transfer-compatible paper or film stock is selected and it is matched to the correct ribbon and printer settings." },
  ],
  "printed-labels": [
    { question: "Which printing method is suitable for my label?", answer: "Digital printing is commonly used for short runs and variable artwork; flexographic printing is generally more efficient for repeat, higher-volume work. The choice also depends on the material, colours, and finishing required." },
    { question: "What should be confirmed before printing?", answer: "Confirm the application surface, label size, artwork, adhesive, finish, and expected storage or handling conditions. A production proof or sample helps validate the result." },
  ],
  "barcode-labels": [
    { question: "How do I select a barcode label material?", answer: "Choose it around the scanning environment, print process, surface, and expected handling. GS1 notes that barcode size, placement, and print quality depend on where the code will be scanned." },
    { question: "Should barcode labels be verified?", answer: "For critical retail, logistics, or healthcare use, a verifier can assess printed-symbol quality against the applicable ISO/IEC and GS1 requirements." },
  ],
  "product-labels": [
    { question: "What information can a product label carry?", answer: "Product labels can carry branding, product name, ingredients or instructions, batch information, barcodes, QR codes, and mandatory declarations where applicable." },
    { question: "How is the right adhesive selected?", answer: "The adhesive should be selected for the actual surface and conditions. Glass and PET behave differently from low-surface-energy plastics such as PE and PP, so application testing is important." },
  ],
  "self-adhesive-labels": [
    { question: "What is a self-adhesive label?", answer: "It is a pressure-sensitive construction comprising a face material, adhesive, and release liner. It bonds when pressure is applied, without heat or solvent activation." },
    { question: "Can self-adhesive labels be used on PE or PP containers?", answer: "They can, but the adhesive must be matched to the low-surface-energy substrate and the application conditions. Trial application is recommended." },
  ],
  "thermal-labels": [
    { question: "What is the difference between direct thermal and thermal transfer?", answer: "Direct thermal media darkens when heated and does not use a ribbon. Thermal transfer uses a heated ribbon to form the image and is generally chosen when longer image life or a wider range of materials is needed." },
    { question: "When is direct thermal not suitable?", answer: "It is less suitable where the printed image will face extended heat, light, or abrasion exposure, because the heat-sensitive material can darken or lose readability." },
  ],
  "thermal-transfer-ribbons": [
    { question: "Which ribbon grade should I choose?", answer: "Wax is often selected for economical paper-label printing; wax/resin offers a balance of print durability and versatility; resin is used where greater resistance is needed on compatible synthetic materials. Always test the ribbon with the chosen label stock." },
    { question: "Why does ribbon orientation matter?", answer: "Thermal-transfer printers require either coated-side-in or coated-side-out ribbon. The required orientation is determined by the printer mechanism." },
  ],
  "tamper-evident-stickers": [
    { question: "What does tamper-evident mean?", answer: "It means the label is designed to show evidence of attempted removal, opening, or alteration. It is an indication feature, not a guarantee that tampering cannot occur." },
    { question: "How should a tamper-evident label be specified?", answer: "Specify the application surface, label size, required indication effect, adhesive, temperature range, and whether the seal must bridge a closure. Validate the construction with an application trial." },
  ],
  "security-void-stickers": [
    { question: "How do VOID labels work?", answer: "When removal is attempted, a VOID message or pattern becomes visible in the label, on the surface, or both, depending on the selected construction." },
    { question: "Can a VOID label be reused?", answer: "A properly selected VOID construction is intended to make removal evident and discourage reuse, but the exact result depends on the surface, adhesive, dwell time, and label material." },
  ],
  "hologram-stickers": [
    { question: "What can a hologram label help with?", answer: "A hologram can provide an overt visual authentication feature and add brand distinction. Higher-security programmes may combine it with serialisation, QR codes, or other physical and digital controls." },
    { question: "Are hologram labels automatically tamper-evident?", answer: "No. Tamper evidence is a separate label construction or feature. It should be specified when the label must show attempted removal." },
  ],
};

const LABEL_PRODUCT_TECHNICAL_FAQS: Record<string, ProductFaq[]> = {
  "plain-labels": [
    { question: "What information is needed for a quotation?", answer: "Provide label width and height, shape, face material preference, adhesive requirement, roll core, labels per roll, printer type, and the application surface." },
    { question: "Why is an application trial important?", answer: "Bond strength can change with surface energy, contamination, texture, temperature, curvature, and dwell time. A trial on representative containers helps confirm the construction." },
  ],
  "printed-labels": [
    { question: "Can labels include variable data?", answer: "Yes. Batch numbers, dates, serial numbers, and codes can be handled through a suitable print workflow, subject to the selected process and artwork requirements." },
    { question: "Can a label be made for curved containers?", answer: "Yes, but curvature, label size, material stiffness, and adhesive selection should be evaluated. Small-diameter containers may require a construction designed to resist edge lift." },
  ],
  "barcode-labels": [
    { question: "Why do quiet zones matter?", answer: "Quiet zones are clear areas around a barcode that help scanners identify the symbol. GS1 guidance treats them as a required element of barcode design." },
    { question: "Which barcode colours scan most reliably?", answer: "High contrast is important. GS1 identifies dark bars on a light background—commonly black on white—as the preferred combination for reliable scanning." },
  ],
  "product-labels": [
    { question: "Can labels be applied to refrigerated or frozen packs?", answer: "Yes, with a construction designed for the application temperature and moisture conditions. The container must be at the specified application temperature when the label is applied." },
    { question: "What causes label lifting or flagging?", answer: "Common causes include unsuitable adhesive, low-surface-energy plastics, contamination, inadequate application pressure, tight container curvature, or applying outside the recommended temperature range." },
  ],
  "self-adhesive-labels": [
    { question: "What is the difference between application and service temperature?", answer: "Application temperature is the temperature at which the label is applied. Service temperature is the range the applied label can experience afterward; both should be checked when selecting adhesive." },
    { question: "Can label material be recycled with the package?", answer: "It depends on the full package and local recycling stream. Material and adhesive choices should be reviewed with the package design and recycling requirements rather than assumed." },
  ],
  "thermal-labels": [
    { question: "How should thermal label life be selected?", answer: "Start with required readability period, light exposure, heat, moisture, abrasion, chemical exposure, and label substrate. Longer or harsher use often requires thermal-transfer media and a matched ribbon." },
    { question: "Do printer settings affect barcode quality?", answer: "Yes. Print speed, darkness, resolution, media, and ribbon matching all affect sharpness and scan performance. Test and verify printed codes at the intended operating settings." },
  ],
  "thermal-transfer-ribbons": [
    { question: "What must be matched with a thermal-transfer ribbon?", answer: "Match the ribbon grade, width, ink orientation, core, printer type, label face material, print speed, and required resistance. Compatibility testing is essential." },
    { question: "Do resin ribbons always give better results?", answer: "Not necessarily. Resin is selected for applications needing higher resistance on compatible materials, but it may require different print energy and is not automatically the best choice for every paper label." },
  ],
  "tamper-evident-stickers": [
    { question: "Are tamper-evident labels tamper-proof?", answer: "No. They provide visible evidence of interference. For high-consequence applications, they should be part of a broader security approach rather than the sole control." },
    { question: "What should be checked before use?", answer: "Check surface cleanliness, label application pressure, dwell time, expected removal pattern, and the final substrate. Manufacturer guidance for VOID materials commonly calls for pretesting." },
  ],
  "security-void-stickers": [
    { question: "What affects the VOID pattern after removal?", answer: "The indication depends on the exact label construction, application surface, adhesion, pressure, dwell time, and removal conditions. It should be tested on the actual pack or document." },
    { question: "Can VOID labels be used on textured or contaminated surfaces?", answer: "Performance may be reduced where the adhesive cannot form a sufficient bond. Clean, dry, representative-surface testing is important before production." },
  ],
  "hologram-stickers": [
    { question: "Which hologram effect should be selected?", answer: "Choose the effect based on the intended verification method, viewing conditions, brand artwork, label size, and security requirement. A supplier proof helps assess both appearance and authentication usability." },
    { question: "Can holograms be combined with digital authentication?", answer: "Yes. Security programmes often combine an overt optical feature with serial numbers, QR codes, or track-and-trace systems, so physical and digital checks support each other." },
  ],
};

function getProductFaqs(product: { id?: string; longDesc?: string }): ProductFaq[] {
  const embeddedFaqs = extractFaqs(product.longDesc);
  if (embeddedFaqs.length > 0) return embeddedFaqs;
  const id = product.id ?? "";
  return [...(LABEL_PRODUCT_FAQS[id] ?? []), ...(LABEL_PRODUCT_TECHNICAL_FAQS[id] ?? [])];
}

const LABEL_PRODUCT_DETAILS: Record<string, string> = {
  "plain-labels": `### Plain Labels: selection before specification

Plain labels are commonly used where variable information, identification, pricing, or handling instructions need to be added later. The correct construction is selected from the application rather than from appearance alone: face material, adhesive, surface, application temperature, and the time the label must remain readable all matter.

Paper face stocks are a practical option for many general-purpose indoor applications. Filmic materials may be considered when greater resistance to moisture, abrasion, or chemical exposure is required. The adhesive must be compatible with the actual package surface; PET and glass behave differently from PE and PP containers.

### What to confirm

- Final container or substrate, including whether it is curved, textured, cold, or likely to be contaminated.
- Printing method, roll core, label direction, size, and labels per roll.
- Required readability period and handling conditions.
- A representative application test before production.

### References

- [Avery Dennison: adhesive selection and surface considerations](https://label.averydennison.com/content/dam/averydennison/lpm-responsive/asia-pacific/en-sa/documents/customer-tools/psg-pcg/asean/pcg-asean-2024.pdf)
- [Zebra: paper and synthetic label-material selection](https://www.zebra.com/content/dam/zebra_dam/en/guide/portfolio/zebra-certified-supplies-guide-selector-en-us.pdf)`,
  "printed-labels": `### Printed labels: artwork, process, and application

Printed labels combine the label construction with fixed product artwork. Digital printing is useful for short runs, versioned artwork, and variable campaigns. Flexographic printing is commonly used for repeat work where a stable design and higher volumes justify the setup. The right process depends on run length, colours, finishing, material, and application method.

Good artwork alone does not guarantee label performance. The construction must also suit the container surface and conditions. Adhesive selection is especially important for low-surface-energy plastics, curved containers, and packs exposed to cold or moisture.

### Production checks

- Confirm final die-line, bleed, barcode area, and mandatory copy before approval.
- Approve a proof or physical sample on the intended container.
- Define the finish only where it supports a real need, such as scuff resistance or a specific visual effect.

### References

- [Avery Dennison: paper and film label applications](https://label.averydennison.com/ap/en_sa/home/products/paper.html)
- [Avery Dennison: adhesive selection guide](https://label.averydennison.com/content/dam/averydennison/lpm-responsive/asia-pacific/en-sa/documents/customer-tools/psg-pcg/asean/pcg-asean-2024.pdf)`,
  "barcode-labels": `### Barcode labels: designed for the scan environment

A barcode label should be designed for the point where it will be scanned: retail POS, warehouse, transport, healthcare, or internal inventory. Symbol type, size, contrast, placement, quiet zones, and print quality all affect scan reliability.

For most applications, dark bars or modules on a light background provide the strongest contrast. Quiet zones must remain clear of text, graphics, cut lines, and packaging edges. Where a barcode is business-critical, it should be verified on the finished label—not only checked in the artwork file.

### Practical checks

- Select the barcode symbology for the actual scanning use case.
- Preserve required quiet zones through printing, trimming, varnishing, and application.
- Test representative labels with the scanners used in the operation.

### References

- [GS1: barcode selection, colour, and print-quality guidance](https://www.gs1.org/standards/barcodes/10-steps-to-barcode-your-product/english)
- [GS1: 2D barcode quiet-zone guidance](https://ref.gs1.org/sme-guidance/2d-barcode-creation-and-printing-playbook/1.0.1/)`,
  "product-labels": `### Product labels: match the label to the pack

Product labels carry brand, product, regulatory, and variable information. Their performance is determined by the package surface and the conditions from application through use. Glass, PET, HDPE, LDPE, PP, coated carton, and metal may require different adhesive behaviour.

Specify whether the label is applied manually or automatically, the container shape, the application temperature, and likely exposure to moisture, oil, refrigeration, abrasion, or sunlight. These inputs are more useful than choosing material solely by appearance.

### Recommended specification inputs

- Container material and surface finish.
- Label dimensions, label position, and curvature.
- Application temperature and expected service conditions.
- Artwork, print method, finish, and any barcode or variable data.

### References

- [Avery Dennison: adhesive selection by surface and temperature](https://label.averydennison.com/content/dam/averydennison/lpm-responsive/asia-pacific/en-sa/documents/customer-tools/psg-pcg/asean/pcg-asean-2024.pdf)
- [Zebra: label materials and application considerations](https://www.zebra.com/us/en/products/supplies/labels-tags.html)`,
  "self-adhesive-labels": `### Self-adhesive labels: construction matters

Self-adhesive labels are pressure-sensitive constructions made from a face material, adhesive, and release liner. Pressure activates the bond during application, but final adhesion develops according to the selected adhesive and the surface conditions.

The selection should separate application temperature from service temperature. A label may be expected to perform in cold storage after application, for example, but still require the pack to be within an appropriate temperature range when the label is first applied. Low-surface-energy plastics such as PE and PP should be specifically identified at the enquiry stage.

### References

- [Avery Dennison: adhesive selection and surface energy](https://label.averydennison.com/content/dam/averydennison/lpm-responsive/asia-pacific/en-sa/documents/customer-tools/psg-pcg/asean/pcg-asean-2024.pdf)
- [Avery Dennison: paper and film label materials](https://label.averydennison.com/eu/en/home/products/paper-labels/ad-rdx-for-paper-and-film-labels.html)`,
  "thermal-labels": `### Thermal labels: choose the print technology first

Direct thermal labels form an image when a heat-sensitive surface passes under the printhead; no ribbon is used. They are typically considered when label life is shorter and exposure to heat, light, or abrasion is limited. Thermal transfer printing uses a heated ribbon to transfer ink to the label and is selected when more durable printing or a broader choice of label materials is needed.

Media, ribbon, printer resolution, print speed, and darkness settings work together. A barcode that looks acceptable to the eye may still be unsuitable for the scanner or environmental conditions it will face.

### References

- [Zebra: direct thermal vs. thermal transfer](https://prod-www.zebra.com/us/en/resource-library/faq/difference-between-direct-thermal-and-thermal-transfer-printing.html)
- [Zebra: thermal label selection factors](https://www.zebra.com/ap/en/resource-library/faq/what-are-thermal-labels.html)`,
  "thermal-transfer-ribbons": `### Thermal transfer ribbons: match ribbon, media, and printer

Thermal transfer ribbons transfer ink to the label when heated by the printhead. Wax, wax/resin, and resin formulations are used for different balances of cost, print quality, and resistance. The receiving label material, printer mechanism, print speed, and environmental requirements determine the suitable grade.

Wax is often used for general paper applications. Wax/resin is used where more resistance is required across compatible papers and films. Resin grades are commonly selected for synthetic materials and demanding exposure conditions, but they need suitable media and printer settings.

### References

- [Ricoh: thermal-transfer ribbon applications and matching](https://www.ricoh.com/products/thermal-transfer-ribbon)
- [Ricoh: ribbon construction and resistance factors](https://awshosted.rei.ricoh.com/support-downloads/technical-support/technical-support-thermal-ttr)`,
  "tamper-evident-stickers": `### Tamper-evident stickers: evidence, not absolute prevention

Tamper-evident labels are designed to reveal attempted removal or opening through a visible indication such as destruction, a pattern, or a message. They are useful for seals on packaging, documents, and assets, but they are not a substitute for a complete security programme where consequences of tampering are high.

The intended indication must be tested on the actual surface. Adhesion can be affected by surface energy, contamination, texture, application pressure, temperature, and dwell time. Specify whether the label needs to bridge a closure, leave an indication, or become non-reusable after removal.

### References

- [3M: tamper-indicating label material and application guidance](https://multimedia.3m.com/mws/media/99634O/7866-data-page.pdf)
- [3M: VOID polyester label material](https://www.3m.com/3M/en_US/p/dc/v000238674/)`,
  "security-void-stickers": `### Security VOID stickers: validate the indication on the real surface

Security VOID stickers are tamper-indicating labels designed to reveal a VOID message or pattern when removal is attempted. The visible effect may appear in the facestock, on the substrate, or both, depending on the construction.

VOID performance is dependent on the bond formed with the substrate. Low-surface-energy, contaminated, or heavily textured surfaces can reduce the expected result. The surface should be clean and dry, the label should receive sufficient application pressure, and testing should follow the recommended dwell time for the selected construction.

### References

- [3M: VOID label material 7381/7866 data sheet](https://multimedia.3m.com/mws/media/2396585O/3m-tamper-indicating-label-material-7381-7866.pdf)
- [3M: tamper-evident label-material range](https://www.3m.com/3M/en_US/p/dc/v000238674/)`,
  "hologram-stickers": `### Hologram stickers: visible authentication as one layer

Hologram stickers provide an overt optical feature that can support quick visual authentication and differentiate genuine packaging or documents. 2D/3D, dot-matrix, flip-flop, kinetic, and other effects should be chosen around the intended verification method, artwork, label size, and production requirements.

For stronger protection, a holographic feature can be combined with serialisation, QR codes, tamper-evident construction, or track-and-trace processes. A hologram alone should not be presented as an absolute anti-counterfeit guarantee; the appropriate level of protection depends on the risk and how verification will be performed.

### References

- [Holostik: security hologram and anti-counterfeiting features](https://www.holostik.com/anti-counterfeiting-solutions-security-holograms-ovds/)
- [Holostik: physical and digital product authentication](https://www.holostik.com/phygital-authentication-making-counterfeiting-virtually-impossible/)`,
};

function getProductDetailContent(product: { id?: string; longDesc?: string }) {
  return LABEL_PRODUCT_DETAILS[product.id ?? ""] ?? getLongDescWithoutFaq(product.longDesc);
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [showAllMobile, setShowAllMobile] = useState(false);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="pt-10 border-t border-[var(--color-line)] space-y-6 font-sans">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-[var(--color-amber-dark)] shrink-0" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
            Frequently Asked Questions
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-mute)] hidden sm:block">
          Find comprehensive answers to common questions about materials, customization, standards, and packaging applications.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = openIdx === index;
          const isHiddenOnMobile = index >= 3 && !showAllMobile;

          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isHiddenOnMobile ? "hidden sm:block" : "block"
                } ${isOpen
                  ? "border-[var(--color-amber)] bg-white shadow-md ring-1 ring-[var(--color-amber)]/30"
                  : "border-[var(--color-line)] bg-[var(--color-mist)] hover:border-slate-300"
                }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 font-sans font-bold text-sm sm:text-base text-[var(--color-ink)] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center h-7 w-7 rounded-lg text-xs font-mono font-black shrink-0 transition-colors ${isOpen ? "bg-[var(--color-amber)] text-[var(--color-blue-deep)]" : "bg-slate-200 text-slate-700"
                    }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[var(--color-amber)]/20 text-[var(--color-amber-dark)]" : "text-slate-400"
                  }`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 text-xs sm:text-sm text-[var(--color-mute)] leading-relaxed border-t border-slate-100 font-sans">
                  <div
                    className="space-y-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-xs [&_li]:sm:text-sm [&_strong]:text-[var(--color-ink)]"
                    dangerouslySetInnerHTML={{ __html: marked.parse(faq.answer) as string }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Show Remaining FAQs Button with Arrow Key */}
      {faqs.length > 3 && (
        <div className="pt-2 text-center sm:hidden">
          <button
            type="button"
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-blue-deep)] shadow-2xs active:bg-slate-50 transition-all"
          >
            <span>{showAllMobile ? "Show fewer FAQs" : `View all ${faqs.length} FAQs`}</span>
            <ChevronDown className={`h-4 w-4 text-[var(--color-amber-dark)] transition-transform duration-300 ${showAllMobile ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  );
}

function getSubcategoryImages(sub: any, parentProduct: any) {
  const images: string[] = [];

  const addImg = (img?: string) => {
    if (img && typeof img === "string" && !img.includes("/stretch-film/image.png") && !images.includes(img)) {
      images.push(img);
    }
  };

  const subId = sub.id || sub.slug;
  if (subId && PRODUCT_IMAGE_MAP[subId]) {
    addImg(PRODUCT_IMAGE_MAP[subId]);
  }

  // 1. Direct sub image
  addImg(sub.image);

  // 2. Direct sub gallery
  if (Array.isArray(sub.gallery)) {
    sub.gallery.forEach((i: string) => addImg(i));
  }

  // 3. Child product lookup in initialProducts
  const childProd = initialProducts.find(
    (p: any) => p.id === subId || p.id === sub.id || p.title?.toLowerCase() === sub.title?.toLowerCase()
  );

  if (childProd) {
    if (PRODUCT_IMAGE_MAP[childProd.id]) {
      addImg(PRODUCT_IMAGE_MAP[childProd.id]);
    }
    addImg(childProd.image);
    if (Array.isArray(childProd.gallery)) {
      childProd.gallery.forEach((i: string) => addImg(i));
    }
    if (Array.isArray(childProd.subCategories)) {
      childProd.subCategories.forEach((cs: any) => {
        if (PRODUCT_IMAGE_MAP[cs.id]) {
          addImg(PRODUCT_IMAGE_MAP[cs.id]);
        }
        addImg(cs.image);
        if (Array.isArray(cs.gallery)) {
          cs.gallery.forEach((i: string) => addImg(i));
        }
      });
    }
  }

  // Fallback to sub.image or parentProduct image
  if (images.length === 0) {
    images.push(
      PRODUCT_IMAGE_MAP[subId] ||
      sub.image ||
      PRODUCT_IMAGE_MAP[parentProduct?.id] ||
      parentProduct?.image ||
      "/images/products/specialty-pouches/image.png"
    );
  }

  return images;
}

function SubcategoryCardImageGallery({ images, title, categoryName }: { images: string[]; title: string; categoryName?: string }) {
  const currentImg = images[0] || "/images/products/specialty-pouches/image.png";

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
      <OptimizedImage
        src={currentImg}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {categoryName && (
        <span className="absolute bottom-3 left-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-md bg-slate-950/60 backdrop-blur-xs shadow-xs">
          {categoryName}
        </span>
      )}
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState<string>("");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Update page title
  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | WinnerPack`;
    }
  }, [product]);

  // Maps navbar subcategory slugs → actual product ID in fallback-data
  const aliasMap: Record<string, string> = {
    // Film Products 11 Main Categories
    "packaging-films": "packaging-films",
    "pof-shrink-film": "pof-shrink-film",
    "lamination-pe-film": "lamination-pe-film",
    "agricultural-films": "agricultural-films",
    "biodegradable-films": "biodegradable-films",
    "flexible-laminates": "flexible-laminates",
    "printed-pe-films": "printed-pe-films",
    "stretch-film": "stretch-film",
    "ldpe-bags": "ldpe-bags",
    "bopp-films": "bopp-films",
    "pvc-shrink-films": "pvc-shrink-films",
    // Labels & Stickers
    "plain-labels": "plain-labels",
    "printed-labels": "printed-labels",
    "barcode-labels": "barcode-labels",
    "product-labels": "product-labels",
    "self-adhesive-labels": "self-adhesive-labels",
    "thermal-labels": "thermal-labels",
    "hologram-stickers": "hologram-stickers",
    "security-void-stickers": "security-void-stickers",
    "tamper-evident-stickers": "tamper-evident-stickers",
    "thermal-transfer-ribbons": "thermal-transfer-ribbons",
    // Tapes
    "bopp-tapes": "bopp-tapes",
    "printed-tapes": "printed-bopp-tapes",
    "colored-tapes": "coloured-bopp-tapes",
    "masking-tapes": "silicon-tapes",
    // PP & PET Strap
    "pp-strap": "pp-strap",
    "printed-pp-strap": "printed-pp-strap",
    "colored-pp-strap": "colored-pp-strap",
    "pet-strap": "pet-strap",
  };
  const targetId = aliasMap[id] ?? id;

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiFetch(`/api/products/${targetId}`, { signal: controller.signal })
      .then(async (productResponse) => {
        if (!productResponse.ok) throw new Error("Product not found");
        return productResponse.json();
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        const fallback = initialProducts.find((p) => p.id === targetId || p.id === id);
        const mappedImg = PRODUCT_IMAGE_MAP[targetId] || PRODUCT_IMAGE_MAP[id] || PRODUCT_IMAGE_MAP[data?.id];
        const mergedData = {
          ...data,
          image: mappedImg || data.image,
          gallery: mappedImg ? [mappedImg, ...(data.gallery || [])] : data.gallery,
          subCategories: (Array.isArray(data.subCategories) && data.subCategories.length > 0)
            ? data.subCategories
            : fallback?.subCategories || [],
        };
        setProduct(mergedData);
        setImg(mappedImg || data.gallery?.[0] || data.image || "");

        setLoading(false);
      })
      .catch((error) => {
        if (controller.signal.aborted || error.name === "AbortError") return;
        let fallbackProduct = initialProducts.find((p) => p.id === targetId || p.id === id);
        if (!fallbackProduct) {
          const parentWithSub = initialProducts.find((p) =>
            p.subCategories?.some((s: any) => s.id === targetId || s.id === id || s.slug === targetId || s.slug === id)
          );
          if (parentWithSub && parentWithSub.subCategories) {
            const sub: any = parentWithSub.subCategories.find((s: any) => s.id === targetId || s.id === id || s.slug === targetId || s.slug === id);
            if (sub) {
              const mappedSubImg = PRODUCT_IMAGE_MAP[sub.id] || PRODUCT_IMAGE_MAP[sub.slug] || sub.image;
              fallbackProduct = {
                id: sub.id || id,
                title: sub.title,
                category: parentWithSub.category,
                tag: sub.subtitle || parentWithSub.tag,
                blurb: sub.blurb || parentWithSub.blurb,
                longDesc: sub.longDesc || sub.blurb || parentWithSub.longDesc,
                image: mappedSubImg || parentWithSub.image,
                gallery: sub.gallery || [mappedSubImg || parentWithSub.image],
                specs: sub.specs || parentWithSub.specs,
                applications: sub.applications || parentWithSub.applications,
                thicknessLengthMatrix: parentWithSub.thicknessLengthMatrix,
                options: parentWithSub.options,
              } as any;
            }
          }
        }

        if (fallbackProduct) {
          const mappedImg = PRODUCT_IMAGE_MAP[targetId] || PRODUCT_IMAGE_MAP[id] || PRODUCT_IMAGE_MAP[fallbackProduct.id];
          if (mappedImg) {
            fallbackProduct = {
              ...fallbackProduct,
              image: mappedImg,
              gallery: fallbackProduct.gallery ? [mappedImg, ...fallbackProduct.gallery.filter((g: string) => g !== mappedImg)] : [mappedImg],
            };
          }
          setProduct(fallbackProduct);
          setImg(mappedImg || fallbackProduct.gallery?.[0] || fallbackProduct.image || "");
        } else {
          setProduct(null);
        }
        setLoading(false);
      });

    return () => controller.abort();
  }, [id, targetId]);

  useEffect(() => {
    if (product?.title) {
      document.title = `${product.title} | WinnerPack`;
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />

        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-amber-2)]" />
              <span className="font-mono text-xs uppercase tracking-widest text-white/60">Loading product application data...</span>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-blue-deep)] text-white">
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <PageWrapper>
          <section className="grid min-h-[70vh] place-items-center bg-[var(--color-blue-deep)] px-6 pt-20 text-center">
            <div>
              <h1 className="font-display text-2xl font-bold">Product Specification Not Found</h1>
              <Link href="/products" className="mt-4 inline-block text-xs font-mono uppercase tracking-widest text-[var(--color-amber)] hover:underline">
                Return to Product Line Catalog
              </Link>
            </div>
          </section>
        </PageWrapper>
        <Footer />
      </div>
    );
  }

  const categoryObj = productCategories.find((c) => c.id === product.category);
  const category = categoryObj?.title || product.category;
  const currentHierarchyCategory = productHierarchy.find(
    (hierarchyCategory) =>
      hierarchyCategory.id === product.category ||
      hierarchyCategory.catSlug === product.category
  );
  const isLabelProduct = product.category === "label-sticker-products";
  const isFilmProduct = Boolean(
    product.category === "film-products" ||
    product.id === "pof-shrink-film" ||
    product.id === "packaging-films" ||
    product.id === "plastic-stretch-film" ||
    product.id === "lamination-films-pouches" ||
    product.id === "lamination-pe-film" ||
    product.id === "film-products"
  );
  const labelParent = isLabelProduct
    ? initialProducts.find((parent) => parent.subCategories?.some((sub: any) => sub.id === product.id))
    : undefined;
  const directProductFaqs = getProductFaqs(product);
  const productFaqs = directProductFaqs.length > 0 ? directProductFaqs : (labelParent ? getProductFaqs(labelParent) : []);
  const productDetailContent = LABEL_PRODUCT_DETAILS[product.id] ?? (labelParent ? getProductDetailContent(labelParent) : getProductDetailContent(product));

  const specs = product.specs ? Object.entries(product.specs).map(([label, value]: any) => ({
    label,
    value,
  })) : [];





  const fallbackParent = initialProducts.find((p) => p.id === product.id || p.id === id || p.id === targetId);
  const displaySubCategories = (Array.isArray(product.subCategories) && product.subCategories.length > 0)
    ? product.subCategories
    : fallbackParent?.subCategories || [];

  const isParentProduct = Boolean(
    displaySubCategories.length > 0 ||
    product?.id === "pof-shrink-film" ||
    product?.id === "packaging-films" ||
    product?.id === "plastic-stretch-film" ||
    product?.id === "lamination-films-pouches" ||
    product?.id === "lamination-pe-film" ||
    product?.id === "film-products"
  );

  return (
    <div className="min-h-screen bg-[#fafafb] text-[var(--color-text)]">
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <PageWrapper>
        {/* ── CASE 1: PARENT PRODUCT / CATEGORY PAGE WITH PROMINENT SUBCATEGORY CARDS ── */}
        {isParentProduct ? (
          <>
            {/* 1. UNIFIED PAGE HEADER MATCHING ALL OTHER PAGES */}
            <PageHeader
              eyebrow="Product Line"
              title={product.title}
              intro={product.blurb}
              align="center"
            />

            {/* 2. PROMINENT SUBCATEGORY / IN-PAGE VARIANTS SECTION */}
            {displaySubCategories.length > 0 && (
              <section id="variants" className="bg-slate-50 py-10 sm:py-14 md:py-16 border-b border-[var(--color-line)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)] mb-1.5 block">
                      {isFilmProduct ? "Industrial Line Navigation" : "Product Variations & Specifications"}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                      {isFilmProduct ? "Explore Industrial Line Options" : "Available Formats & Types"}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600">
                      {isFilmProduct
                        ? "Select a dedicated category line to inspect full sub-product specifications."
                        : `All variations and specifications available under ${product.title}.`}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                    {displaySubCategories.map((sub: any) => {
                      const subImages = getSubcategoryImages(sub, product);
                      const subSlug = sub.id || sub.slug || product.id;

                      if (isFilmProduct) {
                        // Film products navigate to subcategory pages
                        return (
                          <div
                            key={sub.id || sub.title}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-blue-3)]/50 hover:shadow-xl active:scale-[0.99] sm:active:scale-100"
                          >
                            <Link href={`/products/${subSlug}`} className="block relative">
                              <SubcategoryCardImageGallery images={subImages} title={sub.title} categoryName={category || product.title} />
                            </Link>

                            <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-6">
                              <div>
                                <Link href={`/products/${subSlug}`} className="block">
                                  <h3 className="font-display text-[13px] sm:text-xl font-extrabold text-slate-900 group-hover:text-[var(--color-blue)] transition-colors tracking-tight leading-snug line-clamp-1 sm:line-clamp-none">
                                    {sub.title}
                                  </h3>
                                </Link>

                                {sub.blurb && (
                                  <p className="hidden sm:block mt-1 sm:mt-2 text-[11px] sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                                    {sub.blurb}
                                  </p>
                                )}

                                {sub.specs && (
                                  <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2 hidden sm:block">
                                    {Object.entries(sub.specs).slice(0, 4).map(([lbl, val]: any) => (
                                      <div key={lbl} className="flex items-start justify-between gap-2.5 text-xs">
                                        <span className="font-semibold text-slate-900 shrink-0">{lbl}:</span>
                                        <span className="font-medium text-slate-600 text-right leading-tight">{String(val)}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="mt-2.5 pt-2 sm:mt-5 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                                <Link
                                  href={`/products/${subSlug}`}
                                  className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-bold text-[var(--color-ink)] sm:text-[var(--color-blue)] hover:text-[var(--color-blue-2)] transition-colors min-h-[32px] sm:min-h-[40px]"
                                >
                                  <span>Explore range</span>
                                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[var(--color-amber-dark)]" />
                                </Link>
                                <Link
                                  href={`/contact?sku=${subSlug}&title=${encodeURIComponent(sub.title)}`}
                                  className="hidden sm:inline-flex items-center justify-center rounded-full bg-[var(--color-blue-soft)] px-4 py-1.5 text-xs font-bold text-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-white transition-all shadow-2xs"
                                >
                                  Quote
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Labels & Stickers / Tapes: In-page variant cards with full description and instant inquiry trigger
                      return (
                        <div
                          key={sub.id || sub.title}
                          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-[var(--color-amber)]/50 hover:shadow-xl"
                        >
                          <div className="relative">
                            <SubcategoryCardImageGallery images={subImages} title={sub.title} categoryName={category || product.title} />
                          </div>

                          <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                            <div>
                              <h3 className="font-display text-base sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                                {sub.title}
                              </h3>

                              {sub.subtitle && (
                                <p className="text-xs font-semibold text-[var(--color-amber-dark)] mt-1">
                                  {sub.subtitle}
                                </p>
                              )}

                              {sub.blurb && (
                                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                                  {sub.blurb}
                                </p>
                              )}

                              {sub.specs && (
                                <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
                                  {Object.entries(sub.specs).slice(0, 5).map(([lbl, val]: any) => (
                                    <div key={lbl} className="flex items-start justify-between gap-2.5 text-xs">
                                      <span className="font-semibold text-slate-900 shrink-0">{lbl}:</span>
                                      <span className="font-medium text-slate-600 text-right leading-tight">{String(val)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {Array.isArray(sub.applications) && sub.applications.length > 0 && (
                                <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                                  {sub.applications.map((app: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600"
                                    >
                                      {app}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => setIsInquiryOpen(true)}
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-amber-dark)] hover:text-[var(--color-amber)] transition-colors min-h-[36px] cursor-pointer"
                              >
                                <span>Inquire for this specification</span>
                                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              </button>
                              <Link
                                href={`/contact?sku=${product.id}&title=${encodeURIComponent(`${product.title} - ${sub.title}`)}`}
                                className="inline-flex items-center justify-center rounded-full bg-[var(--color-amber-soft)] px-3.5 py-1.5 text-xs font-bold text-[var(--color-amber-dark)] hover:bg-[var(--color-amber)] hover:text-white transition-all shadow-2xs"
                              >
                                Quote
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* 3. STRUCTURED ARTICLE CONTENT (WINNERPACK TYPOGRAPHY & THEMING) */}
            <section className="bg-white py-10 sm:py-16 md:py-20 border-b border-[var(--color-line)] font-sans">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed space-y-6 sm:space-y-8 font-normal font-sans">

                <div className="space-y-4">
                  <Eyebrow>Material Overview</Eyebrow>
                  <p className="text-sm sm:text-base text-[var(--color-ink)] font-medium leading-relaxed">
                    {isLabelProduct
                      ? `${product.title} should be specified around the application surface, print method, adhesive, handling conditions, and required label life. A sample application is the reliable way to confirm performance before a production run.`
                      : `${product.title} is a versatile packaging component used across industrial sectors to safeguard goods during handling, storage, and transport. Final performance depends on the selected material, dimensions, and operating conditions.`}
                  </p>
                </div>

                {product.longDesc ? (
                  <div
                    className="space-y-3.5 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_p]:my-1.5 [&_h2]:font-display [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-ink)] [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-[var(--color-line)] [&_h3]:font-display [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:pt-2 [&_h3]:border-t [&_h3]:border-[var(--color-line)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-2.5 [&_li]:text-xs [&_li]:sm:text-sm [&_li]:text-[var(--color-ink)] [&_li]:marker:text-[var(--color-amber-dark)] [&_li]:marker:font-bold [&_li_p]:my-0 [&_li_p]:inline [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-2.5"
                    dangerouslySetInnerHTML={{ __html: marked.parse(productDetailContent) as string }}
                  />
                ) : (
                  <p>{product.blurb}</p>
                )}

                {/* Key Performance Applications */}
                {Array.isArray(product.applications) && product.applications.length > 0 && (
                  <div className="pt-4 border-t border-[var(--color-line)]">
                    <h3 className="font-display text-lg sm:text-xl font-extrabold text-[var(--color-ink)] mb-4">
                      Key Performance Applications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.applications.map((benefit: string, bIdx: number) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber)]/50 transition-colors"
                        >
                          <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-amber-dark)] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DEDICATED FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
                <FaqSection faqs={productFaqs} />

              </div>
            </section>
          </>
        ) : (
          /* ── CASE 2: SUB-PRODUCT / SPECIFIC DETAIL PAGE (2-COLUMN WITH "OUR PRODUCTS" SIDEBAR) ── */
          <>
            {/* 1. UNIFIED PAGE HEADER MATCHING ALL OTHER PAGES */}
            <PageHeader
              eyebrow={category}
              title={product.title}
              intro={product.blurb}
              align="center"
            >
              <div className="hidden sm:flex flex-row items-center justify-center gap-3 pt-2 w-auto">
                <Button type="button" onClick={() => setIsInquiryOpen(true)} variant="secondary" iconRight className="rounded-xl px-5 py-3 text-sm font-extrabold shadow-lg shadow-black/20 justify-center min-h-[44px]">
                  Request a quote
                </Button>
                <a href="#product-specifications" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 text-center flex items-center justify-center min-h-[44px]">
                  View specifications
                </a>
              </div>
            </PageHeader>

            {/* 2-COLUMN MAIN CONTENT (SIDEBAR + DETAILED CONTENT) */}
            <div className="bg-white py-10 sm:py-14 md:py-16 border-b border-[var(--color-line)] font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                  {/* LEFT SIDEBAR: "OUR PRODUCTS" (MOBILE TOUCH-OPTIMIZED COLLAPSIBLE & DESKTOP FIXED) */}
                  <aside className="w-full lg:hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-4 shadow-2xs">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-amber-dark)]">Product range</p>
                        <h2 className="mt-0.5 font-display text-base font-extrabold text-[var(--color-ink)]">{category}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                          className="px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-xs font-bold text-[var(--color-blue-deep)] flex items-center gap-1.5 shadow-2xs active:scale-95"
                        >
                          <span>{isMobileNavOpen ? "Hide catalog" : "Explore catalog"}</span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isMobileNavOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Mobile Category Menu */}
                    {isMobileNavOpen && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-line)] space-y-4 max-h-[350px] overflow-y-auto scrollbar-none pr-1">
                        {currentHierarchyCategory && (
                          <div className="space-y-1.5">
                            <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-amber-dark)]">
                              {currentHierarchyCategory.title}
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {currentHierarchyCategory.subcategories.map((subcat) => {
                                const isActive = subcat.slug === product.id || subcat.slug === id;
                                return (
                                  <Link
                                    key={subcat.id}
                                    href={`/products/${subcat.slug}`}
                                    onClick={() => setIsMobileNavOpen(false)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-display truncate transition-colors ${isActive
                                        ? "bg-[var(--color-blue-deep)] text-white"
                                        : "bg-white text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-slate-50"
                                      }`}
                                  >
                                    {subcat.title}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </aside>

                  <aside className="hidden w-full shrink-0 rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-5 shadow-2xs lg:block lg:w-72 sm:p-6">
                    <div className="mb-5 pb-3 border-b border-[var(--color-line)]">
                      <h2 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-display tracking-tight">
                        Our Products
                      </h2>
                      <div className="h-0.5 w-10 bg-[var(--color-amber)] rounded-full mt-1.5" />
                    </div>

                    <nav className="space-y-6">
                      {currentHierarchyCategory && (
                          <div className="space-y-2.5">
                            {/* Main Category Header (Navbar Tier 1) */}
                            <span className="block text-[11px] font-mono font-black uppercase tracking-wider text-[var(--color-amber-dark)]">
                              {currentHierarchyCategory.title}
                            </span>

                            {/* Subcategories (Navbar Tier 2) */}
                            <div className="space-y-3 pl-1.5 border-l-2 border-[var(--color-line)]">
                              {currentHierarchyCategory.subcategories.map((subcat) => {
                                const isDirectSubcat =
                                  subcat.slug === product.id ||
                                  subcat.slug === id ||
                                  subcat.id === product.id ||
                                  subcat.title.toLowerCase() === product.title.toLowerCase();

                                const isCurrentSubcat =
                                  isDirectSubcat ||
                                  subcat.items.some(
                                    (it) =>
                                      it.slug === product.id ||
                                      it.slug === id ||
                                      it.name.toLowerCase().trim() === product.title.toLowerCase().trim()
                                  );

                                return (
                                  <div key={subcat.id} className="space-y-1 pl-2">
                                    <Link
                                      href={`/products/${subcat.slug}`}
                                      className={`flex items-center justify-between py-0.5 text-xs sm:text-[13px] font-bold font-display tracking-tight transition-colors ${isDirectSubcat
                                          ? "text-[var(--color-ink)] font-black"
                                          : isCurrentSubcat
                                            ? "text-[var(--color-blue-deep)] font-extrabold"
                                            : "text-[var(--color-ink)] hover:text-[var(--color-amber-dark)]"
                                        }`}
                                    >
                                      <span>{subcat.title}</span>
                                      {isDirectSubcat && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber-dark)] shrink-0 ml-1.5" />
                                      )}
                                    </Link>

                                    {/* Specific Product Items (Navbar Tier 3) */}
                                    <ul className="space-y-1 pl-1">
                                      {subcat.items.map((item) => {
                                        const isActive =
                                          item.slug === product.id ||
                                          item.slug === id ||
                                          item.name.toLowerCase().trim() === product.title.toLowerCase().trim();

                                        return (
                                          <li key={item.name}>
                                            <Link
                                              href={`/products/${item.slug}`}
                                              className={`flex items-center justify-between py-0.5 px-1.5 rounded-md text-xs font-sans transition-colors ${isActive
                                                  ? "font-extrabold text-[var(--color-ink)]"
                                                  : "text-[var(--color-mute)] hover:text-[var(--color-ink)]"
                                                }`}
                                            >
                                              <span className="truncate">{item.name}</span>
                                              {isActive && (
                                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-amber-dark)] shrink-0 ml-1.5" />
                                              )}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                      )}
                    </nav>
                  </aside>

                  {/* RIGHT COLUMN: DETAILED ARTICLE CONTENT */}
                  <main className="flex-1 max-w-4xl space-y-8 text-[var(--color-mute)] text-sm sm:text-base leading-relaxed font-sans font-normal">

                    {/* Top Featured Full-Width Product Image — Touch Responsive */}
                    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm">
                      <div className="aspect-[3/2] w-full overflow-hidden bg-white">
                        <OptimizedImage
                          src={img || product.image || "/images/products/specialty-pouches/image.png"}
                          alt={product.title}
                          className="w-full h-full object-cover object-center transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Standardized Rich Article Content */}
                    <div className="space-y-6 pt-2">
                      {product.blurb && (
                        <p className="text-sm sm:text-base text-[var(--color-ink)] font-medium leading-relaxed">
                          <strong className="text-[var(--color-ink)]">{product.title}</strong> is an advanced, high-performance packaging solution. {product.blurb}
                        </p>
                      )}

                      {product.longDesc && (
                        <div
                          className="space-y-3.5 text-sm sm:text-base text-[var(--color-mute)] leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:text-[var(--color-mute)] [&_p]:leading-relaxed [&_p]:my-1.5 [&_h2]:font-display [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-[var(--color-ink)] [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-[var(--color-line)] [&_h3]:font-display [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:pt-2 [&_h3]:border-t [&_h3]:border-[var(--color-line)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-2.5 [&_li]:text-xs [&_li]:sm:text-sm [&_li]:text-[var(--color-ink)] [&_li]:marker:text-[var(--color-amber-dark)] [&_li]:marker:font-bold [&_li_p]:my-0 [&_li_p]:inline [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-2.5"
                          dangerouslySetInnerHTML={{ __html: marked.parse(productDetailContent) as string }}
                        />
                      )}
                    </div>

                    {/* Benefits Section */}
                    {Array.isArray(product.applications) && product.applications.length > 0 && (
                      <div id="product-specifications" className="pt-6 border-t border-[var(--color-line)] space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-5 w-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                            Key Applications & Benefits
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {product.applications.map((app: string, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)] font-sans shadow-2xs hover:border-[var(--color-amber)]/50 transition-colors"
                            >
                              <CheckCircle2 className="h-4 w-4 text-[var(--color-amber-dark)] shrink-0 mt-0.5" />
                              <span>{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Specifications Table */}
                    {specs.length > 0 && (
                      <div className="pt-6 border-t border-[var(--color-line)] space-y-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-5 w-1 rounded-full bg-[var(--color-amber)] shrink-0" />
                          <h2 className="text-lg sm:text-2xl font-extrabold text-[var(--color-ink)] font-display tracking-tight">
                            Technical Specifications
                          </h2>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] shadow-2xs">
                          <table className="w-full border-collapse text-xs sm:text-sm font-sans">
                            <thead>
                              <tr className="bg-[var(--color-ink)] text-white">
                                <th className="px-3 py-2.5 sm:px-4 sm:py-3 text-left font-bold tracking-wide w-2/5 border-r border-white/10">Specification</th>
                                <th className="px-3 py-2.5 sm:px-4 sm:py-3 text-left font-bold tracking-wide">Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {specs.map((s: any, idx: number) => (
                                <tr
                                  key={s.label}
                                  className={`border-b border-[var(--color-line)] last:border-b-0 transition-colors hover:bg-[var(--color-amber)]/5 ${idx % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                    }`}
                                >
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top break-words">
                                    {s.label}
                                  </td>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-[var(--color-mute)] align-top break-words">{s.value}</td>
                                </tr>
                              ))}
                              {product.options?.widths && (
                                <tr className={`border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-amber)]/5 ${specs.length % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                  }`}>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top break-words">Available Widths</td>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-[var(--color-mute)] align-top break-words">{product.options.widths.join(" · ")}</td>
                                </tr>
                              )}
                              {product.options?.thicknesses && (
                                <tr className={`border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-amber)]/5 ${(specs.length + (product.options?.widths ? 1 : 0)) % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                  }`}>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top break-words">Thickness Options</td>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-[var(--color-mute)] align-top break-words">{product.options.thicknesses.join(" · ")}</td>
                                </tr>
                              )}
                              {product.options?.colors && (
                                <tr className={`border-b border-[var(--color-line)] last:border-b-0 hover:bg-[var(--color-amber)]/5 ${(specs.length + (product.options?.widths ? 1 : 0) + (product.options?.thicknesses ? 1 : 0)) % 2 === 0 ? "bg-white" : "bg-[var(--color-mist)]"
                                  }`}>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 font-bold text-[var(--color-ink)] border-r border-[var(--color-line)] align-top break-words">Colors Available</td>
                                  <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-[var(--color-mute)] align-top break-words">{product.options.colors.join(" · ")}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}



                    {/* DEDICATED FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
                    <FaqSection faqs={productFaqs} />

                    {/* Bottom CTA / Contact Bar */}
                    <div className="pt-8 border-t border-[var(--color-line)]">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[var(--color-mist)] border border-[var(--color-line)] shadow-xs">
                        <div className="text-xs sm:text-sm text-[var(--color-mute)] font-sans">
                          Please contact us on <a href="tel:+918595072187" className="font-bold text-[var(--color-ink)] hover:text-[var(--color-amber-dark)] transition-colors">+91 85950 72187</a> or email us <a href="mailto:info@winnerpack.in" className="font-bold text-[var(--color-ink)] hover:text-[var(--color-amber-dark)] transition-colors">info@winnerpack.in</a> for quotations or custom requirements.
                        </div>
                        <Button
                          type="button"
                          onClick={() => setIsInquiryOpen(true)}
                          className="shrink-0 bg-[var(--color-amber)] text-[var(--color-blue-deep)] hover:bg-[var(--color-amber-dark)] font-bold px-6 py-2.5 rounded-xl shadow-md text-xs sm:text-sm font-sans transition-all"
                        >
                          Send Inquiry
                        </Button>
                      </div>
                    </div>

                  </main>
                </div>
              </div>
            </div>
          </>
        )}


        <CTABanner />
      </PageWrapper>

      <Footer />
      {isInquiryOpen && (
        <ProductInquiryModal
          productId={product.id}
          productTitle={product.title}
          onClose={() => setIsInquiryOpen(false)}
        />
      )}
    </div>
  );
}
