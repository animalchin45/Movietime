const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    id: {
        type: String,
        required: [true, 'Show ID required']
    },
    original_title: {
        type: String,
        default: ''
    },
    release_date: {
        type: String,
        default: null
    },
    first_air_date: {
        type: String,
        default: null
    },
    watched: {
        type: Boolean,
        default: false
    },
    poster_path: {
        type: String,
        default: ''
    },
    userRating: {
        type: Number,
        default: 0,
        validate(value) {
            if (value > 10 || value < 0) {
                throw new Error('Ratings are between 0 and 10')
            }
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Favorite', favoriteSchema)