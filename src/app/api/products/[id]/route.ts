import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db";
import { Product } from "@/backend/models";
import { initialProducts } from "@/backend/fallback-data";
import { isAuthorized } from "@/utils/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    try {
      await connectDB();
      const product = await Product.findOne({ id });
      if (product) {
        return NextResponse.json(product);
      }
    } catch (dbErr) {
      console.warn("DB connection failed in product GET, falling back to static contents:", dbErr);
    }

    // Fallback if DB is disconnected/fails or if product isn't found in DB
    const fallbackProduct = initialProducts.find((p) => p.id === id);
    if (!fallbackProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(fallbackProduct);
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
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      body,
      { new: true }
    );
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
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
    const deletedProduct = await Product.findOneAndDelete({ id });
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
