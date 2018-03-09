const PATH = require('path');
const WEBPACK = require('webpack');
const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

module.exports = {
    output: {
        path: PATH.resolve(__dirname, '../public'),
        publicPath: IS_DEV ? 'http://localhost:3000/public/' : '/',
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
                test: /\.(png|jpg|gif|svg|ttf|woff|woff2|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: !IS_DEV ? EXTRACT_TEXT_PLUGIN.extract({
                    use: 'css-loader?minimize',
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: !IS_DEV ? EXTRACT_TEXT_PLUGIN.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader', 'sass-loader']
            },
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