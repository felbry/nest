const AV = require('leanengine');
var utils = require('../utils');
const axios = require('axios');

module.exports.create = function (opt) {
    let file = new AV.File(opt.originalname, opt.buffer);
    return file.save().then((file) => {
        return file.id;
    }).then(fid => {
        let artical = new AV.Object('Artical');
        let user = AV.Object.createWithoutData('Admin', opt.uid);
        let file = AV.Object.createWithoutData('_File', fid);
        artical.set('user', user);
        artical.set('file', file);
        if (opt.tid) {
            let tag = AV.Object.createWithoutData('Tag', opt.tid);
            artical.set('tag', tag);
        }
        artical.set('title', opt.title);
        return artical.save().then(result => {
            return {
                code: 0,
                data: {
                    id: result.id
                }
            };
        });
    }).catch(utils.handleDBErr);
}

module.exports.findAll = function (opt) {
    let query = new AV.Query('Artical');
    if (opt.tid) {
        let tag = AV.Object.createWithoutData('Tag', opt.tid);
        query.equalTo('tag', tag);        
    }
    query.include('user');
    return query.find().then(results => {
        return {
            code: 0,
            data: results.map(val => {
                return {
                    id: val.id,
                    title: val.get('title'),
                    author: val.get('user').get('nickname'),
                    createdAt: val.createdAt,
                    updatedAt: val.updatedAt
                };
            })
        }
    }).catch(utils.handleDBErr);
}

module.exports.find = function (opt) {
    let query = new AV.Query('Artical');
    query.include('file');
    return query.get(opt.id).then(rs1 => {
        return rs1;
    }).then(artical => {
        let url = artical.get('file').get('url');
        return axios.get(url).then(rs2 => {
            return {
                code: 0,
                data: {
                    title: artical.get('title'),
                    createdAt: artical.get('createdAt'),
                    content: rs2.data
                }
            }
        });
    }).catch(utils.handleDBErr);  
}

module.exports.createTag = function (opt) {
    let tag = new AV.Object('Tag');
    tag.set('name', opt.name);
    tag.set('path', opt.path);
    return tag.save().then(result => {
        return {
            code: 0,
            data: {
                id: result.id
            }
        }
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
                    path: result.get('path')
                };
            })
        }
    }).catch(utils.handleDBErr);
}