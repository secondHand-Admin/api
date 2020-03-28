const { Schema, model } = require("mongoose")
const kindsSchema = new Schema({
    __v: { type: Number, select: false },
    kindName: { type: String, required: true },
})
module.exports = model('kinds', kindsSchema)