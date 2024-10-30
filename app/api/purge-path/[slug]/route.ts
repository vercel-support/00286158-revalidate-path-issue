import type { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  params: { params: { slug: string } }
) {
  revalidatePath(`/api/script/${params.params.slug}`);

  return Response.json({
    revalidated: true,
    now: new Date().toISOString(),
    slug: params.params.slug,
  });
}
