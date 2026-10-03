import mongoose, { Schema } from "mongoose";

// ─── INQUIRY (CRM LEADS) ────────────────────────────────────────────────────────
const NoteSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, default: "Admin" },
  createdAt: { type: Date, default: Date.now },
});

const InquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    company: { type: String, default: "N/A", trim: true, maxlength: 160 },
    lineSpeed: { type: String, default: "Not Specified", trim: true, maxlength: 120 },
    skuProfile: { type: String, default: "General Inquiry", trim: true, maxlength: 160 },
    productRef: { type: String }, // Links to Product.id
    message: { type: String, default: "N/A", trim: true, maxlength: 5000 },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Contacted", "Quoted", "Completed", "Spam"],
    },
    notes: [NoteSchema],
  },
  { timestamps: true }
);

// ─── ARTICLE (BLOG & TECHNICAL GUIDES) ───────────────────────────────────────────
const ArticleSchema = new Schema(
  {
    tag: { type: String, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    read: { type: String, required: true },
    featured: { type: Boolean, default: false },
    excerpt: { type: String },
    body: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    author: { type: String, default: "Winner Pack Team" },
    status: {
      type: String,
      default: "published",
      enum: ["published", "draft", "archived"],
    },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, strict: false }
);

// ─── PRODUCT CATALOG ─────────────────────────────────────────────────────────────
const SubVariantSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    blurb: { type: String },
    longDesc: { type: String },
    image: { type: String },
    gallery: [{ type: String }],
    specs: { type: Schema.Types.Mixed, default: {} },
    applications: [{ type: String }],
    features: [{ type: String }],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subCategoryId: { type: String, index: true },
    distributionItemId: { type: String, index: true },
    distributionItemTitle: { type: String },
    tag: { type: String, required: true },
    blurb: { type: String, required: true },
    longDesc: { type: String },
    image: { type: String },
    gallery: { type: [String], default: [] },
    specs: { type: Schema.Types.Mixed, default: {} },
    subCategories: [SubVariantSchema],
    applications: { type: Schema.Types.Mixed, default: [] },
    features: { type: [String], default: [] },
    visualGradients: { type: String },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
      index: true,
    },
    sortOrder: { type: Number, default: 0 },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true, strict: false }
);

// ─── SITE CMS & HOMEPAGE MODELS ──────────────────────────────────────────────────
const HeroSlideSchema = new Schema(
  {
    slideId: { type: String, required: true, unique: true },
    tag: { type: String, required: true },
    title: { type: String, required: true },
    heading: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    desktopMediaUrl: { type: String },
    mobileMediaUrl: { type: String },
    ctaLink: { type: String, default: "/contact" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const IndustrySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UspSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    icon: { type: String, required: true },
    bgImage: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SolutionStepSchema = new Schema(
  {
    slot: { type: String, required: true },
    question: { type: String, required: true },
    solution: { type: String, required: true },
    challenge: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PartnerSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CertificationSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    authority: { type: String, required: true },
    imageSrc: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SiteSettingsSchema = new Schema(
  {
    name: { type: String, default: "Winner Pack Technologies" },
    legalName: { type: String, default: "Winner Pack Technologies Pvt. Ltd." },
    phone: { type: String, default: "+91 85950 72187" },
    phone2: { type: String, default: "+91 74287 70999" },
    email: { type: String, default: "info@winnerpack.in" },
    address: { type: String, required: true },
    description: { type: String, required: true },
    linkedin: { type: String },
    whatsapp: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    rightBanner: { type: String },
    mobileRightBanner: { type: String },
    aboutTagline: { type: String },
    aboutPara1: { type: String },
    aboutPara2: { type: String },
    aboutImage1: { type: String },
    aboutImage2: { type: String },
    aboutStats: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Backward-compatible JSON content bucket
const ContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

// ─── MAIN CATEGORY PAGE COLLECTIONS ──────────────────────────────────────────
const CategorySubcategorySchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, default: "" },
    blurb: { type: String, default: "" },
    items: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
      },
    ],
  },
  { _id: false }
);

export const CategorySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    catSlug: { type: String, required: true },
    tag: { type: String, default: "" },
    blurb: { type: String, default: "" },
    image: { type: String, default: "" },
    gradient: { type: String, default: "from-sky-400/20 to-blue-500/10" },
    featured: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    subcategories: [CategorySubcategorySchema],
    items: [{ type: String }],
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
export const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);
export const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export const HeroSlide = mongoose.models.HeroSlide || mongoose.model("HeroSlide", HeroSlideSchema);
export const Industry = mongoose.models.Industry || mongoose.model("Industry", IndustrySchema);
export const Usp = mongoose.models.Usp || mongoose.model("Usp", UspSchema);
export const SolutionStep = mongoose.models.SolutionStep || mongoose.model("SolutionStep", SolutionStepSchema);
export const Partner = mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);
export const Certification = mongoose.models.Certification || mongoose.model("Certification", CertificationSchema);
export const SiteSettings = mongoose.models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
