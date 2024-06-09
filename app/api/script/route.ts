import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log("Regenerating static script");

  return new NextResponse(`hello world`, {
    headers: {
      "Vercel-CDN-Cache-Control": "max-age=86400", // 1 day
    },
  });
}
