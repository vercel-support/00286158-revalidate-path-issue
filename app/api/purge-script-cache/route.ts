import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log("Purge script cache");

  revalidatePath(`/api/script`);

  return new NextResponse("purged /api/script");
}
