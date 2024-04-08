import router from './router'


router.beforeEach((to, from, next) => {
  console.log('8888888888');
  console.log(to);
})
