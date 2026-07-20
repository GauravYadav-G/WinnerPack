import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Article } from "@/backend/models";
import { initialArticles } from "@/backend/fallback-data";
import { isAuthorized } from "@/utils/auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const reseed = url.searchParams.get("reseed") === "true";

    try {
      await connectDB();

      if (reseed) {
        await Article.deleteMany({});
      }

      let articles = await Article.find({}).sort({ createdAt: -1 });

      if (articles.length === 0) {
        await Article.insertMany(initialArticles);
        articles = await Article.find({}).sort({ createdAt: -1 });
      }

      return NextResponse.json(articles);
    } catch (dbErr) {
      console.warn("DB connection failed in articles GET, using fallback mock data:", dbErr);
      return NextResponse.json(initialArticles);
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

    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const newArticle = await Article.create(body);
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
    }

    const updated = await Article.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing article ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Article.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
