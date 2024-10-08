import { NextRequest, NextResponse } from 'next/server';

async function fetchScriptContent(variable: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${variable}`,
    {
      next: { tags: [`script-${variable}`], revalidate: 600 },
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
    },
  });
}

export const dynamic = 'force-static';
export const revalidate = 600;
export const dynamicParams = false;

// export function generateStaticParams() {
//   return [{ variable: '1' }, { variable: '2' }, { variable: '3' }];
// }
