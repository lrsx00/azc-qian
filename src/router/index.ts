import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import { getToken } from '../utils/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const whiteList = ['/login']

router.beforeEach((to, _from, next) => {
  const token = getToken()

  if (!token && !whiteList.includes(to.path)) {
    next({ path: '/login' })
    return
  }

  if (token && to.path === '/login') {
    next({ path: '/dashboard' })
    return
  }

  next()
})

export default router

