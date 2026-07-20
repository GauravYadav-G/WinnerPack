import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Machine } from "@/backend/models";
import { initialMachines } from "@/backend/fallback-data";
import { isAuthorized } from "@/utils/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      await connectDB();
      const machine = await Machine.findOne({ model: id });
      if (machine) {
        return NextResponse.json(machine);
      }
    } catch (dbErr) {
      console.warn("DB connection failed in machine GET, falling back to static contents:", dbErr);
    }

    // Fallback if DB is disconnected/fails or if machine isn't found in DB
    const fallbackMachine = initialMachines.find((m) => m.model === id);
    if (!fallbackMachine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }
    return NextResponse.json(fallbackMachine);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const updatedMachine = await Machine.findOneAndUpdate(
      { model: id },
      body,
      { new: true }
    );
    if (!updatedMachine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }
    return NextResponse.json(updatedMachine);
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
    const { id } = await params;
    await connectDB();
    const deletedMachine = await Machine.findOneAndDelete({ model: id });
    if (!deletedMachine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Machine deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
