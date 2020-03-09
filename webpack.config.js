const path = require('path');
module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@u': path.resolve(__dirname, 'src/utils'),
            '@c': path.resolve(__dirname, 'src/components')
        }
    },
    devServer: {
    }
}