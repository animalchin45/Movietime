const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
// router.get('/dashboard', protect, getMe)

module.exports = router