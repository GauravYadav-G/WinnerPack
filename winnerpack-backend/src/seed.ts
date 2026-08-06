import mongoose from "mongoose";
import { connectDB } from "./db";
import { Product, Article, Content } from "./models";
import { initialProducts, initialArticles, fallbackData } from "./fallback-data";

// ─── Default Reasons ──────────────────────────────────────────────────────────
const defaultReasons = [
  { title: "Direct Factory Pricing", desc: "No middleman markups with direct plant dispatch." },
  { title: "100% Batch Traceability", desc: "COA quality test certificates per dispatch batch." },
  { title: "High-Yield Formats", desc: "Up to 300% pre-stretch yield lowering cost per pack." },
  { title: "Buffer Stock Guarantee", desc: "Dedicated safety inventory maintained at our plant." },
  { title: "Custom Gauge & Widths", desc: "Precision slitting and custom core dimensions." },
  { title: "Dedicated KAM Support", desc: "Single point of contact for plant supply coordination." },
];

// ─── Default Industries (homepage cards) ─────────────────────────────────────
const defaultIndustriesHomepage = [
  { name: "Food & FMCG", image: "/images/desktop/industries/food_fmcg_industry.png" },
  { name: "Pharma & Healthcare", image: "/images/desktop/industries/pharma_industry.png" },
  { name: "E-Commerce & Logistics", image: "/images/desktop/industries/ecommerce_logistics_industry.png" },
  { name: "Automobile & Engineering", image: "/images/desktop/industries/automobile_industry.png" },
  { name: "Electronics & Electricals", image: "/images/desktop/industries/electronics_industry.png" },
  { name: "Stationery & Corporate", image: "/images/desktop/industries/stationery_industry.png" },
];

// ─── Default Industrial Action ────────────────────────────────────────────────
const defaultIndustrialAction = {
  actionHeader: {
    tag: "REAL-WORLD APPLICATIONS",
    title: "Materials in Industrial Action",
  },
  actionSlides: [
    { id: "action-die-ring-bubble", image: "/images/desktop/portfolio/action_die_ring_bubble.jpg" },
    { id: "stretch-pallet-wrapping", image: "/images/desktop/portfolio/showcase_stretch_pallet_wrapping.png" },
    { id: "action-polymer-granules-hopper", image: "/images/desktop/portfolio/action_polymer_granules_hopper.jpg" },
    { id: "pp-strapping-action", image: "/images/desktop/portfolio/gallery_pp_strapping.png" },
    { id: "action-factory-plant-overview", image: "/images/desktop/portfolio/action_factory_plant_overview.jpg" },
    { id: "heavy-ldpe-bags", image: "/images/desktop/portfolio/showcase_heavy_duty_ldpe_bags.png" },
    { id: "action-extrusion-tower-blue", image: "/images/desktop/portfolio/action_extrusion_tower_blue.jpg" },
    { id: "action-roll-rewinding-slitting", image: "/images/desktop/portfolio/action_roll_rewinding_slitting.jpg" },
  ],
};

