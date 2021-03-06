export default function MovieHeader({ show }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154'
	return (
		<div className='flex flex-col justify-center items-center w-full absolute top-[5%] left-4  text-white'>
			<div className='flex flex-col justify-start items-start w-full '>
				{/* title */}
				<h1 className='text-xl md:text-2xl lg:text-4xl font-semibold'>
					{show.name}
				</h1>

				<div className='flex flex-wrap justify-start items-start my-5'>
					<p className='pr-2 border-2 rounded-lg m-1 ml-0 px-1'>
						{show.first_air_date.slice(0, 4)}
					</p>

					<p className='pr-2 border-2 rounded-lg m-1 ml-0 px-1 uppercase'>
						{show.original_language}
					</p>
				</div>
			</div>
		</div>
	)
}
