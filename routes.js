const RENDERER = require('vue-server-renderer').createBundleRenderer(require('./public/vue-ssr-server-bundle.json'), {
    runInNewContext: false,
    template: require('fs').readFileSync('./index.template.html', 'utf-8'),
    clientManifest: require('./public/vue-ssr-client-manifest.json')
});
const ROUTER = require('koa-router');
const API = ROUTER();

module.exports.api = API
    .get('*', (ctx, next) => {
        const context = { url: ctx.url };
        RENDERER.renderToString(context, (err, html) => {
            if (err) {
                console.log(err);
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
    })