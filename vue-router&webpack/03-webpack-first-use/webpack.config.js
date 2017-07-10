var webpack = require('webpack')
//webpack 除了可以给打包的文件，头部添加注视，还有很多功能，比如压缩js代码

//导出一个对象，到时候给webpack在终端中执行的时候使用
module.exports = {
  entry: './entry.js', //项目打包的入口文件 【必须】
  output: {//打包输出文件【必须】
     path: __dirname+'/dist',
     filename: 'bundle.js'
     
  },
  module: { //Loader
    rules: [
      {
        test: /\.css$/, //匹配以.css结尾的
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  //plugins适合module同级的
  plugins: [
    new webpack.BannerPlugin('This file is created by 黄黄黄')
  ]
}