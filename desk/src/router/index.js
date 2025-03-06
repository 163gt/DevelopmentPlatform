import { createRouter, createWebHistory } from 'vue-router'

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'index',
      component: ()=> import('@/views/index.vue'),
      redirect: '/index',
      children:[
        {
          path:'index',
          name:'netConsist',
          component: ()=> import('@/views/net/index.vue'),
        }
      ]
    },
  ]
})

export default Router
