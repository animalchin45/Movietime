const urlSearch = (query, pages) => {
    return `https://www.omdbapi.com/?apikey=5ce85c88&s=${query}&page=${pages}`
}

module.exports = urlSearch