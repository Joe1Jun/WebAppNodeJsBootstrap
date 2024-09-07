// This controls the routes that require authentication.

const express = require('express')
const router = express.Router()
const authController = require('../controllers/users')



router.post('/register', authController.register)
      .post('/login', authController.login)
      .get('/logout', authController.logout)
      

module.exports = router