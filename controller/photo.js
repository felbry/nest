const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MULTER  = require('multer');
const CORS = require('cors');
var upload = MULTER();

var photo = require('../model/photo');
var jwt = require('../middleware/auth');
var utils = require('../utils');

// 创建、获取图片
ROUTER.route('/imgs')
    .get((req, res) => {
        photo.findAll({
            tid: req.query.tid,
            page: req.query.page || 1
        }).then(result => {
            utils.handleResponse(result, res);          
        });
    })
    .post(CORS(), jwt, upload.array('file'), (req, res) => {
        photo.create(Object.assign(req.body, { files: req.files })).then(result => {
            utils.handleResponse(result, res);
        });
    })

// 获取图片详情
// ROUTER.get('/articals/:id', (req, res) => {
//     blog.find({
//         id: req.params.id
//     }).then(result => {
//         result.data.content = MD.render(result.data.content, { encoding: 'utf-8' });
//         res.json(result);
//     }).catch(err => { console.log(err) });
// });

// 创建、获取标签
ROUTER.route('/tags')
    .get(CORS(), (req, res) => {
        photo.findAllTag().then(result => {
            utils.handleResponse(result, res);
        });
    })
    // .post(CORS(), jwt, (req, res) => {
    //     photo.createTag(req.body).then(result => {
    //         utils.handleResponse(result, res);
    //     });
    // })

module.exports = ROUTER;