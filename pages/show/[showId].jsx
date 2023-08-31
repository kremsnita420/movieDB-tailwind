import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import AvailableVideos from '../../components/show/AvailableVideos';
import Header from '../../components/show/Header';
import HeroImage from '../../components/show/HeroImage';
import Description from '../../components/show/Description';
import ReactPlayer from 'react-player';
import Cast from '../../components/show/Cast';
import Seasons from '../../components/show/Seasons';

export default function ShowPagePage({ show, cast }) {
	const [ytVideo, setYtVideo] = useState(
		show.videos.results.length > 0 ? show.videos.results[0].key : 'b9434BoGkNQ'
	);

	return (
		<>
			<Layout>
				<div className='relative flex flex-col items-center justify-center w-full '>
					<HeroImage show={show} />
					{/* movie header */}
					<Header show={show} />
					{/* movie description */}
					<Description show={show} />
				</div>

				<h2 className='text-center'>Videos</h2>
				<div className='flex flex-col w-full px-2 md:px-2 xl:px-4'>
					{/* player */}
					<div className='relative h-[35vh] md:h-[40vh] lg:h-[50vh] xl:h-[60vh] landscape:h-[75vh] my-5'>
						<ReactPlayer
							width='100%'
							height='100%'
							className='absolute top-0 left-0'
							url={`https://www.youtube.com/watch?v=${ytVideo}`}
						/>
					</div>

					{/* list of available videos */}
					<AvailableVideos
						show={show}
						setYtVideo={setYtVideo}
					/>
				</div>
				<Cast cast={cast} />
				<Seasons show={show} />
			</Layout>
		</>
	);
}

export async function getServerSideProps(context) {
	const { showId } = context.query;

	//fetch show
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.NEXT_PUBLIC_TMD_API}&language=en-US&append_to_response=videos,people&include_image_language=en,null`
	);
	const showData = await response.json();

	//fetch cast
	const castResponse = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${process.env.NEXT_PUBLIC_TMD_API}&language=en-US&include_image_language=en,null`
	);

	const castData = await castResponse.json();

	return {
		props: {
			show: showData,
			cast: castData.cast,
		},
	};
}
