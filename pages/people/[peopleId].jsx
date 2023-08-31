import Layout from '../../components/layout/Layout';
import NextLink from 'next/link';
import NextImage from 'next/image';
export default function ActorPage({ people, moviesAndShows }) {
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300/';
	console.log(moviesAndShows);
	return (
		<Layout>
			<div className='w-full md:w-[400px] xl:w-[600px] mx-auto'>
				<NextImage
					src={`https://image.tmdb.org/t/p/original/${people.profile_path}`}
					width={300}
					height={400}
					layout='responsive'
					objectFit='cover'
					placeholder='blur'
					blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
					alt=' photo'
				/>
			</div>
			<h1 className='my-4 text-2xl lg:text-4xl'>
				{people.title ? people.title : people.name}
			</h1>
			<h2 className='mb-4 text-xl lg:text-2xl'>{people.place_of_birth}</h2>
			<p className='mb-4 text-lg'>{people.birthday}</p>
			<p className='mb-12'>{people.biography}</p>

			<h3 className='my-4 text-2xl lg:text-4xl'>Known for</h3>
			<div className='flex flex-wrap gap-6'>
				{moviesAndShows.combined_credits.cast.map((show, i) => (
					<NextLink
						key={`${i}-${show.id}`}
						href={
							show.media_type === 'tv'
								? `/show/${show.id}`
								: show.media_type === 'movie'
								? `/movie/${show.id}`
								: `/people/${show.id}`
						}>
						<div className='w-[160px] h-[320px] border cursor-pointer'>
							<div className='w-full'>
								<NextImage
									src={
										show.backdrop_path
											? IMAGE_BASE_URL + show.backdrop_path
											: show.poster_path
											? IMAGE_BASE_URL + show.poster_path
											: '/images/no_img.png'
									}
									width={120}
									height={120}
									layout='responsive'
									objectFit='cover'
									placeholder='blur'
									blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
									alt=' photo'
								/>
							</div>
							<p className='p-2 text-center text-ellipsis '>{show.title}</p>
						</div>
					</NextLink>
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { peopleId } = context.query;

	//fetch people
	const response = await fetch(
		`https://api.themoviedb.org/3/person/${peopleId}?api_key=${process.env.NEXT_PUBLIC_TMD_API}&language=en-US&append_to_response=movie_credits`
	);
	const peopleData = await response.json();

	const combinedCredits = await fetch(
		`https://api.themoviedb.org/3/person/${peopleId}?api_key=${process.env.NEXT_PUBLIC_TMD_API}&language=en-US&append_to_response=combined_credits`
	);
	const combined = await combinedCredits.json();
	return {
		props: {
			people: peopleData,
			moviesAndShows: combined,
		},
	};
}