// ─── Default Partners / Materials / Certs ────────────────────────────────────
const defaultPartnersMaterialsCerts = {
  partnerHeader: {
    tag: "TRUSTED PARTNERS",
    title: "Brands from all over the world love us!",
    description: "From renowned brands across the globe, our client portfolio showcases the trust and satisfaction of industry leaders, reflecting our commitment to excellence and customer satisfaction.",
    badge1: "Global Brands",
    badge2: "100% Quality QC",
    badge3: "ISO Certified",
  },
  partners: [
    { id: "p_lava", name: "LAVA International", category: "Consumer Electronics & Mobile", logo: "/Brand_logo/lava.png", website: "https://lavamobiles.com" },
    { id: "p_vivo", name: "Vivo Electronics", category: "Smartphones & Mobile Devices", logo: "/Brand_logo/vivo.png", website: "https://vivo.com" },
    { id: "p_noise", name: "NOISE Wearables", category: "Smart Wearables & Audio", logo: "/Brand_logo/noise.png", website: "https://gonoise.com" },
    { id: "p_firebolt", name: "FIRE-BOLTT", category: "Smartwatches & Wearable Tech", logo: "/Brand_logo/firebolt.png", website: "https://fireboltt.com" },
    { id: "p_milton", name: "MILTON Houseware", category: "Consumer Products & Homeware", logo: "/Brand_logo/milton.png", website: "https://milton.in" },
    { id: "p_aiplus", name: "Ai+ Smartphone", category: "Mobile & Smart Accessories", logo: "/Brand_logo/aiplus.png", website: "https://aiplus.com" },
    { id: "p_bosch", name: "BOSCH Global Engineering", category: "Automotive & Industrial Tech", logo: "/Brand_logo/bosch.svg", website: "https://bosch.com" },
  ],
  materials: [
    { id: "m1", name: "Polyolefin (POF) Shrink Resin", code: "POF-5L", image: "/images/products/pof-shrink-rolls/image.png", specs: "12 - 25 Micron Gauge Range", properties: "5-layer cross-linked resin, high clarity, 60% bi-axial shrink ratio." },
    { id: "m2", name: "Low-Density Polyethylene (LDPE)", code: "LDPE-HD", image: "/images/products/ldpe-shrink-film/image.png", specs: "40 - 150 Micron Gauge Range", properties: "High puncture resistance, tough load containment, heavy pallet wrapping." },
    { id: "m3", name: "Biaxially Oriented Polypropylene (BOPP)", code: "BOPP-FILM", image: "/images/products/bopp-centerfolded/image.png", specs: "15 - 40 Micron Gauge Range", properties: "Excellent moisture barrier, high gloss finish, food-grade contact safe." },
    { id: "m4", name: "High-Tensile Polyester (PET) Strap Resin", code: "PET-STRAP", image: "/images/products/pp-strapping/image.png", specs: "12mm - 19mm Band Width", properties: "Replaces steel banding, 450kg+ breaking load, zero elongation slack." },
  ],
  certHeader: {
    tag: "Quality & Compliance",
    title: "Certified Standards You Can Trust",
    description: "Our industrial packaging solutions undergo rigorous international testing and compliance protocols. From sustainable forestry to food-grade safety and ISO quality management, we deliver certified reliability.",
  },
  certs: [
    { id: "fsc", title: "FSC Certified Sustainable Forestry", code: "FSC-CERT", image: "/certifications/fsc.svg", issuer: "Forest Stewardship Council", validity: "Chain of Custody Certified", status: "Active" },
    { id: "iso-22000", title: "ISO 22000:2018 Food Safety Management", code: "ISO-22000", image: "/certifications/iso-22000.svg", issuer: "ISO Accreditation Body", validity: "Food Safety System Certified", status: "Active" },
    { id: "brcgs-pkg", title: "BRCGS Packaging Materials Certificated", code: "BRCGS-AA", image: "/certifications/brcgs-pkg.svg", issuer: "BRCGS Global Standards", validity: "Grade AA Auditor Certified", status: "Certified" },
    { id: "sedex", title: "Sedex Responsible Supply Chain", code: "SEDEX-RED", image: "/certifications/sedex-red.svg", issuer: "Supplier Ethical Data Exchange", validity: "SMETA 4-Pillar Audited", status: "Verified" },
    { id: "fda", title: "FDA Food Contact Safe Compliance", code: "FDA-STAMP", image: "/certifications/fda-stamp.svg", issuer: "US Food & Drug Administration", validity: "21 CFR Direct Food Contact", status: "Active" },
    { id: "din", title: "DIN Geprüft Industrial Compostable", code: "DIN-GEPRUFT", image: "/certifications/din-gepruft.svg", issuer: "DIN CERTCO Germany", validity: "EN 13432 Biodegradable", status: "Certified" },
    { id: "brc-blue", title: "BRC Packaging Certificated Standard", code: "BRC-BLUE", image: "/certifications/brc-blue.svg", issuer: "BRC Packaging Accreditation", validity: "High Hygiene Risk Approved", status: "Verified" },
    { id: "aenor", title: "AENOR Quality Standards Accreditation", code: "AENOR-STD", image: "/certifications/aenor.svg", issuer: "Spanish Standards Association", validity: "European Product Compliance", status: "Active" },
    { id: "reach", title: "REACH ECHA Eco Chemical Safety", code: "REACH-EU", image: "/certifications/reach.svg", issuer: "European Chemicals Agency", validity: "Zero SVHC Chemical Toxins", status: "Active" },
    { id: "iso-14001", title: "ISO 14001:2015 Environmental Management", code: "ISO-14001", image: "/certifications/iso-14001.svg", issuer: "ISO Accreditation Body", validity: "Eco Lifecycle System", status: "Active" },
    { id: "iso-9001", title: "ISO 9001:2015 Quality Management System", code: "ISO-9001", image: "/certifications/iso-9001.svg", issuer: "TÜV NORD Cert GmbH", validity: "Valid Thru 2028", status: "Active" },
  ],
};

