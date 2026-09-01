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

    // 1. Try forwarding to Express backend
    try {
      const res = await fetch(`${BACKEND}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
      }
    } catch {
      // Backend not running, fall through to direct Form Submission API
    }

    // 2. Direct Form Submission API dispatch to info@winnerpack.in
    const targetEmail = process.env.NEXT_PUBLIC_FORM_EMAIL || "info@winnerpack.in";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://winnerpack.in",
        Referer: "https://winnerpack.in",
      },
      body: JSON.stringify({
        _subject: `New Lead Inquiry: ${body.name || body.fullName || "Website Visitor"} - ${body.company || body.companyName || "Direct"}`,
        _template: "table",
        _captcha: "false",
        "Customer Name": body.name || body.fullName || "N/A",
        "Company": body.company || body.companyName || "N/A",
        "Email": body.email,
        "Phone": body.phone,
        "Product / Inquiry": body.skuProfile || body.productInterest || "General Inquiry",
        "Quantity / Volume": body.lineSpeed || body.monthlyVolume || "Not Specified",
        "Message": body.message || body.notes || "N/A",
        "Date & Time": `${timestamp} IST`,
      }),
    });

    const data = await formSubmitRes.json();
    return NextResponse.json({ success: true, ...data }, { status: 200 });
  } catch (err: any) {
    console.error("[/api/inquiries] Error:", err);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
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
