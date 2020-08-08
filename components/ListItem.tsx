import React, { forwardRef, PropsWithChildren } from 'react'
import { User } from '../interfaces'
import NextMuiLink from '@lazy-react/next-mui-link';

type Props = {
	data: User
}

const ListItem = ({ data }: Props) => (
	<NextMuiLink href="/users/[id]" as={`/users/${data.id}`}>
		<a>{data.id}: {data.name}</a>
	</NextMuiLink>
)

export default ListItem
