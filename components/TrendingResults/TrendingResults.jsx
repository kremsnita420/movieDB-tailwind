import Image from 'next/image';
import NextLink from 'next/link';

export default function TrendingResults({ trending, IMAGE_BASE_URL }) {
	return (
		<div className='flex w-full h-[400px] md:h-[430px] xl:h-[460px] justify-start gap-2  my-5 overflow-x-auto overscroll-contain'>
			{trending.map((trend) => (
				<div
					className='flex flex-col items-center justify-start mb-2 mr-2 bg-gray-200 cursor-pointer'
					key={trend.id}>
					<NextLink
						href={
							trend.media_type === 'tv' ? `/show/${trend.id}` : `/movie/${trend.id}`
						}>
						{trend.poster_path ? (
							<div className='relative w-[200px] h-ful'>
								<Image
									src={IMAGE_BASE_URL + trend.poster_path}
									layout='responsive'
									fill='true'
									width={80}
									height={120}
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
											? 'absolute rounded-md p-1 bg-red-400 bottom-1 right-2'
											: trend.vote_average > 5 && trend.vote_average < 7
											? 'absolute rounded-md p-1 bg-yellow-400 bottom-1 right-2'
											: 'absolute rounded-md p-1 bg-green-400 bottom-1 right-2'
									}>
									{(trend.vote_average * 10).toFixed(2) + `%`}
								</div>
							</div>
						) : (
							<div className=' w-[150px] h-[270px]'>
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
					<p className='p-1 text-center'>
						{trend.title ? trend.title.slice(0, 40) : trend.name.slice(0, 40)}
						...
					</p>
				</div>
			))}
		</div>
	);
}
