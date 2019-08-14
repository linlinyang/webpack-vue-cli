const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');//压缩js文档：https://github.com/terser-js/terser#minify-options
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css文档：https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production


//webpack使用环境变量文档： https://webpack.js.org/guides/environment-variables/
module.exports = env => {
    return webpackMerge.smart(base(env),{
        mode: 'production',
        devtool: 'source-map',
        optimization: {
            minimizer: [
                new TerserPlugin({// 压缩js代码
                    parallel: true,//使用多进程并行执行任务来提高构建效率
                    sourceMap: true,// 将错误消息位置映射到模块
                    cache: true,// 启用文件缓存
                    terserOptions: {
                        compress: {
                            drop_console: false//true
                        }
                    }
                }),
                new OptimizeCssAssetsPlugin() //压缩css文件
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:7].css'
            })
        ]
    });
}