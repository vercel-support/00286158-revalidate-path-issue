import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  // first tag the cache
  await fetch(`/api/script/${params.params.variable}`, {
    next: { tags: [params.params.variable] },
  });

  // then return the response
  return new NextResponse(`tagged /api/script/${params.params.variable}`);
}
