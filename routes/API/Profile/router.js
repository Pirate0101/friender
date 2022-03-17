const router      = require('express').Router()
const controller  = require('./controller')


router.post('/getOrStoreProfile',
controller.getOrStoreProfile
)

router.post('/getProfile',
controller.getProfile
)

module.exports = router