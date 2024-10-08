import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

async function fetchScriptContent(variable: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${variable}`,
    {
      next: { tags: [`script-${variable}`], revalidate: false },
    }
  );
  const data = await res.json();
  return JSON.stringify(data);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { variable: string } }
) {
  const scriptContent = await fetchScriptContent(params.variable);

  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'text/plain',
      // 'Vercel-CDN-Cache-Control': 'max-age=86400', // 1 day
    },
  });
}

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { variable: string } }
// ) {
//   const tag = `script-${params.variable}`;
//   revalidateTag(tag);
//   return NextResponse.json({ revalidated: true, now: Date.now() });
// }

export const dynamic = 'force-static';
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ variable: '1' }, { variable: '2' }, { variable: '3' }];
}
