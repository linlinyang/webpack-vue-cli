const webpackMerge = require('webpack-merge');
const path = require('path');
const pathResolve = filename => path.resolve(__dirname,'../',filename);
const base = require('./webpack.base.js');
const webpack = require('webpack');

//webpack使用环境变量文档： https://webpack.js.org/guides/environment-variables/
module.exports = env => {
    return webpackMerge.smart(base(env),{
        devtool: 'inline-source-map',
        devServer: {
            open: true,
            compress: true,
            hot: true,
            contentBase: pathResolve('dist')
        },
        mode: 'development',
        optimization: {
            moduleIds: 'hashed'
        },
        plugins: [
            new webpack.NamedChunksPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
};
