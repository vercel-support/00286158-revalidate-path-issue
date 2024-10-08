import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

async function fetchScriptContent(variable: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${variable}`,
    {
      next: { tags: [`script-${variable}`] },
    }
  );
  const data = await res.json();
  return `console.log(${JSON.stringify(data)});`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { variable: string } }
) {
  const scriptContent = await fetchScriptContent(params.variable);

  return new NextResponse(scriptContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { variable: string } }
) {
  const tag = `script-${params.variable}`;
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export const fetchCache = 'force-cache';
export const revalidate = false;

export function generateStaticParams() {
  return [{ variable: '1' }, { variable: '2' }, { variable: '3' }];
}
