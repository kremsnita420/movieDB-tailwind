import React from 'react'

import { useEffect, useState, useRef } from 'react'
import Layout from '../components/layout/Layout'
import PrevAndNextBtn from '../components/PrevAndNextBtn'
import Searchbar from '../components/Searchbar'
import SearchResults from '../components/searchResults/SearchResults'
import TrendingResults from '../components/TrendingResults/TrendingResults'

export default function Home({ trending, trending2 }) {
	const [isLoading, setIsLoading] = useState(false)
	const [initialPage, setInitialPage] = useState(1)
	const [totalPages, setTotalPages] = useState()

	const [query, setQuery] = useState('')
	const [movies, setMovies] = useState([])
	let data

	const trendingAll = trending

	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

	const heroImagePath = trendingAll[0].backdrop_path
	const heroImage = IMAGE_BASE_URL + heroImagePath
	console.log(heroImage)

	console.log(movies)

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
	}, [query, initialPage, data])

	const handleSubmit = (event) => {
		event.preventDefault()
		searchMulti()
	}

	return (
		<>
			<div className='flex items-center justify-center h-60 w-full bg-blue-300'>
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

				<TrendingResults
					trendingAll={trendingAll}
					IMAGE_BASE_URL={IMAGE_BASE_URL}
				/>
			</Layout>
		</>
	)
}

export async function getServerSideProps() {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=6f1ded32feffe837e07e801efb60a6c6&include_adult=false&page=1`
	)
	const data = await res.json()

	const res2 = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=6f1ded32feffe837e07e801efb60a6c6&include_adult=false&page=2`
	)
	const data2 = await res2.json()

	if (!data || !data2) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			trending: data.results,
			trending2: data2.results,
		},
	}
}
