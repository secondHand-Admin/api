const { Router } = require('express')
const { uploadImg } = require('../controllers/uploadController')
const multer = require('multer')
const upload = multer({})

const uploadRouter = Router();
uploadRouter.post('/uploadImg', upload.single('img'), uploadImg)

module.exports = uploadRouter
