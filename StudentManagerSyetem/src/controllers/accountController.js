/**
 * 处理和账号相关的业务逻辑
 */

const path = require('path')
const fs = require('fs')

const captchapng = require('captchapng')

// const getLoginPage = (req,res)=>{
//     fs.readFile(path.join(__dirname,'../views/login.html'),(err,data)=>{
//         //console.log(data.toString())
//         res.setHeader("Content-Type","text/html;charset=utf-8")
//         res.end(data)
//     })
// }

// module.exports = {
//     getLoginPage:getLoginPage
// }

//暴露出去了一个方法
//这个写法相当于是上面注释起来的写法
//如果exports后面接的有属性名称，可以省略前面的module
//你可以认为 exports就是一个对象，getLoginPage是属性名称 =右边的是值，这个值是函数
exports.getLoginPage = (req,res)=>{
    fs.readFile(path.join(__dirname,'../views/login.html'),(err,data)=>{
        //console.log(data.toString())
        res.setHeader("Content-Type","text/html;charset=utf-8")
        res.end(data)
    })
}

//返回验证码图片的业务逻辑
exports.getVcodeImage = (req,res)=>{
    //生成验证码随机数
    const vcode = parseInt(Math.random()*9000+1000)
    //todo 存起来
    //req.session就能访问到我们的内存空间了
    req.session.vcode = vcode

    var p = new captchapng(80,30,vcode); // width,height,numeric captcha 
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    var img = p.getBase64(); //vuejs
    var imgbase64 = new Buffer(img,'base64');
    //res.setHeader("Content-Type","image/png")
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//登录
exports.login = (req,res)=>{

    const result = {status:1,message:"登录成功"}

    //验证码验证
    console.log("浏览器传递过来的 "+req.body.vcode)
    console.log("后台内存空间中取得 "+req.session.vcode)
    if(req.body.vcode != req.session.vcode){
        result.status = 0
        result.message = "验证码不正确"
    }

    res.send(result)
}