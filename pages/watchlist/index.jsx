import { useSession } from 'next-auth/react'

import Layout from '../../components/layout/Layout'

export default function ProfilePage({ movies }) {
	const { data: session, status } = useSession()
	console.log(process.env.NODE_ENV)

	if (status === 'authenticated') {
		return (
			<Layout>
				<div className='flex flex-col items-center justify-start'>
					<h1 className='py-5 font-bold'>Watch List</h1>
					{movies
						.filter((value) => value.userEmail === session.user.email)
						.map((movie) => (
							<p key={movie._id}>{movie.name}</p>
						))}
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className='flex flex-col items-center justify-start'>
				<h1 className='py-5 font-bold'>Watch List</h1>
				{!session && <p>Please sign in to manage wishlist</p>}
			</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx) {
	// get the current environment
	const dev = process.env.NODE_ENV !== 'production'
	const { DEV_URL, PROD_URL } = process.env

	// request posts from api
	const response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/watchlist`)
	// extract the data
	const data = await response.json()

	return {
		props: {
			movies: data,
		},
	}
}
