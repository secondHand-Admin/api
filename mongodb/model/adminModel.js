const { model, Schema } = require('mongoose')
let adminSchema = new Schema({
    __v: { type: Number, select: false },
    userName: { type: String, required: true },
    passWord: { type: String, required: true, select: false },
    leavel: { type: String, default: 'admin' },
    img: { type: String, default: '' }
})
module.exports = model('admins', adminSchema)