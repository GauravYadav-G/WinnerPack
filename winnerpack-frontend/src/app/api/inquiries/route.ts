/**
 * Next.js App Router API proxy for /api/inquiries
 *
 * The public contact form POSTs to this route (same origin = no CORS),
 * which then forwards the request to the Express backend.
 * This ensures the form works even when NEXT_PUBLIC_API_URL is unset.
 */

import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const body = {
      name: cleanString(input?.name, 120),
      email: cleanString(input?.email, 254).toLowerCase(),
      phone: cleanString(input?.phone, 40),
      company: cleanString(input?.company, 160),
      skuProfile: cleanString(input?.skuProfile, 160),
      lineSpeed: cleanString(input?.lineSpeed, 120),
      message: cleanString(input?.message, 5_000),
    };
    if (
      body.name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ||
      !/^[+\d][\d\s().-]{6,39}$/.test(body.phone)
    ) {
      return NextResponse.json({ error: "Enter a valid name, email address and phone number." }, { status: 400 });
    }

    // 1. Try forwarding to Express backend
    try {
      const res = await fetch(`${BACKEND}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status >= 400 && res.status < 500) {
        return NextResponse.json({ error: "Inquiry was rejected" }, { status: res.status });
      }
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
          _subject: `New Lead Inquiry: ${body.name || "Website Visitor"} - ${body.company || "Direct"}`,
        _template: "table",
        _captcha: "false",
          "Customer Name": body.name || "N/A",
          "Company": body.company || "N/A",
        "Email": body.email,
        "Phone": body.phone,
          "Product / Inquiry": body.skuProfile || "General Inquiry",
          "Quantity / Volume": body.lineSpeed || "Not Specified",
          "Message": body.message || "N/A",
        "Date & Time": `${timestamp} IST`,
      }),
    });

    const data = await formSubmitRes.json();
    if (!formSubmitRes.ok || (data?.success !== true && data?.success !== "true")) {
      return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 502 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
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
