const config       = require('config')
const jsonwebtoken = require('jsonwebtoken')
const API_TOKEN    = config.get('api-token')

/**
 * Middleware to check if user has logged in
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
module.exports.verifyStaticToken = async(req,res,next) => {
    if(API_TOKEN == req.body.token){
        return next()
    }else {
        return res.send({
            code    : 3,
            message : "You dont have valid token",
            payload :{}
        })
    }
}
