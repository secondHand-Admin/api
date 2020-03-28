const { Router } = require('express')

const { login, find, create, update, remove } = require('../controllers/adminController')

const adminRouter = Router()
adminRouter.post('/login', login)
adminRouter.post('/create', create)
adminRouter.get('/find', find)
adminRouter.put('/:id', update)
adminRouter.delete('/:id', remove)

module.exports = adminRouter