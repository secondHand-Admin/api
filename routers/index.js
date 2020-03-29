const { Router } = require('express')
const cors = require('cors')
const autoToken = require('../middlewera/autoToken')
const authPermissions = require('../middlewera/authPermissions')
const admin = require('./admin')
const upload = require('./upload')
const goods = require('./goods')
const kinds = require('./kinds')
const news = require('./news')

const router = Router()

router.all('*', cors(), autoToken, authPermissions)
router.use('/admin', admin)
router.use('/upload', upload)
router.use('/goods', goods)
router.use('/kinds', kinds)
router.use('/news', news)

module.exports = router

