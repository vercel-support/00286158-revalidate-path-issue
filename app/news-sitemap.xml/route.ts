import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const destUrl = 'https://wp.clutchpoints.com/news-sitemap.xml';

  try {
    const response = await fetch(destUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const headers = Array.from(response.headers.entries());
    
    const content = await response.text();

    console.log('Sitemap fetched:', headers);
    
    
    return NextResponse.json({headers, content}, {
      status: 200,
      headers: {
        // 'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache, must-revalidate, max-age=0, no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return new NextResponse('Error fetching sitemap', { status: 500 });
  }
}
