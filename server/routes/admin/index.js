// 导出一个函数,这个函数接收一个对象app
module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
        mergeParams: true
    })
    // const req.Model = require('../../models/req.Model')
    
    // 创建资源
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 更新资源
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    // 删除资源接口
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })
    // 资源列表接口
    router.get('/', async(req, res) => {
        // console.log(req.user)
        const queryOption = {}
        if(req.Model.modelName === 'Category') {
            queryOption.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOption).limit(10)
        // 把items发送给前端
        res.send(items)
    })
    // 资源详情
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource')
    
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 上传图片
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads'})
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录,服务端接收前端用户名和密码
    app.post('/admin/api/login',async(req, res) => {
        // req.body表示客户端传过来的所有数据
        // 用解构赋值的方法提取所需要的数据：用户名和密码
        const { username, password } = req.body
        // 1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')
        // if(!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        // 2.校验密码
        // 用户存在的话要校验这个密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        // 密码错误
        assert(isValid, 422, '密码错误')
        // if(!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        // 3.返回token
        const token = jwt.sign({ id: user._id}, app.get('secret'))
        res.send({token})
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}