const AV = require('leanengine');
const JWT = require('jsonwebtoken');

var utils = require('../utils');

module.exports.find = function (opt) {
    var cql = 'select * from _User where mobilePhoneNumber = ? and pwd = ?';
    var pv = [opt.username, opt.password];
    return AV.Query.doCloudQuery(cql, pv).then(data => {
        let results = data.results;
        if (!results.length) {
            return {
                code: 1,
                data: {
                    msg: '用户不存在'
                }
            };
        }
        return {
            code: 0,
            data: {
                token: JWT.sign(
                    {
                        uid: results[0].id
                    },
                    'ajing'
                )
            }
        }
    }).catch(utils.handleDBErr);
}