const permissionList = require('../config/permissions')
//权限验证
module.exports = (req, res, next) => {
    let { method, body, path } = req
    if (path.indexOf('/login') !== -1) return next()
    console.log(path);
    let { leavel } = body.userInfo
    let list = permissionList[leavel]
    let boolean = false
    next()
}