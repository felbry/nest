const EXPRESS = require('express');

const ROUTER = EXPRESS.Router();

ROUTER.route('/api/blog/articals')
    .all((req, res, next) => {
        console.log('coming');
        next();
    })
    .get((req, res, next) => {
        res.json([
            {
                id: 1,
                title: '第一篇文章',
                date: new Date()
            }
        ]);
        next();
    })

// ROUTER.use((req, res, next) => {
//     next();
// });

module.exports = {
    router: ROUTER
};