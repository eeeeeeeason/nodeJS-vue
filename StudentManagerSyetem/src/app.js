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

app.all('/*',(req,res,next)=>{
    
    if(req.url.includes('account')){//排除不需要权限就可以访问的资源
        next()
    }else{//做权限判断
        if(req.session.loginedname != null){
            next()
        }else{
            res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end("<script>alert('请先登录');location.href='/account/login'</script>")
        }
    }
})

//进行请求的分流处理
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)

const studentManagerRouter = require(path.join(__dirname,'routers/studentManagerRouter.js'))
app.use('/studentmanager',studentManagerRouter)

//开启web服务
app.listen(3000,'127.0.0.1',(err)=>{
    if(err){
        console.log(err)
    }
    console.log("start OK")
})