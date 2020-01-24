const urlSearch = (query, pages) => {
    return `https://www.omdbapi.com/?apikey=${process.env.MOVIE_KEY}&s=${query}&page=${pages}`
}

module.exports = urlSearch