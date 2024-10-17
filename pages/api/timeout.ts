import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await new Promise((resolve) =>
    setTimeout(resolve, Number(req.query.timeout))
  );
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('rejecting')), 1000)
  );
  return res.status(200).json({ success: true });
}
