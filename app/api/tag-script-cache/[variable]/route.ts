import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  const url = request.nextUrl.clone();
  url.pathname = `/api/script/${params.params.variable}`;

  // first tag the cache
  await fetch(url, {
    next: { tags: [params.params.variable] },
  });

  // then return the response
  return new NextResponse(`tagged /api/script/${params.params.variable}`);
}
