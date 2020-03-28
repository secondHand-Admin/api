const { Router } = require('express')
const {
    find,
    findOneById,
    create,
    update,
    delete: remove,
    putaway
} = require('../controllers/goodsController')
const goodsRouter = Router()
goodsRouter.get('/', find)
goodsRouter.get('/:id', findOneById)
goodsRouter.post('/create', create)
goodsRouter.put('/update/:id', update)
goodsRouter.put('/putaway/:id', putaway)
goodsRouter.delete('/:id', remove)
module.exports = goodsRouter