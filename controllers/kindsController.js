const kindsModel = require('../mongodb/model/kindsModel')
const seckindsModel = require('../mongodb/model/seckindsModel')
class KindsConstroller {
    async find(req, res) {
        let list = await kindsModel.find().populate({
            path: 'seckindName',
            select: '_id name src'
        })
        res.send({ code: 0, msg: '查询成功', list })
    }
    async create(req, res) {
        let result = null;
        //添加二级需要type id kindName
        let { type, id, kindName, src } = req.body
        if (type === 'sec') {
            // 二级分类添加
            let _id = null;
            result = await seckindsModel.findOne({ name: kindName }) || await seckindsModel.insertMany({ name: kindName, src })
            result instanceof Array ? _id = result[0]._id : _id = result
            if (_id) result = await kindsModel.findByIdAndUpdate(id, { $addToSet: { seckindName: _id } })
        }
        else {
            result = await seckindsModel.findOne({ kindName })
            if (result) return res.send({ code: 404, msg: '分类存在' })
            result = await kindsModel.insertMany({ kindName })
        }
        if (!result) return res.send({ code: 404, msg: '分类添加失败' })
        res.send({ code: 0, msg: '分类添加成功' })
    }
    async update(req, res) {
        let result = null;
        let { id } = req.params
        let { oldName, kindName, type, src } = req.body
        if (type === 'sec' && oldName && kindName)
            // 二级分类修改
            result = await seckindsModel.findOneAndUpdate({ name: oldName }, { name: kindName, src })
        else if (type === 'del' && id) {
            //删除二级分类项
            result = await seckindsModel.findOne({ name: oldName })
            if (result) {
                let { _id } = result;
                result = await kindsModel.findByIdAndUpdate(id, { $pull: { seckindName: _id } })
            }
        }
        else result = await kindsModel.findByIdAndUpdate(id, { kindName })
        if (!result) return res.send({ code: 404, msg: '分类修改失败' })
        res.send({ code: 0, msg: '分类修改成功' })
    }
    async delete(req, res) {
        let { id } = req.params
        try {
            let result = await kindsModel.findByIdAndDelete(id)
            if (result) returnres.send({ code: 0, msg: '分类删除成功' })
        } catch (error) { }
        res.send({ code: 404, msg: '分类删除失败' })
    }
}
module.exports = new KindsConstroller()