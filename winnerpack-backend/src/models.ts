import mongoose, { Schema } from "mongoose";

const InquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    lineSpeed: { type: String },
    skuProfile: { type: String },
    message: { type: String },
    status: { type: String, default: "Pending", enum: ["Pending", "Contacted", "Completed"] },
  },
  { timestamps: true }
);

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
  },
  { timestamps: true, strict: false }
);

const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    tag: { type: String, required: true },
    blurb: { type: String, required: true },
    longDesc: { type: String },
    image: { type: String },
    gallery: { type: [String], default: [] },
    specs: { type: Schema.Types.Mixed, default: {} },
    options: { type: Schema.Types.Mixed, default: {} },
    applications: { type: Schema.Types.Mixed, default: [] },
    applicationSlots: { type: Schema.Types.Mixed, default: [] },
    subCategories: { type: Schema.Types.Mixed, default: [] },
    whatsIncluded: { type: [String], default: [] },
    features: { type: [String], default: [] },
    visualGradients: { type: String },
  },
  { timestamps: true, strict: false }
);

// Machine section removed — no longer used

const ContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
export const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);
