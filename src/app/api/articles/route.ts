import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/db";
import { Article } from "../../../utils/models";

const initialArticles = [
  {
    tag: "Engineering",
    date: "Mar 2026",
    title: "Choosing between PP and PET strap: a load-vs-cost framework",
    excerpt: "A simple decision tree — based on 6 years of mill data — that helps procurement pick the right strap for the right load, without overspending.",
    read: "6 min read",
    featured: true,
    slug: "pp-vs-pet-strap-framework",
    body: "Polypropylene (PP) and Polyester (PET) straps serve distinct purposes in industrial packaging. While PP strap is highly elastic and suited for light-to-medium bundles that expand/contract, PET strap offers superior tension retention and impact resistance, replacing steel strapping for heavy palletized loads.",
  },
  {
    tag: "Sustainability",
    date: "Feb 2026",
    title: "Mono-material films and the road to recyclable e-commerce packaging",
    excerpt: "Why multi-layer laminate plastics are a recycling nightmare and how new oriented films enable single-stream recycling compatibility.",
    read: "8 min read",
    featured: false,
    slug: "mono-material-recyclable-films",
    body: "Multi-layer packaging has traditionally combined different plastic types, making them impossible to recycle together. Our latest mono-material LDPE and POF shrink/stretch films provide the same barrier properties and tensile strength while remaining fully compatible with standard single-stream recycling loops, allowing your buyers to meet strict plastic waste compliance.",
  },
  {
    tag: "Operations",
    date: "Jan 2026",
    title: "How we hit 98.4% on-time dispatch in 2025 — a playbook",
    excerpt: "A look inside Winner Pack's Dasna hub operations, vehicle coordination algorithms, and WhatsApp integrations.",
    read: "5 min read",
    featured: false,
    slug: "on-time-dispatch-playbook-2025",
    body: "At Winner Pack, delivery is a key product feature. By coordinating Dasna plants with localized distribution hubs, pre-staging high-volume SKU inventory, and setting automated carrier assignment workflows linked directly to buyer WhatsApp alerts, we sustained a 98.4% rolling on-time delivery rate. Here is our operational playbook.",
  },
];

export async function GET() {
  try {
    // Comment to delink database for Vercel demo
    /*
    await connectDB();
    const reseed = req.nextUrl.searchParams.get("reseed") === "true";
    if (reseed) {
      await Article.deleteMany({});
    }

    let articles = await Article.find({}).sort({ createdAt: -1 });
    
    // Seed DB if it's empty
    if (articles.length === 0) {
      await Article.insertMany(initialArticles);
      articles = await Article.find({}).sort({ createdAt: -1 });
    }
    
    return NextResponse.json(articles);
    */
    return NextResponse.json(initialArticles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Auto-generate slug if not provided
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
