const path = require('path');

module.exports = {
    entry: '../ecmascript6/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    }
};