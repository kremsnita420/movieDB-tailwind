import NextLink from 'next/link'

export default function Logo() {
	return (
		<NextLink href='/'>
			<a>
				<div
					className='
            h-12 w-44 flex justify-start items-center cursor-pointer bg-slate-300 p-1 rounded-lg border-2 border-black border-dashed'>
					<span className='text-4xl inline-block font-serif'>Movies</span>
					<span className='text-4xl uppercase font-black font-mono inline-block '>
						DB
					</span>
				</div>
			</a>
		</NextLink>
	)
}
