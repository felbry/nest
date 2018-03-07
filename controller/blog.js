const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const FS = require('fs');
const MD = new require('markdown-it')();
const MULTER  = require('multer');
const CORS = require('cors');
var upload = MULTER();

var blog = require('../model/blog');
var jwt = require('../middleware/auth');

ROUTER.route('/articals')
    .get((req, res) => {
        res.json([
            {
                id: 1,
                title: 'change log',
                date: new Date()
            }
        ]);
    })
    .post(CORS(), jwt, upload.single('file'), (req, res) => {
        blog.create(Object.assign(req.body, req.file, req.user)).then(result => {
            if (result.code >= 0) {
                res.json(result);
            }
            res.status(500).json(result);
        });
    })

ROUTER.get('/articals/:id', (req, res) => {
    res.end(MD.render(FS.readFileSync('../README.md', { encoding: 'utf-8' })));
});

module.exports = ROUTER;