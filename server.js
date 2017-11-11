const EXPRESS = require('express');
const CONFIG = require('./config');
const PATH = require('path');
const RESOLVE = file => PATH.resolve(__dirname, file);
const AV = require('leanengine');
const APP = EXPRESS();

const IS_DEV = process.env.NODE_ENV === 'dev';
const RENDERER;
const TEMPLATE_PATH = RESOLVE('./index.template.html');

if (!IS_DEV) {
    RENDERER = require('vue-server-renderer').createBundleRenderer(require('./public/vue-ssr-server-bundle.json'), {
        runInNewContext: false,
        template: require('fs').readFileSync(TEMPLATE_PATH, 'utf-8'),
        clientManifest: require('./public/vue-ssr-client-manifest.json')
    });
} else {
    // RENDERER = require('./build/startup-dev')()
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
}

APP.get('*', !IS_DEV ? render : (req, res) => {
    
});

APP.listen(process.env.LEANCLOUD_APP_PORT || 3000, function () {
    console.log('App listening on online or port 3000!');
});