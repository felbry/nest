import { createApp } from './universal';
// 客户端特定引导逻辑……
const { APP, ROUTER, STORE } = createApp();
if (window.__INITIAL_STATE__) {
    STORE.replaceState(window.__INITIAL_STATE__);
}
// 这里假定 App.vue 模板中根元素具有 `id="app"`
ROUTER.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    ROUTER.beforeResolve((to, from, next) => {
        const MATCHED = ROUTER.getMatchedComponents(to);
        const PREV_MATCHED = ROUTER.getMatchedComponents(from);
        // 我们只关心之前没有渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false;
        const ACTIVED = MATCHED.filter((c, i) => {
            return diffed || (diffed = (PREV_MATCHED[i] !== c));
        })
        if (!ACTIVED.length) {
            return next();
        }
        // 这里如果有加载指示器(loading indicator)，就触发
        Promise.all(ACTIVED.map(c => {
            if (c.asyncData) {
                return c.asyncData({
                    store: STORE,
                    route: to
                });
            }
        })).then(() => {
            // 停止加载指示器(loading indicator)
            next();
        }).catch(next);
    });
    APP.$mount('#app');
});
