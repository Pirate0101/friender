
const router = require('express').Router()

router.use('/user',
require('./User/router')
)

module.exports = router