import { NextRequest, NextResponse } from 'next/server';

async function fetchScriptContent(variable: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${variable}`,
    // {
    //   next: { tags: [`script-${variable}`], revalidate: 600 },
    // }
  );
  const data = await res.json();
  return JSON.stringify(data);
}

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { variable: string } }
// ) {
//   const scriptContent = await fetchScriptContent(params.variable);

//   return new NextResponse(scriptContent, {
//     headers: {
//       'Content-Type': 'text/plain',
//     },
//   });
// }

export const dynamic = 'force-dynamic';
export const revalidate = 30; // Cache for 30 seconds

export async function GET(
  request: NextRequest,
  { params }: { params: { parameter: string } }
) {
  try {
    const script = await fetchScriptContent(params.parameter);
    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching script:', error);
    return new NextResponse('Error fetching script', { status: 500 });
  }
}