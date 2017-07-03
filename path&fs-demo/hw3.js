'use strict'
const fs = require('fs')
const path = require('path')


const sourceDir = path.join(__dirname, 'aaa')
const sourceFilePath = path.join(__dirname, 'aaa/aaa.txt')

const targetDir = path.join(__dirname, 'abc')
const targetFilePath = path.join(__dirname, 'abc/abc.txt')

fs.watchFile(sourceFilePath, (curr, prev) => {
    fs.exists(sourceFilePath, (exists) => {
        if (exists) {
            console.log('源文件还存在')
        } else {
            console.log('源文件已经被干掉')
            return
        }
    })
    console.log('文件被更改')
})
fs.exists(targetDir, (exists) => {
    if (!exists) {
        fs.mkdir(targetDir, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('mkdir success')

        })
    } else {
        console.log('已经创建了文件夹')
    }
})

fs.readFile(sourceFilePath, (err, data) => {
    if (err) {
        console.log(err)
    }
    fs.writeFile(targetFilePath, data, (err) => {
        if (err) {
            console.log(err)
        }
        console.log('写入成功')
        fs.unlink(sourceFilePath, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('删除文件成功')
            fs.exists(sourceDir, (exists) => {
                if (exists) {
                    fs.rmdir(sourceDir, (err) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log('移除文件夹成功')
                    })
                } else {
                    console.log('源文件已不存在')
                }
            })
        })
    })
})