const { Router } = require('express')
const autoToken = require('../middlewera/autoToken')
const authPermissions = require('../middlewera/authPermissions')
const admin = require('./admin')
const user = require('./user')
const upload = require('./upload')
const goods = require('./goods')
const kinds = require('./kinds')
const news = require('./news')
const analysis = require('./analysis')

const router = Router()

router.all('/', autoToken, authPermissions)
router.use('/admin', admin)
router.use('/user', user)
router.use('/upload', upload)
router.use('/goods', goods)
router.use('/kinds', kinds)
router.use('/news', news)
router.use('/analysis', analysis)

module.exports = router

