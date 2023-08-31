export default function MovieHeader({ show }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154';
	return (
		<div className='flex flex-col justify-center items-center w-full absolute top-[5%] left-4 text-white'>
			<div className='flex flex-col items-start justify-start w-full '>
				{/* title */}
				<h1 className='text-xl font-semibold md:text-2xl lg:text-4xl'>
					{show.name}
				</h1>

				<div className='flex flex-wrap items-start justify-start my-5'>
					<p className='px-1 pr-2 m-1 ml-0 border-2 rounded-lg'>
						{show.first_air_date.slice(0, 4)}
					</p>

					<p className='px-1 pr-2 m-1 ml-0 uppercase border-2 rounded-lg'>
						{show.original_language}
					</p>
				</div>
			</div>
		</div>
	);
}
