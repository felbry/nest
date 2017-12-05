const EXPRESS = require('express');

const ROUTER = EXPRESS.Router();

ROUTER.route('/api/blog/articals')
    .get((req, res) => {
        res.json([
            {
                id: 1,
                title: '第一篇文章',
                date: new Date()
            }
        ]);
    })

module.exports = {
    router: ROUTER
};