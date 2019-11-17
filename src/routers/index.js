const express = require('express'),
      isAuth    = require('../middleware/isAuth')
const router = new express.Router()

// ROUTES - HOME
router.get('/', isAuth, (req, res) => {
    res.render('index', {
        pageTitle: 'Movietime!',
        user: req.user,
        layout: 'landing'
    })
})

// ROUTES - SIGN UP
router.get('/signup', (req, res) => {
    res.render('signup', {
        pageTitle: 'Movietime! - Sign up',
    })
})

// ROUTES - LOG IN
router.get('/login', (req, res) => {
    res.render('login', {
        pageTitle: 'Movietime! - Log in',
    })
})

// router.get('*', (req, res) => {
//     res.render('404', {
//         pageTitle: 'Movietime! - 404',
//         layout: 'secondary'
//     })
// })

module.exports = router