export default function PrevAndNextBtn({
	query,
	initialPage,
	totalPages,
	setInitialPage,
	movies,
}) {
	return (
		<>
			{query.length > 3 ? (
				<>
					<div className='flex py-10 mx-auto'>
						{initialPage > 1 ? (
							<button
								className='bg-red-400 py-1 px-2 mr-5'
								onClick={() => setInitialPage(1)}>
								first
							</button>
						) : (
							<button
								disabled
								className='bg-red-400 opacity-10 py-1 px-2 mr-5'
								onClick={() => setInitialPage(1)}>
								first
							</button>
						)}
						{initialPage === 1 ? (
							<button
								disabled
								className='bg-red-400 opacity-10 py-1 px-2 mr-5'
								onClick={() => setInitialPage(initialPage - 1)}>
								{'<<'}
							</button>
						) : (
							<button
								className='bg-red-400 py-1 px-2 mr-5'
								onClick={() => setInitialPage(initialPage - 1)}>
								{'<<'}
							</button>
						)}

						<h2 className='flex justify-center items-center text-center'>
							{initialPage} / {totalPages}
						</h2>

						{initialPage === totalPages ? (
							<button
								disabled
								className='bg-red-400 opacity-10 py-1 px-2 ml-5'
								onClick={() => setInitialPage(initialPage + 1)}>
								next
							</button>
						) : (
							<button
								className='bg-red-400 py-1 px-2 ml-5'
								onClick={() => setInitialPage(initialPage + 1)}>
								{'>>'}
							</button>
						)}
						{initialPage === totalPages ? (
							<button
								disabled
								className='bg-red-400 py-1 px-2 ml-5 opacity-10'
								onClick={() => setInitialPage(totalPages)}>
								last
							</button>
						) : (
							<button
								className='bg-red-400 py-1 px-2 ml-5'
								onClick={() => setInitialPage(totalPages)}>
								last
							</button>
						)}
					</div>
				</>
			) : (
				''
			)}
		</>
	)
}
