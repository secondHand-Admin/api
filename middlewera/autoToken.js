const jsonWebToken = require("jsonwebtoken")
const { secret } = require("../config")
module.exports = (req, res, next) => {
    if (req.path.indexOf('/login') !== -1 || req.path.indexOf('/uploads') !== -1) return next()
    try {
        let token = req.headers.authorization.split("Bearer ")[1]
        let { userInfo } = jsonWebToken.verify(token, secret)
        req.body.userInfo = userInfo
    } catch (error) {
        return res.send({ code: 402, msg: "token失效" })
    }
    next()
}