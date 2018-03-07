const AV = require('leanengine');

module.exports.create = function (opt) {
    let file = new AV.File(opt.originalname, opt.buffer);
    return file.save().then((file) => {
        return file.id;
    }).then(id => {
        console.log(id);
        
    })
}