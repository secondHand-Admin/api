const newsMedel = require('../mongodb/model/newsModel')
const adminMedel = require('../mongodb/model/adminModel')
const usersMedel = require('../mongodb/model/usersModel')
class newsController {
    // 查询信息get
    async find(req, res) {
        let count = 0, list = []
        let { page = 1, pageSize = 10, state = null } = req.query
        if (state !== null) {
            count = await newsMedel.find({ state }).countDocuments()
            list = await newsMedel.find({ state }).limit(Number(pageSize))
                .skip((page - 1) * pageSize).populate('user_name', 'userName -_id')
                .populate('admin_name', 'userName -_id')
        }
        else {
            count = await newsMedel.find().countDocuments()
            list = await newsMedel.find().limit(Number(pageSize))
                .skip((page - 1) * pageSize).populate('user_name', 'userName -_id')
                .populate('admin_name', 'userName -_id')
        }
        res.send({ code: 0, msg: '查询成功', list, count })
    }
    // 查找某一个文章get
    async findOneById(req, res) {
        let id = req.params.id
        let result = await newsMedel.find({ _id: id })
        if (!result) return res.send({ code: 404, msg: '查询失败' })
        res.send({ code: 0, msg: '获取信息成功!', result })
    }
    // post 添加文章
    async create(req, res) {
        let { title, name, price, text, state, src, href, user_id, admin_id } = req.body
        let result = await newsMedel.insertMany({
            title, name, price, text, state, src, href,
            user_name: user_id, admin_name: admin_id
        })
        if (!result) res.send({ code: 404, msg: '添加失败' })
        let option = {
            type: user_id ? 'user_name' : 'admin_name',
            _id: user_id || admin_id
        }
        //更新表里文章数量 关联统计未习得
        if (user_id || admin_id) newsController.Article(option)
        res.send({ code: 0, msg: '添加成功', result })
    }
    // put 修改
    async update(req, res) {
        let id = req.params.id
        let { title, name, price, text, state, src, href } = req.body
        let result = await newsMedel.findByIdAndUpdate(id, { title, name, price, text, state, src, href })
        if (!result) return res.send({ code: 404, msg: '修改失败' })
        res.send({ code: 0, msg: '修改成功', result })
    }
    // delete 删除
    async delete(req, res) {
        let id = req.params.id
        let result = await newsMedel.findByIdAndDelete(id)
        if (!result) return res.send({ code: 404, msg: '删除失败' })
        res.send({ code: 0, msg: '删除成功' })
    }
    //put
    async setState(req, res) {
        let id = req.params.id
        let { state = -1 } = req.body
        let result = await newsMedel.findByIdAndUpdate(id, { state })
        if (!result) return res.send({ code: 404, msg: '修改失败' })
        res.send({ code: 0, msg: '修改成功', result })
    }
    // 、、put
    async flowCon(req, res) {
        let result = null
        let id = req.params.id
        let { flow } = req.body
        if (flow) {
            result = await newsMedel.findByIdAndUpdate(id, { flow })
        }
        if (result) return res.send({ code: 0, msg: '修改成功', result })
        res.send({ code: 404, msg: '修改失败' })
    }
    //put
    async collCon(req, res) {
        let result = null
        let id = req.params.id
        let { coll } = req.body
        if (coll) {
            result = await newsMedel.findByIdAndUpdate(id, { coll })
        }
        if (result) return res.send({ code: 0, msg: '修改成功', result })
        res.send({ code: 404, msg: '修改失败' })
    }
    static async Article(option) {
        let { type, _id } = option
        let article = await newsMedel.find({ [type]: _id }).countDocuments()
        if (type === 'user_name') return usersMedel.findByIdAndUpdate(_id, { article })
        adminMedel.findByIdAndUpdate(_id, { article })
    }
}
module.exports = new newsController()