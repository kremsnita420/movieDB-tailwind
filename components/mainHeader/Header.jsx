import NextLink from 'next/link';

import Logo from './Logo';

export default function Header() {
	return (
		<header className='sticky top-0 flex items-center drop-shadow-lg justify-between mb-6 bg-purple-400 z-[100] md:mb-12'>
			<div className='container p-2 mx-auto md:p-4 md:pl-0 '>
				<Logo />
			</div>
		</header>
	);
}
