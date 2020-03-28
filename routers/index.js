const { Router } = require('express')
const admin = require('./admin')
const upload = require('./upload')
const router = Router()

router.use('/admin', admin)
router.use('/upload', upload)

module.exports = router

