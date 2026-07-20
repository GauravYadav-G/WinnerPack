import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Product } from "@/backend/models";
import { initialProducts } from "@/backend/fallback-data";
import { isAuthorized } from "@/utils/auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const reseed = url.searchParams.get("reseed") === "true";

    try {
      await connectDB();

      if (reseed) {
        await Product.deleteMany({});
      }

      let dbProducts = await Product.find({}).sort({ createdAt: -1 });

      if (dbProducts.length === 0) {
        await Product.insertMany(initialProducts);
        dbProducts = await Product.find({}).sort({ createdAt: -1 });
      }

      return NextResponse.json(dbProducts);
    } catch (dbErr) {
      console.warn("DB connection failed in products GET, falling back to static contents:", dbErr);
      return NextResponse.json(initialProducts);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();

    if (!body.id) {
      body.id = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
