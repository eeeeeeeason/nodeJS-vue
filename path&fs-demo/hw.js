'use strict'
const http = require('http')
const url = require('url')
const querystring = require('querystring')


const server = http.createServer()
server.on('request',function(req,res){
    const urlstring = req.url
    const urlObj = url.parse(urlstring)
    const params = querystring.parse(urlObj.query)

    res.setHeader('Content-Type','text/plain;charset=utf8')
    res.end('<h1>OK</h1>')
})

server.listen(3000,'127.0.0.1',(err)=>{
    if(err){
        console.log(err)
    }
})