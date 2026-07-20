import mongoose from "mongoose";
import { connectDB } from "./db";
import { Content, Product, Machine, Article } from "./models";
import { fallbackData, initialProducts, initialMachines, initialArticles } from "./fallback-data";

async function seed() {
  console.log("Starting database seeding...");

  try {
    // 1. Connect to Database
    await connectDB();
    console.log("Connected to MongoDB successfully.");

    // 2. Seed Content (Homepage)
    console.log("Seeding Content (homepage)...");
    await Content.findOneAndUpdate(
      { key: "homepage" },
      { data: fallbackData },
      { upsert: true, new: true }
    );
    console.log("Content seeded successfully.");

    // 3. Seed Products
    console.log("Seeding Products...");
    await Product.deleteMany({});
    await Product.insertMany(initialProducts);
    console.log(`Successfully seeded ${initialProducts.length} products.`);

    // 4. Seed Machines
    console.log("Seeding Machines...");
    await Machine.deleteMany({});
    await Machine.insertMany(initialMachines);
    console.log(`Successfully seeded ${initialMachines.length} machines.`);

    // 5. Seed Articles
    console.log("Seeding Articles...");
    await Article.deleteMany({});
    await Article.insertMany(initialArticles);
    console.log(`Successfully seeded ${initialArticles.length} articles.`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
}

seed();
