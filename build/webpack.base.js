const path = require('path');
const pathResolve = filename => path.resolve(__dirname,'../',filename);
const htmlWebpackPlugin = require('html-webpack-plugin'); //文档地址：https://www.npmjs.com/package/html-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取css为外部样式,文档地址：https://www.npmjs.com/package/mini-css-extract-plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //vue-loader文档：https://vue-loader.vuejs.org/zh/
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'); // script标签添加async defer等属性；文档：https://github.com/numical/script-ext-html-webpack-plugin

const resourcesLoader = {//引入全局scss变量，文档：https://www.npmjs.com/package/sass-resources-loader
    loader: 'sass-resources-loader',
    options: {
        resources: [
            pathResolve('assets/css/mixins.scss')
        ]
    }
};

module.exports = env => {
    const devMode = !!env.development; //是否为开发模式
    const outputFileName = devMode 
                            ? 'js/[name].js' 
                            : 'js/[name].[chunkhash:7].js';

    return {
        entry: pathResolve('src/index.js'),
        output: {
            filename: outputFileName,
            path: pathResolve('dist'),
            publicPath: devMode ? '' : '/dist/'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },{
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,//开发模式使用内联样式，生产环境提取css为外部样式
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                    resourcesLoader
                ]
            },{
                test: /\.module\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,//开发模式使用内联样式，生产环境提取css为外部样式
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {//xxx.module.scss文件开启css modules
                                mode: 'local',
                                localIdentName: '[local]-[hash:5]'
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                    resourcesLoader
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
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        outputPath: 'fonts'
                    }
                }]
            },{
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
        },
        resolve: {
            alias: {//路径别名
                '@': pathResolve('src/'),
                '@r': pathResolve('')
            },
            extensions: ['.js','.vue'] //自动解析的扩展
        },
        optimization: {
            moduleIds: 'hashed', //使用hash生成的值作为模块id来进行长缓存
            runtimeChunk: 'single', //分离webpack运行文件到一个单独文件
            splitChunks: { //splitChunksPlugin代码分割文档：https://webpack.js.org/plugins/split-chunks-plugin/
                chunks: 'all', //无论同步还是异步代码都进行分割
                minSize: 30000, //形成一个新代码块最小的体积
                minChunks: 1, //在分割之前，改代码块至少被复用1次
                maxAsyncRequests: 5,//按需加载的最大并行数
                maxInitialRequests: 3,//入口最大并行请求数
                cacheGroups: { //缓存组：如果满足vendor的条件，就按vender打包，否则按default打包
                    elementVendor: { // element-ui是按需引入，所以这个包会不断变化,单独打包
                        test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
                        name: 'elementVendor',
                        priority: -20
                    },
                    vendors: { //其他依赖包分割打包（一次引入，长缓存）
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        priority: -30, //打包优先级，值越大，优先级越高
                    }
                }
            }
        },
        plugins: [
            new htmlWebpackPlugin({ // 创建html入口，自动引入资源
                title: 'Vue config',
                filename: pathResolve('dist/index.html'),
                template: pathResolve('index.html'),
                favicon: pathResolve('favicon.ico'),
                minify: !devMode
            }),
            new ScriptExtHtmlWebpackPlugin({ // 为所有script添加defer属性
                defaultAttribute: 'defer'
            }),
            new VueLoaderPlugin()
        ]
    };
};
