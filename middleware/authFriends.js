const JWT = require('jsonwebtoken');
var config = require('../config');

module.exports = function (req, res, next) {
    let token = req.headers.authorization.split(' ')[1] || '';
    JWT.verify(token, config.secretFriend, (err, decoded) => {
        if (err) {
            res.status(401).json({ code: 1, data: { msg: err } });
            return;
        }
        // 这里做一次密码二次验证，有可能多次发送邮件
        req.user = decoded;
        next();
    });
}