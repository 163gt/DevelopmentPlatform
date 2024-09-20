<template>
    <div class="lottie"></div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import lottie from 'lottie-web'
  
  export default {
    props: {
      lottieData: {
        type: Object,
        required: true,
      },
    },
    
    setup(props) {
      const lottieAnimation = ref(null);
      
      const init = () => {
        console.log(props.lottieData, 'lottieData');
        const container = document.getElementsByClassName('lottie')[0];
        if (!container) return;
        lottieAnimation.value = lottie.loadAnimation({
          path: props.lottieData.path,
          renderer: props.lottieData.renderer,
          loop: props.lottieData.loop,
          autoplay: props.lottieData.autoplay,
          container: container,
        });
      };
      
      const onStart = () => {
        lottieAnimation.value?.play(); 
      };
      
      onMounted(() => {
        init();
        onStart();
      });
  
      return {
        lottieAnimation,
      };
    },
  };
  </script>
  
  <style scoped>
  .lottie {
    width: 100%;
    height: 100%;
  }
  </style>
  