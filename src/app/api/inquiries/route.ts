import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Inquiry } from "@/backend/models";
import { isAuthorized } from "@/utils/auth";


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newInquiry = await Inquiry.create(body);
    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
