import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ()=>import('../views/home/Home.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/login/Login.vue')
    }
  ]
})

export default router
