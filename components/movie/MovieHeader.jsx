import NextImage from 'next/image'

export default function MovieHeader({ movie }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154'
	return (
		<div className='flex flex-col lg:flex-row justify-between items-center w-full py-5'>
			{/* left side */}
			<div className='flex flex-col justify-start items-start w-full'>
				<h1 className='text-4xl font-semibold'>{movie.title}</h1>
				<div className='flex justify-start items-start'>
					<p className='pr-2'>{movie.release_date.slice(0, 4)} </p>
					<p className='px-2'>{movie.spoken_languages[0].english_name} </p>
					<p className='px-2'>{movie.runtime} min</p>
					{/* production countries */}
					<div className='flex'>
						{movie.production_countries.map((country) => (
							<p key={country.name} className='pr-3'>
								{country.name}
							</p>
						))}
					</div>
				</div>
			</div>
			{/* right side */}
			<div className='flex justify-start lg:justify-end items-start w-full'>
				{/* rating score */}
				<div className='flex flex-col mr-5'>
					<div
						className={
							movie.vote_average < 5
								? 'p-1 '
								: movie.vote_average > 5 && movie.vote_average < 7
								? 'p-1 bg-yellow-400'
								: 'p-1 bg-green-400'
						}>
						<p className='text-center'>Rating</p>
						{`⭐` + movie.vote_average * 10} / 100
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
						{Math.round(movie.popularity) / 10} %
					</div>
				</div>
			</div>
		</div>
	)
}
