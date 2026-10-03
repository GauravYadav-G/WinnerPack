import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { connectDB } from "../db";
import {
  Product,
  Inquiry,
  Article,
  Category,
  HeroSlide,
  Industry,
  Usp,
  SolutionStep,
  Partner,
  Certification,
  SiteSettings,
  Content,
} from "../models";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Map collection keys to Mongoose models
export const MODEL_MAP: Record<string, { model: mongoose.Model<any>; label: string; icon: string; desc: string }> = {
  products: {
    model: Product,
    label: "Products Catalog",
    icon: "Package",
    desc: "Industrial films, pouches, tapes, labels, specs & technical matrices",
  },
  inquiries: {
    model: Inquiry,
    label: "Inquiries & CRM Leads",
    icon: "Inbox",
    desc: "Incoming RFQs, customer contact records, line speed & quote statuses",
  },
  articles: {
    model: Article,
    label: "Blog Articles & Guides",
    icon: "FileText",
    desc: "Technical articles, guides, published dates & Google SEO metadata",
  },
  categories: {
    model: Category,
    label: "Category Collections",
    icon: "Layers",
    desc: "Main packaging category pillars, subcategories & item hierarchies",
  },
  heroslides: {
    model: HeroSlide,
    label: "Hero Slides",
    icon: "Sparkles",
    desc: "Homepage opening carousel slides, CTA buttons & responsive media",
  },
  industries: {
    model: Industry,
    label: "Industry Sectors",
    icon: "Factory",
    desc: "Target industrial sectors (Food, Pharma, Auto, Logistics, etc.)",
  },
  usps: {
    model: Usp,
    label: "Why Choose Us (USPs)",
    icon: "ShieldCheck",
    desc: "Company core value propositions, infrastructure badges & strengths",
  },
  solutions: {
    model: SolutionStep,
    label: "Engineered Solutions",
    icon: "Cpu",
    desc: "Packaging challenges, solutions and workflow engineering steps",
  },
  partners: {
    model: Partner,
    label: "Brand Partners",
    icon: "Handshake",
    desc: "Client logos, enterprise packaging brand partners and trust strip",
  },
  certifications: {
    model: Certification,
    label: "Certifications",
    icon: "Award",
    desc: "ISO, FDA, MSME, RoHs quality compliance certifications & seals",
  },
  sitesettings: {
    model: SiteSettings,
    label: "Site Settings & Contacts",
    icon: "Building",
    desc: "Official phone numbers, emails, plant addresses & social links",
  },
  contents: {
    model: Content,
    label: "Content Store (Key-Value)",
    icon: "Database",
    desc: "JSON configuration storage and runtime website section content",
  },
};

// ─── 1. DATABASE OVERVIEW & METRICS ───────────────────────────────────────────
router.get("/overview", requireAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    const conn = await connectDB();
    const dbState = conn?.connection?.readyState;
    const dbName = conn?.connection?.name || "winnerpack";
    const host = conn?.connection?.host || "localhost";

    const collections = await Promise.all(
      Object.entries(MODEL_MAP).map(async ([key, meta]) => {
        try {
          const count = await meta.model.countDocuments({});
          const latest = await meta.model.findOne({}).sort({ updatedAt: -1, createdAt: -1 }).select("updatedAt createdAt");
          return {
            key,
            label: meta.label,
            icon: meta.icon,
            description: meta.desc,
            count,
            lastUpdated: latest?.updatedAt || latest?.createdAt || null,
          };
        } catch {
          return {
            key,
            label: meta.label,
            icon: meta.icon,
            description: meta.desc,
            count: 0,
            lastUpdated: null,
          };
        }
      })
    );

    const totalDocuments = collections.reduce((acc, c) => acc + c.count, 0);

    res.json({
      status: "connected",
      dbName,
      host,
      readyState: dbState === 1 ? "Connected (Ready)" : "Connecting / Disconnected",
      totalCollections: collections.length,
      totalDocuments,
      collections,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to load database overview." });
  }
});

// ─── 2. LIST DOCUMENTS IN A COLLECTION ─────────────────────────────────────────
router.get("/:collection", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const collection = String(req.params.collection);
  const config = MODEL_MAP[collection];

  if (!config) {
    res.status(404).json({ error: `Unknown collection '${collection}'` });
    return;
  }

  try {
    await connectDB();
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 25));
    const skip = (page - 1) * limit;
    const search = (req.query.search as string || "").trim();

    let query: any = {};
    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query = {
        $or: [
          { title: regex },
          { name: regex },
          { id: regex },
          { slug: regex },
          { email: regex },
          { key: regex },
          { skuProfile: regex },
        ],
      };
    }

    const [documents, totalCount] = await Promise.all([
      config.model
        .find(query)
        .sort({ updatedAt: -1, createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      config.model.countDocuments(query),
    ]);

    // Extract dynamic keys from sample documents
    const keysSet = new Set<string>();
    documents.slice(0, 5).forEach((doc: any) => {
      Object.keys(doc).forEach((k) => {
        if (!["__v"].includes(k)) keysSet.add(k);
      });
    });

    res.json({
      collection,
      label: config.label,
      description: config.desc,
      documents,
      totalCount,
      page,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit) || 1,
      schemaKeys: Array.from(keysSet),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || `Failed to fetch documents for ${collection}` });
  }
});

// ─── 3. CREATE DOCUMENT IN COLLECTION ─────────────────────────────────────────
router.post("/:collection", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const collection = String(req.params.collection);
  const config = MODEL_MAP[collection];

  if (!config) {
    res.status(404).json({ error: `Unknown collection '${collection}'` });
    return;
  }

  try {
    await connectDB();
    const payload = req.body;
    // Remove empty _id if present in create
    if (payload._id === "") delete payload._id;

    const newDoc = await config.model.create(payload);
    res.status(201).json(newDoc);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to create document." });
  }
});

// ─── 4. UPDATE DOCUMENT BY ID ─────────────────────────────────────────────────
router.put("/:collection/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const collection = String(req.params.collection);
  const id = String(req.params.id);
  const config = MODEL_MAP[collection];

  if (!config) {
    res.status(404).json({ error: `Unknown collection '${collection}'` });
    return;
  }

  try {
    await connectDB();
    const updateData = { ...req.body };
    delete updateData._id; // Do not overwrite MongoDB internal _id

    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { id };
    const updated = await config.model.findOneAndUpdate(filter, updateData, {
      new: true,
      runValidators: false,
    });

    if (!updated) {
      res.status(404).json({ error: `Document ${id} not found in ${collection}` });
      return;
    }

    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Failed to update document." });
  }
});

// ─── 5. DELETE DOCUMENT BY ID ─────────────────────────────────────────────────
router.delete("/:collection/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const collection = String(req.params.collection);
  const id = String(req.params.id);
  const config = MODEL_MAP[collection];

  if (!config) {
    res.status(404).json({ error: `Unknown collection '${collection}'` });
    return;
  }

  try {
    await connectDB();
    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { id };
    const deleted = await config.model.findOneAndDelete(filter);

    if (!deleted) {
      res.status(404).json({ error: `Document ${id} not found in ${collection}` });
      return;
    }

    res.json({ message: "Document deleted successfully", id });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete document." });
  }
});

export default router;
