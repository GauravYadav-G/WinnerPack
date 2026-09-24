import { BlogPostType } from "@/components/ui/BlogCard";

/**
 * ============================================================================
 * VERIFICATION NOTE
 * ============================================================================
 * Audited against https://www.winnerpack.in on 15 Jul 2026 and against
 * public company records (MCA/Zaubacorp filings, TradeIndia, IndiaMART).
 *
 * The three blog posts, the STATS block, and most of the FAQS below were
 * fabricated — no blog exists on the live site, and none of the named
 * "authors" (Rajesh Singhal, Dr. Sunita Sharma, Amit Verma) appear in any
 * public record for this company. The only named people on record are the
 * three MCA-listed directors (Ankit Kumar, Neeraj Kumar Yadav, Nikita
 * Chikara) and a Sales Manager listed elsewhere as Nikita Singh.
 *
 * CONTACT INFO CONFLICT: the phone (+91 120 410 7800) and email
 * (sales@winnerpack.in) below do NOT match what's currently published on
 * the live site (+91-8595072187 / info@winnerpack.in). This is a direct
 * contradiction, not just an unpublished fact — confirm which is correct
 * before shipping, and update whichever source (site or this file) is
 * stale, so inquiries don't get split across two contact points.
 * ============================================================================
 */

// REMOVED — no blog exists on winnerpack.in, and the named authors/titles
// (Lead Packaging Engineer, Sustainability Director, VP of Operations)
// don't appear in any record for this company. The specific claims inside
// the posts were also fabricated: "22 years of mill data" is impossible
// for a company founded in 2018 (8 years old), "Dasna hub processes over
// 50 trucks daily" and the 98.4% dispatch figure have no source. Left as
// an empty array so the component doesn't break — populate with real,
// published posts when the blog actually exists.
export const BLOG_POSTS: BlogPostType[] = [];

export function getBlogPostBySlug(slug?: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string) {
  return BLOG_POSTS.filter((p) => p.category === category && p.slug !== currentSlug);
}

export const IMAGES = {
  aboutFactory: "/images/desktop/about/about_factory_production.png",
};

/**
 * Swapped the unverifiable business metrics (tonnage/clients/on-time %)
 * for facts that are actually countable from Winner Pack's own verified
 * catalog — true without needing third-party confirmation. If real
 * tonnage/client/delivery figures become available later, these can be
 * swapped back in.
 */



export const TIMELINE = [
  {
    year: "2018",
    title: "Founded",
    // VERIFIED — winnerpack.in/about/ confirms founding year and name;
    // the specific "focused distributor and trader for Ghaziabad-region
    // manufacturers" framing is embellishment, trimmed to what's stated.
    text: "Winner Pack Technologies Pvt. Ltd. was established to supply quality B2B industrial packaging materials across key sectors."
  },
  {
    year: "2020",
    title: "Incorporated as Pvt. Ltd.",
    // VERIFIED — MCA/Zaubacorp confirm incorporation date (20 June 2020)
    // and the Anand Industrial Estate, Mohan Nagar address as registered
    // at that time. Note: per the company's own recent statement, current
    // operations are now at B.S.T. Industrial Park, Dasna — see COMPANY
    // object below.
    text: "Winner Pack Technologies Pvt. Ltd. was formally incorporated in June 2020."
  },
  {
    year: "2022",
    title: "In-House Manufacturing",
    // TODO: UNVERIFIED — no evidence of owned extrusion/conversion lines
    // anywhere. The real About page describes the company as "supplying"
    // materials, which reads as trading/distribution rather than owning
    // production lines. Confirm with the company before publishing a
    // specific manufacturing-capability claim.
    text: "TODO: confirm whether Winner Pack owns in-house extrusion/conversion equipment, or whether products are sourced from manufacturing partners, before publishing this claim."
  },
  {
    year: "2024",
    title: "Full Product Portfolio",
    // Product/category breadth IS verified (matches site nav).
    // "600+ enterprise clients" is the same unverified figure as STATS —
    // removed rather than repeated.
    text: "Expanded product portfolio across LDPE, POF, Coloured films & pouches, BOPP films & pouches, PVC shrink rolls & pouches, Stretch film, Lamination films & pouches, and Compostable films & pouches."
  }
];

/**
 * ADDRESS: per the company's own recent statement (see prior audit).
 * Public filings/directories still show the older Mohan Nagar address as
 * of this review — likely filing lag, not necessarily wrong, but keep
 * documentation (GST cert, MCA change-of-address filing) on file.
 *
 * PHONE/EMAIL: TODO — CONFLICTS with the live site. winnerpack.in
 * currently publishes +91-8595072187 and info@winnerpack.in. If
 * +91 120 410 7800 / sales@winnerpack.in are the correct, current details,
 * the live site needs updating to match — right now a customer calling
 * the number on the website would reach a different line than what's in
 * this file.
 *
 * HOURS: not published anywhere I could check — plausible but unverified.
 */
export const COMPANY = {
  address: "Winner Pack Technologies Pvt. Ltd. Plot No. 8, B.S.T. Industrial Park (Bhoor Garhi), Khasra No. 2667, Village Dasna, Ghaziabad, Uttar Pradesh, 201015",
  phone: "+91 85950 72187",
  phone2: "+91 74287 70999",
  phoneDisplay: "+91 85950 72187 / +91 74287 70999",
  phoneHref: "918595072187",
  phone2Href: "917428770999",
  email: "info@winnerpack.in",
  whatsapp: "918595072187",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM"
};

export const FAQS = [
  {
    title: "How do I request a quote or inquire about products?",
    content: "You can submit your requirements through our contact form, email us directly at info@winnerpack.in, or reach us via phone or WhatsApp. Please share details such as product type, dimensions, and approximate quantities so our team can provide an accurate quotation."
  },
  {
    title: "Can I order customized sizes and specifications?",
    content: "Yes, we support customization across various packaging materials. You can specify parameters such as roll width, length, thickness, and core size to match your operational equipment and packaging process."
  },
  {
    title: "Can I request product samples before placing an order?",
    content: "Yes, material samples can be arranged upon request so you can test quality, strength, and compatibility with your machinery or application before confirming a bulk order."
  },
  {
    title: "How soon can I expect a response to my inquiry?",
    content: "Our team reviews all incoming inquiries promptly and aims to respond with the necessary product details and pricing within one business day."
  },
  {
    title: "What details should I provide to get an accurate price estimate?",
    content: "To help us provide the most relevant pricing, please share the product category you are interested in, desired dimensions or thickness (microns), intended use or load requirements, and estimated volume."
  },
  {
    title: "Can your team help recommend the right packaging material for our needs?",
    content: "Yes, if you need assistance selecting the most appropriate packaging material, our team can guide you based on your product weight, storage conditions, and handling requirements."
  }
];