import React, { PropsWithChildren, ReactNode } from 'react';
import styles from './LottoItem.module.css'
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import red from '@material-ui/core/colors/red';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import { Grow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	red: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
	},
	green: {
		color: theme.palette.getContrastText(green[500]),
		backgroundColor: green[500],
	},
}));

export default LottoItem

function LottoItem(prop: PropsWithChildren<{
	row: {
		"current": number[],
		"match": number,
		"follow": {
			"count": number,
			"map": Record<string, number>
		},
		"sp": number
	}
}>)
{
	const classes = useStyles();

	return <>
		<tr>
			<td align="center">
				<div>
					<table className={styles.current}>
						{prop.row.current.map(v => <td><Avatar className={classes.red}>{v}</Avatar></td>)}
						<td className={styles.sp}><Avatar className={classes.green}>{prop.row.sp}</Avatar></td>
					</table>
				</div>
			</td>
		</tr>
	</>
}
