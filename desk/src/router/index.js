import { createRouter, createWebHistory } from 'vue-router'
import Three from '../views/three.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Three',
      component: Three
    },
  ]
})

export default router
