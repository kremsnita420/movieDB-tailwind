export const searchMulti = async (query) => {
    if (!query) {
        return
    }
    setIsLoading(true)
    const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=6f1ded32feffe837e07e801efb60a6c6&language=en-US&page=${initialPage}&include_adult=false&query=${query || ''
        }`
    )
    data = await res.json()
    setMovies(data.results)
    setTotalPages(data.total_pages)
    setIsLoading(false)
}