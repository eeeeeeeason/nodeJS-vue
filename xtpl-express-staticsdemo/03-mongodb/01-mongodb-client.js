'use strict'

//1.导包
const mongo = require('mongodb')
//2.获取mongodb的客户端对象
const MongoClient = mongo.MongoClient

// Connection URL
//最后一个代表 数据库名称
var url = 'mongodb://localhost:27017/szhmqd06';

//正式连接
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
    cosole.log(db)
  
    //拿到我们想要操作的集合名称 foodInfo
    var collection = db.collection('foodInfo');

   //增
   //插入多条
//    collection.insertMany([
//     {name : "卫龙辣条",price:2.5}, 
//     {name : "老干妈",price:6.5}
//   ], function(err, result) {
//     if(err){
//         console.log(err)
//     }

//     console.log(result)
//   });
    //插入一条
    //  collection.insertOne(
    //     {name : "茶叶蛋",price:100.6}
    // , function(err, result) {
    //     if(err){
    //         console.log(err)
    //     }

    //     console.log(result)
    // });

   //改
   /**
    * 参数1：条件
    * 参数2：更改的，找到的符合条件的值,就是你要更改的哪一个文档的值,$set是固定写法
    */
//    collection.updateOne({ name : "卫龙辣条" }
//     , { $set: { price : 5.5 } }, 
//     function(err, result) {
//         if(err){
//             console.log(err)
//         }

//         console.log(result)
//     });  


   //删除
   //参数1：条件
//    collection.deleteOne({ name : "茶叶蛋" }, function(err, result) {
//         console.log(result)
//   });


   //查询
   //参数1：查询的条件
//    collection.find({name:"老干妈"}).toArray(function(err, docs) {
//         console.log(docs)
//    });

    //只需要查询一条的时候，就用这个
    // collection.findOne({name:"茶叶蛋"},function(err,doc){
    //     console.log(doc)
    // })

});