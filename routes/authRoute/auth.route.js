const express = require('express')
const { signIn, signout} = require('../../controllers/authController/auth.controller')


const router = express.Router()

router.route('/auth/signin').post(signIn)
router.route('/auth/signout').get(signout)

module.exports = router