import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Layout from '../../components/layout/Layout'

export default function ProfilePage() {
	const { data: session, status } = useSession()

	if (status === 'authenticated') {
		const userImage = session.user.image

		console.log(userImage)
		return (
			<Layout>
				<div className='flex flex-col items-center justify-start'>
					<h1 className='py-5'>Wish List</h1>
					<p>Signed in as {session.user.email}</p>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className='flex flex-col items-center justify-start'>
				<h1 className='py-5'>Profile Page</h1>
				{!session && <p>Please sign in to manage wishlist</p>}
			</div>
		</Layout>
	)
}
