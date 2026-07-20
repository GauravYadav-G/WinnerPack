import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Inquiry } from "@/backend/models";
import { isAuthorized } from "@/utils/auth";


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updated = await Inquiry.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { id } = await params;
    await Inquiry.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
