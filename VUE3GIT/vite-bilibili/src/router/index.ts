import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/video.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message.vue'),
    children: [
      {
        path: 'reply',
        component: () => import('../viewsRouter/message/reply.vue')
      },
      {
        path: 'atMe',
        component: () => import('../viewsRouter/message/atMe.vue')
      },
    ]
  },

  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('../views/error.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
