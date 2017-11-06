const VUE = require('vue');

module.exports = function createApp(context) {
    return new VUE({
        data: {
            url: context.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    });
}