import { NextApiRequest, NextApiResponse } from 'next';
import { getLocalOrRebuild } from '@demonovel/local-or-rebuild-file';
import { tmpdir } from 'os';
import { join } from 'path';
import { getLottoData } from './data';
import naturalCompare from '@bluelovers/string-natural-compare';
import { IRandomLottoParams } from 'random-lotto';
import { IRecordRow, IResultSuperlotto638 } from '@lazy-lotto/types';
import { defaultSimpleMatchInFilter } from '@lazy-lotto/util/lib/match/simpleMatchIn';
import { simpleMatchIn } from '@lazy-lotto/util/index';
import random from 'random-extra';
import { _createWeight, _percentageWeight, _calcWeight } from 'random-extra/src/distributions/internal/item-by-weight';
// @ts-ignore
import fill from 'fill-range';
import { randomLottoX } from 'random-lotto';

export function getWeightTable<T extends IRecordRow<any[]> = IRecordRow<IResultSuperlotto638>>(options: {
	historyData: Record<string, T>,
	historyLimit?: number,
})
{
	let { historyData, historyLimit = Infinity } = options ?? {};

	// @ts-ignore
	let historyArray = (Object.values(historyData) as T[]);

	historyArray = historyArray.reverse();

	if (historyLimit < historyArray.length)
	{
		historyArray = historyArray.slice(0, historyLimit)
	}

	const weightTable: IRandomLottoParams["weightTable"] = historyArray
		.reduce((a, row) =>
		{

			// @ts-ignore
			row.result[0].forEach(v =>
			{
				// @ts-ignore
				a[0][v] = a[0][v] || 0;
				// @ts-ignore
				a[0][v]++;
			})

			row.result[0] = row.result[0].sort(naturalCompare);

			let v2 = row.result[1];

			// @ts-ignore
			a[1][v2] = a[1][v2] || 0;
			// @ts-ignore
			a[1][v2]++;

			return a
		}, [{}, {}] as IRandomLottoParams["weightTable"]);

	//console.dir(weightTable[0])

	// @ts-ignore
	Object.entries(weightTable[0])
		.forEach((row) =>
		{

			if (row[1] < 100)
			{
				// @ts-ignore
				delete weightTable[0][row[0]]
			}

		})
	;

	//console.dir(weightTable[0])

	return {
		historyArray,
		weightTable,
	}
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) =>
{

	let type = (_req.query as any)?.type ?? `superlotto638`;

	let historyData: any = await getLottoData(type)

	const { weightTable, historyArray } = getWeightTable({
		historyData,
	});

	let historyTop: any[] = [];

	let list = randomLottoX({
		ranges: [
			[
				fill(1, 38),
				6,
			],
			[
				fill(1, 8),
				1,
			],
		],
		weightTable,
		sortResults: true,

		handleOptionsRangeArgv(argv, index, options)
		{
			let { vlist, kwlist } = _calcWeight(options.random as any, argv[0], argv[2]);

			vlist.sort((a, b) =>
			{
				return naturalCompare(a[1], b[1])
			})

			//console.dir(kwlist)
			//console.dir(vlist)

			return argv
		},

	}, {

		// @ts-ignore
		handler(actual, index): {
			current: number[],
			match: number,
			follow: {
				count: number,
				map: Record<string, number>,
			},
			sp: number
		}
		{
			let m = simpleMatchIn(actual[0], historyArray, index, {
				simpleMatchInFilter(m, index, options, current, historyRow, ...argv)
				{
					if (m.length > 5)
					{
						// @ts-ignore
						delete historyRow.dates[2]
						// @ts-ignore
						delete historyRow.dates[3]
						// @ts-ignore
						delete historyRow.ids[2]
						// @ts-ignore
						delete historyRow.ids[3]

						// @ts-ignore
						historyTop.push([
							index,
							current,
							historyRow.result[1],
							historyRow.date,
							historyRow.id,
							historyRow.dates,
							historyRow.ids,
						])
					}

					return defaultSimpleMatchInFilter(m, index, options, current, historyRow, ...argv)
				},
			})

			if (m !== void 0)
			{
				return {
					...m,
					sp: actual[1] as any as number,
				}
			}

			return void 0 as any
		},
		filter(value)
		{
			if (!value)
			{
				return false
			}

			// @ts-ignore
			let { skip } = value.follow;
			// @ts-ignore
			delete value.follow.skip;
			return !skip
		},
		limit: 3000,

	})

	let limit = (_req.query as any).limit | 0;
	if (limit <= 0) limit = 5;

	let list_pick = random.itemByWeightUnique(list, limit, {
		getWeight: (m) => 1,
		shuffle: true,
	}).map(v => v[1])

	res.status(200).json({
		historyTop,
		list_pick,
		//list,
	})
}

export default handler
