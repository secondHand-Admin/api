const adminModel = require('../mongodb/model/adminModel')
class AdminController {
    async login(req, res) {
        let { userName, passWord } = req.body;
        let userInfo = await adminModel.findOne({ userName, passWord });
        if (!userInfo) return res.send({ code: 404, msg: '登录失败' })
        res.send({ code: 0, msg: '登录成功' })

    }
    async find(req, res) {
        let adminList = await adminModel.find()
        res.send({ code: 0, msg: '查询成功', adminList })
    }
    async create(req, res) {
        let { userName, passWord } = req.body
        if (!userName || !passWord) return res.send({ code: -1, msg: '管理员添加失败' })
        let result = await adminModel.insertMany({ userName, passWord })
        if (!result) return res.send({ code: -1, msg: '管理员添加失败' })
        res.send({ code: 0, msg: '管理员添加成功' })
    }
    async update(req, res) {
        let id = req.params.id
        // let { userName, passWord } = res.body
        console.log(res.body);
        // let result = await adminModel.findByIdAndUpdate(id, { userName, passWord })
        // if (!result) return res.send({ code: '404', msg: '管理员修改失败' })
        res.send({ code: 0, msg: '0' })
    }
    async remove(req, res) {
        let id = req.params.id
        let result = await adminModel.findByIdAndDelete(id)
        if (!result) return res.send({ code: 404, msg: '管理员删除失败' })
        res.send({ code: 0, msg: '管理员删除成功' })
    }
}

module.exports = new AdminController()