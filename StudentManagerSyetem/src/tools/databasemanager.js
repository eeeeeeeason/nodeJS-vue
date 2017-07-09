'use strict'

const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/szhmqd06';

const ObjectId = mongodb.ObjectId
exports.ObjectId = ObjectId

const getDB = (callback) => {
    MongoClient.connect(url, function(err, db) {
        callback(db)
    })
}


//暴露出一个通用的查询一个对象的方法
exports.findOne = (collectionName,condition,callback) => {
    //获取db对象，通过db对象去查询数据库中的一个的操作
    getDB((db)=>{
        //获取集合
        const collection = db.collection(collectionName)

        //去数据库中查找一个对象
        collection.findOne(condition,(err,doc)=>{
            //通过回调函数，将结果传递到控制器中
            callback(doc)

            db.close()
        })
    })
}

//暴露出去的获取一个数据的通用方法
exports.findList = (collectionName,condition,callback) => {
    //数据库的校验
    getDB((db)=>{
        //获取集合
        const collection = db.collection(collectionName)

        //去数据库中查找数据
        collection.find(condition).toArray((err,docs)=>{
            callback(docs)

            db.close()
        })
    })
}

//暴露出一个添加一个的通用的方法
exports.insertOne = (collectionName,condition,callback) => {
    getDB((db)=>{
        //获取集合
        const collection = db.collection(collectionName)

        //插入一个
        collection.insertOne(condition,(err,result)=>{
            callback(result)

            db.close()
        })
    })
}

//暴露出一个修改一个的通用的方法
exports.updateOne = (collectionName,condition,data,callback) =>{
    getDB((db)=>{
        //获取集合
        const collection = db.collection(collectionName)

        //修改一个
        collection.updateOne(condition,{$set:data},(err,result)=>{
            callback(result)

            db.close()
        })
    })
}

//暴露出一个删除一个的通用的方法
exports.deleteOne = (collectionName,condition,callback) => {
    getDB((db)=>{
        //获取集合
        const collection = db.collection(collectionName)

        //修改一个
        collection.deleteOne(condition,(err,result)=>{
            callback(result)

            db.close()
        })
    })
}