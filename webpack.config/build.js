const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');


module.exports = merge(common, {
    mode: 'production',
    // 输出
    output: {
        filename: '[id].[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new webpack.DefinePlugin({
            NOED_ENV: 'production'
        })
    ]
})