const express = require('express')

const router = express.Router()

// Import modlue from controllers
const { register, login, checkAuth } = require('../controllers/auth')

const { auth } = require('../middlewares/auth')

// Route auth
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

module.exports = router