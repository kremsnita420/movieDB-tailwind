export default function ShowPagePage({ people }) {
	console.log(people)
	return (
		<div>
			<h1>{people.title ? people.title : people.name}</h1>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { peopleId } = context.query

	//fetch people
	const response = await fetch(
		`https://api.themoviedb.org/3/person/${peopleId}?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US`
	)
	const peopleData = await response.json()

	return {
		props: {
			people: peopleData,
		},
	}
}
