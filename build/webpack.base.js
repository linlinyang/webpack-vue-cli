const path = require('path');
const pathResolve = filename => path.resolve(__dirname,'../',filename);
const htmlWebpackPlugin = require('html-webpack-plugin'); //文档地址：https://www.npmjs.com/package/html-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css为外部样式,文档地址：https://www.npmjs.com/package/mini-css-extract-plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');//vue-loader文档：https://vue-loader.vuejs.org/zh/

module.exports = env => {
    const devMode = !!env.development; //是否为开发模式
    const outputFileName = devMode 
                            ? 'js/[name].js' 
                            : 'js/[name].[chunkhash:7].js';

    return {
        entry: pathResolve('src/index.js'),
        output: {
            filename: outputFileName,
            path: pathResolve('dist')
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },{
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,//开发模式使用内联样式，生产环境提取css为外部样式
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    'sass-loader'
                ]
            },{
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: devMode ? '[name].[ext]' : '[name].[contenthash:7].[ext]',
                        outputPath: 'images'
                    }
                }]
            },{
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
        },
        resolve: {
            alias: {//路径别名
                '@': pathResolve('src/')
            },
            extensions: ['.js','.vue'] //自动解析的扩展
        },
        optimization: {
            moduleIds: 'hashed', //使用hash生成的值作为模块id来进行长缓存
            runtimeChunk: { //打包后将包之间的依赖关系单独打包进一个文件（下面name属性指定文件名称），进行缓存优化
                name: 'runtime' 
            },
            splitChunks: { //splitChunksPlugin代码分割文档：https://webpack.js.org/plugins/split-chunks-plugin/
                chunks: 'all', //无论同步还是异步代码都进行分割
                minSize: 30000, //当超过指定大小时做代码分割
                minChunks: 1, //最少的分割块
                maxAsyncRequests: 5,//按需加载的最大并行数
                maxInitialRequests: 3,//入口最大并行请求数
                cacheGroups: { //缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        priority: -10, //打包优先级，值越大，优先级越高
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                        name: 'common'
                    }
                }
            }
        },
        externals: {//外部扩展，无需打包
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex'
        },
        plugins: [
            new htmlWebpackPlugin({//
                title: 'Vue config',
                filename: pathResolve('dist/index.html'),
                template: pathResolve('index.html')
            }),
            new VueLoaderPlugin()
        ]
    };
};
