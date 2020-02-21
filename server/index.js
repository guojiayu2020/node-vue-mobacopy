// 1、引用express
const express = require("express")

// 2、创建实例
const app = express()

app.set('secret', 'hkjhkhfs')

app.use(require('cors')())
app.use(express.json())

// 引用该文件里的app
require('./plugins/db')(app)
require('./routes/admin')(app)
// 托管静态文件:让uploads所有文件可以通过/uploads访问
app.use('/uploads', express.static(__dirname + '/uploads'))


// 3、启动
app.listen(3000, () => {
    console.log('http://localhost:3000')
})