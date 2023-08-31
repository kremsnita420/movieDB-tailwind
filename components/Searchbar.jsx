export default function Searchbar({
	handleSubmit,
	query,
	isLoading,
	setQuery,
}) {
	return (
		<form
			className='flex flex-col justify-center items-center w-full md:w-1/2 absolute top-[25%] left-[50%] translate-x-[-50%] px-5'
			onSubmit={handleSubmit}>
			<input
				className='w-2/3 p-2 text-sm'
				value={query}
				placeholder='Search movies, shows, people...'
				name='query'
				disabled={isLoading}
				onChange={(event) => setQuery(event.target.value || '')}
			/>
			<button
				className='px-2 py-1 mt-5 ml-5 bg-red-300'
				disabled={isLoading || !query || ''}
				type='submit'>
				Search
			</button>
		</form>
	);
}
