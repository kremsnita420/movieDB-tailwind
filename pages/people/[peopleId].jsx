import Layout from '../../components/layout/Layout'

export default function ActorPage({ people }) {
	console.log(people)
	return (
		<Layout>
			<h1>{people.title ? people.title : people.name}</h1>
		</Layout>
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
