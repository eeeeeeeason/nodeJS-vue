var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/main.js',
    output:{
        path:__dirname,
        filename:'build.js'
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders:{}
                }
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    }
                ]
            },
            {
                test:/\.(ttf|png)$/,
                use:[
                    {
                        loader:"url-loader"
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./template.html'
        })
    ]
}