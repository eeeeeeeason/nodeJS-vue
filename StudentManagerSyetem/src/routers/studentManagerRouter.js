'use strict'

const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

const studentManagerCtrl = require(path.join(__dirname,"../controllers/studentManagerController.js"))

//处理具体的路由
//获取学生列表
studentManagerRouter.get('/list',studentManagerCtrl.getStudentListPage)

//获取新增学生的页面
studentManagerRouter.get('/add',studentManagerCtrl.getAddStudentPage)

//新增学生信息
studentManagerRouter.post('/add',studentManagerCtrl.addStudent)

//获取修改学生的页面
studentManagerRouter.get('/edit/:studentId',studentManagerCtrl.getEditStudentPage)

//修改学生信息
studentManagerRouter.post('/edit/:studentId',studentManagerCtrl.editStudent)

//删除学生信息
studentManagerRouter.get('/delete/:studentId',studentManagerCtrl.deleteStudent)

module.exports = studentManagerRouter