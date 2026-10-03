import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { connectDB } from "../db";
import { Content } from "../models";
import { fallbackData } from "../fallback-data";
import {
  defaultAbout,
  defaultAboutUs,
  defaultApplications,
  defaultCertifications,
  defaultContactPage,
  defaultFooter,
  defaultGallery,
  defaultGlobal,
  defaultIndustries,
  defaultPartners,
  defaultSolutions,
} from "../site-defaults";
import { requireAuth } from "../middleware/auth";

const router = Router();

const DATA_DIR = path.join(__dirname, "../../data");
const STORE_FILE = path.join(DATA_DIR, "content-store.json");

function readDiskStore(): Record<string, any> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      return JSON.parse(fs.readFileSync(STORE_FILE, "utf-8"));
    }
  } catch (e) {
    console.warn("Could not read disk content store:", e);
  }
  return {};
}

function writeDiskStore(key: string, data: any) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const store = readDiskStore();
    store[key] = data;
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write to disk content store:", e);
  }
}

function getFallbackForKey(key: string): any {
  switch (key) {
    case "homepage":
      return fallbackData;
    case "about":
      return { about: defaultAbout };
    case "about_us":
    case "page_about-us":
      return defaultAboutUs;
    case "industries":
      return { industries: defaultIndustries };
    case "why":
      return { usps: fallbackData.usps };
    case "applications":
      return { slides: defaultApplications };
    case "partners_materials_certs":
    case "partners":
      return {
        partners: defaultPartners,
        certs: defaultCertifications,
      };
    case "solutions":
      return { solutionsData: defaultSolutions };
    case "certifications":
      return { certifications: defaultCertifications };
    case "contact_page":
    case "page_contact":
    case "contact":
      return defaultContactPage;
    case "gallery":
    case "page_gallery":
      return defaultGallery;
    case "footer":
      return defaultFooter;
    case "global":
    case "page_global":
      return defaultGlobal;
    case "site_layout":
      return {
        sections: [
          { id: "hero", visible: true },
          { id: "about", visible: true },
          { id: "products", visible: true },
          { id: "industries", visible: true },
          { id: "why", visible: true },
          { id: "applications", visible: true },
          { id: "partners", visible: true },
          { id: "solutions", visible: true },
          { id: "certifications", visible: true },
          { id: "inquiry", visible: true },
        ],
      };
    default:
      return {};
  }
}

// GET /api/content?key= — MongoDB is authoritative while reachable.
// Disk/static fallbacks are used only during a database outage.
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const key = (req.query.key as string) || "homepage";

    // Set headers so browser and proxy caches never serve stale CMS data
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    // 1. Try MongoDB
    try {
      await connectDB();
      const contentDoc = await Content.findOne({ key });
      if (contentDoc && contentDoc.data !== undefined && contentDoc.data !== null) {
        res.json(contentDoc.data);
        return;
      }

      // Check alternate alias key in MongoDB
      let altKey = "";
      if (key === "about_us") altKey = "page_about-us";
      else if (key === "page_about-us") altKey = "about_us";
      else if (key === "contact_page") altKey = "page_contact";
      else if (key === "page_contact") altKey = "contact_page";

      if (altKey) {
        const altDoc = await Content.findOne({ key: altKey });
        if (altDoc && altDoc.data) {
          res.json(altDoc.data);
          return;
        }
      }

      res.status(404).json({ error: "Content not found" });
      return;
    } catch (dbErr) {
      console.warn("MongoDB read failed, checking disk cache:", dbErr);
    }

    // 2. Check disk store
    const diskStore = readDiskStore();
    if (diskStore[key] !== undefined) {
      res.json(diskStore[key]);
      return;
    }
    if (key === "about_us" && diskStore["page_about-us"]) {
      res.json(diskStore["page_about-us"]);
      return;
    }
    if (key === "page_about-us" && diskStore["about_us"]) {
      res.json(diskStore["about_us"]);
      return;
    }
    if (key === "contact_page" && diskStore["page_contact"]) {
      res.json(diskStore["page_contact"]);
      return;
    }
    if (key === "page_contact" && diskStore["contact_page"]) {
      res.json(diskStore["contact_page"]);
      return;
    }

    // 3. Fallback to site defaults
    res.json(getFallbackForKey(key));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Upsert handler for POST, PATCH, PUT
