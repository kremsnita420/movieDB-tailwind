export default function AvailableVideos({ movie, setYtVideo }) {
	return (
		<div className='flex flex-col '>
			<div className='flex flex-wrap items-center justify-center lg:mx-5 my-5'>
				{movie.videos.results.length === 0 && 'Sorry, no videos'}
				{movie.videos.results
					.filter((video) => video.official === true)
					.map((video) => (
						<button
							onClick={() => setYtVideo(video.key)}
							className='bg-green-300 mr-2 py-1 px-2 my-1 rounded-md '
							key={video.id}>
							{video.name}
						</button>
					))}
			</div>
		</div>
	)
}
