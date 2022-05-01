const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    originalTitle: {
        type: String,
        required: [true, 'Please choose a movie']
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