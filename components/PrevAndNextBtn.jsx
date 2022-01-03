export default function PrevAndNextBtn({
	query,
	initialPage,
	totalPages,
	setInitialPage,
}) {
	return (
		<>
			{query && (
				<>
					<div className='flex my-10'>
						{initialPage === 1 ? (
							<button
								disabled
								className='bg-red-400 opacity-60 py-1 px-2 mr-5'
								onClick={() => setInitialPage(initialPage - 1)}>
								back
							</button>
						) : (
							<button
								className='bg-red-400 py-1 px-2 mr-5'
								onClick={() => setInitialPage(initialPage - 1)}>
								back
							</button>
						)}

						<h2 className='flex justify-center items-center text-center'>
							{initialPage} / {totalPages}
						</h2>

						{initialPage === totalPages ? (
							<button
								disabled
								className='bg-red-400 opacity-60 py-1 px-2 ml-5'
								onClick={() => setInitialPage(initialPage + 1)}>
								next
							</button>
						) : (
							<button
								className='bg-red-400 py-1 px-2 ml-5'
								onClick={() => setInitialPage(initialPage + 1)}>
								next
							</button>
						)}
					</div>
				</>
			)}
		</>
	)
}
