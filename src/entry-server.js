import { createApp } from './universal';
export default context => {
    return new Promise((resolve, reject) => {
        const { APP, ROUTER } = createApp();
        ROUTER.push(context.url);
        ROUTER.onReady(() => {
            const MATCHED_COMPONENTS = ROUTER.getMatchedComponents();
            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!MATCHED_COMPONENTS.length) {
                return reject({ code: 404 })
            }
            // Promise 应该 resolve 应用程序实例，以便它可以渲染
            resolve(APP);
        }, reject);
    });
}