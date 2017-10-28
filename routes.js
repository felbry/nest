const VUE = require('vue');
const RENDERER = require('vue-server-renderer').createRenderer();
const ROUTER = require('koa-router');
const API = ROUTER();

module.exports.api = API
    .get('*', (ctx, next) => {
        const APP = new VUE({
            data: {
                url: ctx.url
            },
            template: `<div>访问的 URL 是： {{ url }}</div>`
        });
        RENDERER.renderToString(APP, (err, html) => {
            if (err) {
                ctx.status = 500;
                ctx.body = 'Internal Server Error';
                return;
            }
            ctx.body = `
                <!DOCTYPE html>
                <html lang="en">
                <head><title>Hello</title></head>
                <body>${html}</body>
                </html>
            `
        });
    })