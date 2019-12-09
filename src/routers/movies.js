const express          = require('express'),
      fetch            = require('node-fetch'),
      urlSearch        = require('../urlSearch'),
      urlDetails       = require('../urlDetails'),
      auth             = require('../middleware/auth'),
      isAuth           = require('../middleware/isAuth')
      validateSearch   = require('../middleware/validateSearch'),
      Movie            = require('../models/movie')
const router = new express.Router()

// ROUTES - SEARCH
router.get('/movies/search', validateSearch, isAuth, async (req, res) => {
    
    const query = req.query.search
    
    try {
        const search1 = await fetch(urlSearch(query, 1))
        const data1 = await search1.json()
        if (data1.Error) {
            return res.render('movie404', {
                movie404: `The film ${query} was not found...`,
                user: req.user,

            })
        }

        const search2 = await fetch(urlSearch(query, 2))
        const data2 = await search2.json()
        const search3 = await fetch(urlSearch(query, 3))
        const data3 = await search3.json()
        
        const dataRaw = data1.Search.concat(data2.Search, data3.Search)
        const dataTrimmed = dataRaw.filter((data) => data != undefined)
        const data = dataTrimmed.filter((data) => data.Type !== 'game')
 
        data.forEach((movie) => {
            if(movie.Poster === 'N/A') {
                movie.Poster = '/img/posternotfound.jpg'
            }
        })

        res.render('search', {
            search: data,
            pageTitle: 'Movietime!',
            user: req.user,
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// ROUTES - SEARCH DETAILS
router.get('/movies/details/:imdbID', isAuth, async (req, res) => {
    const query = req.params.imdbID
    
    try {
        const details = await fetch(urlDetails(query))
        const data = await details.json()
        if (data.Poster === 'N/A') {
            data.Poster = '/img/posternotfound.jpg'
        }
        res.render('details', {
            details: data,
            pageTitle: data.Title,
            user: req.user,
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// ROUTES - NOW SHOWING DETAILS
router.get('/movies/:id', auth, isAuth, async (req, res) => {
    try {
        const data = await Movie.findById(req.params.id)
        res.render('details-now-showing', {
            data,
            pageTitle:data.Title,
            watch: data.Watched,
            user: req.user,
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// ROUTES - CHANGE RATING
router.post('/movies/rating/:id', auth, isAuth, async (req, res) => {
    const stars = req.body

    try {
        await Movie.findByIdAndUpdate(req.params.id, stars)
        const data = await Movie.findById(req.params.id)
        res.render('details-now-showing', {
            data,
            pageTitle: data.Title,
            watch: data.Watched,
            user: req.user,
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// ROUTES - WATCHED
router.post('/movies/watched/:id', auth, isAuth, async (req,res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body)
        const data = await Movie.findById(req.params.id)
        res.render('details-now-showing', {
            data,
            pageTitle: data.Title,
            watch: data.Watched,
            user: req.user,
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// ROUTES - ADD MOVIE
router.post('/movies/:imdbID', auth, async (req, res) => {
    const query = req.params.imdbID
    try {
        const movie = await fetch(urlDetails(query))
        const data = await movie.json()
        const addMovie = new Movie({
            ...data,
            owner: req.user._id
        })
        addMovie.save((err) => {
            if (err) {
                res.render('movie404', { movie404: err })
            } else {
                res.redirect('/movies')
            }
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// ROUTES - NOW SHOWING
router.get('/movies', auth, isAuth, async (req, res) => {
    try {
        await req.user.populate('movies').execPopulate()
        res.render('now-showing', { 
            movies: req.user.movies,
            user: req.user, 
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

// ROUTES - DELETE SAVED MOVIE
router.delete('/movies/:id', auth, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.redirect('/movies')
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router