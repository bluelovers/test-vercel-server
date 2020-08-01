import React, { PropsWithChildren, ReactNode } from 'react';
import LottoItem from './LottoItem';

export default (prop: PropsWithChildren<{
	list: {
		"current": number[],
		"match": number,
		"follow": {
			"count": number,
			"map": Record<string, number>
		},
		"sp": number
	}[]
}>) =>
{
	return <>
		<table>
		{
			prop.list.map(row => <LottoItem row={row}/>)
		}
		</table>
	</>
}
