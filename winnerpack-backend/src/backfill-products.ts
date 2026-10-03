import mongoose from "mongoose";

try {
  process.loadEnvFile?.();
} catch (_) {}

type AnyRecord = Record<string, any>;

function extractFaqs(longDesc?: string) {
  if (!longDesc) return [];
  const heading = /^(#{1,6})\s+.*(?:frequently asked questions|faq).*$/im.exec(longDesc);
  if (!heading) return [];
  const section = longDesc.slice((heading.index ?? 0) + heading[0].length);
  return Array.from(section.matchAll(/^#{3,6}\s+([^\n]+)\n+([\s\S]*?)(?=^#{3,6}\s+|(?![\s\S]))/gm))
    .map((entry) => ({ question: entry[1].trim(), answer: entry[2].trim() }))
    .filter((faq) => faq.question && faq.answer);
}

function contentFields(source: AnyRecord, current: AnyRecord) {
  const faqs = Array.isArray(source.faqs) && source.faqs.length > 0
    ? source.faqs
    : extractFaqs(source.longDesc);

  const sourceVariants = new Map(
    (source.subCategories || []).map((variant: AnyRecord) => [variant.id || variant.slug, variant])
  );
  const subCategories = (current.subCategories || []).map((variant: AnyRecord) => {
    const sourceVariant = sourceVariants.get(variant.id || variant.slug) as AnyRecord | undefined;
    if (!sourceVariant) return variant;
    return {
      ...variant,
      longDesc: sourceVariant.longDesc ?? variant.longDesc,
      faqs: Array.isArray(sourceVariant.faqs) && sourceVariant.faqs.length > 0
        ? sourceVariant.faqs
        : extractFaqs(sourceVariant.longDesc),
    };
  });

  return {
    longDesc: source.longDesc ?? current.longDesc,
    faqs,
    subCategories,
  };
}

async function synchronizeProducts() {
  const apply = process.argv.includes("--apply");
  const [{ connectDB }, models, fallback] = await Promise.all([
    import("./db"),
    import("./models"),
    import("./fallback-data"),
  ]);
  const { Product } = models;
  const { initialProducts } = fallback;

  const fallbackIds = new Set(initialProducts.map((product: AnyRecord) => product.id));
  await connectDB();
  const existingProducts = await Product.find({}).lean();
  const existingIds = new Set(existingProducts.map((product: AnyRecord) => product.id));
  const matchingProducts = initialProducts.filter((product: AnyRecord) => existingIds.has(product.id));
  const fallbackOnly = initialProducts.filter((product: AnyRecord) => !existingIds.has(product.id)).map((product: AnyRecord) => product.id);
  const databaseOnly = existingProducts.filter((product: AnyRecord) => !fallbackIds.has(product.id)).map((product: AnyRecord) => product.id);

  const productOperations = matchingProducts.map((source: AnyRecord) => {
    const current = existingProducts.find((product: AnyRecord) => product.id === source.id) as AnyRecord;
    return {
      updateOne: {
        filter: { id: source.id },
        update: { $set: contentFields(source, current) },
        upsert: false,
      },
    };
  });

  const report: AnyRecord = {
    mode: apply ? "apply" : "dry-run",
    databaseProducts: existingProducts.length,
    fallbackProducts: initialProducts.length,
    matchingProducts: matchingProducts.length,
    fallbackOnly,
    databaseOnly,
    productUpdatesPlanned: productOperations.length,
    fieldsUpdated: ["longDesc", "faqs", "subCategories[].longDesc", "subCategories[].faqs"],
    insertedProducts: 0,
    deletedProducts: 0,
  };

  if (apply) {
    if (productOperations.length > 0) await Product.collection.bulkWrite(productOperations as any[], { ordered: true });
    const verification = await Product.find({}, { id: 1 }).lean();
    report.productsUpdated = productOperations.length;
    report.verifiedDatabaseProducts = verification.length;
  }

  console.log(JSON.stringify(report, null, 2));
}

synchronizeProducts()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Product synchronization failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  });
