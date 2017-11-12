const EXPRESS = require('express');
const CONFIG = require('./config');
const PATH = require('path');
const RESOLVE = file => PATH.resolve(__dirname, file);
const CREATE_BUNDLE_RENDERER = require('vue-server-renderer').createBundleRenderer;
const AV = require('leanengine');
const APP = EXPRESS();

const IS_DEV = process.env.NODE_ENV === 'dev';
const TEMPLATE_PATH = RESOLVE('./index.template.html');
let renderer;
let readyPromise;

if (!IS_DEV) {
    renderer = CREATE_BUNDLE_RENDERER(require('./public/vue-ssr-server-bundle.json'), {
        runInNewContext: false,
        template: require('fs').readFileSync(TEMPLATE_PATH, 'utf-8'),
        clientManifest: require('./public/vue-ssr-client-manifest.json')
    });
} else {
    readyPromise = require('./build/startup-dev')(APP, TEMPLATE_PATH, (bundle, options) => {
        renderer = CREATE_BUNDLE_RENDERER(bundle, options);
    });
}

APP.use(EXPRESS.static('public'));

AV.init({
    appId: process.env.LEANCLOUD_APP_ID || CONFIG.appId,
    appKey: process.env.LEANCLOUD_APP_KEY || CONFIG.appKey,
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || CONFIG.masterKey
});

APP.use(AV.express());

function render (req, res) {
    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code == 404) {
                res.status(404).end('Page not found');
            }
            res.status(500).end('Internal Server Error');
            return;
        }
        res.end(html);
    });
}

APP.get('*', !IS_DEV ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
});

APP.listen(process.env.LEANCLOUD_APP_PORT || 3000, function () {
    console.log('App listening on online or port 3000!');
});