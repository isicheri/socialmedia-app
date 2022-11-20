const express = require('express')
const {  signIn, signout,verifyToken } = require('../../controllers/authController/auth.controller')


const router = express.Router()

router.route('/auth/signin').post(verifyToken,signIn)
router.route('/auth/signout').get(signout)

module.exports = router