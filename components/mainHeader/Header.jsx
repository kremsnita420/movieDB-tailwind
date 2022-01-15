import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import NextLink from 'next/link'

import Logo from './Logo'

export default function Header() {
	const { data: session } = useSession()

	if (session) {
		return (
			<div className='flex justify-between items-center'>
				<div className='p-2 md:pl-0 '>
					<Logo />
				</div>

				<div className='flex justify-center items-center '>
					<ul className='mr-2'>
						<li>
							<NextLink href='/watchlist'>
								<a className='py-1 px-2 bg-red-300'>Watchlist</a>
							</NextLink>
						</li>
					</ul>
					<img src={session.user.image} width={30} height={30} alt='' />

					<button className='px-2 py-1' onClick={() => signOut()}>
						Log out
					</button>
				</div>
			</div>
		)
	}
	return (
		<div className='flex justify-between items-center'>
			<div className='w-full p-2 md:pl-0 '>
				<Logo />
			</div>

			<div className='flex justify-around items-center'>
				<ul>
					<li>
						<NextLink href='/profile'>
							<a className='py-1 px-2 bg-red-300'>Wishlist</a>
						</NextLink>
					</li>
				</ul>

				<button className=' px-2 py-1' onClick={() => signIn()}>
					Sign in
				</button>
			</div>
		</div>
	)
}
