const { Schema, model } = require("mongoose")
const newsSchema = new Schema({
    __v: { type: Number, select: false },
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    text: { type: String, required: true },
    state: { type: Number, require: true, default: -1 },
    src: { type: String, require: true, default: '' },
    href: { type: String, require: true, default: '' },
    flow: { type: Number, require: true, default: 0 },
    coll: { type: Number, require: true, default: 0 },
    time: { type: Date, require: true, default: Date.now() },
})
module.exports = model('news', newsSchema)