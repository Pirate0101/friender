const router      = require('express').Router()
const controller  = require('./controller')


router.post('/getOrStoreUser',
controller.getOrStoreUser
)
router.post('/getUserInfoWithKyubiId',
controller.getUserInfoWithKyubiId
)
router.post('/CheckThenStoreProfileInfo',
controller.CheckThenStoreProfileInfo)

router.post('/StoreProfileInfoUser',
controller.storeProfileInfoUser)

module.exports = router