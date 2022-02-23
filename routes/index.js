const router = require('express').Router()
router.use('/api', require('./API/router'))
console.log("here")
module.exports = router