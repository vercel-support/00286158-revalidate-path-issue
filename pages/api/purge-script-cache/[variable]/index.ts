// import { revalidatePath } from 'next/cache';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(
//   request: NextRequest,
//   params: { params: { variable: string } }
// ): Promise<NextResponse> {
//   console.log('Purge variable script cache');

//   revalidatePath(`/api/script/${params.params.variable}`);
//   revalidatePath(`/api/script/[variable]`, 'page');

//   // return new NextResponse(`purged /api/script/${params.params.variable}`);
//   return new NextResponse(
//     `purged /api/script/[variable] and /api/script/${params.params.variable}`
//   );
// }

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // console.log(req.query.variable);
    
    await res.revalidate(`/api/script/${req.query.variable}`);

    res.status(200).json({ revalidated: true });
  } catch (err) {
    res.status(500).json({ error: 'failed to revalidate' });
  }
}
