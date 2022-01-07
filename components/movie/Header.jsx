export default function MovieHeader({ movie }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154'
	return (
		<div className='flex flex-col md:flex-row justify-between items-center w-full py-5 px-2 absolute top-0 left-0  text-white'>
			{/* left side */}
			<div className='flex flex-col justify-start items-start w-full'>
				{/* title */}
				<h1 className='text-4xl font-semibold'>{movie.title}</h1>
				{/* tagline */}
				<p className='pt-1'>{movie.tagline}</p>
				<div className='flex flex-wrap justify-start items-start my-5'>
					<p className='pr-2 border-2 rounded-lg m-1 ml-0 px-1'>
						{movie.release_date.slice(0, 4)}
					</p>
					<p className='pr-2 border-2 rounded-lg m-1 ml-0 px-1'>
						{movie.runtime} min
					</p>

					<p className='pr-2 border-2 rounded-lg m-1 ml-0 px-1 uppercase'>
						{movie.original_language}
					</p>

					{/* production countries */}
					<div className='flex flex-wrap border-2 rounded-lg m-1 ml-0 px-1'>
						{movie.production_countries.map((country) => (
							<p key={country.name} className='pr-3'>
								{country.name}
							</p>
						))}
					</div>
				</div>
			</div>
			{/* right side */}
			<div className='flex justify-start md:justify-end items-start w-full'>
				{/* rating score */}
				<div className='flex flex-col mr-5'>
					<div
						className={
							movie.vote_average < 5
								? 'p-1 bg-red-400'
								: movie.vote_average > 5 && movie.vote_average < 7
								? 'p-1 bg-yellow-400'
								: 'p-1 bg-green-400'
						}>
						<p className='text-center'>Rating</p>
						{`⭐` + movie.vote_average}
					</div>
				</div>

				{/* popularity */}
				<div className='flex flex-col'>
					<div
						className={
							movie.popularity < 5
								? 'p-1 bg-red-400'
								: movie.popularity > 5 && movie.popularity < 7
								? 'p-1 bg-yellow-400'
								: 'p-1 bg-green-400'
						}>
						<p className='text-center'>Popularity</p>
						<span className='inline-block'>{'📈'} </span>
						{Math.round(movie.popularity)} %
					</div>
				</div>
			</div>
		</div>
	)
}