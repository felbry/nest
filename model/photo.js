const AV = require('leanengine');
var utils = require('../utils');

module.exports.create = function (opt) {
    let promises = opt.files.map(f => {
        let file = new AV.File(f.originalname, f.buffer);
        return file.save().then(f2 => {
            return f2.id;
        }).then(fid => {
            let photo = new AV.Object('Photo');
            let file = AV.Object.createWithoutData('_File', fid);
            photo.set('file', file);
            if (opt.tid) {
                let photoTag = AV.Object.createWithoutData('PhotoTag', opt.tid);
                photo.set('tag', photoTag);
            }
            return photo.save().then(result => result.id);
        }).catch(err => { console.log(err) });
    });

    return Promise.all(promises).then(ids => {
        return {
            code: 0,
            data: ids
        }
    });
}

module.exports.findAll = function (opt) {
    // 接口写好，前端渲染写好 基本就ok了。
    let query = new AV.Query('Photo');
    if (opt.tid) {
        let tag = AV.Object.createWithoutData('PhotoTag', opt.tid);
        query.equalTo('tag', tag);       
    }
    return query.count().then(count => count).then(count => {
        query.limit(16);
        query.include('file');
        if (opt.page > 1) {
            query.skip((opt.page - 1) * 16);
        }
        return query.find().then(results => {
            return {
                code: 0,
                data: {
                    total: count,
                    photos: results.map(val => {
                        return {
                            id: val.id,
                            thumbUrl: val.get('file').thumbnailURL(185, 111),
                            url: val.get('file').get('url'),
                            createdAt: val.createdAt,
                        };
                    })
                }
            };
        });
    }).catch(utils.handleDBErr);
}

module.exports.findAllTag = function (opt) {
    let query = new AV.Query('PhotoTag');
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