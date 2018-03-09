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
    return query.get(opt.id).then(result => {
        return result.get('file').get('url');
    }).then(url => {
        return axios.get(url).then(result => result.data);
    }).catch(utils.handleDBErr);  
}