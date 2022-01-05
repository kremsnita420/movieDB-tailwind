import React from 'react'
import NextImage from 'next/image'
import { useEffect, useState, useRef } from 'react'
import Layout from '../components/layout/Layout'
import PrevAndNextBtn from '../components/PrevAndNextBtn'
import Searchbar from '../components/Searchbar'
import SearchResults from '../components/searchResults/SearchResults'
import TrendingResults from '../components/TrendingResults/TrendingResults'
import { useRouter } from 'next/router'

export default function Home({ trending, trending2 }) {
	let data
	let storageQuery

	const [isLoading, setIsLoading] = useState(false)
	const [initialPage, setInitialPage] = useState(1)
	const [totalPages, setTotalPages] = useState()

	const [query, setQuery] = useState('')
	const [movies, setMovies] = useState([])

	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300'
	const HERO_BASE_URL = 'https://image.tmdb.org/t/p/w1280'

	const heroImagePath = trending[0].backdrop_path
	const heroImage = HERO_BASE_URL + heroImagePath

	const router = useRouter()
	console.log(movies)

	const handleSubmit = (event) => {
		event.preventDefault()
		searchMulti()
	}

	// search for the movies, shows, actors...

	const searchMulti = async () => {
		if (!query) {
			return
		}
		setIsLoading(true)
		const res = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&page=${initialPage}&include_adult=false&query=${
				query || ''
			}&include_image_language=en,null`
		)
		data = await res.json()

		setMovies(data.results)

		setTotalPages(data.total_pages)

		setIsLoading(false)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			searchMulti()
		}, 700)

		return () => clearTimeout(timer)
	}, [query, initialPage])

	useEffect(() => {
		if (sessionStorage.getItem('state')) {
			setMovies(JSON.parse(sessionStorage.getItem('state')))
		} else {
			sessionStorage.setItem('state', JSON.stringify(movies))
		}
	}, [])

	useEffect(() => {
		sessionStorage.setItem('state', JSON.stringify(movies))
	}, [movies])

	return (
		<>
			<div className='flex relative items-center justify-center h-full w-full'>
				<div className='w-full mx-auto sepia-[70%]'>
					<NextImage
						src={heroImage}
						width={1500}
						height={700}
						layout='responsive'
						objectFit='cover'
						placeholder='blur'
						blurDataURL='https://images.unsplash.com/photo-1613387275674-cb92af1c29d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
						alt='profile photo'
						priority='high'
						rel='preload'
						as='image'
					/>
				</div>

				<Searchbar
					isLoading={isLoading}
					query={query}
					setQuery={setQuery}
					handleSubmit={handleSubmit}
					value={query}
				/>
			</div>
			<Layout>
				<SearchResults
					query={query}
					movies={movies}
					IMAGE_BASE_URL={IMAGE_BASE_URL}
				/>

				<PrevAndNextBtn
					query={query}
					initialPage={initialPage}
					totalPages={totalPages}
					setInitialPage={setInitialPage}
				/>

				<h2 className='text-3xl my-10'>Currently Popular</h2>

				<TrendingResults trending={trending} IMAGE_BASE_URL={IMAGE_BASE_URL} />
			</Layout>
		</>
	)
}

export async function getServerSideProps() {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=6f1ded32feffe837e07e801efb60a6c6&include_adult=false&page=1`
	)
	const data = await res.json()

	if (!data) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			trending: data.results,
		},
	}
}
