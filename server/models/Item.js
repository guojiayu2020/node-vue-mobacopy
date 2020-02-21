// 数据模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 模型字段
    name: {type: String},
    icon: {type: String},
})

// 导出mongoose模型
module.exports = mongoose.model('Item', schema)