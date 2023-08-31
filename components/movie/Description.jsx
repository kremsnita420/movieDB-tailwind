import NextImage from 'next/image';

export default function MovieDescription({ movie }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154';
	return (
		<div className='flex flex-col px-2 mb-10 text-center md:px-4 xl:px-0'>
			<p className='max-w-screen-lg my-5'>{movie.overview}</p>
			<div className='flex flex-wrap items-center justify-start w-full py-2 mb-4'>
				{movie.genres.map((genre) => (
					<p
						className='px-1 my-1 mr-1 border-2 rounded-lg'
						key={genre.id}>
						{genre.name}
					</p>
				))}
			</div>

			<div className='flex items-start justify-start w-full'>
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
	);
}
