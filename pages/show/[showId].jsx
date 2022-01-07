import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import AvailableVideos from '../../components/movie/AvailableVideos'

export default function ShowPagePage({ show }) {
	const [ytVideo, setYtVideo] = useState(
		show.videos.results.length > 0 ? show.videos.results[0].key : 'b9434BoGkNQ'
	)
	console.log(show)
	return (
		<Layout>
			<h1>{show.name}</h1>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const { showId } = context.query

	//fetch show
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&append_to_response=videos&include_image_language=en,null`
	)
	const showData = await response.json()

	return {
		props: {
			show: showData,
		},
	}
}
