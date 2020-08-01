import React, { PropsWithChildren, ReactNode } from 'react';
import styles from './LottoItem.module.css'

export default (prop: PropsWithChildren<{
	row: {
		"current": number[],
		"match": number,
		"follow": {
			"count": number,
			"map": Record<string, number>
		},
		"sp": number
	}
}>) =>
{
	return <>
		<tr>
			<td align="center"><div>
				<table className={styles.current}>
				{prop.row.current.map(v => <td>{v}</td>)}
					<td className={styles.sp}>{prop.row.sp}</td>
				</table>
			</div></td>
		</tr>
	</>
}
