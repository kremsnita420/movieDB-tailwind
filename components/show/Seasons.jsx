import NextImage from 'next/image';

export default function Seasons({ show }) {
	const HERO_BASE_URL = 'https://image.tmdb.org/t/p/w300';
	return (
		<div>
			<h2 className='py-5 text-center'>Seasons</h2>

			<div className='grid grid-cols-3 gap-5 md:grid-cols-5 lg:grid-cols-8'>
				{show.seasons.map((season) => (
					<div key={season.id}>
						<div className='w-full h-full'>
							{season.poster_path ? (
								<>
									<NextImage
										src={HERO_BASE_URL + season.poster_path}
										width={150}
										height={220}
										layout='responsive'
										objectFit='cover'
										placeholder='blur'
										blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
										alt=' photo'
										priority='high'
										rel='preload'
										as='image'
									/>
									<div className='flex flex-col items-center justify-center'>
										<p className='py-2'>{season.name} </p>
										<p className='py-2'>{season.air_date} </p>
									</div>
								</>
							) : (
								<>
									<NextImage
										className='opacity-60'
										src='/images/no_img.png'
										width={90}
										height={160}
										layout='responsive'
										objectFit='cover'
										placeholder='blur'
										blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
										alt=' photo'
									/>
									<div className='flex flex-col items-center justify-center'>
										<p className='py-2'>{season.name} </p>
										<p className='py-2'>{season.air_date} </p>
									</div>
								</>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
