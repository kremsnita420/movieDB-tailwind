import { useState } from 'react';

export default function AvailableVideos({ movie, setYtVideo, ytVideo }) {
	const [selected, setSelected] = useState(false);
	return (
		<div className='flex flex-col '>
			<div className='flex flex-wrap items-center justify-start my-5 md:justify-center lg:mx-5'>
				{movie.videos.results.length === 0 && 'Sorry, no videos'}
				{movie.videos.results
					.filter((video) => video.official === true)
					.map((video) => (
						<button
							onClick={() => setYtVideo(video.key)}
							className={`px-2 py-1 my-1 mr-2 ${
								ytVideo === video.key ? 'bg-red-300' : 'bg-green-300'
							} rounded-md`}
							key={video.id}>
							{video.name}
						</button>
					))}
			</div>
		</div>
	);
}
