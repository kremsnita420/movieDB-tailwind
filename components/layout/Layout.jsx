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
					content='/images/portrait.png'
					key='ogimage'
				/>
			</Head>
			<Header />
			<main className='container flex flex-col mx-auto min-h-[100dvh] h-full w-full'>
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
