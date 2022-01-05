import Image from 'next/image'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

function SearchResults({ movies, IMAGE_BASE_URL, result }) {
	return (
		<>
			{result ? (
				<h2 className='text-3xl my-5'>
					Results for <span className='text-bold uppercase'> {result}</span>
				</h2>
			) : (
				''
			)}

			<div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 mt-5'>
				{movies
					? movies.map((movie) => (
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
													{`⭐` + movie.vote_average * 10}
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
									</a>
								</NextLink>

								<p className='text-center'>{movie.media_type}</p>
								<h2 className='mb-1 text-center'>
									{movie.title || movie.name}
								</h2>
							</div>
					  ))
					: ''}
			</div>
		</>
	)
}

// MAKE RENDER ONLY ON CLIENTSIDE
export default dynamic(() => Promise.resolve(SearchResults), { ssr: false })
