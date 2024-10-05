import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  params: { params: { variable: string } }
): Promise<NextResponse> {
  console.log('Regenerating script with variable', params.params.variable);

  return new NextResponse(
    `hello variable ${params.params.variable} ; date: ${Date.now()}`,
    {
      status: 200,
      headers: {
        'Cache-Control': 'max-age=600, must-revalidate', // 1 day
        'Vercel-CDN-Cache-Control': 'max-age=60',
        'CDN-Cache-Control': 'max-age=10',
      },
    }
  );
}
