import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");
    const secret = searchParams.get("secret");

    // 1. Validate Secret Token
    const revalSecret = process.env.REVALIDATE_SECRET;
    if (!revalSecret || secret !== revalSecret) {
      return NextResponse.json(
        { error: "Unauthorized access: invalid revalidation token" },
        { status: 401 }
      );
    }

    // 2. Validate Path Parameter
    if (!path) {
      return NextResponse.json(
        { error: "Missing required parameter: path" },
        { status: 400 }
      );
    }

    // 3. Trigger On-Demand Revalidation
    revalidatePath(path);
    console.log(`On-Demand Revalidation triggered successfully for path: ${path}`);

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Revalidation failed" },
      { status: 500 }
    );
  }
}
