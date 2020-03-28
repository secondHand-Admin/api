const kindsModel = require('../mongodb/model/kindsModel')
class KindsConstroller {
    async find(req, res) {
        let list = await kindsModel.find()
        res.send({ code: 0, list })
    }
    async create(req, res) {
        let { kindName } = req.body
        let result = await kindsModel.insertMany({ kindName })
        if (!result) res.send({ code: 404, msg: '分类添加失败' })
        res.send({ code: 0, msg: '分类添加成功' })
    }
    async update(req, res) {
        let { id } = req.params
        let { kindName } = req.body
        let result = await kindsModel.findByIdAndUpdate(id, { kindName })
        if (!result) res.send({ code: 404, msg: '分类修改失败' })
        res.send({ code: 0, msg: '分类修改成功' })
    }
    async delete(req, res) {
        let { id } = req.params
        let result = await kindsModel.findByIdAndDelete(id)
        if (!result) res.send({ code: 404, msg: '分类删除失败' })
        res.send({ code: 0, msg: '分类删除成功' })
    }
}
module.exports = new KindsConstroller()