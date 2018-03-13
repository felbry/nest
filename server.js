const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const CONFIG = require('./config');
const PATH = require('path');
const RESOLVE = file => PATH.resolve(__dirname, file);
const CREATE_BUNDLE_RENDERER = require('vue-server-renderer').createBundleRenderer;
const AV = require('leanengine');
const CORS = require('cors');
const APP = EXPRESS();
var bodyParser = require('body-parser');

const BLOG_CONTROLLER = require('./controller/blog');
const PHOTO_CONTROLLER = require('./controller/photo');
const USER_CONTROLLER = require('./controller/user');

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
APP.use(bodyParser.json());

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
            res.status(500).end(`Internal Server Error：${err}`);
            return;
        }
        res.end(html);
    });
}

APP.get(/^(?!\/api)/, !IS_DEV ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
});

APP.use('/api/blog', BLOG_CONTROLLER);
APP.use('/api/photo', PHOTO_CONTROLLER);
APP.use('/api/user', CORS(), USER_CONTROLLER);

APP.listen(process.env.LEANCLOUD_APP_PORT || 3000, function () {
    console.log(`App listening on online or port ${process.env.LEANCLOUD_APP_PORT || 3000}!`);
});