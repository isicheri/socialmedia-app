const express = require('express')
const router = express.Router()


router.route('/api/users').get().post()

router.route('/api/user/:id').get().put().delete()

module.exports = router