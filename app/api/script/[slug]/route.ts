import { NextRequest } from 'next/server';

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  return [];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  // generate script based on the slug
  const data = `slug "${slug}" - ${new Date().toISOString()}`;

  return Response.json(
    { message: 'Success', data },
    {
      headers: {
        'Vercel-CDN-Cache-Control': 'max-age=86400',
      },
    }
  );
}
