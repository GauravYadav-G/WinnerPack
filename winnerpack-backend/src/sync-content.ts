import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { isDeepStrictEqual } from "util";
import { connectDB } from "./db";
import { Content } from "./models";
import { contentSeeds } from "./content-seeds";

type StoredContent = Record<string, unknown>;
function updateExistingDiskFallbacks() {
  const dataDir = path.join(process.cwd(), "data");
  const storeFile = path.join(dataDir, "content-store.json");
  fs.mkdirSync(dataDir, { recursive: true });

  let existing: StoredContent = {};
  if (fs.existsSync(storeFile)) {
    existing = JSON.parse(fs.readFileSync(storeFile, "utf8"));
  }

  const synchronized = { ...existing };
  contentSeeds.forEach(({ key, data }) => {
    if (synchronized[key] !== undefined) synchronized[key] = data;
  });

  const temporaryFile = `${storeFile}.tmp`;
  fs.writeFileSync(temporaryFile, JSON.stringify(synchronized, null, 2), "utf8");
  fs.renameSync(temporaryFile, storeFile);
}

async function synchronizeContent() {
  const apply = process.argv.includes("--apply");
  await connectDB();

  const keys = contentSeeds.map(({ key }) => key);
  const existing = await Content.find({ key: { $in: keys } }, { key: 1 }).lean();
  const existingKeys = new Set(existing.map((document) => document.key));
  const report: Record<string, unknown> = {
    mode: apply ? "apply" : "dry-run",
    canonicalKeys: keys.length,
    existingCanonicalKeys: existingKeys.size,
    missingKeys: keys.filter((key) => !existingKeys.has(key)),
    insertsPlanned: 0,
    updatesPlanned: existingKeys.size,
    productsTouched: 0,
    inquiriesTouched: 0,
    articlesTouched: 0,
  };

  if (apply) {
    const seedsToWrite = contentSeeds.filter(({ key }) => existingKeys.has(key));
    if (seedsToWrite.length > 0) {
      await Content.bulkWrite(
        seedsToWrite.map(({ key, data }) => ({
          updateOne: {
            filter: { key },
            update: { $set: { data } },
            upsert: false,
          },
        })),
        { ordered: true },
      );
    }
    updateExistingDiskFallbacks();

    const verified = await Content.find({ key: { $in: keys } }, { key: 1, data: 1 }).lean();
    const verifiedByKey = new Map(verified.map((document) => [document.key, document.data]));
    const mismatchedKeys = contentSeeds
      .filter(({ key, data }) => !isDeepStrictEqual(verifiedByKey.get(key), data))
      .map(({ key }) => key);
    report.writtenKeys = seedsToWrite.length;
    report.updatedExistingKeys = seedsToWrite.length;
    report.skippedMissingKeys = keys.length - existingKeys.size;
    report.verifiedKeys = verified.length;
    report.mismatchedKeys = mismatchedKeys;
    report.diskFallbackUpdated = true;
  }

  console.log(JSON.stringify(report, null, 2));
}

synchronizeContent()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Content synchronization failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  });
