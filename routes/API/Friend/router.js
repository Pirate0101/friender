const router      = require('express').Router()
const controller  = require('./controller')


router.post('/StoreUserFriends',
controller.storeUserFriends
)

module.exports = router