import Head from 'next/head'

export default function Layout({ title, description, children }) {
	return (
		<div>
			<Head>
				<title>{title ? `${title} - 'MovieDB` : 'MovieDB'}</title>
				{description && <meta name='description' content={description} />}
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta charSet='utf-8' />
				<meta
					property='og:image'
					content='/images/portrait.png'
					key='ogimage'
				/>
			</Head>

			<main className='container flex flex-col items-center px-5 justify-start mx-auto bg-red-200 min-h-screen'>
				{children}
			</main>
		</div>
	)
}
