const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

var jwt = require('../middleware/auth');
var friend = require('../model/friend');
var utils = require('../utils');


ROUTER.post('/registry', (req, res) => {
    friend.create(req.body)
        .then(result => {
            utils.handleResponse(result, res);
        });
});

ROUTER.post('/login', (req, res) => {
    friend.login(req.body)
        .then(result => {
            utils.handleResponse(result, res);
        });
});

// ROUTER.get('/status', jwt, (req, res) => {
//     // 后续校验user表是否存在id
//     res.json({ code: 0 });
// });

module.exports = ROUTER;