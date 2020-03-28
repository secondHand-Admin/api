const { Router } = require('express')
const autoToken = require('../middlewera/autoToken')
const authPermissions = require('../middlewera/authPermissions')
const admin = require('./admin')
const upload = require('./upload')
const goods = require('./goods')
const kinds = require('./kinds')

const router = Router()

router.all('*', autoToken, authPermissions)
router.use('/admin', admin)
router.use('/upload', upload)
router.use('/goods', goods)
router.use('/kinds', kinds)


module.exports = router

