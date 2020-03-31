const goodsModel = require('../mongodb/model/goodsModel')
class anController {
    async getGoods(req, res) {
        let data = await goodsModel.aggregate([
            {
                $lookup: {
                    from: 'seckinds',
                    localField: 'kind',
                    foreignField: '_id',
                    as: 'kindlist'
                }
            },
            {
                $group: {
                    _id: "$kind",
                    count: { $sum: 1 },
                    list: {
                        $push: {
                            name: '$name',
                            price: "$price",
                            stock: '$stock',
                            kindname: "$kindlist"
                        }
                    },
                }
            }])
        if (data) return res.send({
            code: 0,
            msg: "获取成功",
            list: data
        })
        res.send({ code: 505, msg: '查询失败' })
    }
}

module.exports = new anController()