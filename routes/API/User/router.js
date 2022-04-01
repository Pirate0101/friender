const router      = require('express').Router()
const controller  = require('./controller')


router.post('/getOrStoreUser',
controller.getOrStoreUser
)
router.post('/getUserInfoWithKyubiId',
controller.getUserInfoWithKyubiId
)
module.exports = router