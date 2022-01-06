import React from 'react'
import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import Layout from '../../components/layout/Layout'
import MovieHeader from '../../components/movie/MovieHeader'

export default function MoviePage({ movie }) {
	const [ytVideo, setYtVideo] = useState(
		movie.videos.results.length > 0
			? movie.videos.results[0].key
			: 'b9434BoGkNQ'
	)
	console.log(movie)

	return (
		<Layout>
			{/* header */}
			<MovieHeader movie={movie} />
			{/* player */}
			<div className='relative w-full h-[30vh] md:h-[55vh] lg:h-[65vh] xl:h-[75vh]  '>
				<ReactPlayer
					width='100%'
					height='100%'
					className='absolute top-0 left-0'
					url={`https://www.youtube.com/watch?v=${ytVideo}`}
				/>
			</div>
			{movie.videos.results.length > 0 && (
				<p className='mt-5 text-xl'>Checkout other videos</p>
			)}

			<div className='flex flex-wrap my-2'>
				{movie.videos.results.length === 0 && 'Sorry, no videos'}
				{movie.videos.results.map((video, i) => (
					<button
						onClick={() => setYtVideo(video.key)}
						className='bg-green-300 m-1 py-1 px-2 rounded-md'
						key={video.id}>
						{i + 1 + ' - '}
						{video.name}
					</button>
				))}
			</div>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const { movieId } = context.query

	//fetch movie
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos`
	)
	const movieData = await response.json()

	return {
		props: {
			movie: movieData,
		},
	}
}
