const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack=require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =
    {
        entry: {
            //入口文件
            "index": __dirname + '/src/js/index.js',
            "admin": __dirname + '/src/js/admin.js',
        },
        output: {
            path: __dirname + '/src/webapp/js',  //输出文件夹
            filename: '[name].js',   //最终打包生成的文件名(只是文件名，不带路径的哦)
            // publicPath: '/webapp/images/'
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js'
            }
        },
        externals: {

        },
        module:{
            loaders:[
                //这里肯定要加入n个loader 譬如vue-loader、babel-loader、css-loader等等
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    loader: 'vue-loader'
                },
                {
                    test:/\.js$/,
                    loader:"babel-loader",
                    query:{
                        compact:true
                    }
                },
                {
                    test: /\.css$/,
                    loader:ExtractTextPlugin.extract("style-loader","css-loader")
                },
                {
                    test: /\.(woff2?|woff|eot|svg|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]',
                },
                {
                    test: /\.(png|jpg)$/,
                    // 小于limit指定大小的图片将以base64的形式存到js里,否则将在output.path下生成name指定的文件夹及文件
                    loader: 'url-loader?limit=8192&name=images/[name].[hash:6].[ext]',
                }
            ]
        },
        plugins:[
            new HtmlWebpackPlugin({
                filename: __dirname+'/src/webapp/index.html',   //目标文件
                template: __dirname+'/src/html/index.html', //模板文件
                inject:'body',
                hash:true,  //代表js文件后面会跟一个随机字符串,解决缓存问题
                chunks:["index"],
                // chunks:["index", "login"]
            }),
            new HtmlWebpackPlugin({
                filename: __dirname+'/src/webapp/admin.html',   //目标文件
                template: __dirname+'/src/html/admin.html', //模板文件
                inject:'body',
                hash:true,  //代表js文件后面会跟一个随机字符串,解决缓存问题
                chunks:["admin"],
                // chunks:["index", "login"]
            }),

            new ExtractTextPlugin("[name].css"),

        ]
    };