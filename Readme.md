#Webpack从入门到放弃48小时

##必须的内容及loader导入
```js
npm i vue --save
npm i vue-loader vue-template-compiler css-loader --save-dev
//尽量不用脚手架生成，如果要用使用simple版本
//npm install -g vue-cli
//vue init webpack-simple vue_project
```

##热重载/热更新
```js
  npm i webpack-dev-server -g//全局安装
  npm i webpack webpack-dev-server --save-dev//本地安装
  webpack-dev-server --progress --port 6008 --open --hot//热加载使用添加在package.json的script标签中，如果webpack安装失败可以在cnpm上下载。
```

##html-webpack-plugin插件的使用
```js
//使用template进行首屏绘制，在内存中产生Index.html
npm install html-webpack-plugin --save-dev
//需要在webpack.config.js中去配置这个html-webpack-plugin插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

            plugins: [
                new HtmlWebpackPlugin({
                  filename: 'index.html', //以参数文件生成的最终的文件名称
                  template:'./template.html' //参照文件的路径
                })
            ]
```

##webpack初始配置
```js
//设置输入输出文件名，导入模块
 module.exports = {
         entry: './src/main.js',
         output: {
             path: __dirname + '/dist',
             filename: 'bundle.js'//会自动拼在我们index.html中，不用在template.html加script标签
         },
         module: {
             rules: [{
                 test: /\.vue$/,
                 use: [{
                     loader: "vue-loader"
                 }]
             }]
         }
```
##main初始，创建App.vue
```js
//main
import Vue from 'vue'
import App from './App.vue'
new Vue({
    el:'#app',
    render:h=>h(App)
})
//App.vue
<template>
  <div>
      <!--1.0 头部导航条-->
      hhhhhh

      <!--2.0 中间内容-->

      <!--3.0 底部的TabBar-->
  </div>
</template>
```