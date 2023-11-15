const express = require('express')
const { registerUser, loginUser, checkUser } = require('../controller/authController')
const { verifyToken } = require('../middleware/jwtToken')
const router = express.Router()

// Registration
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/',verifyToken, checkUser)

module.exports = router