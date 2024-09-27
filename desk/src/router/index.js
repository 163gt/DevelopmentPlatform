import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import threeModel from '../views/threeModel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'threeModel',
      component: threeModel
    },
    // {
    //   path: '/threeModel',
    //   name: 'threeModel',
    //   component: threeModel
    // },
  ]
})

export default router
