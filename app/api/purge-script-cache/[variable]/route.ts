import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Purge variable script cache");

  revalidateTag(params.params.variable);

  return new NextResponse(`purged /api/script/${params.params.variable}`);
}
