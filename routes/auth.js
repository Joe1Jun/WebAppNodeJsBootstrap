// This controls the routes that require authentication.

const express = require('express')
const router = express.Router()
const verifyUser = require('../middleware/verifyUser')
const userController = require('../controllers/users')
const cartController = require('../controllers/cart')


router.post('/register', userController.register)
      .post('/login', userController.login)
      .get('/logout', userController.logout)
      
router.post('/addToCart', verifyUser, cartController.addToCart)
      .get('/cart', verifyUser, cartController.getCart)
      .post('/cart', verifyUser, cartController.removeFromCart) 
      .post('/cart', verifyUser, cartController.changeProductQuantity)     


module.exports = router