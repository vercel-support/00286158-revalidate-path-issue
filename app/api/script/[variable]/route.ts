import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 600;
export const dynamic = 'force-static';
export const dynamicParams = true;
export const generateStaticParams = async () => [];

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log('Regenerating script with variable', params.params.variable);

  const posts = await fetch('https://jsonplaceholder.org/posts', {
    next: {
      revalidate: 600,
    },
  }).then((res) => res.json());

  console.log('Post1:', posts[0]);

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`
    // {
    //   headers: {
    //     'Vercel-CDN-Cache-Control': 'max-age=86400', // 1 day
    //   },
    // }
  );
}
