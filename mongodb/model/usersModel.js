const { Schema, model } = require("mongoose")
const usersSchema = new Schema({
    __v: { type: Number, select: false },
    userName: { type: String, required: true },
    state: { type: Number, require: true, default: -1 },
    src: { type: String, require: true, default: '' },
    article: { type: Number, default: 0 },
    createtime: { type: Date, require: true, default: Date.now() },
})
module.exports = model('users', usersSchema)