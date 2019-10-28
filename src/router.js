import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        children: [
          {
            path: '',
            component: () => import('./views/home.vue')
          },
          {
            path: '/blog',
            component: () => import('./views/blog.vue')
          },
          {
            path: '/blog/articals/:id',
            component: () => import('./views/artical.vue')
          }
        ]
      }
    ]
  })
}
