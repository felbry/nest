const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const FS = require('fs');
const MD = new require('markdown-it')();
const MULTER  = require('multer');
var upload = MULTER();
var blog = require('../model/blog');

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
    .post(upload.single('file'), (req, res) => {
        blog.create(Object.assign(req.body, req.file)).then(() => {
            console.log(2);
            res.end('ggg');
        });
    })

ROUTER.get('/articals/:id', (req, res) => {
    res.end(MD.render(FS.readFileSync('../README.md', { encoding: 'utf-8' })));
});

module.exports = ROUTER;