// ─── Default Footer ───────────────────────────────────────────────────────────
const defaultFooter = {
  name: "Winner Pack Technologies",
  legalName: "Winner Pack Technologies Pvt. Ltd.",
  phone: "+91 85950 72187",
  phone2: "+91 74287 70999",
  email: "sales@winnerpack.in",
  address: "Plot No - 8, Khasra No 2667, MIN BST Industrial Park, Bhurgharhi, Dasna, Ghaziabad, UP, 201015",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM IST",
  gstin: "09AACCW6640F1Z8",
  cin: "U51909UP2020PTC129759",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Plot%20No.%208,%20B.S.T.%20Industrial%20Park,%20Dasna,%20Ghaziabad&t=&z=13&ie=UTF8&iwloc=&output=embed",
  linkedin: "https://linkedin.com/company/winnerpack",
  youtube: "https://youtube.com",
  instagram: "https://instagram.com",
  whatsapp: "918595072187",
  description: "Winner Pack Technologies Pvt. Ltd. is a manufacturer and supplier of environment-friendly secondary and tertiary packaging materials. Guided by our motto \"We Serve To Deserve\", we supply quality stretch films, strapping rolls, shrink films, and protective packaging solutions to industrial businesses across diverse sectors.",
};

// ─── Default Engineered Solutions (for Journey component) ─────────────────────
const defaultSolutionsData = [
  { slot: "01", question: "Need a responsive point of contact for plant supply coordination?", solution: "Dedicated Key Account Manager for seamless order and dispatch coordination.", appImage: "/images/desktop/journey/solution_dispatch_manager.png", impact: "ACCOUNT MANAGEMENT", spec: "Single Point Contact", challenge: "Dedicated key account manager coordinates all plant orders and dispatches." },
  { slot: "02", question: "Concerned about production line stoppages due to packaging stockouts?", solution: "Buffer stock maintained at our plant for quick and reliable dispatch.", appImage: "/images/desktop/journey/solution_buffer_stock.png", impact: "STOCK SECURITY", spec: "Zero Downtime", challenge: "Buffer stock stored locally at our plant for immediate dispatch." },
  { slot: "03", question: "Facing quality issues with strapping or tape performance in the field?", solution: "Rigorous batch-level elongation, tensile and adhesive testing on every dispatch.", appImage: "/images/desktop/journey/solution_quality_testing.png", impact: "QUALITY CONTROL", spec: "Lab Verified", challenge: "Batch-level elongation, tensile, and adhesive testing on every dispatch." },
  { slot: "04", question: "Looking to improve cost efficiency in packaging material consumption?", solution: "Optimized film gauges and high-yield formats that reduce cost per pack.", appImage: "/images/desktop/journey/solution_pallet_wrapping.png", impact: "COST YIELD", spec: "High Pre-Stretch", challenge: "Optimized film gauges and high-yield formats reduce total packaging cost." },
  { slot: "05", question: "Facing inconsistent delivery schedules from your current supplier?", solution: "Reliable scheduled dispatches to support steady supply chain continuity.", appImage: "/images/desktop/journey/solution_scheduled_dispatch.png", impact: "LOGISTICS", spec: "On-Time Supply", challenge: "Scheduled, reliable dispatches ensure steady supply chain continuity." },
  { slot: "06", question: "Dealing with unexpected price changes and unclear billing from suppliers?", solution: "Transparent contract pricing with no hidden surcharges or surprise escalations.", appImage: "/images/desktop/journey/solution_contract_pricing.png", impact: "TRANSPARENCY", spec: "Contract Fixed", challenge: "Fixed contract pricing with zero hidden surcharges or price jumps." },
  { slot: "07", question: "Looking for sustainable packaging alternatives to reduce material waste?", solution: "Eco-friendly film options and optimized stretch technology for reduced material use.", appImage: "/images/desktop/journey/solution_pcr_eco_film.png", impact: "SUSTAINABILITY", spec: "Eco Friendly", challenge: "Recyclable and compostable film options for lower carbon footprint." },
  { slot: "08", question: "Struggling with roll width, core size, or gauge inconsistencies?", solution: "Precise gauge, width, and length specifications maintained across every production batch.", appImage: "/images/desktop/journey/solution_precision_gauge.png", impact: "PRECISION", spec: "Spec Accurate", challenge: "Consistent specifications maintained across every single production batch." },
];

