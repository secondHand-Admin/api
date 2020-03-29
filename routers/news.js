const { Router } = require('express')
const {
    find,
    findOneById,
    create,
    update,
    delete: remove,
    setState,
    flowCon,
    collCon
} = require('../controllers/newsController')
const newsRouter = Router()
newsRouter.delete('/:id', remove)
newsRouter.get('/', find)
newsRouter.get('/:id', findOneById)
newsRouter.post('/create', create)
newsRouter.put('/update/:id', update)
newsRouter.put('/state/:id', setState)
newsRouter.put('/flow/:id', flowCon)
newsRouter.put('/coll/:id', collCon)
module.exports = newsRouter