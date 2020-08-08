import { NextApiRequest, NextApiResponse } from 'next';
import { getLocalOrRebuild } from '@demonovel/local-or-rebuild-file';
import { tmpdir } from 'os';
import { join } from 'path';

export async function getLottoData<T>(type: string)
{
	type = type || 'superlotto638';

	let file = join(tmpdir(), `tw-history-data.${type}.json`);
	let url = `https://github.com/bluelovers/ws-lottery/raw/master/packages/%40lazy-lotto/tw-history-data/lib/data/${type}.json`

	let json = await getLocalOrRebuild(file, {

		makeFns: [
			() => fetch(url).then(res => res.json()),
		],

		fallback: {
			module: `lazy-lotto/tw-history-data/lib/data/${type}.json`,
		},
	})

	return json as any as T
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) =>
{
	return res.status(200).json(await getLottoData((_req.query as any)?.type))
}

export default handler
