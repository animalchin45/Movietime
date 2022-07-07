const asyncHandler = require('express-async-handler')

const Favorite = require('../models/favoriteModel')
const User = require('../models/userModel')

// @desc    Get Favorites
// @route   GET /favorites
// @access  Private
const getFavorites = asyncHandler (async (req, res) => {
    const favorites = await Favorite.find({ userId: req.user.id })

    res.status(200).json(favorites)
})

// @desc    Set Favorite
// @route   POST /favorites
// @access  Private
const setFavorite = asyncHandler (async (req, res) => {
    if (!req.body.id) {
        res.status(400)
        throw new Error('Please add a Movie or Tv show')
    }

    const favoriteExists = await Favorite.findOne({userId: req.user.id, id: req.body.id})

    if (favoriteExists) {
        res.status(400)
        throw new Error('This show is already a favorite')
    }

    const favorite = await Favorite.create({
        id: req.body.id,
        original_title: req.body.original_title,
        release_date: req.body.release_date,
        first_air_date: req.body.first_air_date,
        genres: req.body.genres,
        poster_path: req.body.poster_path,
        userId: req.user.id
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

    // make sure the logged in user matches the favorite user
    if(favorite.userId.toString() !== user.id) {
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
    if(favorite.userId.toString() !== user.id) {
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