import React, { PropsWithChildren, ReactNode } from 'react';
import { GetStaticProps } from 'next';
import useSwr from 'swr'
import LottoItem from '../../components/lotto/LottoItem';
import LottoList from '../../components/lotto/LottoList';
import Layout from '../../components/Layout';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default (prop: PropsWithChildren<{
	env: any
}>) =>
{
	const { data, error } = useSwr('/api/lotto', fetcher);

	if (error) return <div>Failed to load users</div>
	if (!data) return <div>Loading...</div>

	return <>
		<Layout
			title={`Lotto`}
		>
		<LottoList list={data.list_pick}></LottoList>
		<pre>{JSON.stringify(data, null, 2)}</pre>
		</Layout>
	</>
}
