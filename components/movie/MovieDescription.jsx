import NextImage from 'next/image'

export default function MovieDescription({ movie }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154'
	return (
		<div className='flex flex-col'>
			<div className='flex justify-start items-center w-full py-2'>
				{movie.genres.map((genre) => (
					<p className='border-2 rounded-lg mr-1 px-1' key={genre.id}>
						{genre.name}
					</p>
				))}
			</div>
			<p className='my-5 max-w-screen-lg'>{movie.overview}</p>
		</div>
	)
}
