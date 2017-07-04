'use strict'
const express = require('express')
const path = require('path')
const xtpl = require('xtpl')
const app = express()
const musicinfo = require(path.join(__dirname,'musics.json'))

app.use(express.static(path.join(__dirname,'statics')))
// *****************************



app.get('/list.html',(req,res)=>{
    xtpl.renderFile(path.join(__dirname,'list.html'),{array:musicinfo},(err,content)=>{
        res.send(content)
    })
})
app.listen(3000,'127.0.0.1',(err)=>{
    if(err){
        console.log(err)
    }
    console.log('start success')
})