import NextImage from 'next/image';

export default function MovieDescription({ show }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
	const LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w154';
	return (
		<div className='flex flex-col px-2 mb-10 text-center md:px-4 xl:px-0'>
			<p className='max-w-screen-lg my-5'>{show.overview}</p>

			<div className='flex items-start justify-start w-full'>
				{/* rating score */}
				<div className='flex flex-col mr-5'>
					<div
						className={
							show.vote_average < 5
								? 'p-1 bg-red-400'
								: show.vote_average > 5 && show.vote_average < 7
								? 'p-1 bg-yellow-400'
								: 'p-1 bg-green-400'
						}>
						<p className='text-center'>Rating</p>
						{`⭐` + show.vote_average}
					</div>
				</div>

				{/* popularity */}
				<div className='flex flex-col'>
					<div
						className={
							show.popularity < 5
								? 'p-1 bg-red-400'
								: show.popularity > 5 && show.popularity < 7
								? 'p-1 bg-yellow-400'
								: 'p-1 bg-green-400'
						}>
						<p className='text-center'>Popularity</p>
						<span className='inline-block'>{'📈'} </span>
						{Math.round(show.popularity)} %
					</div>
				</div>
			</div>
		</div>
	);
}
