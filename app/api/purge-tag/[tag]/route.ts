import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  params: { params: { tag: string } }
) {
  revalidateTag(params.params.tag);

  return Response.json({
    revalidated: true,
    now: Date.now(),
    tag: params.params.tag,
  });
}
