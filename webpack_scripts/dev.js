const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');
const path = require('path');

module.exports = merge(common({ isEnvProduction: development }), {
    mode: 'development',
    output: {
        // path: path.resolve(__dirname, '../public'),
        // publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: 'development'
        })
    ],
    devServer: {
        // 设置静态文件读取地址
        contentBase: path.resolve(__dirname, '../public'),
        // 允许使用本地ip访问
        // useLocalIp: true,
    }
})