async function handleUpsertContent(req: Request, res: Response): Promise<void> {
  try {
    const { key, data } = req.body;

    if (!key || data === undefined) {
      res.status(400).json({ error: "Missing key or data" });
      return;
    }

    // 1. Immediately persist to disk store for zero-downtime reliability
    writeDiskStore(key, data);

    // If key is about-us or page_about-us, handle dual sync
    if (key === "about_us" || key === "page_about-us") {
      let flattenedAboutUs = data;
      if (data["about-header"] || data["about-who-we-are"] || data["about-metrics"] || data["about-guides"] || data["about-capabilities"]) {
        flattenedAboutUs = {
          header: data["about-header"] || defaultAboutUs.header,
          whoWeAre: data["about-who-we-are"] || defaultAboutUs.whoWeAre,
          metrics: Array.isArray(data["about-metrics"]?.metrics) ? data["about-metrics"].metrics : (data.metrics || []),
          guides: data["about-guides"] || defaultAboutUs.guides,
          capabilities: data["about-capabilities"] || defaultAboutUs.capabilities,
        };
      }
      writeDiskStore("about_us", flattenedAboutUs);
      writeDiskStore("page_about-us", data);
    } else if (key === "contact_page" || key === "page_contact") {
      writeDiskStore("contact_page", data);
      writeDiskStore("page_contact", data);
    } else if (key === "gallery" || key === "page_gallery") {
      writeDiskStore("gallery", data);
      writeDiskStore("page_gallery", data);
    } else if (key === "global" || key === "page_global") {
      writeDiskStore("global", data);
      writeDiskStore("page_global", data);
    }

    // 2. Persist to MongoDB
    try {
      await connectDB();
      const updated = await Content.findOneAndUpdate(
        { key },
        { data },
        { new: true, upsert: true }
      );

      // Also upsert the paired key in MongoDB if applicable
      if (key === "about_us" || key === "page_about-us") {
        const pairedKey = key === "about_us" ? "page_about-us" : "about_us";
        let pairedData = data;
        if (key === "page_about-us" && (data["about-header"] || data["about-metrics"])) {
          pairedData = {
            header: data["about-header"] || defaultAboutUs.header,
            whoWeAre: data["about-who-we-are"] || defaultAboutUs.whoWeAre,
            metrics: Array.isArray(data["about-metrics"]?.metrics) ? data["about-metrics"].metrics : (data.metrics || []),
            guides: data["about-guides"] || defaultAboutUs.guides,
            capabilities: data["about-capabilities"] || defaultAboutUs.capabilities,
          };
        }
        await Content.findOneAndUpdate(
          { key: pairedKey },
          { data: pairedData },
          { new: true, upsert: true }
        );
      }

      res.json({
        success: true,
        data: updated!.data,
        databasePersisted: true,
        storage: "mongodb",
      });
      return;
    } catch (mongoErr) {
      console.warn("MongoDB upsert failed; a recovery copy was saved to disk:", mongoErr);
      res.status(503).json({
        success: false,
        error: "MongoDB is unavailable. Nothing was published live.",
        data,
        diskBackupSaved: true,
        databasePersisted: false,
        storage: "disk-backup",
      });
      return;
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// POST /api/content/batch — publish every document for a page in one request.
// The disk cache is updated only after every MongoDB operation succeeds.
router.post("/batch", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const entries = req.body?.entries;

    if (!Array.isArray(entries) || entries.length === 0 || entries.length > 20) {
      res.status(400).json({ error: "Entries must contain between 1 and 20 content documents." });
      return;
    }

    const normalized = entries.map((entry: any) => ({
      key: typeof entry?.key === "string" ? entry.key.trim() : "",
      data: entry?.data,
    }));
    const hasInvalidEntry = normalized.some(
      ({ key, data }: { key: string; data: any }) =>
        !key || !/^[a-z0-9_-]+$/i.test(key) || data === undefined
    );
    const hasDuplicateKey = new Set(
      normalized.map(({ key }: { key: string }) => key)
    ).size !== normalized.length;

    if (hasInvalidEntry || hasDuplicateKey) {
      res.status(400).json({ error: "Each entry needs a unique, valid key and a data value." });
      return;
    }

    await connectDB();
    await Content.bulkWrite(
      normalized.map(({ key, data }: { key: string; data: any }) => ({
        updateOne: {
          filter: { key },
          update: { $set: { data } },
          upsert: true,
        },
      })),
      { ordered: true }
    );

    normalized.forEach(({ key, data }: { key: string; data: any }) => writeDiskStore(key, data));

    res.json({
      success: true,
      databasePersisted: true,
      storage: "mongodb",
      keys: normalized.map(({ key }: { key: string }) => key),
    });
  } catch (error: any) {
    console.warn("MongoDB batch publish failed:", error);
    res.status(503).json({
      success: false,
      error: "The live database is unavailable. No complete page publish was confirmed.",
      databasePersisted: false,
    });
  }
});

// Protected upsert routes
router.post("/", requireAuth, handleUpsertContent);
router.patch("/", requireAuth, handleUpsertContent);
router.put("/", requireAuth, handleUpsertContent);

export default router;
