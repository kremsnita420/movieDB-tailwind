import React from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import Layout from '../../components/layout/Layout';
import Header from '../../components/movie/Header';
import Description from '../../components/movie/Description';
import AvailableVideos from '../../components/movie/AvailableVideos';
import HeroImage from '../../components/movie/HeroImage';
import Cast from '../../components/movie/Cast';

export default function MoviePage({ movie, cast }) {
	const [ytVideo, setYtVideo] = useState(
		movie.videos.results.length > 0 ? movie.videos.results[0].key : 'b9434BoGkNQ'
	);

	return (
		<Layout>
			<div className='relative flex flex-col items-center justify-center w-full '>
				<HeroImage movie={movie} />
				{/* movie header */}
				<Header movie={movie} />
				{/* movie description */}

				<Description movie={movie} />
			</div>

			<div className='flex flex-col w-full mt-4 md:mt-10xl'>
				{/* player */}
				<div className='relative h-[35vh] md:h-[40vh] lg:h-[50vh] xl:h-[50vh] landscape:-[85vw] my-5'>
					<ReactPlayer
						controls={true}
						width='100%'
						height='100%'
						className='absolute top-0 left-0'
						url={`https://www.youtube.com/watch?v=${ytVideo}`}
					/>
				</div>

				{/* list of available videos */}
				<AvailableVideos
					movie={movie}
					setYtVideo={setYtVideo}
					ytVideo={ytVideo}
				/>
			</div>
			<Cast cast={cast} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { movieId } = context.query;

	//fetch movie
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMD_API}&language=en-US&append_to_response=videos&include_image_language=en,null`
	);
	const movieData = await response.json();

	//fetch cast
	const castResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMD_API}&language=en-US`
	);
	const castData = await castResponse.json();

	return {
		props: {
			movie: movieData,
			cast: castData.cast,
		},
	};
}
