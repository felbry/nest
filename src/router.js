import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('./views/index.vue'),
        children: [
          {
            path: '',
            component: () => import('./views/img.vue')
          },
          {
            path: 'index',
            component: () => import('./views/home.vue')
          },
          {
            path: 'photos',
            component: () => import('./views/photos.vue'),
            redirect: '/photos/all',
            children: [
              {
                path: '/photos/:tid',
                component: () => import('./components/photo-list.vue')
              }
            ]
          },
          {
            path: 'about',
            component: () => import('./views/about.vue')
          }
        ]
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
  })
}
