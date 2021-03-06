const mongoose = require("mongoose")

// MONGOOSE/MODEL CONFIG
const movieSchema = new mongoose.Schema({
    imdbID: String,
    Title: String,
    Poster: {
        type: String,
        default: `/img/movienotfound.jpg`
    },
    Director: String,
    Year: String,
    Plot: String,
    Rated: String,
    Ratings: [
        {
            Source: String,
            Value: String
        }
    ],
    Genre: String,
    Writer: String,
    Actors: String,
    Stars: Number,
    Watched: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie