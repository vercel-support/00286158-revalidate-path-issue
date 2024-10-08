import { NextRequest, NextResponse } from 'next/server';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.query.variable);

  console.log('Regenerating script with variable', req.query.variable);

  const posts = await fetch('https://jsonplaceholder.org/posts', {
    next: {
      revalidate: false,
    },
  }).then((res) => res.json());

  console.log('Post1:', posts[0]);

  // return new NextResponse(
  //   `hello variable ${req.query.variable} ; date: ${Date.now()}`,
  //   {
  //     headers: {
  //       'Vercel-CDN-Cache-Control': 'max-age=86400', // 1 day
  //     },
  //   }
  // );

  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=86400'); // 1 day

  res
    .status(200)
    .send(`hello variable ${req.query.variable} ; date: ${Date.now()}`);
}

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log('Regenerating script with variable', params.params.variable);

  const posts = await fetch('https://jsonplaceholder.org/posts', {
    next: {
      revalidate: false,
      tags: [params.params.variable],
    },
  }).then((res) => res.json());

  console.log('Post1:', posts[0]);

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`,
    {
      headers: {
        'Vercel-CDN-Cache-Control': 'max-age=86400', // 1 day
      },
    }
  );
}
