import NextLink from 'next/link';

import Logo from './Logo';

export default function Header() {
	return (
		<div className='flex items-center justify-between mb-6 md:mb-12'>
			<div className='w-full p-2 md:pl-0 '>
				<Logo />
			</div>
		</div>
	);
}
