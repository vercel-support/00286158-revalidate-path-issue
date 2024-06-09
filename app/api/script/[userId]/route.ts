import { NextRequest, NextResponse } from "next/server";

type RequestParams = {
  params: {
    userId: string;
  };
};

export async function GET(
  request: NextRequest,
  params: RequestParams
): Promise<NextResponse> {
  const { userId } = params.params;

  console.log("Regenerating script script for user", userId);

  return new NextResponse(`hello ${userId}`, {
    headers: {
      "Vercel-CDN-Cache-Control": "max-age=86400", // 1 day
    },
  });
}
