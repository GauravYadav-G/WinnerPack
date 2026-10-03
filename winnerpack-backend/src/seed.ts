import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { connectDB } from "./db";
import {
  Product,
  Category,
  Article,
  Content,
  HeroSlide,
  Industry,
  Usp,
  SolutionStep,
  Partner,
  Certification,
  SiteSettings,
  Inquiry,
} from "./models";
import { initialProducts, initialArticles, fallbackData } from "./fallback-data";
import {
  defaultCertifications,
  defaultPartners,
  defaultSolutions,
  defaultIndustries,
  defaultFooter,
  defaultAbout,
} from "./site-defaults";
import { defaultCategories } from "./routes/categories";
import { contentSeeds } from "./content-seeds";

function extractFaqs(longDesc?: string): { question: string; answer: string }[] {
  if (!longDesc) return [];
  const heading = /^(#{1,6})\s+.*(?:frequently asked questions|faq).*$/im.exec(longDesc);
  if (!heading) return [];
  const section = longDesc.slice((heading.index ?? 0) + heading[0].length);
  return Array.from(section.matchAll(/^#{3,6}\s+([^\n]+)\n+([\s\S]*?)(?=^#{3,6}\s+|(?![\s\S]))/gm))
    .map((entry) => ({ question: entry[1].trim(), answer: entry[2].trim() }))
    .filter((faq) => faq.question && faq.answer);
}

export async function seedDatabase() {
  console.log("=================================================");
  console.log("🌱 Starting Complete WinnerPack Database Re-seed");
  console.log("=================================================\n");

  await connectDB();

  // 0. WIPE DISK CONTENT STORE
  console.log("🧹 Clearing local disk content-store cache...");
  const dataDir = path.join(process.cwd(), "data");
  const storeFile = path.join(dataDir, "content-store.json");
  try {
    if (fs.existsSync(storeFile)) {
      fs.unlinkSync(storeFile);
      console.log("  ✅ Deleted stale content-store.json");
    }
  } catch (err) {
    console.warn("  ⚠️ Could not remove content-store.json:", err);
  }

  // 1. WIPE OLD MONGODB COLLECTIONS
  console.log("\n💥 Dropping / clearing all old MongoDB collections...");
  await Promise.all([
    Product.deleteMany({}),
    Category.deleteMany({}),
    Article.deleteMany({}),
    HeroSlide.deleteMany({}),
    Industry.deleteMany({}),
    Usp.deleteMany({}),
    SolutionStep.deleteMany({}),
    Partner.deleteMany({}),
    Certification.deleteMany({}),
    SiteSettings.deleteMany({}),
    Content.deleteMany({}),
    Inquiry.deleteMany({}),
  ]);
  console.log("  ✅ All MongoDB collections wiped clean.");

  // 2. SEED CATEGORIES
  console.log("\n📁 Seeding Product Categories...");
  const seededCategories = await Category.insertMany(defaultCategories);
  console.log(`  ✅ Seeded ${seededCategories.length} product categories.`);

  // 3. SEED PRODUCTS (90 products)
  console.log("\n📦 Seeding Products from fallback data...");
  const preparedProducts = initialProducts.map((p: any) => {
    const extractedFaqs = extractFaqs(p.longDesc);
    const category = p.category === "pp-strap" ? "others" : p.category;

    return {
      ...p,
      category,
      faqs: extractedFaqs.length > 0 ? extractedFaqs : p.faqs || [],
      subCategories: p.subCategories || [],
      specs: p.specs || {},
      status: "published",
      sortOrder: 0,
      seo: {
        metaTitle: `${p.title} | WinnerPack Technologies`,
        metaDescription: p.blurb || `High-performance ${p.title} manufactured by WinnerPack with ISO-certified quality.`,
        keywords: [p.tag, p.title, p.category, "industrial packaging"].filter(Boolean),
      },
    };
  });
  const productResult = await Product.insertMany(preparedProducts);
  console.log(`  ✅ Seeded ${productResult.length} Products successfully.`);

  // 4. SEED ARTICLES / BLOGS
  console.log("\n📝 Seeding Blog Articles...");
  const preparedArticles = initialArticles.map((art: any) => ({
    ...art,
    status: "published",
    author: "Winner Pack Team",
    canonicalUrl: art.canonicalUrl || `https://winnerpack.in/blog/${art.slug}`,
    metaKeywords: art.metaKeywords || `${art.tag}, packaging engineering, industrial packaging, WinnerPack`,
    metaDescription: art.metaDescription || art.excerpt || `Read technical insights on ${art.title}.`,
    publishedAt: new Date(),
  }));
  const articleResult = await Article.insertMany(preparedArticles);
  console.log(`  ✅ Seeded ${articleResult.length} Blog Articles with full SEO fields.`);

  // 5. SEED HERO SLIDES
  console.log("\n🖼️ Seeding Hero Slides...");
  const slides = (fallbackData.slides || []).map((slide: any, idx: number) => ({
    slideId: slide.id || `slide-${idx + 1}`,
    tag: slide.tag,
    title: slide.title,
    heading: slide.heading || slide.title,
    subtitle: slide.subtitle,
    description: slide.description || slide.subtitle,
    image: slide.image,
    desktopMediaUrl: slide.desktopMediaUrl || slide.image,
    mobileMediaUrl: slide.mobileMediaUrl || slide.image,
    ctaLink: "/contact",
    sortOrder: idx,
    isActive: true,
  }));
  if (slides.length > 0) {
    await HeroSlide.insertMany(slides);
    console.log(`  ✅ Seeded ${slides.length} Hero Slides.`);
  }

  // 6. SEED INDUSTRIES
  console.log("\n🏭 Seeding Industries We Serve...");
  const industries = defaultIndustries.map((ind: any, idx: number) => ({
    name: ind.name,
    slug: ind.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    image: ind.image,
    sortOrder: idx,
    isActive: true,
  }));
  await Industry.insertMany(industries);
  console.log(`  ✅ Seeded ${industries.length} Industries.`);

  // 7. SEED USPS
  console.log("\n⭐ Seeding Why Choose Us (USPs)...");
  const usps = (fallbackData.usps || []).map((usp: any, idx: number) => ({
    title: usp.title,
    text: usp.text,
    icon: usp.icon || "Award",
    bgImage: usp.bgImage,
    sortOrder: idx,
    isActive: true,
  }));
  if (usps.length > 0) {
    await Usp.insertMany(usps);
    console.log(`  ✅ Seeded ${usps.length} USPs.`);
  }

  // 8. SEED SOLUTIONS
  console.log("\n⚙️ Seeding Engineered Solutions (Journey)...");
  const solutions = defaultSolutions.map((sol: any, idx: number) => ({
    slot: sol.slot,
    question: sol.question,
    solution: sol.solution,
    challenge: sol.challenge,
    sortOrder: idx,
  }));
  await SolutionStep.insertMany(solutions);
  console.log(`  ✅ Seeded ${solutions.length} Engineered Solutions.`);

  // 9. SEED PARTNERS
  console.log("\n🤝 Seeding Client Brand Partners...");
  const partners = defaultPartners.map((part: any, idx: number) => ({
    name: part.name,
    logo: part.logo,
    sortOrder: idx,
    isActive: true,
  }));
  await Partner.insertMany(partners);
  console.log(`  ✅ Seeded ${partners.length} Client Partners.`);

  // 10. SEED STATUTORY CERTIFICATIONS
  console.log("\n📜 Seeding Certifications...");
  const certifications = defaultCertifications.map((cert: any, idx: number) => ({
    id: cert.id,
    name: cert.name,
    authority: cert.authority,
    imageSrc: cert.imageSrc,
    sortOrder: idx,
  }));
  await Certification.insertMany(certifications);
  console.log(`  ✅ Seeded ${certifications.length} Certifications.`);

  // 11. SEED SITE SETTINGS
  console.log("\n📍 Seeding Site Settings & Footer...");
  await SiteSettings.create({
    ...defaultFooter,
    rightBanner: fallbackData.rightBanner,
    mobileRightBanner: fallbackData.mobileRightBanner,
    aboutTagline: defaultAbout.tagline,
    aboutPara1: defaultAbout.para1,
    aboutPara2: defaultAbout.para2,
    aboutImage1: defaultAbout.image1,
    aboutImage2: defaultAbout.image2,
    aboutStats: defaultAbout.stats,
  });
  console.log("  ✅ Seeded Site Settings.");

  // 12. SEED ALL CMS CONTENT KEYS
  console.log("\n🔄 Seeding Complete Content Store Keys for Website & Studio...");
  await Content.insertMany(contentSeeds);
  console.log(`  ✅ Synchronized ${contentSeeds.length} Content keys into MongoDB.`);

  console.log("\n=================================================");
  console.log("🎉 SUCCESS: Entire database seeded with latest fallback data!");
  console.log("=================================================\n");
}

// Auto-run if executed directly via CLI
if (require.main === module) {
  seedDatabase()
    .then(() => {
      mongoose.disconnect();
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Seeding failed:", err);
      mongoose.disconnect();
      process.exit(1);
    });
}
