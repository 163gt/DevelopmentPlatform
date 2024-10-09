import { createRouter, createWebHistory } from 'vue-router'
import Home from '../recovery/Home.vue'
import threeModel from '../recovery/threeModel.vue'
import login from '../recovery/login.vue'
import logins from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'logins',
      component: logins
    },
    {
      path: '/threeModel',
      name: 'threeModel',
      component: threeModel
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})

export default router
