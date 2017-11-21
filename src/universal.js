import Vue from 'vue';
import App from './app.vue';
import { createRouter } from './router';
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
    require('./lib/bootstrap.min.css');
    const ROUTER = createRouter();
    const APP = new Vue({
        // 根实例简单的渲染应用程序组件。
        router: ROUTER,
        render: h => h(App)
    });
    return { APP, ROUTER };
}