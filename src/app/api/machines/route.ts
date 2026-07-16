import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/db";
import { Machine } from "../../../utils/models";

export const initialMachines = [
  {
    model: "WP-SWM",
    name: "Shrink Wrap Machine",
    tagline: "Continuous high-speed shrink wrapping sealer and tunnel integration.",
    desc: "Continuous L-bar sealing machine synchronized with a hot-air recirculation shrink tunnel. Delivers fast shrink wrapping for retail products, cosmetics, boxes, and stationery bundle packs.",
    image: "/images/machines/shrink-wrap-machine/image.png",
    specs: [
      { label: "Throughput Speed", value: "35-45 packs/min" },
      { label: "Max Sealer Size", value: "550 x 450 mm" },
      { label: "Electrical Input", value: "4.2 kW, 3-Phase" },
      { label: "Pneumatic Input", value: "6 Bar, 140 L/min" },
    ],
    highlights: ["PLC Touchscreen Control", "Continuous L-sealer", "Recirculation shrink tunnel", "CE Certified compliance"],
  },
  {
    model: "WP-BM",
    name: "Bundling Machine",
    tagline: "Automated collation bundling for cans, jars, and cartons.",
    desc: "Heavy-duty sleeve wrapper and bundling machine designed to collate and wrap mineral water bottles, beverage cans, or food jars with collation shrink films, eliminating carton boxes.",
    image: "/images/machines/bundling-machine/image.png",
    specs: [
      { label: "Collation Speed", value: "12-18 bundles/min" },
      { label: "Max Wrapping Width", value: "600 mm" },
      { label: "Film Material type", value: "LDPE Collation shrink film" },
      { label: "Electrical Load", value: "18 kW, 3-Phase" },
    ],
    highlights: ["Sleeve wrapping seal", "Heavy LDPE collation ready", "Automatic collation sorter", "Stitchless heating tunnel"],
  },
  {
    model: "WP-FPM",
    name: "Flow Pack Machine",
    tagline: "Horizontal flow wrapping machine for packaging products in pouches.",
    desc: "Industrial horizontal form-fill-seal (HFFS) packaging machine. Wraps individual products like bakery items, soap bars, courier envelopes, and stationery items inside pillow-packs.",
    image: "/images/machines/flow-pack-machine/image.png",
    specs: [
      { label: "Wrapping Rate", value: "40-150 packs/min" },
      { label: "Pouch Length range", value: "90mm to 400mm" },
      { label: "Pouch Width limit", value: "Max 180mm" },
      { label: "Electrical Input", value: "2.8 kW, Single-Phase" },
    ],
    highlights: ["Horizontal HFFS form-fill", "Dual-frequency converter controls", "Photo-cell tracking sensor", "Anti-cutting safety protection"],
  },
  {
    model: "WP-VM",
    name: "Vacuum Machine",
    tagline: "Industrial chamber vacuum packaging machine for food and perishables.",
    desc: "Heavy-duty double chamber vacuum packaging machine. Extracts oxygen and seals food pouches, extending the storage shelf life of FMCG food items, electronics, and pharmaceuticals.",
    image: "/images/machines/vacuum-machine/image.png",
    specs: [
      { label: "Vacuum Cycle speed", value: "20-40 seconds" },
      { label: "Sealing Bar size", value: "600 mm length" },
      { label: "Vacuum Pump load", value: "40 m³/h capacity" },
      { label: "Electrical Input", value: "1.5 kW, Single-Phase" },
    ],
    highlights: ["Double chamber efficiency", "Stainless steel construction", "Microprocessor controller", "Gas flushing packaging option"],
  }
];

export async function GET() {
  try {
    // Comment to delink database for Vercel demo
    /*
    await connectDB();
    const reseed = req.nextUrl.searchParams.get("reseed") === "true";

    if (reseed) {
      await Machine.deleteMany({});
    }

    let dbMachines = await Machine.find({}).sort({ createdAt: -1 });

    if (dbMachines.length === 0) {
      await Machine.insertMany(initialMachines);
      dbMachines = await Machine.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json(dbMachines);
    */
    return NextResponse.json(initialMachines);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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
