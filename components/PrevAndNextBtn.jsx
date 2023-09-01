import { useEffect, useState } from 'react';

export default function PrevAndNextBtn({
	query,
	initialPage,
	totalPages,
	setInitialPage,
	isLoading,
}) {
	return (
		<>
			{query.length > 3 && (
				<>
					<div className='flex py-10 mx-auto'>
						{initialPage > 1 ? (
							<button
								className='px-2 py-1 mr-5 bg-red-400'
								onClick={() => setInitialPage(1)}>
								first
							</button>
						) : (
							<button
								disabled
								className='px-2 py-1 mr-5 bg-red-400 opacity-10'
								onClick={() => setInitialPage(1)}>
								first
							</button>
						)}
						{initialPage === 1 ? (
							<button
								disabled
								className='px-2 py-1 mr-5 bg-red-400 opacity-10'
								onClick={() => setInitialPage(initialPage - 1)}>
								{'<<'}
							</button>
						) : (
							<button
								className='px-2 py-1 mr-5 bg-red-400'
								onClick={() => setInitialPage(initialPage - 1)}>
								{'<<'}
							</button>
						)}

						<h2 className='flex items-center justify-center text-center'>
							{initialPage} / {totalPages}
						</h2>

						{initialPage === totalPages ? (
							<button
								disabled
								className='px-2 py-1 ml-5 bg-red-400 opacity-10'
								onClick={() => setInitialPage(initialPage + 1)}>
								next
							</button>
						) : (
							<button
								className='px-2 py-1 ml-5 bg-red-400'
								onClick={setInitialPage(initialPage + 1)}>
								{'>>'}
							</button>
						)}
						{initialPage === totalPages ? (
							<button
								disabled
								className='px-2 py-1 ml-5 bg-red-400 opacity-10'
								onClick={() => setInitialPage(totalPages)}>
								last
							</button>
						) : (
							<button
								className='px-2 py-1 ml-5 bg-red-400'
								onClick={() => setInitialPage(totalPages)}>
								last
							</button>
						)}
					</div>
				</>
			)}
		</>
	);
}
