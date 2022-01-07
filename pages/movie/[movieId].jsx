import React from 'react'
import { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import Layout from '../../components/layout/Layout'
import Header from '../../components/movie/Header'
import Description from '../../components/movie/Description'
import AvailableVideos from '../../components/movie/AvailableVideos'
import HeroImage from '../../components/movie/HeroImage'

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
				<div className='relative flex flex-col items-start justify-start w-full '>
					<HeroImage movie={movie} />
					{/* movie header */}
					<Header movie={movie} />
					{/* movie description */}
					<Description movie={movie} />
				</div>

				<div className='flex flex-col lg:flex-row w-full px-2 md:px-0'>
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
					<AvailableVideos movie={movie} setYtVideo={setYtVideo} />
				</div>
			</Layout>
		</>
	)
}

export async function getServerSideProps(context) {
	const { movieId } = context.query

	//fetch movie
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos&include_image_language=en,null`
	)
	const movieData = await response.json()

	//fetch cast
	const castResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US`
	)

	const castData = await castResponse.json()

	return {
		props: {
			movie: movieData,
			cast: castData.cast,
		},
	}
}
