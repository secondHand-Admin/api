const { Router } = require('express')
const { find, create, delete: remove, update } = require('../controllers/kindsController')

const kindsRouter = Router()
kindsRouter.get('/', find)
kindsRouter.post('/create', create)
kindsRouter.put('/:id', update)
kindsRouter.delete('/:id', remove)

module.exports = kindsRouter
