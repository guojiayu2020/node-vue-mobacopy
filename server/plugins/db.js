module.exports = app => {
    // 引用mongoose
    const mongoose = require("mongoose")
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-mobacopy', {
        useNewUrlParser: true
    })
}