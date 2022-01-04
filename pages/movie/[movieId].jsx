export default function MoviePage({ movie }) {
	return (
		<div>
			<h1>{movie.title ? movie.title : movie.name}</h1>
		</div>
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
