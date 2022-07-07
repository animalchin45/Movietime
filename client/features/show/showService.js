import moviedb from '../../apis/moviedb'

const KEY = process.env.MOVIE_API_KEY

// Fetch Trending
const trending = async () => {
    const response = await Promise.all([
        moviedb.get('/trending/all/week', {
            params: {
                api_key: KEY,
                language: 'en',
                page: 1
            }
        }),
        moviedb.get('/trending/all/week', {
            params: {
                api_key: KEY,
                language: 'en',
                page: 2
            }
        })
    ])
    return response[0].data.results.concat(response[1].data.results)
}

// Search
const search = async (searchTerm) => {
    const response = await Promise.all([
        moviedb.get(`/search/${searchTerm.type}`, {
            params: {
                api_key: KEY,
                query: searchTerm.term,
                language: 'en',
                page: 1
            }
        }),
        moviedb.get(`/search/${searchTerm.type}`, {
            params: {
                api_key: KEY,
                query: searchTerm.term,
                language: 'en',
                page: 2
            }
        })
    ])
    return response[0].data.results.concat(response[1].data.results)
}

// fetch details
const details = async (show) => {
    if (show.media_type === 'movie') {
        const response = await Promise.all([
            moviedb.get(`/${show.media_type}/${show.id}`, {
                params: {
                    api_key: KEY,
                    append_to_response: 'release_dates'
                }
            }),
            moviedb.get(`/${show.media_type}/${show.id}/credits`, {
                params: {
                    api_key: KEY
                }
            }),
            moviedb.get(`/${show.media_type}/${show.id}/videos`, {
                params: {
                    api_key: KEY,
                    language: 'en'
                }
            })
        ])
        // console.log({
        //     ...response[0].data,
        //     ...response[1].data,
        //     ...response[2].data
        // })
        return {
            ...response[0].data,
            ...response[1].data,
            ...response[2].data
        }
    } else if (show.media_type === 'tv') {
        const response = await Promise.all([
            moviedb.get(`/${show.media_type}/${show.id}`, {
                params: {
                    api_key: KEY,
                    append_to_response: 'release_dates'
                }
            }),
            moviedb.get(`/${show.media_type}/${show.id}/credits`, {
                params: {
                    api_key: KEY
                }
            }),
            moviedb.get(`/${show.media_type}/${show.id}/content_ratings`, {
                params: {
                    api_key:KEY
                }
            }),
            moviedb.get(`/${show.media_type}/${show.id}/videos`, {
                params: {
                    api_key: KEY,
                    language: 'en'
                }
            })
        ])
        // console.log({
        //     ...response[0].data,
        //     ...response[1].data,
        //     ...response[2].data,
        //     ...response[3].data
        // })
        return {
            ...response[0].data,
            ...response[1].data,
            ...response[2].data,
            ...response[3].data
        }
    }
}

// get tv content ratings
const tvContentRatings = async (show) => {
    const response = await moviedb.get(`/${show.media_type}/${show.id}/content_ratings`, {
        params: {
            api_key: KEY,
            language: 'en'
        }
    })

    return response.data
}

// get tv and movie posters and backdrops
const posters = async (show) => {
    const response = await moviedb.get(`/${show.media_type}/${show.id}/images`, {
        params: {
            api_key: KEY,
            language: 'en'
        }
    })
    // console.log(response.data)
    return response.data.posters.slice(0, 9)
}

const showService = {
    trending,
    search,
    details,
    tvContentRatings,
    posters
}

export default showService