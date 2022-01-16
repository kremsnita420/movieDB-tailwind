import Image from 'next/image'
import NextLink from 'next/link'

export default function SearchResults({ movies, IMAGE_BASE_URL, query }) {
	return (
		<div className='px-2'>
			{query.length > 3 ? (
				<h2 className='text-3xl my-5 w-full text-center'>
					Results for{' '}
					<span className='text-bold'>
						{'>'}
						{query}
						{'<'}
					</span>
				</h2>
			) : (
				<h2 className='text-lg my-5 w-full text-center'>
					Tip: Use searchbar to look for movies, shows, people, ...{' '}
				</h2>
			)}

			<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 mt-5'>
				{query.length > 3 ? (
					movies.map((movie) => (
						<div className='flex flex-col bg-gray-200' key={movie.id}>
							<NextLink
								href={
									movie.media_type === 'tv'
										? `/show/${movie.id}`
										: movie.media_type === 'movie'
										? `/movie/${movie.id}`
										: `/people/${movie.id}`
								}>
								<a>
									<div className='relative cursor-pointer w-[150] h-[230]'>
										<Image
											src={
												movie.poster_path
													? IMAGE_BASE_URL + movie.poster_path
													: movie.backdrop_path
													? IMAGE_BASE_URL + movie.backdrop_path
													: movie.profile_path
													? IMAGE_BASE_URL + movie.profile_path
													: '/images/no_img.png'
											}
											objectFit='fill'
											alt=''
											width={500}
											height={700}
											placeholder='blur'
											blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
											alt='profile photo'
											priority='high'
											rel='preload'
											as='image'
										/>
										{movie.vote_average ? (
											<div
												className={
													movie.vote_average < 5
														? 'absolute rounded-md p-1 bg-red-400 bottom-3 right-2'
														: movie.vote_average > 5 && movie.vote_average < 7
														? 'absolute rounded-md p-1 bg-yellow-400 bottom-3 right-2'
														: 'absolute rounded-md p-1 bg-green-400 bottom-3 right-2'
												}>
												{`⭐` + movie.vote_average}
											</div>
										) : movie.vote_count || movie.vote_average === 0 ? (
											<div className='absolute rounded-md p-1 bg-red-400 bottom-3 right-2'>
												<p>No score</p>
											</div>
										) : (
											<div
												className={
													movie.popularity < 5
														? 'absolute rounded-md p-1 bg-red-400 bottom-3 right-2'
														: movie.popularity > 5 && movie.popularity < 7
														? 'absolute rounded-md p-1 bg-yellow-400 bottom-3 right-2'
														: 'absolute rounded-md p-1 bg-green-400 bottom-3 right-2'
												}>
												<span className='inline-block'>{'📈'} </span>
												{Math.round(movie.popularity)}
											</div>
										)}
									</div>

									<p className='text-center font-light'>{movie.media_type}</p>
									<p className='mb-1 font-semibold text-center'>
										{movie.title
											? movie.title.split(':')
											: movie.name.split(':')}
									</p>
								</a>
							</NextLink>
						</div>
					))
				) : (
					<div></div>
				)}
			</div>
		</div>
	)
}
