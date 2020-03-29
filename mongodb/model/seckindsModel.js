const { Schema, model } = require("mongoose")
const seckindsSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    scr: { type: String, require: false }
})
module.exports = model('seckinds', seckindsSchema)