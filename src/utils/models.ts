import { Schema, model, models } from "mongoose";

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
  },
  { timestamps: true }
);

const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    tag: { type: String, required: true },
    blurb: { type: String, required: true },
    longDesc: { type: String },
    basePrice: { type: String },
    image: { type: String },
    gallery: { type: [String], default: [] },
    specs: { type: Schema.Types.Mixed, default: {} },
    options: {
      widths: { type: [String], default: [] },
      thicknesses: { type: [String], default: [] },
      colors: { type: [String], default: [] },
    },
    applications: { type: [String], default: [] },
    visualGradients: { type: String },
  },
  { timestamps: true }
);

const MachineSchema = new Schema(
  {
    model: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String },
    desc: { type: String },
    image: { type: String },
    specs: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        }
      ],
      default: []
    },
    highlights: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Inquiry = models.Inquiry || model("Inquiry", InquirySchema);
export const Article = models.Article || model("Article", ArticleSchema);
export const Product = models.Product || model("Product", ProductSchema);
export const Machine = models.Machine || model("Machine", MachineSchema);
