import React, { PropsWithChildren, ReactNode, Suspense } from 'react';
import { GetStaticProps } from 'next';
import useSwr, { mutate } from 'swr'
import LottoItem from '../../components/lotto/LottoItem';
import LottoList from '../../components/lotto/LottoList';
import Layout from '../../components/Layout';
import styles from './index.module.css'
import ReactSuspense from '@lazy-react/react-suspense';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const isServer = typeof window === 'undefined'

const ShowLotto = () =>
{
	const { data, error } = useSwr('/api/lotto', fetcher, {
		suspense: true,
	});

	if (error) return <div>Failed to load users</div>

	return <>
		<div className={styles.area}>
			<LottoList list={data.list_pick}></LottoList>
		</div>
		<div className={styles.area}>
			<button onClick={() => mutate('/api/lotto')}>reload</button>
		</div>
		<div className={styles.area}>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	</>
}

const Loading = () => <div>loading...</div>;

export default (prop: PropsWithChildren<{
	env: any
}>) =>
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