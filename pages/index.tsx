//import Link from 'next/link'
import Link from '@material-ui/core/Link';
import Layout from '../components/Layout'
import NextMuiLink from '@lazy-react/next-mui-link';

const IndexPage = () => (
	<Layout title="Home | Next.js + TypeScript Example">
		<h1>Hello Next.js 👋</h1>
		<p>
			<NextMuiLink href="/about">
				<a>About</a>
			</NextMuiLink>
		</p>
	</Layout>
)

export default IndexPage
