import Image from 'next/image'
import NextLink from 'next/link'

export default function TrendingResults({ trendingAll, IMAGE_BASE_URL }) {
	return (
		<div className='flex w-full h-full py-2 my-5 overflow-x-scroll overscroll-contain'>
			{trendingAll.map((trend) => (
				<div
					className='flex flex-col mr-2 bg-gray-200 cursor-pointer'
					key={trend.id}>
					<NextLink
						href={
							trend.media_type === 'tv'
								? `/show/${trend.id}`
								: `/movie/${trend.id}`
						}>
						{trend.poster_path ? (
							<div className='relative w-[150px] h-[270px]'>
								<Image
									src={IMAGE_BASE_URL + trend.poster_path}
									layout='responsive'
									width={90}
									height={160}
									placeholder='blur'
									blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
									alt='profile photo'
									priority='high'
									rel='preload'
									as='image'
								/>
								<div
									className={
										trend.vote_average < 5
											? 'absolute rounded-md p-1 bg-red-400 bottom-3 right-2'
											: trend.vote_average > 5 && trend.vote_average < 7
											? 'absolute rounded-md p-1 bg-yellow-400 bottom-3 right-2'
											: 'absolute rounded-md p-1 bg-green-400 bottom-3 right-2'
									}>
									{trend.vote_average * 10 + `%`}
								</div>
							</div>
						) : (
							<div className=' w-[200px] h-[360px]'>
								<Image
									src='/images/no_img.png'
									alt=''
									layout='responsive'
									width={90}
									height={160}
								/>
							</div>
						)}
					</NextLink>

					<p className='text-center'>{trend.media_type}</p>
					<h2 className='text-center p-1'>{trend.title || trend.name}</h2>
				</div>
			))}
		</div>
	)
}
