const router      = require('express').Router()
const controller  = require('./controller')


router.post('/StoreUserFriends',
controller.storeUserFriends
)
router.post('/GetUserFriendsbase',
controller.GetUserFriendsbase
)
router.post('/StoreUserSlowFriends',
controller.storeUserSlowFriends
)

module.exports = router