const adminModel = require('../mongodb/model/adminModel')
const newsModel = require('../mongodb/model/usersModel')
const { secret } = require('../config')
const jwt = require("jsonwebtoken")
class AdminController {
    async login(req, res) {
        let { userName, passWord } = req.body;
        let userInfo = await adminModel.findOne({ userName, passWord });
        if (!userInfo) return res.send({ code: 404, msg: '登录失败' })
        let token = jwt.sign({ userInfo }, secret, { expiresIn: "1d" })
        let { leavel } = userInfo
        res.send({ code: 0, leavel, msg: '登录成功', userInfo, token })
    }
    async find(req, res) {
        let { page = 1, pageSize = 10 } = req.query
        let count = await adminModel.countDocuments()
        let adminList = await adminModel.find().limit(Number(pageSize))
            .skip((page - 1) * pageSize)
        res.send({ code: 0, count, msg: '查询成功', adminList })
    }
    async findOne(req, res) {
        let id = req.params.id
        let adminList = await adminModel.find({ _id: id })
        res.send({ code: 0, msg: '查询成功', data: adminList })
    }
    async create(req, res) {
        let { userName, passWord, img } = req.body
        if (!userName || !passWord) return res.send({ code: -1, msg: '管理员添加失败' })
        let result = await adminModel.insertMany({ userName, passWord, img })
        if (!result) return res.send({ code: -1, msg: '管理员添加失败' })
        res.send({ code: 0, msg: '管理员添加成功' })
    }
    async update(req, res) {
        let id = req.params.id
        let { userName, passWord, img } = req.body
        let result = await adminModel.findByIdAndUpdate(id, { userName, passWord, img })
        if (!result) return res.send({ code: 404, msg: '管理员修改失败' })
        res.send({ code: 0, msg: '管理员修改成功' })
    }
    async remove(req, res) {
        let id = req.params.id
        let result = await adminModel.findByIdAndDelete(id) && await newsModel.deleteMany({ admin_name: id })
        if (!result) return res.send({ code: 404, msg: '管理员删除失败' })
        res.send({ code: 0, msg: '管理员删除成功' })
    }
}

module.exports = new AdminController()