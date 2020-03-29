const { Schema, model } = require("mongoose")
const kindsSchema = new Schema({
    __v: { type: Number, select: false },
    kindName: { type: String, required: true },
    seckindName: [{ type: Schema.Types.ObjectId, require: false, ref: 'seckinds' }],
    createTime: {
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
})
module.exports = model('kinds', kindsSchema)