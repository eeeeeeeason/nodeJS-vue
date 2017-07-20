     var HtmlWebpackPlugin = require('html-webpack-plugin')

     module.exports = {
         entry: './src/main.js',
         output: {
             path: __dirname + '/dist',
             filename: 'bundle.js'
         },
         module: {
             rules: [{
                 test: /\.vue$/,
                 use: [{
                     loader: "vue-loader"
                 }]
             },
              {
		        test: /\.css$/, //凡是以.vue结尾的文件使用vue-loader去打包
		        use: [//2.x的写法
		          {
		            loader: "style-loader"
		          },
		          {
		            loader: "css-loader"
		          }
		        ]
		      },
              {
                  test:/\.(png|ttf|svg|gif)$/,
                  use:[{
                      loader:'url-loader'
                  }]
              }
              ]
         },

         plugins: [
             new HtmlWebpackPlugin({
                 filename: 'index.html', //以参数文件生成的最终的文件名称
                 template: './template.html' //参照文件的路径
             })
         ]
     }