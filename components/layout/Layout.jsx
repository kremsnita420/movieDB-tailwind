import Head from 'next/head';
import Header from '../mainHeader/Header';

export default function Layout({ title, description, children }) {
	return (
		<div className='relative w-full'>
			<Head>
				<title>{title ? `${title} - 'MovieDB` : 'MovieDB'}</title>
				{description && (
					<meta
						name='description'
						content={description}
					/>
				)}
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta charSet='utf-8' />
				<meta
					property='og:image'
					content='/images/movies-db.png'
					key='ogimage'
				/>
				<link
					rel='icon'
					type='image/x-icon'
					href='/logo.svg'></link>
			</Head>
			<Header />
			<main className='px-2 md-px-4 xl:px-2 max-w-7xl flex flex-col mx-auto min-h-[100dvh] h-full w-full'>
				{children}
				<footer className='mt-auto'>
					<p className='py-4 mt-auto text-center'>
						Made by Safet Duranovic <b>&copy;{new Date().getFullYear()}</b>
					</p>
				</footer>
			</main>
		</div>
	);
}
