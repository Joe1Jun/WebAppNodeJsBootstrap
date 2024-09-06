const { Router } = require('express')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')



router.post('/register', authController.register)
      .post('/login', authController.login)
      .get('/logout', authController.logout)
      

module.exports = router