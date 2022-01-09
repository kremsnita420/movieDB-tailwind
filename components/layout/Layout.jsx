import Head from 'next/head'
import Header from '../mainHeader/Header'

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
			<main className='container flex flex-col mx-auto  min-h-screen w-full'>
				<Header />
				{children}
			</main>
		</div>
	)
}
