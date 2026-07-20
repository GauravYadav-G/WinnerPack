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
    text: "Winner Pack Technologies Pvt. Ltd. was established in 2018, based in Ghaziabad, supplying packaging materials and machines."
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
    title: "Full Product & Machine Portfolio",
    // Product/machine category breadth IS verified (matches site nav).
    // "600+ enterprise clients" is the same unverified figure as STATS —
    // removed rather than repeated.
    text: "Expanded into shrink wrap, bundling, flow pack and vacuum packaging machinery alongside a complete range of films, labels, protective packaging and courier bags." // VERIFIED (category breadth only; client count removed — see STATS note)
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
  phone: "+91 120 410 7800", // TODO: CONFLICTS with live site's published +91-8595072187 — confirm before publishing
  phoneHref: "911204107800",
  email: "sales@winnerpack.in", // TODO: CONFLICTS with live site's published info@winnerpack.in — confirm before publishing
  whatsapp: "911204107800",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM" // TODO: UNVERIFIED — not published anywhere
};

/**
 * TODO: UNVERIFIED — none of the specific figures below (lead times, MOQ
 * counts, PCR content, multi-city field service team) appear anywhere.
 * The one thing that IS verified is that PP strap colors are subject to
 * MOQ (stated on the real PP/PET strap page) — but no number is given
 * there, so "1 pallet / 48 rolls" is invented. Replace with real answers
 * from the company rather than publishing specific numbers no one can
 * back up if a customer holds you to them.
 */
export const FAQS = [
  {
    title: "What is your typical lead time for custom printed tapes?",
    content: "TODO: confirm actual lead time with production/sales before publishing a specific day count."
  },
  {
    title: "Do you have Minimum Order Quantities (MOQs)?",
    content: "MOQs apply to some product lines — for example, non-standard PP strap colors are subject to meeting an MOQ. TODO: confirm exact MOQ figures per product line before publishing specific numbers." // VERIFIED that MOQs exist for strap colors; specific figures TODO
  },
  {
    title: "Are your films and strapping recyclable?",
    content: "TODO: confirm recyclability claims and whether PCR (post-consumer recycled) content options actually exist before publishing — this wasn't found on the live site."
  },
  {
    title: "Do you provide on-site machine servicing?",
    content: "TODO: confirm actual service coverage/locations before publishing a specific city list — no evidence of a multi-city field service team was found."
  }
];