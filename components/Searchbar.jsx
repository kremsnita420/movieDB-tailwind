export default function Searchbar({
	handleSubmit,
	query,
	isLoading,
	setQuery,
}) {
	return (
		<form className='my-5' onSubmit={handleSubmit}>
			<input
				value={query}
				placeholder='Search...'
				name='query'
				disabled={isLoading}
				onChange={(event) => setQuery(event.target.value || '')}
			/>
			<button
				className='bg-red-300 ml-5 px-2 py-1'
				disabled={isLoading || !query}
				type='submit'>
				Search
			</button>
		</form>
	)
}
