import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/db";
import { Machine } from "../../../../utils/models";

import { initialMachines } from "../route";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Comment to delink database for Vercel demo
    /*
    await connectDB();
    const machine = await Machine.findOne({ model: id });
    if (!machine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }
    return NextResponse.json(machine);
    */
    const machine = initialMachines.find((m) => m.model === id);
    if (!machine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }
    return NextResponse.json(machine);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
