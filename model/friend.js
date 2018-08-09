const AV = require('leanengine');
const JWT = require('jsonwebtoken');
const MAIL = require('../tools/mail');

var utils = require('../utils');
var config = require('../config');

module.exports.create = function (opt) {
    if (!utils.verifyEmail(opt.email)) {
        return Promise.resolve({
            code: 1,
            data: {
                msg: '邮箱格式非法'
            }
        });
    }
    let friendQuery = new AV.Query('Friend');
    friendQuery.equalTo('email', opt.email);
    return friendQuery.find()
        .then(results => {
            if (results.length) {
                throw {
                    code: 2,
                    data: {
                        msg: '用户已存在'
                    }
                };
            }
        })
        .then(() => {
            let code = '';
            for (let i = 0; i < 4; i++) {
                code += Math.floor((Math.random() * 9) + 1);
            }
            let friend = new AV.Object('Friend');
            friend.set('email', opt.email);
            friend.set('password', code);
            friend.set('nickname', opt.nickname || '一名吃瓜群众');
            return friend.save();
        })
        .then(result => MAIL({
            receiver: result.get('email'),
            code: result.get('password')
        }))
        .then(() => {
            return { code: 0 };
        })
        .catch((err) => {
            if (err && !Number.isInteger(err.code)) {
                return {
                    code: 3,
                    data: {
                        msg: `邮件发送失败：${JSON.stringify(err)}`
                    }
                }
            } else {
                return utils.handleDBErr(err);
            }
        });
}