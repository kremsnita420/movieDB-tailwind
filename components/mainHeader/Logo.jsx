import NextLink from 'next/link';

export default function Logo() {
	return (
		<NextLink href='/'>
			<a>
				<div className='flex items-center justify-center h-12 p-1 border-black rounded-lg cursor-pointer font-bungee'>
					<span className='inline-block font-serif text-4xl'>Movies</span>
					<span className='inline- font-mono text-[3rem] font-black uppercase '>
						DB
					</span>
				</div>
			</a>
		</NextLink>
	);
}
