const asyncHandler = require('express-async-handler')

const Favorite = require('../models/favoriteModel')
const User = require('../models/userModel')

// @desc    Get Favorites
// @route   GET /favorites
// @access  Private
const getFavorites = asyncHandler (async (req, res) => {
    const favorites = await Favorite.find({ user: req.user.id })

    res.status(200).json(favorites)
})

// @desc    Set Favorite
// @route   POST /favorites
// @access  Private
const setFavorite = asyncHandler (async (req, res) => {
    if (!req.body.originalTitle) {
        res.status(400)
        throw new Error('Please add a Movie or Tv show')
    }

    const favorite = await Favorite.create({
        originalTitle: req.body.originalTitle,
        userRating: req.body.userRating,
        user: req.user.id
    })

    res.status(200).json(favorite)
})

// @desc    Update Favorite
// @route   PUT /favorites/:id
// @access  Private
const updateFavorite = asyncHandler (async (req, res) => {
    const favorite = await Favorite.findById(req.params.id)

    if (!favorite) {
        res.status(400)
        throw new Error('Favorite not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(favorite.user.toString() !== user.id) {
        res.status(401) 
        throw new Error('user not authorized')
    }

    const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedFavorite)
})

// @desc    Delete Favorite
// @route   Delete /favorites/:id
// @access  Private
const deleteFavorite = asyncHandler (async (req, res) => {
    const favorite = await Favorite.findById(req.params.id)

    if (!favorite) {
        res.status(400)
        throw new Error('Favorite not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(favorite.user.toString() !== user.id) {
        res.status(401) 
        throw new Error('user not authorized')
    }

    await favorite.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getFavorites,
    setFavorite,
    updateFavorite,
    deleteFavorite
}