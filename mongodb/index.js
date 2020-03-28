let dburl = 'mongodb+srv://GZ1913:GZ1913@lucky-tsx5c.mongodb.net/test?retryWrites=true&w=majority'
const mongoose = require('mongoose')
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// mongoose.set('useFindAndModify', false);
var db = mongoose.connection;
db.on('error', () => {
    console.log("数据库连接失败")
});
db.once('open', function () {
    console.log('数据库连接成功')
})