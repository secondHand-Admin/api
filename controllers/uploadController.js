const path = require('path')
const fs = require('fs')
const md5 = require('md5')
// const { host } = require('../config')
class uploadController {
    uploadImg(req, res) {
        try {
            let { host } = req.headers;
            let { buffer, originalname } = req.file;
            let _name = `uploads/${md5(buffer)}${new Date().getTime()}.${originalname.split('.')[1]}`
            fs.writeFile(path.join(__dirname, '../public/' + _name), buffer, err => {
                if (err) return res.send({ code: 404, msg: '上传失败' })
                res.send({
                    code: 0,
                    msg: '上传成功',
                    src: `http://${host}/${_name}`
                })
            })
        } catch (error) {
            res.send({ code: 505, msg: '上传失败' })
        }
    }
}
module.exports = new uploadController()