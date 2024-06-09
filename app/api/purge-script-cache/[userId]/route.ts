import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RequestParams = {
  params: {
    userId: string;
  };
};

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  params: RequestParams
): Promise<NextResponse> {
  const { userId } = params.params;

  console.log("Purge script cache for user", userId);

  revalidatePath(`/api/script/${userId}`);

  return new NextResponse();
}
