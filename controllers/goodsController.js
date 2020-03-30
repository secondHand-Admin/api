const goodsMedel = require('../mongodb/model/goodsModel')
const seckindsModel = require('../mongodb/model/seckindsModel')
class goodsController {
    // 查询商品列表
    async find(req, res) {
        let { page = 1, pageSize = 10 } = req.query
        let count = await goodsMedel.countDocuments()
        let list = await goodsMedel.find().limit(Number(pageSize))
            .skip((page - 1) * pageSize).populate('kind', 'kindName -_id')
        res.send({ code: 0, msg: '查询成功', list, count })
    }
    // 查找某一个
    async findOneById(req, res) {
        let id = req.params.id
        let result = await goodsMedel.find({ _id: id })
        if (!result) return res.send({ code: 404, msg: '查询失败' })
        res.send({ code: 0, msg: '获取商品信息成功!', result })
    }
    // 添加商品
    async create(req, res) {
        let _id = null;
        let { name, desc, src, link, stock, putaway, marketPrice, price, unit, kind } = req.body
        let result = await seckindsModel.findOne({ name: kind }) || await seckindsModel.insertMany({ name: kind })
        if (result instanceof Object) _id = result
        else _id = result[0]._id
        result = await goodsMedel.insertMany({ name, desc, src, link, stock, putaway, price, marketPrice, unit, kind: _id })
        if (!result) res.send({ code: 404, msg: '添加商品失败' })
        res.send({ code: 0, msg: '商品添加成功', result })
    }
    async update(req, res) {
        let _id = null;
        let id = req.params.id
        let { name, desc, path, link, stock, putaway, marketPrice, price, unit, kind } = req.body
        let result = await seckindsModel.findOne({ name: kind }) || await seckindsModel.insertMany({ name: kind })
        if (result instanceof Object) _id = result
        else _id = result[0]._id
        result = await goodsMedel.findByIdAndUpdate(id, { name, desc, path, link, stock, putaway, marketPrice, price, unit, kind })
        if (!result) return res.send({ code: 404, msg: '商品修改失败' })
        res.send({ code: 0, msg: '商品修改成功', result })
    }
    async delete(req, res) {
        let id = req.params.id
        let result = await goodsMedel.findByIdAndDelete(id)
        if (!result) return res.send({ code: 404, msg: '商品删除失败' })
        res.send({ code: 0, msg: '商品删除成功' })
    }
    async putaway(req, res) {
        let id = req.params.id
        let { putaway = 0 } = req.body
        let result = await goodsMedel.findByIdAndUpdate(id, { putaway })
        if (!result) return res.send({ code: 404, msg: '商品修改失败' })
        res.send({ code: 0, msg: '商品修改成功', result })
    }
}
module.exports = new goodsController()