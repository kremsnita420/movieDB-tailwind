import React from 'react';
import NextImage from 'next/image';
import { useEffect, useState, useRef } from 'react';
import Layout from '../components/layout/Layout';
import PrevAndNextBtn from '../components/PrevAndNextBtn';
import Searchbar from '../components/Searchbar';
import SearchResults from '../components/searchResults/SearchResults';
import TrendingResults from '../components/TrendingResults/TrendingResults';
import { useRouter } from 'next/router';

export default function Home({ trending }) {
	let data;

	const [isLoading, setIsLoading] = useState(false);
	const [initialPage, setInitialPage] = useState(1);
	const [totalPages, setTotalPages] = useState();

	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);

	const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
	const HERO_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

	const heroImagePath = trending[0].backdrop_path;
	const heroImage = HERO_BASE_URL + heroImagePath;

	const handleSubmit = (event) => {
		event.preventDefault();
		searchMulti();
	};

	// search for the movies, shows, actors...
	const searchMulti = async () => {
		if (!query) {
			return;
		}
		if (query.length > 0 && query.length < 2) {
			setInitialPage(1);
		}
		setIsLoading(true);
		const res = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${
				process.env.NEXT_PUBLIC_TMD_API
			}&language=en-US&page=${initialPage}&include_adult=false&query=${
				query || ''
			}&include_image_language=en,null`
		);
		data = await res.json();

		setMovies(data.results);
		setTotalPages(data.total_pages);
		setIsLoading(false);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			searchMulti();
		}, 2000);

		return () => clearTimeout(timer);
	}, [query, initialPage]);

	useEffect(() => {
		if (
			sessionStorage.getItem('searchResult') ||
			sessionStorage.getItem('initialPage') ||
			sessionStorage.getItem('searchQuery')
		) {
			setMovies(JSON.parse(sessionStorage.getItem('searchResult')));
			setQuery(JSON.parse(sessionStorage.getItem('searchQuery')));
			setInitialPage(JSON.parse(sessionStorage.getItem('initialPage')));
		} else {
			sessionStorage.setItem('searchResult', JSON.stringify(movies));
			sessionStorage.setItem('searchQuery', JSON.stringify(query));
			sessionStorage.setItem('initialPage', JSON.stringify(initialPage));
		}
	}, []);

	useEffect(() => {
		sessionStorage.setItem('searchResult', JSON.stringify(movies));
		sessionStorage.setItem('searchQuery', JSON.stringify(query));
		sessionStorage.setItem('initialPage', JSON.stringify(initialPage));
	}, [movies, query, initialPage]);
	useEffect(() => {
		setInitialPage(1);
	}, [query]);

	return (
		<>
			{/* movie content */}
			<Layout>
				{/* hero image and searchbar */}
				<div className='relative flex items-center justify-center w-full h-full mt-16'>
					<div className='w-full mx-auto sepia'>
						<NextImage
							src={heroImage}
							width={1500}
							height={900}
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
				<SearchResults
					query={query}
					movies={movies}
					IMAGE_BASE_URL={IMAGE_BASE_URL}
				/>
				{movies ? (
					<PrevAndNextBtn
						movies={movies}
						query={query}
						initialPage={initialPage}
						totalPages={totalPages}
						setInitialPage={setInitialPage}
						isLoading={isLoading}
					/>
				) : (
					<div></div>
				)}

				<h2 className='w-full my-10 text-3xl text-center'>Currently Popular</h2>

				<TrendingResults
					trending={trending}
					IMAGE_BASE_URL={IMAGE_BASE_URL}
				/>
			</Layout>
		</>
	);
}

export async function getServerSideProps() {
	const res = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMD_API}&include_adult=false&page=1`
	);
	const data = await res.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			trending: data.results,
		},
	};
}
