import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Regenerating script with variable", params.params.variable);

  return new NextResponse(
    `hello variable ${
      params.params.variable
    } ; date: ${new Date().toLocaleDateString()}`,
    {
      headers: {
        "Vercel-CDN-Cache-Control": "max-age=86400", // 1 day
      },
    }
  );
}
