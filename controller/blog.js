const EXPRESS = require('express');
const hljs = require('highlight.js');
const ROUTER = EXPRESS.Router();
const markdownItTocAndAnchor = require('markdown-it-toc-and-anchor').default;
const MD = new require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, str).value;
        }

        return ''; // use external default escaping
    }
})
    .use(
        markdownItTocAndAnchor,
        {
            anchorLink: false
        }
    );
const MULTER  = require('multer');
var upload = MULTER();

var blog = require('../model/blog');
var jwt = require('../middleware/auth');
var jwtFriends = require('../middleware/authFriends');
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
    .post(jwt, upload.single('file'), (req, res) => {
        blog.create(Object.assign(req.body, req.file, req.user)).then(result => {
            utils.handleResponse(result, res);
        });
    })

// 获取博客详情
ROUTER.get('/articals/:id', (req, res) => {
    blog.find({
        id: req.params.id
    }).then(result => {
        let toc = '';
        MD.set({
            tocCallback: function(tocMarkdown, tocArray, tocHtml) {
                toc = tocHtml;
            }
        });
        try {
            result.data.content = MD.render(result.data.content, { encoding: 'utf-8' });
            result.data.content = toc + result.data.content;
            res.json(result);
        } catch (err) {
            res.status(500).end('markdown-it toc convert error');
        }
    }).catch(err => { console.log(err) });
});

// 博客更新 -> 文件替换
ROUTER.post('/articals/update', jwt, upload.single('file'), (req, res) => {
    blog.updateByFile(Object.assign(req.body, req.file, req.user)).then(result => {
        utils.handleResponse(result, res);
    });
});

// 创建、获取标签
ROUTER.route('/tags')
    .get((req, res) => {
        blog.findAllTag().then(result => {
            utils.handleResponse(result, res);
        });
    })
    .post(jwt, (req, res) => {
        blog.createTag(req.body).then(result => {
            utils.handleResponse(result, res);
        });
    })

// 创建评论
ROUTER.route('/comments')
    .post(jwtFriends, (req, res) => {
        blog.createTag(req.body).then(result => {
            utils.handleResponse(result, res);
        });
    })

module.exports = ROUTER;