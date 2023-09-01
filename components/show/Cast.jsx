import NextImage from 'next/image';
import NextLink from 'next/link';

export default function Cast({ cast }) {
	return (
		<div className='flex flex-col px-2 mb-10 text-center md:px-4 xl:px-0'>
			<h2 className='my-5 text-center'>Top Cast</h2>
			<div className='grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9'>
				{cast.slice(0, 20).map((singleCast) => (
					<div key={singleCast.id}>
						<NextLink href={`/people/${singleCast.id}`}>
							<a>
								{singleCast.profile_path ? (
									<div className='w-full h-full'>
										<NextImage
											className='rounded-full'
											src={`https://image.tmdb.org/t/p/w300${singleCast.profile_path}`}
											width={100}
											height={100}
											layout='responsive'
											objectFit='cover'
											placeholder='blur'
											blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
											alt=' photo'
											priority='high'
											rel='preload'
											as='image'
										/>
										<p>{singleCast.name}</p>
									</div>
								) : (
									<div className='w-full h-full'>
										<NextImage
											className='rounded-full opacity-60'
											src='/images/no_img.png'
											width={100}
											height={100}
											layout='responsive'
											objectFit='cover'
											placeholder='blur'
											blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
											alt=' photo'
											priority='high'
											rel='preload'
											as='image'
										/>
										<p className=''>{singleCast.name}</p>
									</div>
								)}
							</a>
						</NextLink>
					</div>
				))}
			</div>
		</div>
	);
}
