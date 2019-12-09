const jwt  = require('jsonwebtoken'),
      User = require('../models/user')

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies['auth_token']
        const decoded = jwt.verify(token, 'beatrix the cat')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        // res.status(401).send({ error: 'Must be logged in to do that' })
        next()
    }
}

module.exports = isAuth