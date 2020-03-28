const { Router } = require('express')
const { uploadImg } = require('../controllers/uploadController')
const multer = require('multer')
const upload = multer({})

const uploadRouter = Router();

uploadRouter.post('/uploadImg', upload.single('Img'), uploadImg)

module.exports = uploadRouter
