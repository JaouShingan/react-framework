const path = require('path');
const webpack = require('webpack');
const DllPlugin = webpack.DllPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        react: ['react'],
        // 入口文件名应当用驼峰命名法
        'reactDom': ['react-dom'],
        axios: ['axios']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../public/dll'),
        // 全局库名
        library: '[name]',
        // libraryTarget: 'umd'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DllPlugin({
            /*  
            该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
            比如在jquery.manifest文件中有 name: 'dll_jquery'
            */
            name: '[name]',
            /* 生成manifest文件输出的位置和文件名称 */
            path: path.join(__dirname, '../public/dll', '[name].manifest.json'),
        })
    ]
}