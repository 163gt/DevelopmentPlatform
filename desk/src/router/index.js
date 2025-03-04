import { createRouter, createWebHistory } from 'vue-router'

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'header',
      component: ()=> import('@/views/index.vue'),
      children:[
        {
          path:'',
          name:'netConsist',
          component: ()=> import('@/views/net/index.vue'),
        }
      ]
    },
  ]
})

export default Router
