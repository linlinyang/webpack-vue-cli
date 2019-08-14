const webpackMerge = require('webpack-merge');
const path = require('path');
const pathResolve = filename => path.resolve(__dirname,'../',filename);
const base = require('./webpack.base.js');

//webpack使用环境变量文档： https://webpack.js.org/guides/environment-variables/
module.exports = env => {
    return webpackMerge.smart(base(env),{
        devtool: 'inline-source-map',
        devServer: {
            open: true,
            compress: true,
            hot: true,
            historyApiFallback: true,
            contentBase: pathResolve('dist'),
            proxy: {
                '/api': {
                    target: 'http://dc.bocai.com/api',
                    pathRewrite: {
                        '^/api': '/backend'
                    },
                    changeOrigin: true
                }
            }
        },
        mode: 'development'
    });
};
