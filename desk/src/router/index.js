import { createRouter, createWebHistory } from 'vue-router'
import hemo from '@/views/hemo.vue'
import three from '@/recovery/three.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: hemo
    },
    {
      path: '/three',
      name: 'three',
      component: three
    },
  ]
})

export default router
