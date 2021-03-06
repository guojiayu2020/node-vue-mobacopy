// 数据模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 模型字段
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    title: { type: String },
    body: { type: String },
})

// 导出mongoose模型
module.exports = mongoose.model('Article', schema)