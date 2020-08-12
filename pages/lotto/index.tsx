import React, { PropsWithChildren, ReactNode, Suspense, useEffect } from 'react';
import { GetStaticProps } from 'next';
import useSwr, { mutate } from 'swr'
import LottoItem from '../../components/lotto/LottoItem';
import LottoList from '../../components/lotto/LottoList';
import Layout from '../../components/Layout';
import styles from './index.module.css'
import ReactSuspense from '@lazy-react/react-suspense';
import { Button, Grow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const isServer = typeof window === 'undefined'

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: theme.spacing(3),
	},
}));

const ShowLotto = () =>
{
	const { data, error } = useSwr('/api/lotto', fetcher, {
		suspense: true,
	});

	if (error) return <div>Failed to load users</div>

	const [loading, setLoading] = React.useState(false);

	const classes = useStyles();

	return <>
		<div className={styles.area}>
				<LottoList list={data.list_pick}></LottoList>
		</div>
		<div className={[styles.area, classes.root].join(' ')}>
			{loading && <LinearProgress color="secondary" />}
		</div>
		<div className={styles.area}>
			<Button variant="contained" color="secondary" onClick={async () =>
			{
				setLoading(() => true);
				await mutate('/api/lotto')
				setLoading(() => false);
			}}>reload</Button>
		</div>
		<div className={styles.area}>
			<Typography component="pre">
				{JSON.stringify(data, null, 2)}
			</Typography>
		</div>
	</>
}

const Loading = () => <div>
	<LinearProgress />
	<Typography variant="caption" color="textSecondary">
	loading...
	</Typography>
</div>;

export default LottoPage

function LottoPage(prop: PropsWithChildren<{
	env: any
}>)
{
	return <>
		<Layout
			title={`Lotto`}
		>
			<ReactSuspense fallback={<Loading />}>
				<ShowLotto />
			</ReactSuspense>
		</Layout>
	</>
}
