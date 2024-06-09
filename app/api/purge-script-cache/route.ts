import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log("Purge static script cache");

  revalidatePath(`/api/script`);

  return new NextResponse();
}
