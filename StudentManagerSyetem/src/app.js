'use strict'

//导包
const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')

//创建一个app
const app = express()

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

//使用我们的express-session
// Use the session middleware 
//resave:会把时间进行累计
app.use(session({ secret: 'keyboard cat',resave:true,saveUninitialized:true, cookie: { maxAge: 5*60000 }}))

//设置我们的静态资源根路径
app.use(express.static(path.join(__dirname,'statics')))

//进行请求的分流处理
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)

//开启web服务
app.listen(3000,'192.168.65.61',(err)=>{
    if(err){
        console.log(err)
    }
    console.log("start OK")
})