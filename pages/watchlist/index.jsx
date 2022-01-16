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
							<p className='text-left w-full px-2 md:px-0' key={movie._id}>
								{movie.name}
							</p>
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
	let dev = process.env.NODE_ENV !== 'production'
	let { DEV_URL, PROD_URL } = process.env

	// request posts from api
	let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/watchlist`)
	// extract the data
	let data = await response.json()

	return {
		props: {
			movies: data,
		},
	}
}
