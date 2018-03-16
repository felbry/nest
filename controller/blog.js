const EXPRESS = require('express');
const hljs = require('highlight.js');
const ROUTER = EXPRESS.Router();
const FS = require('fs');
const MD = new require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, str).value;
        }

        return ''; // use external default escaping
    }
});
const MULTER  = require('multer');
const CORS = require('cors');
var upload = MULTER();

var blog = require('../model/blog');
var jwt = require('../middleware/auth');
var utils = require('../utils');

// 创建、获取博客
ROUTER.route('/articals')
    .get((req, res) => {
        blog.findAll({
            tid: req.query.tid,
            page: req.query.page || 1
        }).then(result => {
            utils.handleResponse(result, res);          
        });
    })
    .post(CORS(), jwt, upload.single('file'), (req, res) => {
        blog.create(Object.assign(req.body, req.file, req.user)).then(result => {
            utils.handleResponse(result, res);
        });
    })

// 获取博客详情
ROUTER.get('/articals/:id', (req, res) => {
    blog.find({
        id: req.params.id
    }).then(result => {
        result.data.content = MD.render(result.data.content, { encoding: 'utf-8' });
        res.json(result);
    }).catch(err => { console.log(err) });
});

// 创建、获取标签
ROUTER.route('/tags')
    .get(CORS(), (req, res) => {
        blog.findAllTag().then(result => {
            utils.handleResponse(result, res);
        });
    })
    .post(CORS(), jwt, (req, res) => {
        blog.createTag(req.body).then(result => {
            utils.handleResponse(result, res);
        });
    })

module.exports = ROUTER;