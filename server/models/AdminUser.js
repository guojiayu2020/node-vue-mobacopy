// 数据模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    // 模型字段
    username: { type: String },
    password: {
        type: String,
        select: false,
        set(val){
            return require('bcrypt').hashSync(val, 10)
        }
    },
   
})

// 导出mongoose模型
module.exports = mongoose.model('AdminUser', schema)