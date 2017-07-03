'use strict'
const http = require('http')
const xtpl = require('xtpl')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
const musicsinfo = require(path.join(__dirname, 'musics.json'))
const server = http.createServer()
server.on('request', (req, res) => {
    if (req.url.includes('list.html')) {
        xtpl.renderFile(path.join(__dirname, 'list.html'), {
            array: musicsinfo
        }, (err, content) => {
            if(err){
                console.log(err)
            }
            res.setHeader("Content-Type", "text/html;charset=utf-8")
            res.end(content)
        })

    }else if(req.url.includes('site.css')){
        fs.readFile(path.join(__dirname,'/statics/css/site.css'),(err,data)=>{
            if(err){
                console.log(err)
            }
            res.setHeader("Content-Type","text/css;charset=utf-8")
            res.end(data)
        })
    }else if(req.url.includes('jquery')){
        fs.readFile(path.join(__dirname,'/statics/js/jquery.min.js'),(err,data)=>{
            if(err){
                console.log(err)
            }
            res.setHeader("Content-Type","text/javascript;charset=utf-8")
            res.end(data)
        })
    }else if(req.url.includes('mp3')){
        const musicinfo = querystring.unescape(req.url)
        fs.readFile(path.join(__dirname,musicinfo),(err,data)=>{
            if(err){
                console.log(err)
            }
            res.setHeader("Content-Type","audio/mpeg;charset=utf-8")
            res.end(data)
        })
    }
})
server.listen(3000,'127.0.0.1',function(err){
    if(err){
        console.log(err)
    }
    console.log('success')
})