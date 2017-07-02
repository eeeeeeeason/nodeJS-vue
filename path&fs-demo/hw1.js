'use strict'
// const http = require('http')
// const querystring = require('querystring')
// const server = http.createServer()
// server.on('request',(req,res)=>{
//     let body = ''
//     req.on('data',(chunk)=>{
//         body+=chunk
//     })
//     req.on('end',()=>{
//         const paramsObj = querystring.parse(body)
//         console.log(paramsObj)
//     })
//     res.end('ok')
// })
// server.listen(3000)

// const http = require('http')
// const querystring = require('querystring')
// const server = http.createServer()
// //接收post请求参数
// server.on('request',(req,res)=>{
//     var body=''
//     //data事件代表每次上传，chunk为上传的数据块
//     req.on('data',(chunk)=>{
//         //由于chunk是一个2进制的node默认将其转化为16进制，进行显示，拼接在空字符串后，实际上相当于进行了一次toString方法
//         body+=chunk
//     })
//     req.on('end',()=>{
//         //请求结束后将这段数据字符串以querystring的parse方法转化为js对象
//         const paramsObj = querystring.parse(body)
//         console.log(paramsObj)
//     })
//     res.end('okhhhhhhhhhh')
// })

// server.listen(3000,'127.0.0.1',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('success')
// })

// 'use strict'

// const http = require('http')
// const path = require('path')
// const fs = require('fs')

// const server = http.createServer()
// server.on('request',(req,res)=>{
//     //如果斜杠后面内容包括了index这个字符串
//     if(req.url.includes('index')){
//         //打开当前文档路径下的Index.html,保存为filePath
//         const filePath = path.join(__dirname,'index.html')
//         fs.readFile(filePath,(err,data)=>{
//             //读取文件参数，1路径，2回调函数
//             if(err){
//                 console.log(err)
//             }
//             res.setHeader('Content-Type','text/html;charset=utf8')
//             res.end(data)
//         })
//     }
// })
// server.listen(3000)

'use strict'

//导入node提供的核心模块/包
const fs = require('fs')
const path = require('path')

//编辑内容
// fs.writeFile(path.join(__dirname,'abc.txt'),"哈哈哈哈哈哈无敌是多么多么寂寞",(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('write success')
// })

//增加内容
// fs.appendFile(path.join(__dirname,'abc.txt'),'\r\n哈哈哈哈哈哈哈哈哈哈哈',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('append success')
// })

//删除文件
// fs.exists(path.join(__dirname,'abc.txt'),(exists)=>{
//     if(exists){
//         fs.unlink(path.join(__dirname,'abc.txt'),(err)=>{
//             if(err){
//                 console.log(err)
//             }
//             console.log('unlink ok')
//         })
//     }else{
//         console.log('文件不存在')
//     }
// })

//添加文件夹
// fs.mkdir(path.join(__dirname,'abc'),(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('mkdir success')
// })

//判断是否存在
// fs.exists(path.join(__dirname,'abc'),(exists)=>{
//     if(exists){
//         console.log('已经存在')
//     }else{
//         fs.mkdir(path.join(__dirname,'abc'),(err)=>{
//             if(err){
//                 console.log(err)
//             }
//             console.log('mkdir success')
//         })
//     }
// })

//重命名文件夹
fs.exists(path.join(__dirname,"abc"),(exists)=>{
    if(exists){
        fs.rename(path.join(__dirname,"abc"),path.join(__dirname,"aaa"),(err)=>{
            if(err){
                console.log(err)
            }
            console.log('rename success')
        })
    }else{
        console.log('文件不存在')
    }
})




// fs.watchFile(path.join(__dirname,'abc.txt'),(curr,prev)=>{
//     console.log(`the current mtime is: ${curr.mtime}`)
//     console.log(`the previous mtime was: ${prev.mtime}`)
// })