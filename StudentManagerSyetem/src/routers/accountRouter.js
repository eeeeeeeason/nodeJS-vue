'use strict'

//导包
const express = require('express') 
const path = require('path')

//创建路由对象
const accountRouter = express.Router()

//导入accountController
//require的时候，只看exports exports后面如何还有属性名称，就代表exports就是一个对象，那么我导入的也是一个对象
const accountCtrl = require(path.join(__dirname,'../controllers/accountController.js')) 

//获取我们登录页面
//第二个参数，accountCtrl对象的getLoginPage这个属性的值
accountRouter.get('/login',accountCtrl.getLoginPage)
//获取我们图片验证码
accountRouter.get('/vcode',accountCtrl.getVcodeImage)
//登录逻辑
accountRouter.post('/login',accountCtrl.login)

//退出
accountRouter.get('/logout',accountCtrl.logout)

//获取注册页面
accountRouter.get('/register',accountCtrl.getRegisterPage)
//用户注册
accountRouter.post('/register',accountCtrl.register)

module.exports = accountRouter