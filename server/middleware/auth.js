module.exports = options => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    return async(req, res, next)=> {
        // 前端传过来的用户token，后端解密得到id，再通过id从数据库找到这个用户
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')//请先提供jwt token
        // 解构赋值，将token里面的id获取出来
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')//无效的jwt token
        // 找到后将用户赋值给req.user挂载上去
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')
        await next()
    }
}