import Layout from '../../components/layout/Layout';
import NextLink from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ActorPage({ moviesAndShows }) {
	console.log(moviesAndShows);
	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300/';
	// const router = useRouter();
	const [showedItems, setShowedItems] = useState(12);

	const showNextItems = 12;
	const storageName = `showedItems-${moviesAndShows.imdb_id}`;

	const handleAddMore = () => {
		setShowedItems(showedItems + showNextItems);

		sessionStorage.setItem(
			storageName,
			JSON.stringify(showedItems + showNextItems)
		);

		if (
			JSON.parse(sessionStorage.getItem(storageName)).length === showedItems.length
		)
			return;
	};

	useEffect(() => {
		if (sessionStorage.getItem(storageName)) {
			setShowedItems(JSON.parse(sessionStorage.getItem(storageName)));
		} else {
			sessionStorage.setItem(storageName, JSON.stringify(showedItems));
		}

		console.log();
	}, []);

	return (
		<Layout>
			<div className='w-full md:w-[400px] xl:w-[600px] mx-auto'>
				<Image
					src={`https://image.tmdb.org/t/p/original/${moviesAndShows.profile_path}`}
					width={300}
					height={400}
					layout='responsive'
					objectFit='cover'
					placeholder='blur'
					blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
					alt=' photo'
				/>
			</div>
			<div>
				<h1 className='my-4 text-2xl lg:text-4xl'>
					{moviesAndShows.title ? moviesAndShows.title : moviesAndShows.name}
				</h1>
				<h2 className='mb-4 text-xl lg:text-2xl'>
					{moviesAndShows.place_of_birth}
				</h2>
				<p className='mb-4 text-lg'>{moviesAndShows.birthday}</p>
				<p className='mb-12'>{moviesAndShows.biography}</p>

				<h3 className='my-4 text-2xl lg:text-4xl'>Known for</h3>
				<div className='grid grid-cols-2 gap-3 mt-5 sm:grid-cols-3 md:gap-4 lg:grid-cols-5 xl:grid-cols-6'>
					{moviesAndShows.combined_credits.cast
						.slice(0, showedItems)
						.map((show, i) => (
							<div
								className='flex flex-col bg-gray-200'
								key={`${i}-${show.id}`}>
								<NextLink
									href={
										show.media_type === 'tv'
											? `/show/${show.id}`
											: show.media_type === 'movie'
											? `/movie/${show.id}`
											: `/people/${show.id}`
									}>
									<a>
										<div className='relative cursor-pointer w-full h-[250px]'>
											<Image
												src={
													show.poster_path
														? IMAGE_BASE_URL + show.poster_path
														: show.backdrop_path
														? IMAGE_BASE_URL + show.backdrop_path
														: show.profile_path
														? IMAGE_BASE_URL + show.profile_path
														: '/images/no_img.png'
												}
												objectFit='cover'
												layout='fill'
												placeholder='blur'
												blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
												alt='profile photo'
												loading='lazy'
												rel='preload'
												as='image'
											/>
											{show.vote_average ? (
												<div
													className={
														show.vote_average < 5
															? 'absolute rounded-md p-1 bg-red-400 bottom-3 right-2'
															: show.vote_average > 5 && show.vote_average < 7
															? 'absolute rounded-md p-1 bg-yellow-400 bottom-3 right-2'
															: 'absolute rounded-md p-1 bg-green-400 bottom-3 right-2'
													}>
													{`⭐` + show.vote_average}
												</div>
											) : show.vote_count || show.vote_average === 0 ? (
												<div className='absolute p-1 bg-red-400 rounded-md bottom-3 right-2'>
													<p>No score</p>
												</div>
											) : (
												<div
													className={
														show.popularity < 5
															? 'absolute rounded-md p-1 bg-red-400 bottom-3 right-2'
															: show.popularity > 5 && show.popularity < 7
															? 'absolute rounded-md p-1 bg-yellow-400 bottom-3 right-2'
															: 'absolute rounded-md p-1 bg-green-400 bottom-3 right-2'
													}>
													<span className='inline-block'>{'📈'} </span>
													{Math.round(show.popularity)}
												</div>
											)}
										</div>

										<p className='font-light text-center'>{show.media_type}</p>
										<p className='mb-1 font-semibold text-center'>
											{show.title ? show.title.split(':') : show.name.split(':')}
										</p>
									</a>
								</NextLink>
							</div>
						))}
				</div>

				{moviesAndShows.combined_credits.cast.length >= showedItems && (
					<button
						onClick={handleAddMore}
						className='block px-4 py-2 mx-auto mt-12 transition-opacity bg-purple-800 disabled:bg-red-400 hover:opacity-70'>
						LOAD MORE
					</button>
				)}
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { peopleId } = context.query;

	//fetch people and credits
	const combinedCredits = await fetch(
		`https://api.themoviedb.org/3/person/${peopleId}?api_key=${process.env.NEXT_PUBLIC_TMD_API}&language=en-US&append_to_response=combined_credits`
	);
	const combined = await combinedCredits.json();
	return {
		props: {
			moviesAndShows: combined,
		},
	};
}
