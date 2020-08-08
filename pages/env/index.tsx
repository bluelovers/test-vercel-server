import React, { PropsWithChildren, ReactNode } from 'react';
import { GetStaticProps } from 'next';
import useSwr from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default (prop: PropsWithChildren<{
	env: any
}>) =>
{
	const { data, error } = useSwr('/api/env', fetcher);

	if (error) return <div>Failed to load users</div>
	if (!data) return <div>Loading...</div>

	return <>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</>
}
