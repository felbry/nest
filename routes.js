const RENDERER = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});
const ROUTER = require('koa-router');
const CREATE_APP = require('./path/to/built-server-bundle.js'); // 假设已经被webpack打包成功的前提下
const API = ROUTER();

module.exports.api = API
    .get('*', (ctx, next) => {
        const CONTEXT = { url: req.url };
        CREATE_APP(CONTEXT).then(app => {
            RENDERER.renderToString(app, (err, html) => {
                if (err) {
                    if (err.code == 404) {
                        ctx.status = 404;
                        ctx.body = 'Page not found';
                    }
                    ctx.status = 500;
                    ctx.body = 'Internal Server Error';
                    return;
                }
                ctx.body = html;
            });
        });
    })