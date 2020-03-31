const { Router } = require('express')
const { getGoods } = require('../controllers/AnalysisController')

const analysisRouter = Router()
analysisRouter.get('/goods', getGoods)

module.exports = analysisRouter