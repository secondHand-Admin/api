const express = require('express')
const router = require('./routers')
const bodyParser = require('body-parser')
require('./mongodb')
const app = express()
const port = 3000
// 静态路径
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// 使用路由
app.use(router)

app.listen(port, () => console.log(`App listening on port 3000!`))