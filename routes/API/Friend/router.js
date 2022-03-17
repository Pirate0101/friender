const router      = require('express').Router()
const controller  = require('./controller')


router.post('/storeuserFriend',
controller.storeUserFriend
)

module.exports = router