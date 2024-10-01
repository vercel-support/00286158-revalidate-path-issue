import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Purge variable script cache");

  // revalidatePath(`/api/script/${params.params.variable}`);
  revalidatePath(`/api/script/[variable]`);

  // return new NextResponse(`purged /api/script/${params.params.variable}`);
  return new NextResponse(`purged /api/script/[variable]`);
}
