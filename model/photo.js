const AV = require('leanengine');
var utils = require('../utils');

module.exports.findAll = function (opt) {
    // 接口写好，前端渲染写好 基本就ok了。
    let query = new AV.Query('Artical');
    if (opt.tid) {
        let tag = AV.Object.createWithoutData('Tag', opt.tid);
        query.equalTo('tag', tag);        
    }
    query.include('user');
    return query.count().then(count => count).then(count => {
        query.limit(10);
        if (opt.page > 1) {
            query.skip((opt.page - 1) * 10);
        }
        return query.find().then(results => {
            return {
                code: 0,
                data: {
                    total: count,
                    articals: results.map(val => {
                        return {
                            id: val.id,
                            title: val.get('title'),
                            author: val.get('user').get('nickname'),
                            createdAt: val.createdAt,
                            updatedAt: val.updatedAt
                        };
                    })
                }
            };
        });
    }).catch(utils.handleDBErr);
}

module.exports.findAllTag = function (opt) {
    let query = new AV.Query('Tag');
    return query.find().then(results => {
        return {
            code: 0,
            data: results.map(result => {
                return {
                    id: result.id,
                    name: result.get('name'),
                };
            })
        }
    }).catch(utils.handleDBErr);
}