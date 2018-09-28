import { createApp } from './universal'
export default context => {
  return new Promise((resolve, reject) => {
    const { APP, ROUTER, STORE } = createApp()
    ROUTER.push(context.url)
    ROUTER.onReady(() => {
      const MATCHED_COMPONENTS = ROUTER.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!MATCHED_COMPONENTS.length) {
        return reject({ code: 404 })
      }
      Promise.all(MATCHED_COMPONENTS.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store: STORE,
            route: ROUTER.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = STORE.state
        resolve(APP)
      }).catch(reject)
    }, reject)
  })
}
