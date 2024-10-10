import { createRouter, createWebHistory } from 'vue-router'
import Home from '../recovery/Home.vue'
import threeModel from '../recovery/threeModel.vue'
import login from '../recovery/login.vue'
import logins from '../views/login.vue'
import canvasVue from '@/views/canvas.vue'
import AframeAR from '@/views/AframeAR.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'canvasVue',
      component: canvasVue
    },
    {
      path: '/AR',
      name: 'AframeAR',
      component: AframeAR
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
    {
      path: '/logins',
      name: 'logins',
      component: logins
    },
  ]
})

export default router
