export default function Searchbar({
	handleSubmit,
	query,
	isLoading,
	setQuery,
}) {
	return (
		<form className='my-5 w-full relative' onSubmit={handleSubmit}>
			<input
				className='flex flex-col m-auto text-sm p-2 w-[80%]'
				value={query}
				placeholder='Search movies, shows, people...'
				name='query'
				disabled={isLoading}
				onChange={(event) => setQuery(event.target.value || '')}
			/>
			<button
				className='bg-red-300 ml-5 px-2 py-1 absolute top-[0.125rem] right-[10.2%]'
				disabled={isLoading || !query}
				type='submit'>
				Search
			</button>
		</form>
	)
}
