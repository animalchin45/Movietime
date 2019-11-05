const urlDetails = (query) => {
    return `https://www.omdbapi.com/?apikey=5ce85c88&i=${query}&plot=full`
}

module.exports = urlDetails