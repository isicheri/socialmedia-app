const express = require('express')
const router = express.Router()
const {createUser,getAllUsers,userById, getUserById, updateUserById, deleteUserById} = require('../../controllers/userController/user.controller')
const { verifyToken,authorisedUser } = require('../../controllers/authController/auth.controller')

router.route('/users').get(getAllUsers).post(createUser)

router.param('id',userById)

router.route('/user/:id').get(authorisedUser,getUserById).put(authorisedUser,updateUserById).delete(authorisedUser,deleteUserById)


module.exports = router;