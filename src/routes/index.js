const express = require('express')

const router = express.Router()

// Import modlue from controllers
const { register, login, checkAuth } = require('../controllers/auth')

const { 
    addProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/products')

const { auth } = require('../middlewares/auth')
const { uploadFiles } = require('../middlewares/uploadFiles')

// Route auth
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)

// Route products
router.post('/product', auth, uploadFiles('image'), addProduct)
router.patch('/product/:id', auth, uploadFiles('image'), updateProduct)
router.delete('/product/:id', auth, deleteProduct)
router.get('/product/:id', auth, getProduct)
router.get('/products', auth, getAllProducts)

module.exports = router