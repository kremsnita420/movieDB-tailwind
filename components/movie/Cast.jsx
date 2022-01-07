import NextImage from 'next/image'
import NextLink from 'next/link'

export default function Cast({ cast }) {
	return (
		<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
			{cast.map((singleCast) => (
				<div key={singleCast.cast_id}>
					<NextLink href={`/people/${singleCast.id}`}>
						<a>
							{singleCast.profile_path ? (
								<div className='w-full h-full'>
									<NextImage
										src={`https://image.tmdb.org/t/p/w300${singleCast.profile_path}`}
										width={100}
										height={150}
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
										className='opacity-60'
										src='/images/no_img.png'
										width={100}
										height={150}
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
							)}
						</a>
					</NextLink>
				</div>
			))}
		</div>
	)
}