const express = require('express')
const router = express.Router()
const {createUser} = require('../../controllers/userController/user.controller')


router.route('/users').get().post(createUser)

router.route('/user/:id').get().put().delete()

module.exports = router