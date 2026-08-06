/**
 * Next.js App Router API proxy for /api/inquiries
 *
 * The public contact form POSTs to this route (same origin = no CORS),
 * which then forwards the request to the Express backend.
 * This ensures the form works even when NEXT_PUBLIC_API_URL is unset.
 */

import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("[/api/inquiries proxy] Error:", err);
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const res = await fetch(`${BACKEND}/api/inquiries`, {
      headers: { cookie },
      credentials: "include",
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("[/api/inquiries proxy GET] Error:", err);
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 }
    );
  }
}

export async function PATCH(_req: NextRequest) {
  return NextResponse.json({ error: "Use /api/inquiries/[id] for patch" }, { status: 400 });
}
