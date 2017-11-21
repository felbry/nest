const PATH = require('path');
const WEBPACK = require('webpack');
const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

module.exports = {
    output: {
        path: PATH.resolve(__dirname, '../public'),
        publicPath: '/public/',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: !IS_DEV
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: !IS_DEV ? EXTRACT_TEXT_PLUGIN.extract({
                    use: 'css-loader?minimize',
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: !IS_DEV ? [
        new WEBPACK.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new EXTRACT_TEXT_PLUGIN({
            filename: 'common.[chunkhash].css'
        })
    ] : []
}