const path = require('path')

module.exports = {
    mode: 'development',
    entry: './App/index.jsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    }
                }
            },
        ]
    }
}