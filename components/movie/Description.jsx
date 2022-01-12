import NextImage from 'next/image'

export default function MovieDescription({ movie }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154'
	return (
		<div className='flex flex-col w-full px-2 md:px-0'>
			<p className='my-5 max-w-screen-lg'>{movie.overview}</p>
			<div className='flex justify-start items-center w-full py-2'>
				{movie.genres.map((genre) => (
					<p className='border-2 rounded-lg mr-1 px-1' key={genre.id}>
						{genre.name}
					</p>
				))}
			</div>

			<div className='flex justify-start items-start w-full'>
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
