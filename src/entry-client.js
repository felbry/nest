import { createApp } from './universal';
// 客户端特定引导逻辑……
const { APP } = createApp();
// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    APP.$mount('#app');
});
