import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  const hostname = request.nextUrl.hostname;

  // first tag the cache
  await fetch(new URL(`/api/script/${params.params.variable}`, hostname), {
    next: { tags: [params.params.variable] },
  });

  // then return the response
  return new NextResponse(`tagged /api/script/${params.params.variable}`);
}
