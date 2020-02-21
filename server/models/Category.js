// 数据模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 模型字段
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

// 导出mongoose模型
module.exports = mongoose.model('Category', schema)