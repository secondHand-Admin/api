const { Schema, model } = require("mongoose")
const usersSchema = new Schema({
    __v: { type: Number, select: false },
    passWord: { type: String, required: true, select: false },
    userName: { type: String, required: true },
    sex: { type: String, require: true, default: "未知" },
    age: { type: Number, require: true, default: 0 },
    address: { type: String, require: true, default: "未知" },
    like: { type: String, default: '爱好' },
    sign: { type: String, default: '编辑个性签名' },
    src: { type: String, require: true, default: '' },
    leavel: { type: String, require: true, default: 'userleavel_1' },
    article: { type: Number, default: 0 },
    createtime: { type: Date, require: true, default: Date.now() },
})
module.exports = model('users', usersSchema)