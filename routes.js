const EXPRESS = require('express');
const FS = require('fs');

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
    res.end(FS.readFileSync('./README.md'));
});

module.exports = {
    router: ROUTER
};