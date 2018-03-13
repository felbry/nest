const JWT = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token = req.headers.authorization.split(' ')[1] || '';
    JWT.verify(token, 'ajing', (err, decoded) => {
        if (err) {
            res.status(401).json({ code: 1, data: { msg: err } });
            return;
        }
        req.user = decoded;
        next();
    });
}