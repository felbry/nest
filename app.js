const KOA = require('koa');
const ROUTER = require('./routes');
const SERVER = new KOA();

SERVER.use(ROUTER.api.routes());
SERVER.listen(8080);