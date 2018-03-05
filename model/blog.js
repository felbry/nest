const AV = require('leanengine');

module.exports.create = function (fileOpt) {
    let file = new AV.File(fileOpt.originalname, fileOpt.buffer);
    return file.save().then((file) => {
        console.log(1);
        console.log(file.id);
    });
}