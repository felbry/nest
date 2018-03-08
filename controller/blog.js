const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const FS = require('fs');
const MD = new require('markdown-it')();
const MULTER  = require('multer');
const CORS = require('cors');
var upload = MULTER();

var blog = require('../model/blog');
var jwt = require('../middleware/auth');
var utils = require('../utils');

ROUTER.route('/articals')
    .get((req, res) => {
        blog.find().then(result => {
            utils.handleResponse(result, res);          
        });
    })
    .post(CORS(), jwt, upload.single('file'), (req, res) => {
        blog.create(Object.assign(req.body, req.file, req.user)).then(result => {
            utils.handleResponse(result, res);
        });
    })

ROUTER.get('/articals/:id', (req, res) => {
    res.end(MD.render(FS.readFileSync('../README.md', { encoding: 'utf-8' })));
});

module.exports = ROUTER;