const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const CORS = require('cors');

var jwt = require('../middleware/auth');
var user = require('../model/user');

ROUTER.post('/login', (req, res) => {
    user.find(req.body).then(result => {
        if (result.code >= 0) {
            res.json(result);
        }
        res.status(500).json(result);
    });
});

ROUTER.get('/status', jwt, (req, res) => {
    // 后续校验user表是否存在id
    res.json({ code: 0 });
});

module.exports = ROUTER;