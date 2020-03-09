const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');

module.exports = env => {
    return merge(common({...env, isEnvProduction: 'production'}), {
        mode: 'production',
        // 输出
        output: {
            filename: '[id].[name].[chunkhash].js',
            path: path.resolve(__dirname, '../dist'),
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': 'production'
            })
        ]
    });
}

copyPublicFolder();

function copyPublicFolder() {
    fs.copySync(
        path.resolve(__dirname, '../public/dll'),
        path.resolve(__dirname, '../dist/dll'), {
        dereference: true,
        // filter: file => file !== paths.appHtml,
    });
}