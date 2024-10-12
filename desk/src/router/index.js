import { createRouter, createWebHistory } from 'vue-router'
import Home from '../recovery/Home.vue'
import Three from '../views/three.vue'
import login from '../recovery/login.vue'
import logins from '../views/login.vue'
import canvasVue from '@/views/canvas.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'canvasVue',
      component: canvasVue
    },
    {
      path: '/Three',
      name: 'Three',
      component: Three
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
