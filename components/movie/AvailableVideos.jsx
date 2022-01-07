export default function AvailableVideos({ movie, setYtVideo }) {
	return (
		<div className='flex flex-col '>
			{movie.videos.results.length > 0 && (
				<p className=' lg:ml-5 lg:mt-3 text-xl text-left w-full'>All videos</p>
			)}{' '}
			<div className='flex flex-wrap lg:flex-col lg:mx-5 my-5'>
				{movie.videos.results.length === 0 && 'Sorry, no videos'}
				{movie.videos.results
					.filter((video) => video.official === true)
					.map((video) => (
						<button
							onClick={() => setYtVideo(video.key)}
							className='bg-green-300 mr-2 lg:mr-0 py-1 px-2 my-1 rounded-md '
							key={video.id}>
							{video.name}
						</button>
					))}
			</div>
		</div>
	)
}
