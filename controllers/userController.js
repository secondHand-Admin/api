const jwt = require('jsonwebtoken')
const userModel = require('../mongodb/model/usersModel')
const newsModel = require('../mongodb/model/newsModel')
const { usecret } = require('../config/index')
class UserController {
    async login(req, res) {
        let { userName, passWord } = req.body;
        let userInfo = await userModel.findOne({ userName, passWord });
        if (!userInfo) return res.send({ code: 404, msg: '登录失败' })
        let token = jwt.sign({ userInfo }, usecret, { expiresIn: "2h" })
        let { leavel } = userInfo
        res.send({ code: 0, leavel, msg: '登录成功', userInfo, token })
    }
    async find(req, res) {
        let userList = await userModel.find()
        res.send({ code: 0, msg: '查询成功', userList })
    }
    async findOne(req, res) {
        let id = req.params.id
        let userList = await userModel.find({ _id: id })
        res.send({ code: 0, msg: '查询成功', userList })
    }
    async create(req, res) {
        let { userName, passWord, sex, age, address, like, sign, leavel } = req.body
        if (!userName || !passWord) return res.send({ code: -1, msg: '用户添加失败' })
        let result = await userModel.insertMany({ userName, passWord, sex, age, address, like, sign, leavel })
        if (!result) return res.send({ code: -1, msg: '用户添加失败' })
        res.send({ code: 0, msg: '用户添加成功', result })
    }
    async update(req, res) {
        let id = req.params.id
        let { userName, passWord, sex, age, address, like, sign, leavel } = req.body
        let result = await userModel.findByIdAndUpdate(id, { userName, passWord, sex, age, address, like, sign, leavel })
        if (!result) return res.send({ code: 404, msg: '用户修改失败' })
        res.send({ code: 0, msg: '用户修改成功', result })
    }
    async remove(req, res) {
        let id = req.params.id
        let result = await userModel.findByIdAndDelete(id) && await newsModel.deleteMany({ user_name: id })
        //删除文章同时
        if (!result) return res.send({ code: 404, msg: '用户删除失败' })
        res.send({ code: 0, msg: '用户删除成功' })
    }
}

module.exports = new UserController()