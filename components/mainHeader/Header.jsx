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
					<ul className=''>
						<li>
							<NextLink href='/watchlist'>
								<a className='py-1 px-2 bg-red-300'>Watchlist</a>
							</NextLink>
						</li>
					</ul>
					<div className='px-2 py-1'>
						<Image
							className='rounded-full'
							width={40}
							height={40}
							src={session.user.image}
							alt=''
						/>
					</div>

					<button className='px-2 py-1' onClick={() => signOut()}>
						Sign out
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
