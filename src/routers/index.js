const express = require('express'),
      auth    = require('../middleware/auth')
const router = new express.Router()

// ROUTES - HOME
router.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Movietime!'
    })
})

// ROUTES - SIGN UP
router.get('/signup', (req, res) => {
    res.render('signup', {
        pageTitle: 'Movietime! - Sign up',
        layout: 'secondary'
    })
})

// ROUTES - LOG IN
router.get('/login', (req, res) => {
    res.render('login', {
        pageTitle: 'Movietime! - Log in',
        layout: 'secondary'
    })
})

module.exports = router