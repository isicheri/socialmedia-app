const express = require('express')
const router = express.Router()
const {createUser,getAllUsers,userById, getUserById, updateUserById} = require('../../controllers/userController/user.controller')


router.route('/users').get(getAllUsers).post(createUser)

router.param('id',userById)

router.route('/user/:id').get(getUserById).put(updateUserById).delete()


module.exports = router