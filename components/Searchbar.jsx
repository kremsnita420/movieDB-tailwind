export default function Searchbar({
	handleSubmit,
	query,
	isLoading,
	setQuery,
}) {
	return (
		<form
			className='flex flex-col justify-center items-center w-full absolute top-[50%] left-[0]'
			onSubmit={handleSubmit}>
			<input
				className='text-sm p-2 w-2/3'
				value={query}
				placeholder='Search movies, shows, people...'
				name='query'
				disabled={isLoading}
				onChange={(event) => setQuery(event.target.value || '')}
			/>
			<button
				className='bg-red-300 ml-5 mt-5 px-2 py-1'
				disabled={isLoading || !query}
				type='submit'>
				Search
			</button>
		</form>
	)
}
