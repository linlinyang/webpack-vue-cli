const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); //合并配置文件
const base = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css文件到外部样式表中,文档：https://webpack.js.org/plugins/mini-css-extract-plugin/
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');//压缩js文档：https://github.com/terser-js/terser#minify-options
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css文档：https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production


//webpack使用环境变量文档： https://webpack.js.org/guides/environment-variables/
module.exports = env => {
    return webpackMerge.smart(base(env),{
        mode: 'production',
        devtool: 'source-map', // 调试生产代码，不需要请删除
        performance: {
            maxEntrypointSize: 2000000 // 打包后入口网页css+js超过2M时，警告提示
        },
        optimization: {
            minimizer: [
                new TerserPlugin({// 压缩js代码
                    parallel: true,//使用多进程并行执行任务来提高构建效率
                    sourceMap: true,// 将错误消息位置映射到模块
                    cache: true,// 启用文件缓存
                    terserOptions: {
                        compress: {
                            drop_console: false //设置为true清除console.log打印
                        }
                    }
                }),
                new OptimizeCssAssetsPlugin() //压缩css文件
            ]
        },
        plugins: [
            new CleanWebpackPlugin(), // 打包前清除dist目录
            new MiniCssExtractPlugin({ // 提取css文件到外部样式表中
                filename: 'css/[name].[contenthash:7].css'
            })
        ]
    });
}