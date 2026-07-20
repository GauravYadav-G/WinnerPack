import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Machine } from "@/backend/models";
import { initialMachines } from "@/backend/fallback-data";
import { isAuthorized } from "@/utils/auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const reseed = url.searchParams.get("reseed") === "true";

    try {
      await connectDB();

      if (reseed) {
        await Machine.deleteMany({});
      }

      let dbMachines = await Machine.find({}).sort({ createdAt: -1 });

      if (dbMachines.length === 0) {
        await Machine.insertMany(initialMachines);
        dbMachines = await Machine.find({}).sort({ createdAt: -1 });
      }

      return NextResponse.json(dbMachines);
    } catch (dbErr) {
      console.warn("DB connection failed in machines GET, falling back to static contents:", dbErr);
      return NextResponse.json(initialMachines);
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

    if (!body.model) {
      return NextResponse.json({ error: "Machine model is required" }, { status: 400 });
    }

    const newMachine = await Machine.create(body);
    return NextResponse.json(newMachine, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
