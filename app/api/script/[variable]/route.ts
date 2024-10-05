import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 600;

export const generateStaticParams = async () => [
  {
    variable: 'test',
  },
];

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log('Regenerating script with variable', params.params.variable);

  const posts = await fetch('https://jsonplaceholder.org/posts', {
    next: {
      revalidate: 600,
    }
  }).then((res) =>
    res.json()
  );

  console.log('Fetched posts', posts);

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`
    // {
    //   status: 200,
    //   headers: {
    //     'Cache-Control': 'max-age=600, must-revalidate', // 1 day
    //     'Vercel-CDN-Cache-Control': 'max-age=60',
    //     'CDN-Cache-Control': 'max-age=10',
    //   },
    // }
  );
}
