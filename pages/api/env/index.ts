import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse) =>
{
	res.status(200).json(process.env)
}

export default handler
