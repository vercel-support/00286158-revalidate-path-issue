import { unstable_cache } from 'next/cache';

export const runtime = 'edge';

function getCachedScriptById(id: string) {
  const data = unstable_cache(
    async (id: string) => {
      const script = await generateScript(id);

      return script;
    },
    undefined,
    {
      tags: [id],
    }
  )(id);

  return data;
}

async function generateScript(id: string) {
  return `script ${id} - ${new Date().toISOString()}`;
}

export async function GET(
  request: Request,
  { params: { variable } }: { params: { variable: string } }
) {
  const data = await getCachedScriptById(variable);

  return new Response(data);
}
