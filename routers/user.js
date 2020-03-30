const { Router } = require('express')
const { login, find, findOne, create, update, remove } = require('../controllers/userController')

const userRouter = Router()
userRouter.post('/login', login)
userRouter.post('/create', create)
userRouter.get('/', find)
userRouter.get('/:id', findOne)
userRouter.put('/:id', update)
userRouter.delete('/:id', remove)

module.exports = userRouter