'use strict'
const fs = require('fs')
const path = require('path')

//源文件路径
const sourceDir = path.join(__dirname,'aaa')
const sourcePath = path.join(__dirname,'aaa/aaa.txt')

//目标文件夹
const targetDir = path.join(__dirname,'abc')
const targetFilePath = path.join(__dirname,'abc/abc.txt')

//监控源文件
fs.watchFile(sourcePath,(curr,prev)=>{
    fs.exists(sourcePath,(exists)=>{
        if(exists){
            console.log('源文件还存在')
        }else{
            console.log('源文件已经被干掉')
            return 
        }
    })
})

//判断目标文件夹是否存在
fs.exists(targetDir,(exists)=>{
    if(!exists){
        fs.mkdir(targetDir,(err)=>{
            if(err){
                console.log(err)
            }
            console.log('mkdir success')
        })
    }else{
        console.log('已经创建了目标文件夹')
    }
})

//读取源文件
fs.readFile(sourcePath,(err,data)=>{
    if(err){
        console.log(err)
    }
    //将读取的文件写入目标文件中
    fs.writeFile(targetFilePath,data,(err)=>{
        if(err){
            console.log(err)
        }
        console.log('写入成功')
        fs.unlink(sourcePath,(err)=>{
            if(err){
                console.log(err)
            }
            console.log('删除文件成功')
            fs.exists(sourceDir,(exists)=>{
                if(exists){
                    fs.rmdir(sourceDir,(err)=>{
                        if(err){
                            console.log(err)
                        }
                        console.log('移除文件夹成功')
                    })
                }else{
                    console.log('源文件已不存在')
                }
            })
        })
    })
})