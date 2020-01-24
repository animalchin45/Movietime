const urlDetails = (query) => {
    return `https://www.omdbapi.com/?apikey=${process.env.MOVIE_KEY}&i=${query}&plot=full`
}

module.exports = urlDetails