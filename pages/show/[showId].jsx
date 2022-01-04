export default function ShowPagePage({ show }) {
	return (
		<div>
			<h1>{show.title ? show.title : show.name}</h1>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { showId } = context.query

	//fetch show
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US`
	)
	const showData = await response.json()

	return {
		props: {
			show: showData,
		},
	}
}
