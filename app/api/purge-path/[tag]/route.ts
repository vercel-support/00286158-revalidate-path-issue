import type { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  params: { params: { tag: string } }
) {
  revalidatePath(
    `/api/script/${params.params.tag}`
  );
  return Response.json({
    revalidated: true,
    now: Date.now(),
    tag: params.params.tag,
  });
}
