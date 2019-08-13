const path = require('path');
const resolve = filename => path.resolve(__dirname,filename);
const htmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'boundle.js',
        path: resolve('dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },{
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name]_[contenthash:5].[ext]'
                }
            }]
        }]
    },
    resolve: {
        alias: {
            '@': resolve('src/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: 'Vue config',
            filename: resolve('dist/index.html'),
            template: resolve('index.html')
        })
    ]
};