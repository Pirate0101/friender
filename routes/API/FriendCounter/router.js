const router      = require('express').Router()
const controller  = require('./controller')


router.post('/saveOrUpdate',
controller.saveOrUpdate
)


module.exports = router