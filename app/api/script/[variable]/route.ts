import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600; // revalidate the data at most every hour

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log("Regenerating script with variable", params.params.variable);

  return new NextResponse(`hello variable ${params.params.variable}`);
}
