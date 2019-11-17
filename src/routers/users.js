const express         = require('express'),
      User            = require('../models/user'),
      auth            = require('../middleware/auth')
const router = new express.Router()

// CREATE NEW USER
router.post('/users', async (req, res) => {
    if (req.body.password !== req.body.verifyPassword) {
        return res.render('signup', {
            error: `Passwords do not match. Try again.`
        })
    }

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        res.status(201).redirect('/movies')
    } catch (e) {
        if (e.errmsg) {
            return res.status(400).render('signup', {
                error: `Username already taken. Try again.`
            })
        }

        if (e.errors) {
            return res.status(400).render('signup', {
                error: `Username, password, and email required to sign up. Try again.`
            })
        }
        res.status(400).send(e)
    }
})

// USER LOGIN
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.userName, req.body.password)
        if (user === 'error') {
            return res.render('login', {
                error: `Invalid username or password. Please try again.`
            })
        }
        const token = await user.generateAuthToken()
        res.cookie('auth_token', token)
        res.redirect('/movies')
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

// USER LOGOUT
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.redirect('/')
    } catch (e) {
        res.status(500).send()
    }
})

// USER LOGOUT ALL
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// USER INFO
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// USER EDIT
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['email', 'password', 'favoriteGenre', 'favoriteMovie']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

// USER DELETE ACCOUNT
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router