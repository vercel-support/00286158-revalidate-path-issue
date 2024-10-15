export const runtime = 'edge';

export async function GET() {
  const data = await fetch('/node').then((res) => res.json());
  console.log(data);
  
  return new Response('Hello, from the edge!');
}
