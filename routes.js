const RENDERER = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});
const ROUTER = require('koa-router');
const CREATE_APP = require('./app');
const API = ROUTER();

module.exports.api = API
    .get('*', (ctx, next) => {
        const APP = CREATE_APP({
            url: ctx.url
        });
        RENDERER.renderToString(APP, (err, html) => {
            if (err) {
                ctx.status = 500;
                ctx.body = 'Internal Server Error';
                return;
            }
            ctx.body = html;
        });
    })