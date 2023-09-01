import NextLink from 'next/link';

import Logo from './Logo';

export default function Header() {
	return (
		<header className='sticky top-0 flex items-center drop-shadow-lg justify-between bg-purple-400 z-[100]'>
			<div className='container p-2 mx-auto md:p-4'>
				<Logo />
			</div>
		</header>
	);
}
