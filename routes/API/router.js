
const router = require('express').Router()

router.use('/user',
require('./User/router')
)
router.use('/profile',
require('./Profile/router')
)
router.use('/friendcounter',
require('./FriendCounter/router')
)
router.use('/friend',
require('./Friend/router')
)

module.exports = router