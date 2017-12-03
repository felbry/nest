import Vue from 'vue';
import App from './app.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
    require('./lib/bootstrap.min.css');
    const ROUTER = createRouter();
    const STORE = createStore();
    sync(STORE, ROUTER);
    const APP = new Vue({
        // 根实例简单的渲染应用程序组件。
        router: ROUTER,
        store: STORE,
        render: h => h(App)
    });
    return { APP, ROUTER, STORE };
}