// ─── Upsert Helper ────────────────────────────────────────────────────────────
async function upsertContent(key: string, data: any) {
  await Content.findOneAndUpdate(
    { key },
    { $setOnInsert: { key, data } },
    { upsert: true, new: true }
  );
  console.log(`  ✓ Content key "${key}" — upserted (existing admin data preserved)`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function seedDatabase() {
  console.log("\n🌱 WinnerPack Master Seed — Starting...\n");
  try {
    await connectDB();
    console.log("✅ Database connected\n");

    // ── 1. Drop Machines collection (removed feature) ─────────────────────────
    console.log("🗑  Dropping machines collection (removed feature)...");
    try {
      const db = mongoose.connection.db;
      if (db) {
        const collections = await db.listCollections({ name: "machines" }).toArray();
        if (collections.length > 0) {
          await db.dropCollection("machines");
          console.log("  ✓ Machines collection dropped");
        } else {
          console.log("  ℹ  Machines collection did not exist, skipping");
        }
      }
    } catch (e) {
      console.warn("  ⚠  Could not drop machines collection:", e);
    }

    // ── 2. Seed Products (full re-seed with all fields) ───────────────────────
    console.log("\n📦 Seeding Products...");
    await Product.deleteMany({});
    const productsWithFullData = initialProducts.map((p: any) => ({
      ...p,
      whatsIncluded: (p as any).whatsIncluded || [
        "FDA & WHO-GMP Compliant",
        "Zero Downtime Tolerance",
        "Full Traceability COA",
        "High Tensile Guarantee",
        "Custom Gauge Options",
        "Engineering Support",
      ],
      applicationSlots: (p as any).applicationSlots || [
        { slotId: 1, title: `${p.title} Primary Application`, image: `/images/products/${p.id}/applications/app-1.png`, description: `Primary high-performance application for ${p.title}.` },
        { slotId: 2, title: `${p.title} Industrial Line`, image: `/images/products/${p.id}/applications/app-2.png`, description: `Automated line throughput and processing with ${p.title}.` },
        { slotId: 3, title: `${p.title} Warehouse & Transport`, image: `/images/products/${p.id}/applications/app-3.png`, description: `Pallet unitization and heavy load transit with ${p.title}.` },
        { slotId: 4, title: `${p.title} Export Packaging`, image: `/images/products/${p.id}/applications/app-4.png`, description: `Export weather protection and bundling for ${p.title}.` },
      ],
      subCategories: (p as any).subCategories || [],
    }));
    const createdProducts = await Product.insertMany(productsWithFullData);
    console.log(`  ✓ ${createdProducts.length} products seeded with full fields`);

    // ── 3. Seed Articles ──────────────────────────────────────────────────────
    console.log("\n📰 Seeding Articles...");
    await Article.deleteMany({});
    const createdArticles = await Article.insertMany(initialArticles);
    console.log(`  ✓ ${createdArticles.length} articles seeded`);

    // ── 4. Upsert all Content keys ────────────────────────────────────────────
    console.log("\n🔑 Upserting Content Keys (existing admin data preserved)...");

    // homepage — includes slides, rightBanner, about, usps + engineered solutions
    await upsertContent("homepage", {
      ...fallbackData,
      solutionsData: defaultSolutionsData,
    });

    // gallery — includes mainHero, portraits, landscapes
    const defaultGallery = {
      mainHero: {
        image: "/images/gallery/team_office_celebration.jpg",
        title: "Winner Pack Team Celebration",
        position: "object-[center_35%]"
      },
      portraits: [
        { id: 1, title: "Team Rafting Expedition", image: "/images/gallery/team_rafting_expedition.jpg" },
        { id: 2, title: "Team River Beach Gathering", image: "/images/gallery/team_river_beach.jpg" },
        { id: 3, title: "Winner Pack Team Tour Group Photo", image: "/images/gallery/new_gallery_2.png" },
      ],
      landscapes: [
        { id: 1, title: "Pouch Converting & Slitting Hall", image: "/images/gallery/gallery_plant_converting.jpg" },
        { id: 2, title: "Winner Pack Corporate Reception", image: "/images/gallery/gallery_office_reception.jpg" },
        { id: 3, title: "Multilayer Blown Film Extrusion Tower", image: "/images/gallery/gallery_extrusion_tower.jpg" },
        { id: 4, title: "Manufacturing Machinery Hall Overview", image: "/images/gallery/gallery_factory_hall.jpg" },
        { id: 5, title: "Automatic High-Speed Slitting Machine", image: "/images/gallery/gallery_slitting_machine.jpg" },
        { id: 6, title: "Team on Tour — Inside the Bus", image: "/images/gallery/new_gallery_1.png", position: "object-left" },
        { id: 7, title: "Winner Pack HQ — Factory Headquarters", image: "/images/gallery/factory_building_facade.jpg" },
      ]
    };

    await upsertContent("gallery", defaultGallery);
    await upsertContent("reasons", { reasons: defaultReasons });
    await upsertContent("industries", { industries: defaultIndustriesHomepage });
    await upsertContent("footer", defaultFooter);
    await upsertContent("partners_materials_certs", defaultPartnersMaterialsCerts);
    await upsertContent("industrial_action", defaultIndustrialAction);

    console.log("\n✅ All content keys seeded successfully!");
    console.log("\n🎉 WinnerPack Master Seed Complete!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database Seeding Failed:", error);
    process.exit(1);
  }
}

seedDatabase();
