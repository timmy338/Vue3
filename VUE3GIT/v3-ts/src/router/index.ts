import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import( '../views/LoginView.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import( '../views/404View.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
