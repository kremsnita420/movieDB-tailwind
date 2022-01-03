import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ({ movies, IMAGE_BASE_URL, query }) {
	const [result, setResults] = useState('')

	useEffect(() => {
		setResults(query)
	}, [movies])
	return (
		<>
			{result ? (
				<h2 className='text-3xl my-10'>
					Results for <span className='text-bold uppercase'> {result}</span>
				</h2>
			) : (
				''
			)}

			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
				{movies
					? movies.map((movie) => (
							<div className='flex flex-col' key={movie.id}>
								<div className='relative w-[250] h-[330]'>
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
									/>
									{movie.backdrop_path || movie.poster_path ? (
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
