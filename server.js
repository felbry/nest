const EXPRESS = require('express');
const CONFIG = require('./config');
const AV = require('leanengine');
const APP = EXPRESS();

const RENDERER = require('vue-server-renderer').createBundleRenderer(require('./public/vue-ssr-server-bundle.json'), {
    runInNewContext: false,
    template: require('fs').readFileSync('./index.template.html', 'utf-8'),
    clientManifest: require('./public/vue-ssr-client-manifest.json')
});

APP.use(EXPRESS.static('public'));

AV.init({
    appId: process.env.LEANCLOUD_APP_ID || CONFIG.appId,
    appKey: process.env.LEANCLOUD_APP_KEY || CONFIG.appKey,
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || CONFIG.masterKey
});

APP.use(AV.express());

APP.get('*', function (req, res) {
    const context = { url: req.url };
    RENDERER.renderToString(context, (err, html) => {
        if (err) {
            if (err.code == 404) {
                res.status(404).end('Page not found');
            }
            res.status(500).end('Internal Server Error');
            return;
        }
        res.end(html);
    });
});

APP.listen(process.env.LEANCLOUD_APP_PORT || 3000, function () {
    console.log('App listening on online or port 3000!');
});