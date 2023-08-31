import NextLink from 'next/link';

export default function Logo() {
	return (
		<NextLink href='/'>
			<a>
				<div className='flex items-center justify-center h-12 p-1 border-black rounded-lg cursor-pointer w-44 bg-slate-300'>
					<span className='inline-block font-serif text-4xl'>Movies</span>
					<span className='inline-block my-auto font-mono text-[2rem] font-black uppercase '>
						DB
					</span>
				</div>
			</a>
		</NextLink>
	);
}
