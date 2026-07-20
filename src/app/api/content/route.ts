import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Content } from "@/backend/models";
import { fallbackData } from "@/backend/fallback-data";
import { isAuthorized } from "@/utils/auth";


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get("key") || "homepage";

    // Try database fetch
    try {
      await connectDB();
      const contentDoc = await Content.findOne({ key });
      if (contentDoc) {
        return NextResponse.json(contentDoc.data, {
          headers: {
            "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
          },
        });
      }
    } catch (dbErr) {
      console.warn("DB connection failed, falling back to static contents:", dbErr);
    }

    return NextResponse.json(fallbackData, {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { key, data } = body;

    if (!key || !data) {
      return NextResponse.json({ error: "Missing key or data" }, { status: 400 });
    }

    await connectDB();
    const updated = await Content.findOneAndUpdate(
      { key },
      { data },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updated.data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
