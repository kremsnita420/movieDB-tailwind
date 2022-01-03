import Image from 'next/image'

export default function TrendingResults({ trendingAll, IMAGE_BASE_URL }) {
	return (
		<div className='flex w-full h-full py-2 my-5 overflow-x-scroll overscroll-contain'>
			{trendingAll.map((trend) => (
				<div className='flex flex-col mr-2 bg-gray-200' key={trend.id}>
					{trend.poster_path ? (
						<div className='relative w-[200px] h-[360px]'>
							<Image
								src={IMAGE_BASE_URL + trend.poster_path}
								alt=''
								layout='responsive'
								width={90}
								height={160}
							/>
							<div
								className={
									trend.vote_average < 5
										? 'absolute rounded-md p-1 bg-red-400 top-5 right-5'
										: trend.vote_average > 5 && trend.vote_average < 7
										? 'absolute rounded-md p-1 bg-yellow-400 top-2 right-2'
										: 'absolute rounded-md p-1 bg-green-400 top-2 right-2'
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

					<p className='text-center'>{trend.media_type}</p>
					<h2 className='text-center p-1'>{trend.title || trend.name}</h2>
				</div>
			))}
		</div>
	)
}
