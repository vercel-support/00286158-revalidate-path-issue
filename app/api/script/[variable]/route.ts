import { NextRequest, NextResponse } from "next/server";

export const revalidate = 600; // 1 day
export const dynamic = 'force-static';

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Regenerating script with variable", params.params.variable);

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`,
    {
      headers: {
        'Cache-Control': 'max-age=600, must-revalidate', // 1 day
      },
    }
  );
}
