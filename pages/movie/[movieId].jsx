import React from 'react'
import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import Layout from '../../components/layout/Layout'
import MovieHeader from '../../components/movie/MovieHeader'
import MovieDescription from '../../components/movie/MovieDescription'

export default function MoviePage({ movie, cast }) {
	const [ytVideo, setYtVideo] = useState(
		movie.videos.results.length > 0
			? movie.videos.results[0].key
			: 'b9434BoGkNQ'
	)
	console.log(movie)
	console.log(cast)

	return (
		<>
			<Layout>
				{/* header */}
				<MovieHeader movie={movie} />
				<MovieDescription movie={movie} />

				<div className='flex flex-col lg:flex-row w-full'>
					{/* player */}
					<div className='relative lg:w-[80%] h-[35vh] md:h-[40vh] lg:h-[50vh] xl:h-[60vh] landscape:h-[75vh] my-5'>
						<ReactPlayer
							width='100%'
							height='100%'
							className='absolute top-0 left-0'
							url={`https://www.youtube.com/watch?v=${ytVideo}`}
						/>
					</div>

					{/* list of available videos */}
					<div className='flex flex-col '>
						{movie.videos.results.length > 0 && (
							<p className=' lg:ml-5 lg:mt-3 text-xl text-left w-full'>
								Checkout other videos
							</p>
						)}{' '}
						<div className='flex flex-wrap lg:flex-col lg:mx-5 my-5'>
							{movie.videos.results.length === 0 && 'Sorry, no videos'}
							{movie.videos.results.map((video) => (
								<button
									onClick={() => setYtVideo(video.key)}
									className='bg-green-300 mr-2 lg:mr-0 py-1 px-2 my-1 rounded-md '
									key={video.id}>
									{video.name}
								</button>
							))}
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	const { movieId } = context.query

	//fetch movie
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos,cast`
	)
	const movieData = await response.json()

	//fetch cast
	const castResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos,people`
	)

	const castData = await castResponse.json()

	return {
		props: {
			movie: movieData,
			cast: castData,
		},
	}
}
