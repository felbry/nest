const AV = require('leanengine');
var utils = require('../utils');

module.exports.create = function (opt) {
    console.log(opt);
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
        return artical.save().then(data => {
            return {
                code: 0,
                data: {
                    id: data.id
                }
            };
        });
    }).catch(utils.handleDBErr);
}

module.exports.find = function (opt) {
    
}