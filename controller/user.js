const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const CORS = require('cors');

var jwt = require('../middleware/auth');
var user = require('../model/user');
var utils = require('../utils');


ROUTER.post('/login', (req, res) => {
    user.find(req.body).then(result => {
        utils.handleResponse(result, res);
    });
});

ROUTER.get('/status', jwt, (req, res) => {
    // 后续校验user表是否存在id
    res.json({ code: 0 });
});

module.exports = ROUTER;