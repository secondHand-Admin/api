const { model, Schema } = require('mongoose')
let goodsSchema = new Schema({
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    desc: { type: String, required: false },
    src: { type: String, required: true },
    link: { type: String, required: false },
    stock: { type: Number, default: 0 },
    putaway: { type: Number, default: -1 },
    price: { type: Number, default: 0 },
    marketPrice: { type: Number, default: 0 },
    unit: { type: String, default: "件" },
    kind: { type: Schema.Types.ObjectId, ref: "kinds" },
    createTime: {
        type: Date,
        default: new Date().getTime()
    },
    updateTime: {
        type: Date,
        default: new Date().getTime()
    }
},
    {
        versionKey: false,
        timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
    })
module.exports = model('goods', goodsSchema)