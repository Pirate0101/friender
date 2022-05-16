const router      = require('express').Router()
const controller  = require('./controller')


router.post('/saveOrUpdate',
controller.saveOrUpdate
)
router.post('/GetAndSetUserFriendsCounts',
controller.GetAndSetUserFriendsCounts
)


module.exports = router