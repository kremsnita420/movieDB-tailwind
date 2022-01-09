import { useSession, signIn, signOut } from 'next-auth/react'
import NextLink from 'next/link'

import Logo from './Logo'

export default function Header() {
	const { data: session } = useSession()
	console.log(session)

	if (session) {
		return (
			<div className='flex justify-between items-center'>
				<div className='p-2 md:pl-0 '>
					<Logo />
				</div>

				<div className='flex justify-around items-center w-1/4'>
					<ul className=''>
						<li>
							<NextLink href='/profile'>
								<a className='py-1 px-2 bg-red-300'>Wishlist</a>
							</NextLink>
						</li>
					</ul>
					<img
						className='rounded-full'
						width={50}
						src={session.user.image}
						alt=''
					/>
					<button className='min-w-[60px]' onClick={() => signOut()}>
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

			<div className='flex justify-around items-center w-1/4'>
				<ul>
					<li>
						<NextLink href='/profile'>
							<a className='py-1 px-2 bg-red-300'>Wishlist</a>
						</NextLink>
					</li>
				</ul>

				<button onClick={() => signIn()}>Sign in</button>
			</div>
		</div>
	)
}
