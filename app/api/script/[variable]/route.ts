import { NextRequest, NextResponse } from 'next/server';

async function fetchScriptContent(variable: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${variable}`,
    {
      next: {
        tags: [variable],
        revalidate: 86400,
      },
    }
  );
  const data = await res.json();
  return JSON.stringify(data);
}
// export const revalidate = 86400; // Cache for 1 day

export async function GET(
  request: NextRequest,
  { params }: { params: { variable: string } }
) {
  try {
    const script = await fetchScriptContent(params.variable);
    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error fetching script:', error);
    return new NextResponse('Error fetching script', { status: 500 });
  }
}
