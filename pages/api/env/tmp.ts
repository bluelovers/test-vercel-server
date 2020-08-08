import { NextApiRequest, NextApiResponse } from 'next';
import tmp from 'tmp';
import { promises as fs, constants } from 'fs';
import { dirname } from 'path';
import os from 'os';

const handler = async (_req: NextApiRequest, res: NextApiResponse) =>
{

	const tmpobj = tmp.dirSync();

	let msg: any[] = [];

	await fs.access(dirname(tmpobj.name), constants.W_OK | constants.R_OK)
		// @ts-ignore
		.then(m => m ?? true)
		.catch(e => String(e))
		.then(m => msg.push([dirname(tmpobj.name), m]))
	;

	await fs.access(tmpobj.name, constants.W_OK | constants.R_OK)
		// @ts-ignore
		.then(m => m ?? true)
		.catch(e => String(e))
		.then(m => msg.push([tmpobj.name, m]))
	;

	return res.status(200).json({
		tmpobj,
		msg,
	})
}

export default handler
