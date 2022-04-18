const router      = require('express').Router()
const controller  = require('./controller')


router.post('/StoreUserFriends',
controller.storeUserFriends
)
router.post('/GetUserFriendsbase',
controller.GetUserFriendsbase
)

module.exports = router