const path = require('path')

module.exports = {
    entry: './src/inspect/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'inspect/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devtool: 'source-map'
}
