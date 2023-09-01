import NextImage from 'next/image';

export default function HeroImage({ show }) {
	const HERO_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
	const heroImagePath = show.backdrop_path;
	const heroImage = HERO_BASE_URL + heroImagePath;

	return (
		<div className='w-full h-full bg-black'>
			{show.backdrop_path ? (
				<NextImage
					className='opacity-60'
					src={heroImage}
					width={1500}
					height={900}
					layout='responsive'
					objectFit='cover'
					placeholder='blur'
					blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
					alt=' photo'
				/>
			) : (
				<NextImage
					className='opacity-60'
					src='/images/no_img.png'
					width={1500}
					height={700}
					layout='responsive'
					objectFit='cover'
					placeholder='blur'
					blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
					alt=' photo'
				/>
			)}
		</div>
	);
}
