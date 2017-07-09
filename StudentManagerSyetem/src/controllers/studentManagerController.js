'use strict'

const path = require('path')
const fs = require('fs')
const xtpl = require('xtpl')

const databasemanager = require(path.join(__dirname,"../tools/databasemanager.js"))

//获取学生列表
exports.getStudentListPage = (req,res)=>{
    //获取到查询的关键字
    const keyword = req.query.keyword || ''

    //调用databasemanager的获取数组的方法
    databasemanager.findList('studentInfo',{name:{$regex:keyword}},(docs)=>{
        //获取到查询到的docs之后做数据渲染
        xtpl.renderFile(path.join(__dirname,"../views/list.html"),{studentList:docs,keyword:keyword,loginedname:req.session.loginedname},(err,content)=>{
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end(content)
        })
    })
}

//获取新增学生列表页面
exports.getAddStudentPage = (req,res) => {
    xtpl.renderFile(path.join(__dirname,"../views/add.html"),{loginedname:req.session.loginedname},(err,content)=>{
        res.setHeader("Content-Type","text/html;charset=utf8")
        res.end(content)
    })
}

//处理新增学生信息
exports.addStudent = (req,res) => {
    //1.获取post传递过来的参数 req.body
    console.log(req.body)
    databasemanager.insertOne('studentInfo',req.body,(result)=>{
        if(result==null){//失败
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end("<script>alert('新增失败')</script>")
        }else{//成功
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end("<script>window.location.href='/studentmanager/list'</script>")
        }
    })
}

//获取修改学生页面信息
exports.getEditStudentPage = (req,res) => {
    //http://127.0.0.1:3000/login?username=zhangsan&pwd=123  req.query.username
    //http://127.0.0.1:3000/studentmanager/edit/595b535007ac9e989149addf req.params.studentId
    
    //1.根据id去查询我们要修改的学生信息(一个对象)
    databasemanager.findOne('studentInfo',{_id:databasemanager.ObjectId(req.params.studentId)},(doc)=>{
        xtpl.renderFile(path.join(__dirname,"../views/edit.html"),{student:doc,loginedname:req.session.loginedname},(err,content)=>{
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end(content)
        })
    })
}

//修改学生信息
exports.editStudent = (req,res) =>{
    //1.获取post提交过来的参数

    //2.调用我们的databasemanaer的updateOne方法
    databasemanager.updateOne('studentInfo',{_id:databasemanager.ObjectId(req.params.studentId)},req.body,(result)=>{
        if(result==null){//失败
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end("<script>alert('修改失败')</script>")
        }else{//成功
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end("<script>window.location.href='/studentmanager/list'</script>")
        }
    })
}

//删除学生信息
exports.deleteStudent = (req,res) =>{
    databasemanager.deleteOne('studentInfo',{_id:databasemanager.ObjectId(req.params.studentId)},(result)=>{
        if(result==null){//失败
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end("<script>alert('删除失败')</script>")
        }else{//成功
            res.setHeader("Content-Type","text/html;charset=utf8")
            res.end("<script>window.location.href='/studentmanager/list'</script>")
        }
    })
}