module.exports = options => {
    return async(req, res, next) => {
        // 转类名:req.params.resource小写复数转大写单数modelName
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}