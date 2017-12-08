const EXPRESS = require('express');
const FS = require('fs');
const MD = new require('markdown-it')();

const ROUTER = EXPRESS.Router();

ROUTER.route('/api/blog/articals')
    .get((req, res) => {
        res.json([
            {
                id: 1,
                title: 'change log',
                date: new Date()
            }
        ]);
    })

ROUTER.get('/api/blog/articals/:id', (req, res) => {
    res.end(MD.render(FS.readFileSync('./README.md', { encoding: 'utf-8' })));
});

module.exports = {
    router: ROUTER
};