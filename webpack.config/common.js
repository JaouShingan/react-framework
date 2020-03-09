// 路径
const path = require('path');
const merge = require('webpack-merge');
// 清理打包输出时的文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包时重置index.html文件，并将需要引入的js/css等文件引入其中。可以指定模版index.html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const aliasAndProxyConfig = require('../webpack.config');

// 环境是否是生产环境
const isEnvProduction = process.env.NODE_ENV === 'production' ? true : false;

module.exports = merge({
    // 入口
    // index 项目入口
    entry: [
        // path.resolve(__dirname, '../src/index')
        './src/index'
    ],
    // 输出
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                oneOf: [
                    // 处理小于8k的图片，转为DataURL
                    {
                        test: /\.(bmp|png|jpeg|jpg|gif)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    // 限制大小
                                    limit: 8192,
                                    // 默认 file-loader
                                    // fallback: 'file-loader', 
                                    // 设置使用file-loader时，文件的输出地址
                                    outputPath: 'static/images'
                                }
                            }
                        ]
                    },
                    //  处理less文件
                    {
                        test: /\.less$/,
                        use: [
                            {
                                loader: 'style-loader'// creates style nodes from JS strings
                            },
                            {
                                loader: 'css-loader'// translates CSS into CommonJS
                            },
                            {
                                loader: 'less-loader'// compiles Less to CSS
                            }
                        ]
                    },
                    {
                        test: /\.(js|jsx)$/,
                        // include: path.resolve(__dirname, 'src'),
                        exclude: /(node_modules|bower_components)/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/env', '@babel/react'],
                                    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                                }
                            }
                        ]
                    },
                    {
                        loader: 'file-loader',
                        exclude: [/\.(js|mjs|jsx|ts|tsx|less|css)$/, /\.html$/, /\.json$/],
                        options: {
                            name: './static/[hash].[ext]',
                            outputPath: 'static/assets'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!index.html', , '!favicon.ico', '!dll/*'] // 每次打包时，不清理index.html和dll文件夹及文件夹下的文件
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            favicon: path.resolve(__dirname, '../public/favicon.ico')
        }),
    ],
    optimization: {
        // 启用TerserPlugin 压缩 bundle
        minimize: isEnvProduction,
        splitChunks: {
            // 这表明将选择哪些块进行优化。当提供一个字符串，有效值为all，async和initial。
            // 提供all可能特别强大，因为它意味着即使在异步和非异步块之间也可以共享块。
            chunks: 'all'
        }
    }
}, aliasAndProxyConfig);