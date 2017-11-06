const PATH = require('path');
const WEBPACK = require('webpack');
const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin');

module.exports = {
    output: {
        path: PATH.resolve(__dirname, '../public'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: EXTRACT_TEXT_PLUGIN.extract({
                    use: 'css-loader?minimize',
                    fallback: 'vue-style-loader'
                })
            }
        ]
    },
    plugins: [
        new WEBPACK.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new EXTRACT_TEXT_PLUGIN({
            filename: 'common.[chunkhash].css'
        })
    ]
}