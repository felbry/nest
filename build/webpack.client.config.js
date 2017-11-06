const WEBPACK = require('webpack');
const MERGE = require('webpack-merge');
const BASE_CONFIG = require('./webpack.base.config.js');
const VUE_SSR_CLIENT_PLUGIN = require('vue-server-renderer/client-plugin');
module.exports = MERGE(BASE_CONFIG, {
    entry: './src/entry-client.js',
    plugins: [
        // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
        // 以便可以在之后正确注入异步 chunk。
        // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
        new WEBPACK.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VUE_SSR_CLIENT_PLUGIN()
    ]
})