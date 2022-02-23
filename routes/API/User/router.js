const router      = require('express').Router()
const controller  = require('./controller')


router.post('/getOrStoreUser',
controller.getOrStoreUser
)

module.exports = router