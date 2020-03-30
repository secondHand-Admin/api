const permissionList = require('../config/permissions')
//权限验证
module.exports = (req, res, next) => {
    let { host } = req.headers;
    let { method, body, path } = req
    let { userName } = body.userInfo
    let dateLog = `Time:${Date()} User:${userName} Method:${method} url:${host}/${path}`
    console.log('Log:', dateLog);
    if (path.indexOf('/login') !== -1) return next()
    let { leavel } = body.userInfo
    let list = permissionList[leavel]
    let boolean = false
    next()
}